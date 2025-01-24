Page({
  data: {
    currentLang: 'th',
    categories: [
      { id: 1, name: 'ของที่ระลึก', name_zh: '纪念品', name_en: 'Souvenirs' },
      { id: 2, name: 'งานฝีมือ', name_zh: '手工艺品', name_en: 'Handicrafts' },
      { id: 3, name: 'อาหาร', name_zh: '特色食品', name_en: 'Food' }
    ],
    currentCategory: 1,
    products: [
      {
        id: 1,
        categoryId: 1,
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
        name: 'ผ้าไหมไทย',
        name_zh: '泰丝围巾',
        name_en: 'Thai Silk Scarf',
        price: 599,
        image: '/assets/images/products/silk.jpg',
        description: '传统泰式丝绸围巾，100%天然蚕丝'
      }
    ]
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