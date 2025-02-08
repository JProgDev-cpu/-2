const app = getApp();

Page({
  data: {
    currentLang: app.getCurrentLang(),
    languages: ['th', 'zh', 'en'],
    translations: {
      title: {
        th: 'เลือกสถานที่ท่องเที่ยว',
        zh: '选择要游览的景点',
        en: 'Select Destinations'
      },
      generateRoute: {
        th: 'สร้างเส้นทางที่ดีที่สุด',
        zh: '生成最佳路线',
        en: 'Generate Best Route'
      },
      recommendedRoute: {
        th: 'เส้นทางแนะนำ',
        zh: '推荐路线',
        en: 'Recommended Route'
      },
      totalDistance: {
        th: 'ระยะทางทั้งหมด',
        zh: '总距离',
        en: 'Total Distance'
      },
      visitTime: {
        th: 'เวลาเที่ยวชม',
        zh: '游览时间',
        en: 'Visit Time'
      },
      minutes: {
        th: 'นาที',
        zh: '分钟',
        en: 'minutes'
      },
      kilometer: {
        th: 'กิโลเมตร',
        zh: '公里',
        en: 'km'
      },
      navigation: {
        th: 'นำทาง',
        zh: '导航',
        en: 'Navigate'
      },
      about: {
        th: 'ประมาณ',
        zh: '约',
        en: 'About'
      }
    },
    selectedSpots: [],
    transportMode: 'driving', // 交通方式：driving（驾车）、transit（公交）、walking（步行）
    transportModeText: {
      driving: {
        th: 'รถยนต์',
        zh: '驾车',
        en: 'Drive'
      },
      transit: {
        th: 'ขนส่งสาธารณะ',
        zh: '公交',
        en: 'Transit'
      },
      walking: {
        th: 'เดิน',
        zh: '步行',
        en: 'Walk'
      }
    },
    spots: [
      {
        id: 1,
        name: 'พระบรมมหาราชวัง',
        name_zh: '大皇宫',
        name_en: 'Grand Palace',
        visitTime: 120,
        image: 'https://via.placeholder.com/750x500.png?text=Grand+Palace',
        latitude: 13.7500,
        longitude: 100.4913,
        address: '曼谷市大皇宫',
        suggestTime: '上午9点-11点',
        tips: '建议避开中午时段，太阳较大'
      },
      {
        id: 2,
        name: 'วัดพระแก้ว',
        name_zh: '玉佛寺',
        name_en: 'Wat Phra Kaew',
        visitTime: 90,
        image: 'https://via.placeholder.com/750x500.png?text=Wat+Phra+Kaew',
        latitude: 13.7511,
        longitude: 100.4926,
        address: '曼谷市玉佛寺',
        suggestTime: '下午2点-4点',
        tips: '需要注意着装要求'
      }
    ],
    routeDetails: null,
    showRouteDetails: false,
    userLocation: null
  },

  onLoad() {
    this.getUserLocation();
    wx.eventChannel.on('languageChanged', this.handleLanguageChange);
  },

  onUnload() {
    wx.eventChannel.off('languageChanged', this.handleLanguageChange);
  },

  handleLanguageChange(data) {
    this.setData({
      currentLang: data.lang
    });
  },

  switchLanguage(e) {
    const lang = e.currentTarget.dataset.lang;
    app.switchLanguage(lang);
  },

  getUserLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.setData({
          userLocation: {
            latitude: res.latitude,
            longitude: res.longitude
          }
        });
      }
    });
  },

  // 选择景点
  toggleSpot(e) {
    const spotId = e.currentTarget.dataset.id;
    const selectedSpots = [...this.data.selectedSpots];
    const index = selectedSpots.indexOf(spotId);
    
    if (index === -1) {
      selectedSpots.push(spotId);
    } else {
      selectedSpots.splice(index, 1);
    }
    
    this.setData({ selectedSpots });
  },

  // 切换交通方式
  switchTransport(e) {
    this.setData({
      transportMode: e.currentTarget.dataset.mode
    });
  },

  // 生成路线
  generateRoute() {
    if (this.data.selectedSpots.length < 2) {
      wx.showToast({
        title: '请至少选择2个景点',
        icon: 'none'
      });
      return;
    }

    const selectedSpots = this.data.selectedSpots.map(id => 
      this.data.spots.find(spot => spot.id === id)
    );

    // 计算最优路线
    const route = this.calculateOptimalRoute(selectedSpots);
    
    this.setData({
      routeDetails: route,
      showRouteDetails: true
    });
  },

  // 计算最优路线
  calculateOptimalRoute(spots) {
    const startPoint = this.data.userLocation;
    let route = {
      totalDistance: 0,
      totalTime: 0,
      spots: [],
      segments: []
    };

    // 简单的贪心算法：每次选择最近的点
    let currentPoint = startPoint;
    let remainingSpots = [...spots];

    while (remainingSpots.length > 0) {
      // 找到距离当前点最近的景点
      let nearestSpot = null;
      let minDistance = Infinity;
      let nearestIndex = -1;

      remainingSpots.forEach((spot, index) => {
        const distance = this.calculateDistance(
          currentPoint.latitude,
          currentPoint.longitude,
          spot.latitude,
          spot.longitude
        );

        if (distance < minDistance) {
          minDistance = distance;
          nearestSpot = spot;
          nearestIndex = index;
        }
      });

      // 添加到路线中
      route.spots.push(nearestSpot);
      route.totalDistance += minDistance;
      route.totalTime += nearestSpot.visitTime;

      // 添加路段信息
      route.segments.push({
        from: currentPoint === startPoint ? '当前位置' : route.spots[route.spots.length - 2].name_zh,
        to: nearestSpot.name_zh,
        distance: minDistance.toFixed(1),
        duration: this.estimateTravelTime(minDistance, this.data.transportMode)
      });

      // 更新当前点和剩余景点
      currentPoint = nearestSpot;
      remainingSpots.splice(nearestIndex, 1);
    }

    return route;
  },

  // 计算两点间距离（公里）
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // 地球半径
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    return R * c;
  },

  deg2rad(deg) {
    return deg * (Math.PI/180);
  },

  // 估算行程时间（分钟）
  estimateTravelTime(distance, mode) {
    switch (mode) {
      case 'driving':
        return Math.round(distance * 2); // 假设平均速度30km/h
      case 'transit':
        return Math.round(distance * 3); // 假设平均速度20km/h
      case 'walking':
        return Math.round(distance * 12); // 假设平均速度5km/h
      default:
        return Math.round(distance * 3);
    }
  },

  // 开始导航
  startNavigation(e) {
    const index = e.currentTarget.dataset.index;
    const spot = this.data.routeDetails.spots[index];
    
    wx.openLocation({
      latitude: spot.latitude,
      longitude: spot.longitude,
      name: spot.name_zh,
      address: spot.address,
      scale: 18
    });
  },

  // 关闭路线详情
  closeRouteDetails() {
    this.setData({
      showRouteDetails: false
    });
  }
}); 