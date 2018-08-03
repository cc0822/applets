//不够两位补零
function add(time) {
    return time < 10 ? '0' + time : time;
}
//日期格式化，年月日时分秒
function dateFormat(timestamp) {
    if (timestamp) {
        let time = new Date(timestamp);
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let date = time.getDate();
        let hours = time.getHours();
        let minutes = time.getMinutes();
        let seconds = time.getSeconds();
        let result = year + '-' + add(month) + '-' + add(date) + ' ' + add(hours) + ':' + add(minutes) + ':' + add(seconds);
        return result;
    } else {
        return '';
    }
}
//获取当天时间 年月日
function getToday() {
    let time = new Date();
    let year = time.getFullYear();
    let month = time.getMonth() + 1;
    let date = time.getDate();
    let result = year + '-' + add(month) + '-' + add(date);
    return result;
}

module.exports = {
    dateFormat: dateFormat,
    getToday: getToday
}