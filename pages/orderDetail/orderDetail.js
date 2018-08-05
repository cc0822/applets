Page({
  data: {
    regData: {},
    conData: {},
    preData: {},
    cheData: {},
    tepName: ''
  },
  onLoad: function(options) {
    if (options.title == '挂号订单') {
      this.setData({
        regData: options,
        tepName: 'registerDetail'
      })
    } else if (options.title == '咨询订单') {
      this.setData({
        conData: options,
        tepName: 'consultDetail'
      })
    } else if (options.title == '处方订单') {
      this.setData({
        preData: options,
        tepName: 'prescriptionDetail'
      })
    } else if (options.title == '咨询订单') {
      this.setData({
        conData: options,
        tepName: 'consultDetail'
      })
    }

  },


})