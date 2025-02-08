// pages/arView/arView.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentLang: app.getCurrentLang(),
    translations: {
      title: {
        th: 'สถานที่ท่องเที่ยว',
        zh: '景点列表',
        en: 'Tourist Spots'
      },
      distance: {
        th: 'ระยะทาง',
        zh: '距离',
        en: 'Distance'
      },
      crowdLevel: {
        th: 'ความหนาแน่น',
        zh: '人流量',
        en: 'Crowd Level'
      },
      navigate: {
        th: 'นำทาง',
        zh: '导航',
        en: 'Navigate'
      },
      crowdStatus: {
        low: {
          th: 'ว่าง',
          zh: '空闲',
          en: 'Low'
        },
        medium: {
          th: 'ปานกลาง',
          zh: '适中',
          en: 'Medium'
        },
        high: {
          th: 'แออัด',
          zh: '拥挤',
          en: 'High'
        }
      },
      close: {
        th: 'ปิด',
        zh: '关闭',
        en: 'Close'
      },
      openingHours: {
        th: 'เวลาทำการ',
        zh: '营业时间',
        en: 'Opening Hours'
      },
      price: {
        th: 'ค่าเข้าชม',
        zh: '门票',
        en: 'Admission'
      }
    },
    spots: [
      {
        id: 1,
        name: 'พระบรมมหาราชวัง',
        name_zh: '大皇宫',
        name_en: 'Grand Palace',
        description: {
          th: 'พระราชวังที่สวยงามที่สุดในประเทศไทย',
          zh: '泰国最著名的旅游景点之一，建于1782年，是泰国大皇宫的主体建筑群。',
          en: 'The most famous landmark in Thailand, built in 1782.'
        },
        openingHours: {
          th: '08:30 - 15:30 น.',
          zh: '08:30 - 15:30',
          en: '8:30 AM - 3:30 PM'
        },
        price: {
          th: '500 บาท',
          zh: '500泰铢',
          en: '500 THB'
        },
        crowdLevel: 3,
        latitude: 13.7500,
        longitude: 100.4913,
        image: '/assets/images/spots/grand-palace.jpg'
      }
      // ... 其他景点数据
    ],
    currentSpot: null,
    showSpotInfo: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 监听语言变化
    wx.eventChannel.on('languageChanged', this.handleLanguageChange);
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
    // 清理工作
    if (wx.eventChannel) {
      wx.eventChannel.off('languageChanged', this.handleLanguageChange);
    }
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

  // 获取景点名称
  getSpotName(spot) {
    const lang = this.data.currentLang;
    return lang === 'en' ? spot.name_en : (lang === 'zh' ? spot.name_zh : spot.name);
  },

  // 获取拥挤度文本
  getCrowdLevelText(level) {
    const crowdStatus = this.data.translations.crowdStatus;
    const lang = this.data.currentLang;
    
    switch(level) {
      case 1:
        return crowdStatus.low[lang];
      case 2:
        return crowdStatus.medium[lang];
      case 3:
        return crowdStatus.high[lang];
      default:
        return '';
    }
  },

  // 显示景点详情
  showSpotDetail(e) {
    const spotId = e.currentTarget.dataset.id;
    const spot = this.data.spots.find(s => s.id === Number(spotId));
    if (spot) {
      this.setData({
        currentSpot: spot,
        showSpotInfo: true
      });
    }
  },

  // 隐藏景点详情
  hideSpotDetail() {
    this.setData({
      showSpotInfo: false
    });
  },

  // 导航到景点
  navigateToSpot() {
    if (!this.data.currentSpot) return;
    
    wx.openLocation({
      latitude: this.data.currentSpot.latitude,
      longitude: this.data.currentSpot.longitude,
      name: this.getSpotName(this.data.currentSpot),
      scale: 18
    });
  },

  handleLanguageChange(data) {
    if (data && data.lang) {
      this.setData({ 
        currentLang: data.lang 
      }, () => {
        // 如果有打开的详情页，更新标题
        if (this.data.showSpotInfo && this.data.currentSpot) {
          wx.setNavigationBarTitle({
            title: this.getSpotName(this.data.currentSpot)
          });
        }
      });
    }
  }
})