Page({
  data: {
    models: {},
    tepName: ''
  },
  onLoad: function (options) {
    const cfgs = {
      '挂号订单': { '姓名': options.name, '联系方式': options.phone },
      '咨询订单': { '姓名': options.name, '联系方式': options.phone },
    }
    // if (options.title == '挂号订单') {
    //   const data = { '姓名': options.name, '联系方式': options.phone};
        
    // }
    //  else if (options.title == '咨询订单') {
    //   this.setData({
    //     conData: options,
    //     tepName: 'consultDetail'
    //   })
    // } else if (options.title == '处方订单') {
    //   this.setData({
    //     preData: options,
    //     tepName: 'prescriptionDetail'
    //   })
    // } else if (options.title == '咨询订单') {
    //   this.setData({
    //     conData: options,
    //     tepName: 'consultDetail'
    //   })
    // }
    this.setData({
      models: cfgs[optios.title]
    })

  },


})