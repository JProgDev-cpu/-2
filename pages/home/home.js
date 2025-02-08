const app = getApp();

Page({
  data: {
    currentLang: app.getCurrentLang(),
    languages: ['th', 'zh', 'en'],
    translations: {
      title: {
        th: 'แนะนำสถานที่ท่องเที่ยว',
        zh: '推荐景点',
        en: 'Recommended Spots'
      },
      viewInAR: {
        th: 'ดูด้วย AR',
        zh: 'AR实景查看',
        en: 'View in AR'
      },
      crowdLevel: {
        th: 'ความหนาแน่น',
        zh: '人流量',
        en: 'Crowd Level'
      },
      location: {
        th: 'สถานที่',
        zh: '位置',
        en: 'Location'
      },
      pageTitle: {
        th: 'หน้าแรก',
        zh: '首页',
        en: 'Home'
      }
    },
    spots: [
      // 泰国景点
      {
        id: 1,
        country: 'th',
        name: 'พระบรมมหาราชวัง', // 大皇宫
        name_zh: '大皇宫',
        name_en: 'Grand Palace',
        crowdLevel: 3,
        image: '/assets/images/grand-palace.jpg',
        description: 'พระบรมมหาราชวังเป็นพระราชวังที่สวยงามที่สุดในประเทศไทย',
        description_zh: '泰国最著名的旅游景点之一，建于1782年，是泰国大皇宫的主体建筑群。',
        description_en: 'The most famous landmark in Thailand, built in 1782.',
        location: 'กรุงเทพมหานคร',
        location_zh: '曼谷市中心',
        location_en: 'Bangkok City Center'
      },
      {
        id: 2,
        country: 'th',
        name: 'วัดพระศรีรัตนศาสดาราม', // 玉佛寺
        name_zh: '玉佛寺',
        name_en: 'Wat Phra Kaew',
        crowdLevel: 2,
        image: '../../assets/images/spots/wat-phra-kaew.jpg',
        description: 'วัดที่ประดิษฐานพระแก้วมรกต พระพุทธรูปคู่บ้านคู่เมือง',
        description_zh: '泰国最神圣的佛寺，供奉着国宝玉佛像。寺内装饰华丽，壁画精美，是泰国佛教艺术的瑰宝。',
        description_en: 'The most sacred Buddhist temple in Thailand, home to the Emerald Buddha.',
        location: 'ในพระบรมมหาราชวัง',
        location_zh: '大皇宫内',
        location_en: 'Within Grand Palace Complex'
      },
      // 中国景点
      {
        id: 3,
        country: 'cn',
        name: 'กำแพงเมืองจีน', // 长城
        name_zh: '长城',
        name_en: 'Great Wall',
        crowdLevel: 3,
        image: '../../assets/images/spots/great-wall.jpg',
        description: 'สิ่งมหัศจรรย์ของโลก สร้างในสมัยราชวงศ์ฉิน',
        description_zh: '世界七大奇迹之一，始建于秦朝，绵延万里，是中国古代文明的象征。',
        description_en: 'One of the Seven Wonders, built during Qin Dynasty.',
        location: 'ปักกิ่ง ประเทศจีน',
        location_zh: '北京',
        location_en: 'Beijing, China'
      },
      {
        id: 4,
        country: 'cn',
        name: 'พระราชวังต้องห้าม', // 故宫
        name_zh: '故宫',
        name_en: 'Forbidden City',
        crowdLevel: 3,
        image: '../../assets/images/spots/forbidden-city.jpg',
        description: 'พระราชวังโบราณที่ใหญ่ที่สุดในโลก',
        description_zh: '世界上最大的古代宫殿建筑群，明清两代24位皇帝的皇宫，象征着中国传统建筑的最高成就。',
        description_en: 'The largest ancient palace complex in the world.',
        location: 'ปักกิ่ง ประเทศจีน',
        location_zh: '北京市中心',
        location_en: 'Beijing City Center'
      }
    ],
    showLanguageModal: false,  // 添加控制语言选择弹窗的显示状态
    languageNames: {
      th: {
        th: 'ภาษาไทย',
        zh: '泰语',
        en: 'Thai'
      },
      zh: {
        th: 'ภาษาจีน',
        zh: '中文',
        en: 'Chinese'
      },
      en: {
        th: 'ภาษาอังกฤษ',
        zh: '英语',
        en: 'English'
      }
    },
    // 添加语言选择的提示文本
    languagePrompt: {
      th: 'เลือกภาษาที่คุณต้องการ',
      zh: '请选择您需要的语言',
      en: 'Choose your preferred language'
    }
  },

  onLoad() {
    // 监听语言变更事件
    wx.eventChannel.on('languageChanged', this.handleLanguageChange);
  },

  onUnload() {
    // 取消监听
    wx.eventChannel.off('languageChanged', this.handleLanguageChange);
  },

  handleLanguageChange(data) {
    if (data && data.lang) {
      this.setData({ currentLang: data.lang });
    }
  },

  updateNavTitle() {
    const titles = {
      th: 'ท่องเที่ยวอัจฉริยะ',
      zh: '智旅云途',
      en: 'Smart Travel'
    };
    wx.setNavigationBarTitle({
      title: titles[this.data.currentLang]
    });
  },

  // 切换语言
  switchLanguage(e) {
    const lang = e.currentTarget.dataset.lang;
    app.switchLanguage(lang);
    this.hideLanguageSelector();
    
    // 显示切换成功提示
    wx.showToast({
      title: {
        th: 'เปลี่ยนภาษาแล้ว',
        zh: '已切换语言',
        en: 'Language changed'
      }[lang],
      icon: 'success',
      duration: 1500
    });

    // 更新导航栏标题
    this.updateNavTitle();

    // 更新 tabBar 文本
    this.updateTabBarText();
  },

  // 更新 tabBar 文本
  updateTabBarText() {
    const tabBarTexts = {
      th: ['หน้าแรก', 'ความหนาแน่น', 'วางแผนเส้นทาง', 'ร้านค้า'],
      zh: ['首页', '人流量', '规划路线', '文创店'],
      en: ['Home', 'Crowd', 'Route', 'Shop']
    };

    const currentLang = this.data.currentLang;
    const texts = tabBarTexts[currentLang];

    wx.setTabBarItem({
      index: 0,
      text: texts[0]
    });
    wx.setTabBarItem({
      index: 1,
      text: texts[1]
    });
    wx.setTabBarItem({
      index: 2,
      text: texts[2]
    });
    wx.setTabBarItem({
      index: 3,
      text: texts[3]
    });
  },

  // 显示语言选择弹窗
  showLanguageSelector() {
    this.setData({
      showLanguageModal: true
    });
  },

  // 隐藏语言选择弹窗
  hideLanguageSelector() {
    this.setData({
      showLanguageModal: false
    });
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
  },

  // 在页面显示时更新语言
  onShow() {
    const currentLang = app.getCurrentLang();
    if (currentLang !== this.data.currentLang) {
      this.setData({ currentLang });
      this.updateNavTitle();
      this.updateTabBarText();
    }
  }
});