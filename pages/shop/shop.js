const app = getApp();

Page({
  data: {
    currentLang: app.getCurrentLang(),
    languages: ['th', 'zh', 'en'],
    categories: [
      { id: 1, name: 'ของที่ระลึก', name_zh: '纪念品', name_en: 'Souvenirs' },
      { id: 2, name: 'งานฝีมือ', name_zh: '手工艺品', name_en: 'Handicrafts' },
      { id: 3, name: 'อาหาร', name_zh: '特色食品', name_en: 'Food' }
    ],
    currentCategory: 1,
    products: [
      // 泰国商品
      {
        id: 1,
        categoryId: 1,
        country: 'th',
        name: 'พวงกุญแจช้าง',
        name_zh: '大象钥匙扣',
        name_en: 'Elephant Keychain',
        price: 99,
        image: '/assets/images/products/keychain.jpg',
        description: '手工制作的传统泰式大象钥匙扣'
      },
      {
        id: 2,
        categoryId: 2,
        country: 'th',
        name: 'ผ้าไหมไทย',
        name_zh: '泰丝围巾',
        name_en: 'Thai Silk Scarf',
        price: 599,
        image: '/assets/images/products/silk.jpg',
        description: '传统泰式丝绸围巾，100%天然蚕丝'
      },
      // 中国商品
      {
        id: 3,
        categoryId: 1,
        country: 'cn',
        name: 'แจกันเคลือบ',
        name_zh: '青花瓷花瓶',
        name_en: 'Blue and White Vase',
        price: 899,
        image: '/assets/images/products/vase.jpg',
        description: '传统青花瓷工艺花瓶'
      },
      {
        id: 4,
        categoryId: 2,
        country: 'cn',
        name: 'พู่กันจีน',
        name_zh: '毛笔套装',
        name_en: 'Chinese Brush Set',
        price: 299,
        image: '/assets/images/products/brush.jpg',
        description: '传统毛笔书法套装'
      },
      // 新增泰国商品
      {
        id: 5,
        categoryId: 1,
        country: 'th',
        name: 'ตุ๊กตาช้างผ้าไหม',
        name_zh: '丝绸大象玩偶',
        name_en: 'Silk Elephant Doll',
        price: 299,
        image: '/assets/images/products/elephant-doll.jpg',
        description: '精美手工制作的丝绸大象玩偶'
      },
      {
        id: 6,
        categoryId: 3,
        country: 'th',
        name: 'ข้าวหอมมะลิ',
        name_zh: '泰国茉莉香米',
        name_en: 'Thai Jasmine Rice',
        price: 199,
        image: '/assets/images/products/rice.jpg',
        description: '正宗泰国茉莉香米，香味浓郁'
      },
      // 新增中国商品
      {
        id: 7,
        categoryId: 1,
        country: 'cn',
        name: 'พัดจีนโบราณ',
        name_zh: '中国古典扇子',
        name_en: 'Chinese Classical Fan',
        price: 159,
        image: '/assets/images/products/fan.jpg',
        description: '优雅的中国传统折扇，竹制框架'
      },
      {
        id: 8,
        categoryId: 3,
        country: 'cn',
        name: 'ชาอู่หลง',
        name_zh: '铁观音乌龙茶',
        name_en: 'Oolong Tea',
        price: 399,
        image: '/assets/images/products/tea.jpg',
        description: '正宗安溪铁观音，浓香型乌龙茶'
      },
      {
        id: 9,
        categoryId: 2,
        country: 'cn',
        name: 'ภาพวาดจีน',
        name_zh: '中国水墨画',
        name_en: 'Chinese Ink Painting',
        price: 799,
        image: '/assets/images/products/painting.jpg',
        description: '传统中国水墨画，山水画作品'
      }
    ]
  },

  onLoad() {
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

  switchCategory(e) {
    const categoryId = e.currentTarget.dataset.id;
    this.setData({ currentCategory: categoryId });
  },

  goToDetail(e) {
    const productId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/shop/detail/detail?id=${productId}`
    });
  },

  addToCart(e) {
    const productId = e.currentTarget.dataset.id;
    wx.showToast({
      title: '已加入购物车',
      icon: 'success'
    });
  }
});