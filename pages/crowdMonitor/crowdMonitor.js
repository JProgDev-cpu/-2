const app = getApp();

Page({
  data: {
    currentLang: app.getCurrentLang(),
    languages: ['th', 'zh', 'en'],
    spot: null,
    crowdHistory: [
      { time: '08:00', level: 1 },
      { time: '10:00', level: 2 },
      { time: '12:00', level: 3 },
      { time: '14:00', level: 2 },
      { time: '16:00', level: 3 },
      { time: '18:00', level: 2 },
    ],
    crowdForecast: [
      { time: '19:00', level: 2 },
      { time: '20:00', level: 1 },
      { time: '21:00', level: 1 },
    ],
    translations: {
      title: {
        th: 'การตรวจสอบความหนาแน่น',
        zh: '人流量监测',
        en: 'Crowd Monitoring'
      },
      currentLevel: {
        th: 'ระดับความหนาแน่นปัจจุบัน',
        zh: '当前人流量',
        en: 'Current Crowd Level'
      },
      history: {
        th: 'ประวัติความหนาแน่น',
        zh: '历史人流量',
        en: 'Crowd History'
      },
      forecast: {
        th: 'การคาดการณ์',
        zh: '预测人流量',
        en: 'Crowd Forecast'
      },
      levels: {
        1: {
          th: 'ว่าง',
          zh: '空闲',
          en: 'Low'
        },
        2: {
          th: 'ปานกลาง',
          zh: '适中',
          en: 'Medium'
        },
        3: {
          th: 'แออัด',
          zh: '拥挤',
          en: 'High'
        }
      },
      tips: {
        th: 'คำแนะนำ',
        zh: '游览建议',
        en: 'Visit Tips'
      }
    }
  },

  onLoad(options) {
    wx.eventChannel.on('languageChanged', this.handleLanguageChange);
    const { id } = options;
    // 获取景点信息
    const spot = this.getSpotInfo(id);
    this.setData({ spot });
    
    // 开始实时更新
    this.startRealTimeUpdate();
    this.updateForecast();
    // 每小时更新一次预测
    setInterval(() => {
      this.updateForecast();
    }, 3600000);
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

  getSpotInfo(id) {
    // 这里应该从服务器获取景点信息
    // 示例数据
    return {
      id: id,
      name: 'พระบรมมหาราชวัง',
      name_zh: '大皇宫',
      name_en: 'Grand Palace',
      image: '/assets/images/spots/grand-palace.jpg',
      currentCrowd: 2,
      bestVisitTime: {
        th: 'ช่วงเช้า 8:00-10:00',
        zh: '早晨 8:00-10:00',
        en: 'Morning 8:00-10:00'
      },
      tips: {
        th: ['ควรมาถึงก่อนเวลาเปิด', 'หลีกเลี่ยงช่วงกลางวัน', 'ตรวจสอบวันหยุดนักขัตฤกษ์'],
        zh: ['建议开放前到达', '避开正午时段', '注意节假日人流量'],
        en: ['Arrive before opening', 'Avoid noon time', 'Check holiday schedule']
      }
    };
  },

  startRealTimeUpdate() {
    // 模拟实时更新
    setInterval(() => {
      const currentCrowd = Math.floor(Math.random() * 3) + 1;
      this.setData({
        'spot.currentCrowd': currentCrowd
      });
    }, 30000); // 每30秒更新一次
  },

  // 获取人流量等级对应的样式类
  getCrowdLevelClass(level) {
    return `level-${level}`;
  },

  // 获取建议访问时间
  getBestVisitTime() {
    const hour = new Date().getHours();
    if (hour < 10) {
      return {
        th: 'ขณะนี้เป็นช่วงเวลาที่เหมาะสม',
        zh: '现在是最佳游览时间',
        en: 'Now is the best time to visit'
      };
    }
    return this.data.spot.bestVisitTime;
  },

  // 更新预测数据
  updateForecast() {
    const now = new Date();
    const forecasts = [];
    
    for (let i = 1; i <= 3; i++) {
      const futureTime = new Date(now.getTime() + i * 60 * 60 * 1000);
      const hour = futureTime.getHours();
      
      // 根据时间段预测人流量
      let level = 2;
      if (hour < 10 || hour > 18) {
        level = 1;
      } else if (hour >= 12 && hour <= 14) {
        level = 3;
      }
      
      forecasts.push({
        time: `${hour}:00`,
        level: level
      });
    }
    
    this.setData({ crowdForecast: forecasts });
  }
}); 