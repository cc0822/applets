let app = getApp().globalData;
let filter = require('../../filter/filter.js');

Page({
    data: {
        keyword: '',
        listShow: true,
        moreShow: false,
        models: [],
        orderUrl: '',
        placeHolder: '',
        tmpName: ''
    },
    page: 0,
    onLoad: function (options) {
        wx.setNavigationBarTitle({
            title: options.title,
        });
        this.setData({
            orderUrl: filter.getOrderInfo(options.title).orderUrl,
            placeHolder: filter.getOrderInfo(options.title).placeHolder,
            tmpName: filter.getOrderInfo(options.title).tmpName
        })
    },
    //获取搜索框内容
    getValue: function (e) {
        this.setData({
            keyword: e.detail.value
        })
    },
    //搜索
    search: function () {
        let that = this;
        that.page = 0;
        const params = {keyword: that.data.keyword};
        wx.request({
            url: `${app.url}${that.data.orderUrl}?size=20&page=0`,
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
                            models: []
                        })
                    } else {
                        that.setData({
                            listShow: true,
                            models: data
                        })
                    }    
                }else{
                    wx.showToast({
                        title: res.data.message,
                        icon: 'none',
                        duration: 2000
                    })
                }                         
            }
        })
    },
    //清空搜索内容
    clear: function () {
        this.setData({
            keyword: '',
            listShow: true,
            moreShow: false
        })
    },
    //上拉加载更多
    onReachBottom: function() {
        if(!this.data.moreShow){
            var that = this;
            const params = { keyword: that.data.keyword };
            wx.showLoading({
                title: '玩命加载中',
            })
            that.page += 1;
            wx.request({
                url: `${app.url}${that.data.orderUrl}?size=20&page=${that.page}`,
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
                            that.setData({
                                moreShow: false,
                                models: that.data.models.concat(data)
                            });
                        }
                    }else {
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