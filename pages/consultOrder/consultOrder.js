let app = getApp().globalData;
let filter = require('../../filter/filter.js');
let orderUrl = '/order/consultation/new/page';

Page({
  data: {
    // 下拉菜单
    first: '咨询类型',
    second: '订单状态',
    thirds: '支付状态',
    //搜索项
    consulationType: null,
    payStatuss: null,
    tradeStatus: null,
    //数据字典
    orderStatus: app.conOrderStatus,
    payStatus: app.payStatus,
    consultTypes: app.conTypes,
   
    listShow: true,
    moreShow: false,

    uhide: -1,
    models: []
  },
  page: 0,
  onLoad: function (options) {

  },
  //监听页面显示
  onShow: function (options) {
    let that = this;
    that.submit();
  },
  //点击切换隐藏和显示
  toggleBtn: function (e) {
    wx.navigateTo({
      url: '../orderDetail/orderDetail',
    })
  },
  isShow: true,
  currentTab: 0,

  // 下拉切换
  hideNav: function () {
    this.setData({
      displays: "none"
    })
  },
  // 区域
  tabNav: function (e) {
    this.setData({
      displays: "block"
    })
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      var showMode = e.target.dataset.current == 0;
      this.setData({
        currentTab: e.target.dataset.current,
        isShow: showMode
      })
    }
  },
  //选择咨询类型
  clickConType: function (e) {
    const that = this;
    that.setData({
      consulationType: e.target.dataset.name,
      first: e.target.dataset.name,
      displays: "none",
    });
    that.submit();
  },
  //选择订单状态
  clickOrderStatus: function (e) {
    const that = this;
    that.setData({
      tradeStatus: e.target.dataset.name,
      second: e.target.dataset.name,
      displays: "none",
    });
    that.submit();
  },
  //选择支付状态
  clickPaystatus: function (e) {
    const that = this;
    that.setData({
      payStatuss: e.target.dataset.name,
      thirds: e.target.dataset.name,
      displays: "none",
    });
    that.submit();
  }, 
  onLoad: function (options) {},
  //模糊搜索
  search: function (e) {
    wx.navigateTo({
      url: '../fuzzySearch/fuzzySearch?title=咨询订单',
    })
  },
  //提交筛选条件
  submit: function () {
    const that = this;
    that.page = 0;
    that.setData({
      displays: "none"
    })
    const { consulationType, payStatuss, tradeStatus } = that.data;
    const params = { consulationType, payStatuss, tradeStatus };
    wx.request({
      url: `${app.url}${orderUrl}?size=20&page=0`,
      method: 'POST',
      header: Object.assign(app.token, {
        'content-type': 'application/json'
      }),
      data: params,
      success: function (res) {
        if (res.data.success) {
          const data = res.data.data.models;
          if (data.length < 1) {
            that.setData({
              listShow: false,
              moreShow: false,
              models: []
            })
          } else {
            const arr = [];
            data.forEach(item => {
              item.createTime = filter.dateFormat(item.createTime);
              arr.push(item);
            });
            that.setData({
              models: arr,
              listShow: true,
              moreShow: true,
            });
          }
        } else {
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },
  //上拉加载更多
  onReachBottom: function () {
    if (!this.data.moreShow) {
      var that = this;
      const { consulationType, payStatuss, tradeStatus } = that.data;
      const params = { consulationType, payStatuss, tradeStatus };
      wx.showLoading({
        title: '玩命加载中',
      })
      that.page += 1;
      wx.request({
        url: `${app.url}${orderUrl}?size=20&page=${that.page}`,
        method: 'POST',
        header: Object.assign(app.token, {
          'content-type': 'application/json'
        }),
        data: params,
        success: function (res) {
          if (res.data.success) {
            const data = res.data.data.models;
            if (data.length < 1) {
              that.setData({
                moreShow: true
              });
            } else {
              const arr = [];
              data.forEach(item => {
                item.createTime = filter.dateFormat(item.createTime);
                arr.push(item);
              });
              that.setData({
                moreShow: false,
                models: that.data.models.concat(arr)
              });
            }
          } else {
            wx.showToast({
              title: res.data.message,
              icon: 'none',
              duration: 2000
            })
          }
          wx.hideLoading();
        }
      })
    }
  }
})

