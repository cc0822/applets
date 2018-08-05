let app = getApp().globalData;
let filter = require('../../filter/filter.js');
let checkUrl = '/authenticate/patuser/page'

Page({
    data: {
        searchValue: '',
        listShow: true,
        models: [],
        list: []
    },
    page:0,
    onLoad: function() {
        let that = this;
        wx.request({
            url: app.url + checkUrl,
            method: 'GET',
            header: Object.assign(app.token, {
                'content-type': 'application/json'
            }),
            data: {
                page: 0,
                size: 10000
            },
            success: function(res) {
                const data = res.data.data.models;
                that.setData({
                    models: data,
                    list: data
                })
            }
        })

    },
    //获取搜索框内容
    getValue: function(e) {
        this.setData({
            searchValue: e.detail.value
        })
    },
    //搜索
    search: function() {       
        const value = this.data.searchValue;
        if (!value) {
            this.setData({
                models: this.data.list
            })
        } else {
            const filterModels = this.data.list.filter(({
                inName,
                inIdCard
            }) => `${inName},${inIdCard}`.includes(value));
            const show = filterModels.length ? true : false;
            this.setData({
                models: filterModels,
                listShow: show
            })
        }   
    },
    //清空搜索内容
    clear: function(){
        this.setData({
            searchValue: '',
            models: this.data.list,
            listShow: true
        })
    },
  //上拉加载更多
  // onReachBottom: function () {
  //   if (!this.data.moreShow) {
  //     var that = this;
  //     const { payMethod, payStatuss, tradeStatus, createTimeStart, createTimeEnd } = that.data;
  //     const params = { payMethod, payStatuss, tradeStatus, createTimeStart, createTimeEnd };
  //     wx.showLoading({
  //       title: '玩命加载中',
  //     })
  //     that.page += 1;
  //     wx.request({
  //       url: `${app.url}${orderUrl}?size=20&page=${that.page}`,
  //       method: 'POST',
  //       header: Object.assign(app.token, {
  //         'content-type': 'application/json'
  //       }),
  //       data: params,
  //       success: function (res) {
  //         if (res.data.success) {
  //           const data = res.data.data.models;
  //           if (data.length < 1) {
  //             that.setData({
  //               moreShow: true
  //             });
  //           } else {
  //             const arr = [];
  //             data.forEach(item => {
  //               item.createTime = filter.dateFormat(item.createTime);
  //               arr.push(item);
  //             });
  //             that.setData({
  //               moreShow: false,
  //               models: that.data.models.concat(arr)
  //             });
  //           }
  //         } else {
  //           wx.showToast({
  //             title: res.data.message,
  //             icon: 'none',
  //             duration: 2000
  //           })
  //         }
  //         wx.hideLoading();
  //       }
  //     })
  //   }
  // }
})