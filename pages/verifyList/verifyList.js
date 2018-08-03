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
                size: 1000
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

    onLoadMore: function() {

    }

})