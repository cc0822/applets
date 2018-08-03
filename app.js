import dic from "./util/dic";

App({
    onLaunch: function () {
        Object.assign(this.globalData, dic)
    },
    globalData: {
        
        url: 'http://192.168.1.43:8094/manage/v1',
        token: {
            apiKey: '309dea40e47f447ca83efb6407cea0c9',
        },
        userInfo: null,
        ossPath: null
    }
})