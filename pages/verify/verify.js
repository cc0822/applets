let app = getApp().globalData;
let detailUrl = '/authenticate/patuser/one';
let passUrl = '/authenticate/patuser/auth';
let failUrl = '/authenticate/patuser';

Page({
    data: {
      model: {},
      imgSrc: '',
      imgWidth: 0,
      imgHeight: 0,
      id: ''
    },
    onLoad: function (options) {
        this.setData({
            id: options.id
        });
        let that = this;
        wx.request({
            url: app.url + detailUrl,
            method: 'GET',
            header: Object.assign(app.token, {
                'content-type': 'application/json'
            }),
            data: {
               id: options.id
            },
            success: function (res) {
                that.setData({
                    model: res.data.data,
                    imgSrc: `${app.ossPath}/${res.data.data.image}`
                })
            }
        })
    },

    // 图片自适应
    imageLoad: function (e) {
        let $width = e.detail.width, //获取图片真实宽度
            $height = e.detail.height,
            ratio = $width / $height; //图片的真实宽高比例
        let viewWidth = 750, //设置图片显示宽度，
            viewHeight = 750 / ratio; //计算的高度值
        this.setData({
            imgWidth: viewWidth,
            imgHeight: viewHeight
        })
    },

    //审核通过
    checkPass: function() {
        let that = this;
        wx.request({
            url: app.url + passUrl,
            method: 'GET',
            header: Object.assign(app.token,{
                'content-type': 'application/json'
            }),
            data: {
               id: that.data.id
            },
            success: function (res) {
                if(res.data.success) {
                    wx.redirectTo({
                        url: '../index/index',
                    })
                }else {
                    wx.showToast({
                        title: res.data.message,
                        icon: 'none',
                        duration: 2000
                    })
                }   
            }
        })
    },

    //审核失败
    checkFail: function() {
        let that = this;
        wx.request({
            url: app.url + failUrl,
            method: 'DELETE',
            header: Object.assign(app.token, {
                'content-type': 'application/json'
            }),
            data: {
                id: that.data.id
            },
            success: function (res) { 
                if (res.data.success) {
                    wx.redirectTo({
                        url: '../index/index',
                    })
                } else {
                    wx.showToast({
                        title: res.data.message,
                        icon: 'none',
                        duration: 2000
                    })
                }             
            }
        })
    }
})
