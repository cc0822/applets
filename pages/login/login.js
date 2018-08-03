let CryptoJS = require('../../util/crypto-js/index.js');
let app = getApp().globalData;
let loginUrl = '/system/user/login-by-password';
let keyUrl = '/system/user/auth/token';
Page({
    data: {
        imgSrc: '../../img/login.png',
        imgWidth: 0,
        imgHeight: 0,
        user: '',
        password: ''
    },
    onLoad: function(options) {

    },
    // 图片自适应
    imageLoad: function(e) {
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
    //获取输入账号
    userInput: function(e) {
        this.setData({
            user: e.detail.value
        })
    },
    //获取输入密码
    pswInput: function(e) {
        this.setData({
            password: e.detail.value
        })
    },
    //获取加密key
    getKey: function () {
        if (this.data.user.length == 0 || this.data.password.length === 0) {
            wx.showToast({
                title: '账号和密码不能为空',
                icon: 'none',
                duration: 2000
            })
        } else {
            var that = this;
            wx.request({
                url: app.url + keyUrl,
                method: 'GET',
                header: {
                    'content-type': 'application/json'
                },
                success: function (res) {
                    if (res.data.success) {
                        that.login(res.data.data);
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
    },
    //登录
    login: function(data) {
        let that = this;
        let tokenKey = data.tokenKey;
        const userKey = data.userKey;
        tokenKey = CryptoJS.enc.Utf8.parse(tokenKey);
        that.data.password = CryptoJS.enc.Utf8.parse(that.data.password);
        that.data.password = CryptoJS.AES.encrypt(that.data.password, tokenKey, {
            iv: tokenKey,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString();
        wx.request({
            url: app.url + loginUrl,
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            data: {
                usernameOrPhone: that.data.user,
                password: that.data.password,
                loginType: 1,
                userKey: userKey
            },
            success: function (res) {
                if (res.data.success) {
                    const data = res.data.data;
                    app.token = Object.assign(app.token, data.token);
                    app.userInfo = data.userInfo;
                    app.ossPath = data.ossPath;
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