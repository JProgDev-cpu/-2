Page({
  data: {
    currentLang: 'th',
    spots: [
      {
        id: 1,
        name: 'พระบรมมหาราชวัง',
        name_zh: '大皇宫',
        name_en: 'Grand Palace',
        crowdLevel: 3,
        currentCount: 2500,
        maxCount: 5000,
        waitTime: '45分钟',
        bestVisitTime: '9:00-10:00',
        image: '/assets/images/grand-palace.jpg'
      },
      {
        id: 2,
        name: 'วัดพระแก้ว',
        name_zh: '玉佛寺',
        name_en: 'Wat Phra Kaew',
        crowdLevel: 2,
        currentCount: 1200,
        maxCount: 3000,
        waitTime: '20分钟',
        bestVisitTime: '8:00-9:00',
        image: '/assets/images/wat-phra-kaew.jpg'
      }
    ]
  }
}); 