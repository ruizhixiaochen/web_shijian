$.ajaxPrefilter(function (options) {
    //同意拼接根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
    //设置headers
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
})
