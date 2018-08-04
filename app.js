import dic from "./util/dic";

App({
    onLaunch: function () {
        Object.assign(this.globalData, dic)
    },
    globalData: {
        
        url: 'http://1.85.45.235:37009/manage/v1',
        token: {
            apiKey: '309dea40e47f447ca83efb6407cea0c9',
        },
        userInfo: null,
        ossPath: null
    }
})