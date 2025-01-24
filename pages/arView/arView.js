// pages/arView/arView.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentLang: 'th',
    searchKeyword: '',
    showSearchResult: false,
    currentSpotIndex: 0,
    allSpots: [
      {
        id: 1,
        name: 'พระบรมมหาราชวัง',
        name_zh: '大皇宫',
        name_en: 'Grand Palace',
        description: '泰国最著名的旅游景点之一，建于1782年，是泰国大皇宫的主体建筑群。',
        crowdLevel: 3,
        images: [
          '../../assets/images/spots/grand-palace-1.jpg',
          '../../assets/images/spots/grand-palace-2.jpg',
          '../../assets/images/spots/grand-palace-3.jpg'
        ],
        panorama: '../../assets/panoramas/grand-palace.jpg',
        videoUrl: 'https://example.com/videos/grand-palace-tour.mp4',
        openTime: '08:30-15:30',
        price: '500泰铢',
        location: '曼谷市中心',
        latitude: 13.7500,
        longitude: 100.4913
      },
      {
        id: 2,
        name: 'วัดพระแก้ว',
        name_zh: '玉佛寺',
        name_en: 'Wat Phra Kaew',
        description: '泰国最神圣的佛寺，供奉着举世闻名的玉佛像。',
        crowdLevel: 2,
        images: [
          '../../assets/images/spots/wat-phra-kaew-1.jpg',
          '../../assets/images/spots/wat-phra-kaew-2.jpg'
        ],
        panorama: '../../assets/panoramas/wat-phra-kaew.jpg',
        videoUrl: 'https://example.com/videos/wat-phra-kaew-tour.mp4',
        openTime: '08:00-16:30',
        price: '500泰铢',
        location: '大皇宫内'
      },
      {
        id: 3,
        name: 'วัดอรุณ',
        name_zh: '郑王庙',
        name_en: 'Wat Arun',
        distance: '1.2km',
        direction: '西',
        crowdLevel: 1,
        image: '../../assets/images/spots/wat-arun.jpg'
      }
    ],
    spots: [], // 当前显示的景点
    showSpotDetail: false,
    currentSpot: null,
    userLocation: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      spots: this.data.allSpots
    });
    if (options.id) {
      this.showSpotDetail(options.id);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    wx.stopCompass();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  startCompass() {
    wx.startCompass({
      success: () => {
        wx.onCompassChange((res) => {
          this.setData({
            compass: res.direction.toFixed(2)
          });
        });
      }
    });
  },

  getLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
      },
      fail: () => {
        wx.showToast({
          title: '请开启位置权限',
          icon: 'none'
        });
      }
    });
  },

  goToSpotDetail(e) {
    const spotId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/spotDetail/spotDetail?id=${spotId}`
    });
  },

  // 搜索相关方法
  onSearchInput(e) {
    const keyword = e.detail.value.toLowerCase();
    this.setData({
      searchKeyword: keyword,
      showSearchResult: keyword.length > 0
    });
    this.filterSpots(keyword);
  },

  filterSpots(keyword) {
    if (!keyword) {
      this.setData({
        spots: this.data.allSpots
      });
      return;
    }

    const filteredSpots = this.data.allSpots.filter(spot => {
      return spot.name_zh.includes(keyword) || 
             spot.name_en.toLowerCase().includes(keyword) ||
             spot.name.includes(keyword);
    });

    this.setData({
      spots: filteredSpots
    });
  },

  clearSearch() {
    this.setData({
      searchKeyword: '',
      showSearchResult: false,
      spots: this.data.allSpots
    });
  },

  focusSpot(e) {
    const spotId = e.currentTarget.dataset.id;
    const spot = this.data.allSpots.find(s => s.id === spotId);
    if (spot) {
      // TODO: 实现镜头对准特定景点的逻辑
      wx.showToast({
        title: `已定位到${spot.name_zh}`,
        icon: 'success'
      });
      this.clearSearch();
    }
  },

  showSpotDetail(spotId) {
    const spot = this.data.allSpots.find(s => s.id === Number(spotId));
    if (spot) {
      this.setData({
        currentSpot: spot,
        showSpotDetail: true
      });
    }
  },

  hideSpotDetail() {
    this.setData({
      showSpotDetail: false,
      currentSpot: null
    });
  },

  // 切换图片
  changeImage(e) {
    const direction = e.currentTarget.dataset.direction;
    const spot = this.data.currentSpot;
    let index = spot.images.indexOf(spot.currentImage);
    
    if (direction === 'next') {
      index = (index + 1) % spot.images.length;
    } else {
      index = index - 1 < 0 ? spot.images.length - 1 : index - 1;
    }
    
    this.setData({
      'currentSpot.currentImage': spot.images[index]
    });
  },

  // 播放视频导览
  playVideo() {
    if (this.data.currentSpot && this.data.currentSpot.videoUrl) {
      // 使用小程序内置视频播放器
      wx.showToast({
        title: '正在加载视频...',
        icon: 'loading'
      });
      
      // 这里可以直接在当前页面播放视频
      this.setData({
        showVideo: true,
        currentVideo: this.data.currentSpot.videoUrl
      });
    }
  },

  // 添加导航功能
  openNavigation(e) {
    const spot = this.data.currentSpot;
    if (!spot || !spot.latitude || !spot.longitude) {
      wx.showToast({
        title: '暂无位置信息',
        icon: 'none'
      });
      return;
    }

    // 获取用户位置
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.setData({
          userLocation: {
            latitude: res.latitude,
            longitude: res.longitude
          }
        });

        // 打开导航
        wx.openLocation({
          latitude: spot.latitude,
          longitude: spot.longitude,
          name: spot.name_zh,
          address: spot.location,
          scale: 18
        });
      },
      fail: () => {
        wx.showModal({
          title: '提示',
          content: '需要获取您的位置才能导航，是否开启定位权限？',
          success: (res) => {
            if (res.confirm) {
              wx.openSetting({
                success: (settingRes) => {
                  if (settingRes.authSetting['scope.userLocation']) {
                    this.openNavigation();
                  }
                }
              });
            }
          }
        });
      }
    });
  },

  // 计算距离
  calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // 地球半径，单位km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const d = R * c; // 距离，单位km
    return d;
  },

  deg2rad(deg) {
    return deg * (Math.PI/180);
  },

  // 更新景点数据，添加经纬度信息
  updateSpotsData() {
    const updatedSpots = this.data.allSpots.map(spot => ({
      ...spot,
      latitude: spot.latitude || null,  // 添加景点的实际经纬度
      longitude: spot.longitude || null
    }));

    this.setData({
      allSpots: updatedSpots
    });
  }
})