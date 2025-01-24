Page({
  data: {
    currentLang: 'th', // 默认泰语
    languages: ['th', 'zh', 'en'],
    spots: [
      {
        id: 1,
        name: 'พระบรมมหาราชวัง', // 大皇宫
        name_zh: '大皇宫',
        name_en: 'Grand Palace',
        crowdLevel: 3,
        image: 'https://via.placeholder.com/750x500.png?text=Grand+Palace',
        description: '泰国最著名的旅游景点之一，建于1782年，是泰国大皇宫的主体建筑群。',
        location: '曼谷市中心'
      },
      {
        id: 2,
        name: 'วัดพระศรีรัตนศาสดาราม',
        name_zh: '玉佛寺',
        name_en: 'Wat Phra Kaew',
        crowdLevel: 2,
        image: '../../assets/images/spots/wat-phra-kaew.jpg',
        description: '泰国最神圣的佛寺，供奉着举世闻名的玉佛像。',
        location: '大皇宫内'
      },
      {
        id: 3,
        name: 'วัดอรุณ',
        name_zh: '郑王庙',
        name_en: 'Wat Arun',
        crowdLevel: 1,
        image: '../../assets/images/spots/wat-arun.jpg',
        description: '位于昭披耶河西岸的标志性建筑，以精美的瓷砖装饰闻名。',
        location: '曼谷昭披耶河畔'
      },
      {
        id: 4,
        name: 'ตลาดน้ำดำเนินสะดวก',
        name_zh: '丹嫩沙多水上市场',
        name_en: 'Damnoen Saduak Floating Market',
        crowdLevel: 2,
        image: '../../assets/images/spots/floating-market.jpg',
        description: '泰国最有名的水上市场，体验传统水上生活文化。',
        location: '叻丕府'
      }
    ],
    banners: [
      {
        id: 1,
        image: '../../assets/images/banners/banner1.jpg',
        title: '泰国文化节'
      },
      {
        id: 2,
        image: '../../assets/images/banners/banner2.jpg',
        title: '水灯节特辑'
      }
    ]
  },

  onLoad() {
    // 初始化加载
  },

  // 切换语言
  switchLanguage(e) {
    const lang = e.currentTarget.dataset.lang;
    this.setData({ currentLang: lang });
    // TODO: 全局语言切换逻辑
  },

  // 跳转到AR查看
  goToAR() {
    wx.navigateTo({
      url: '/pages/arView/arView'
    });
  },

  goToSpotDetail(e) {
    const spotId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/spotDetail/spotDetail?id=${spotId}`
    });
  }
}); 