const app = getApp();

Page({
  data: {
    currentLang: app.getCurrentLang(),
    languages: ['th', 'zh', 'en']
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
  }
}); 