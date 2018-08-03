let app = getApp().globalData;
let filter = require('../../filter/filter.js');
let orderUrl = '/order/payrecord/page';

Page({
    data: {
        // 下拉菜单
        first: '筛选',
        second: '支付方式',
        thirds: '支付状态',
        //搜索项
        payMethod: null,
        payType: null,
        subject: null,
        refundStatus: null,
        payStartTime: filter.getToday(),
        payEndTime: '',
        //数据字典
        subjects: app.subjects,
        payMethods: app.payMethods,
        payTypes: app.payTypes,
        refundStatuses: app.refundStatuses,

        uhide: -1,
        orderList: []
       
    },
    onLoad: function (options) {
        
    },
    //监听页面显示
    onShow: function(options) {
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
    //选择支付方式
    clickMethod: function (e) {
        this.setData({
            payMethod: e.target.dataset.id,
            second: e.target.dataset.name
        })
    },
    //选择支付状态
    clickType: function(e) {
        this.setData({
            payType: e.target.dataset.id,
            thirds: e.target.dataset.name
        })
    },
    //选择订单类型
    clickSubject: function (e) {
        this.setData({
            subject: e.currentTarget.dataset.id
        })
    },
    //选择退款状态
    clickRefund: function (e) {  
        this.setData({
            refundStatus: e.currentTarget.dataset.id
        })
    },
    //选择开始时间
    startDateChange: function(e) {
        this.setData({
            payStartTime: e.detail.value
        })
    },
    //选择结束时间
    endDateChange: function (e) {
        this.setData({
            payEndTime: e.detail.value
        })
    },
    onLoad: function (options) {

    },
    search: function(e) {
        wx.navigateTo({
            url: '../fuzzySearch/fuzzySearch',
        })
    },
    //清除筛选条件
    reset: function() {
        this.setData({
            second: '支付方式',
            thirds: '支付状态',
            payMethod: null,
            payType: null,
            subject: null,
            refundStatus: null,
            payStartTime: filter.getToday(),
            payEndTime: '',
        })
    },
    //提交筛选条件
    submit: function() {
        const that = this;
        const { payMethod, payType, subject, refundStatus, payStartTime, payEndTime}= that.data;
        const params = { payMethod, payType, subject, refundStatus, payStartTime, payEndTime};
        wx.request({
            url: `${app.url}${orderUrl}?size=20&page=0`,
            method: 'POST',
            header: Object.assign(app.token,{
                'content-type': 'application/json'
            }),
            data: params,
            success: function (res) {
                if (res.data.success) {
                    const data = res.data.data.models;
                    const arr = [];
                    data.forEach(item => {
                        item.payTime = filter.dateFormat(item.payTime);
                        item.payOrderTime = filter.dateFormat(item.payOrderTime);
                        arr.push(item);
                    });
                    that.setData({
                        orderList: arr,
                        displays: "none"
                    });         
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

