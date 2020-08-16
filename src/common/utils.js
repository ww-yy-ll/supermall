// 防抖函数，需要传2个参数：函数和等待时间。告诉传进来的这个函数要等多久。
export function debounce(func, delay){
    let timer = null;
    return function (...args) {
        //  判断 timer 是否有值（即是否有传timer），有值就清除掉
        if(timer) clearTimeout(timer)
        // 清除timer后重新开始计时
        timer = setTimeout(() =>{
            func.apply(this, args)
        }, delay)
    }
};
// 需知道正则表达式。正则表达式：是用来做字符串匹配的
export function formatDate(date, fmt) {
    // 1.获取年份
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    // 2.获取
    // M+：正则表达式的一个
    // + 表示 -> 1个或多个
    // * 表示 0个或多个
    // ？ 表示 0个或1个
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};
function padLeftZero (str) {
    return ('00' + str).substr(str.length);
};
