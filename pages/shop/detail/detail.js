Page({
  data: {
    currentLang: 'th',
    product: null
  },

  onLoad(options) {
    // 模拟获取商品详情
    this.setData({
      product: {
        id: parseInt(options.id),
        name: 'พวงกุญแจช้าง',
        name_zh: '大象钥匙扣',
        name_en: 'Elephant Keychain',
        price: 99,
        images: [
          '/assets/images/products/keychain-1.jpg',
          '/assets/images/products/keychain-2.jpg'
        ],
        description: '手工制作的传统泰式大象钥匙扣，采用优质材料制作，是馈赠亲友的理想选择。',
        specs: ['材质：合金', '尺寸：5x3cm', '重量：30g']
      }
    });
  },

  previewImage(e) {
    const current = e.currentTarget.dataset.src;
    wx.previewImage({
      current,
      urls: this.data.product.images
    });
  },

  addToCart() {
    wx.showToast({
      title: '已加入购物车',
      icon: 'success'
    });
  },

  buyNow() {
    wx.navigateTo({
      url: '/pages/shop/checkout/checkout'
    });
  }
}); 