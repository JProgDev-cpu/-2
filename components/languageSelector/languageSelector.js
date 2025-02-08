Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },

  data: {
    currentLang: getApp().getCurrentLang(),
    translations: getApp().globalData.translations.common
  },

  methods: {
    close() {
      this.triggerEvent('close');
    },

    switchLanguage(e) {
      const lang = e.currentTarget.dataset.lang;
      getApp().switchLanguage(lang);
      this.setData({ currentLang: lang });
      this.triggerEvent('close');
    }
  }
}); 