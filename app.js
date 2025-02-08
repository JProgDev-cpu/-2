App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code)
      }
    })

    // 从本地存储获取语言设置，如果没有则默认使用中文
    const lang = wx.getStorageSync('language') || 'zh';
    this.globalData.currentLang = lang;
  },
  globalData: {
    userInfo: null,
    currentLang: 'zh', // 默认语言
    translations: {
      // 通用翻译
      common: {
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
        close: {
          th: 'ปิด',
          zh: '关闭',
          en: 'Close'
        },
        confirm: {
          th: 'ยืนยัน',
          zh: '确认',
          en: 'Confirm'
        },
        cancel: {
          th: 'ยกเลิก',
          zh: '取消',
          en: 'Cancel'
        },
        loading: {
          th: 'กำลังโหลด...',
          zh: '加载中...',
          en: 'Loading...'
        }
      },
      // 导航栏标题
      navTitle: {
        home: {
          th: 'หน้าแรก',
          zh: '首页',
          en: 'Home'
        },
        crowdInfo: {
          th: 'ความหนาแน่นของฝูงชน',
          zh: '人流量监测',
          en: 'Crowd Monitor'
        },
        routePlanner: {
          th: 'วางแผนเส้นทาง',
          zh: '路线规划',
          en: 'Route Planner'
        },
        shop: {
          th: 'ร้านค้า',
          zh: '商店',
          en: 'Shop'
        }
      },
      nav: {
        home: {
          th: 'หน้าแรก',
          zh: '首页',
          en: 'Home'
        },
        crowdInfo: {
          th: 'ความหนาแน่น',
          zh: '人流量',
          en: 'Crowd'
        },
        routePlanner: {
          th: 'วางแผนเส้นทาง',
          zh: '规划路线',
          en: 'Route'
        },
        shop: {
          th: 'ร้านค้า',
          zh: '文创店',
          en: 'Shop'
        },
        spots: {
          th: 'สถานที่ท่องเที่ยว',
          zh: '景点',
          en: 'Spots'
        },
        me: {
          th: 'ของฉัน',
          zh: '我的',
          en: 'Me'
        }
      },
      crowdLevel: {
        low: {
          th: 'ว่าง',
          zh: '空闲',
          en: 'Low'
        },
        medium: {
          th: 'ปานกลาง',
          zh: '适中',
          en: 'Medium'
        },
        high: {
          th: 'แออัด',
          zh: '拥挤',
          en: 'High'
        }
      }
    }
  },

  // 切换语言的全局方法
  switchLanguage(lang) {
    this.globalData.currentLang = lang;
    // 保存到本地存储
    wx.setStorageSync('language', lang);
    
    // 通知所有页面语言已更改
    const pages = getCurrentPages();
    pages.forEach(page => {
      if (page && page.handleLanguageChange) {
        page.handleLanguageChange({ lang });
      }
    });

    // 更新当前页面的导航栏标题
    const currentPage = pages[pages.length - 1];
    if (currentPage) {
      const route = currentPage.route.split('/').pop();
      const title = this.globalData.translations.navTitle[route]?.[lang];
      if (title) {
        wx.setNavigationBarTitle({ title });
      }
    }
  },

  // 获取当前语言的全局方法
  getCurrentLang() {
    return this.globalData.currentLang;
  },

  // 获取翻译文本的全局方法
  t(key, section = 'common') {
    const lang = this.globalData.currentLang;
    try {
      return this.globalData.translations[section][key][lang];
    } catch (e) {
      console.error(`Translation not found: ${section}.${key}`);
      return key;
    }
  },

  getTranslation(key, section = 'common') {
    return this.globalData.translations[section][key][this.globalData.currentLang];
  }
}) 