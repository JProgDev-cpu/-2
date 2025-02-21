const app = getApp();

Page({
  data: {
    // ... 其他数据
  },

  onLoad(options) {
    // ... 其他代码
  },

  getSpotInfo: function(id) {
    return {
      id: id,
      name: 'พระบรมมหาราชวัง',
      name_zh: '大皇宫',
      name_en: 'Grand Palace',
      image: '/packages/monitor/images/spots/grand-palace-750x500.jpg',
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
  }
}); 