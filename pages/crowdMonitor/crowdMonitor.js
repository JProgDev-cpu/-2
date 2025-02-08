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
  }
}); 