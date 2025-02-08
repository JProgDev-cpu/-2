const app = getApp();

Page({
  data: {
    currentLang: app.getCurrentLang(),
    translations: {
      title: {
        th: 'การตรวจสอบความหนาแน่นของฝูงชน',
        zh: '人流量监测',
        en: 'Crowd Monitoring'
      },
      crowdLevel: {
        th: 'ระดับความหนาแน่น',
        zh: '拥挤程度',
        en: 'Crowd Level'
      },
      refresh: {
        th: 'รีเฟรช',
        zh: '刷新',
        en: 'Refresh'
      },
      status: {
        low: {
          th: 'ว่าง',
          zh: '空闲',
          en: 'Not Crowded'
        },
        medium: {
          th: 'ปานกลาง',
          zh: '适中',
          en: 'Moderate'
        },
        high: {
          th: 'แออัด',
          zh: '拥挤',
          en: 'Crowded'
        }
      },
      updateTime: {
        th: 'อัปเดตเมื่อ',
        zh: '更新时间',
        en: 'Last Updated'
      },
      prediction: {
        th: 'การคาดการณ์',
        zh: '预测',
        en: 'Prediction'
      },
      hours: {
        th: 'ชั่วโมง',
        zh: '小时',
        en: 'hours'
      },
      currentCount: {
        th: 'จำนวนคนปัจจุบัน',
        zh: '当前人数',
        en: 'Current Count'
      },
      maxCapacity: {
        th: 'ความจุสูงสุด',
        zh: '最大容量',
        en: 'Max Capacity'
      },
      waitTime: {
        th: 'เวลารอโดยประมาณ',
        zh: '预计等待',
        en: 'Est. Wait'
      },
      bestTime: {
        th: 'เวลาที่ดีที่สุดในการเยี่ยมชม',
        zh: '最佳游览时间',
        en: 'Best Time to Visit'
      },
      languageNames: {
        th: {
          th: 'ภาษาไทย',
          zh: '泰语',
          en: 'Thai'
        },
        zh: {
          th: 'ภาษาจีน',
          zh: '中文',
          en: 'Chinese'
        },
        en: {
          th: 'ภาษาอังกฤษ',
          zh: '英语',
          en: 'English'
        }
      },
      noData: {
        th: 'ไม่มีข้อมูล',
        zh: '暂无数据',
        en: 'No data'
      },
      loadMore: {
        th: 'โหลดเพิ่มเติม',
        zh: '加载更多',
        en: 'Load more'
      },
      pullToRefresh: {
        th: 'ดึงลงเพื่อรีเฟรช',
        zh: '下拉刷新',
        en: 'Pull to refresh'
      },
      releaseToRefresh: {
        th: 'ปล่อยเพื่อรีเฟรช',
        zh: '松开刷新',
        en: 'Release to refresh'
      },
      refreshing: {
        th: 'กำลังรีเฟรช...',
        zh: '刷新中...',
        en: 'Refreshing...'
      }
    },
    languages: ['th', 'zh', 'en'],
    spots: [
      {
        id: 1,
        name: 'พระบรมมหาราชวัง',
        name_zh: '大皇宫',
        name_en: 'Grand Palace',
        crowdLevel: 3,
        currentCount: 2500,
        maxCount: 5000,
        updateTime: '2024-01-20 14:30',
        prediction: [2, 3, 2, 1],  // 未来4小时预测
        waitTime: {
          th: '45 นาที',
          zh: '45分钟',
          en: '45 minutes'
        },
        bestVisitTime: {
          th: '9:00-10:00',
          zh: '9:00-10:00',
          en: '9:00-10:00'
        },
        image: '/assets/images/spots/grand-palace.jpg'
      },
      {
        id: 2,
        name: 'วัดพระแก้ว',
        name_zh: '玉佛寺',
        name_en: 'Wat Phra Kaew',
        crowdLevel: 2,
        currentCount: 1200,
        maxCount: 3000,
        waitTime: {
          th: '20 นาที',
          zh: '20分钟',
          en: '20 minutes'
        },
        bestVisitTime: {
          th: '8:00-9:00',
          zh: '8:00-9:00',
          en: '8:00-9:00'
        },
        image: '/assets/images/wat-phra-kaew.jpg'
      }
    ],
    showLanguageModal: false
  },

  onLoad() {
    this.updateNavTitle();
    wx.eventChannel.on('languageChanged', this.handleLanguageChange);
  },

  onUnload() {
    wx.eventChannel.off('languageChanged', this.handleLanguageChange);
  },

  // 获取景点名称
  getSpotName(spot) {
    const lang = this.data.currentLang;
    return lang === 'en' ? spot.name_en : (lang === 'zh' ? spot.name_zh : spot.name);
  },

  // 获取拥挤度文本
  getCrowdLevelText(level) {
    const status = this.data.translations.status;
    const lang = this.data.currentLang;
    
    switch(level) {
      case 1: return status.low[lang];
      case 2: return status.medium[lang];
      case 3: return status.high[lang];
      default: return '';
    }
  },

  // 格式化时间
  formatTime(timeString) {
    const date = new Date(timeString);
    const lang = this.data.currentLang;
    
    if (lang === 'th') {
      return date.toLocaleString('th-TH', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    } else if (lang === 'zh') {
      return date.toLocaleString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    } else {
      return date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    }
  },

  // 更新导航栏标题
  updateNavTitle() {
    wx.setNavigationBarTitle({
      title: this.data.translations.title[this.data.currentLang]
    });
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.refreshData();
  },

  // 刷新数据
  refreshData() {
    const loadingText = this.data.translations.refreshing[this.data.currentLang];
    wx.showLoading({
      title: loadingText
    });
    
    // 模拟刷新
    setTimeout(() => {
      wx.hideLoading();
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '✓',
        icon: 'success'
      });
    }, 1000);
  },

  handleLanguageChange(data) {
    if (data && data.lang) {
      this.setData({ 
        currentLang: data.lang 
      }, () => {
        // 更新导航栏标题
        this.updateNavTitle();
      });
    }
  },

  // 显示语言选择弹窗
  showLanguageSelector() {
    this.setData({
      showLanguageModal: true
    });
  },

  // 隐藏语言选择弹窗
  hideLanguageSelector() {
    this.setData({
      showLanguageModal: false
    });
  },

  // 切换语言
  switchLanguage(e) {
    const lang = e.currentTarget.dataset.lang;
    app.switchLanguage(lang);
    this.hideLanguageSelector();
    
    // 更新导航栏标题
    this.updateNavTitle();
    
    // 显示切换成功提示
    wx.showToast({
      title: {
        th: 'เปลี่ยนภาษาแล้ว',
        zh: '已切换语言',
        en: 'Language changed'
      }[lang],
      icon: 'success',
      duration: 1500
    });
  },

  // 获取进度条颜色
  getProgressColor(percentage) {
    if (percentage < 50) return '#4CAF50';
    if (percentage < 80) return '#FFC107';
    return '#FF5722';
  },

  // 获取等待时间文本
  getWaitTimeText(spot) {
    return spot.waitTime[this.data.currentLang];
  },

  // 获取最佳游览时间文本
  getBestTimeText(spot) {
    return spot.bestVisitTime[this.data.currentLang];
  }
}); 