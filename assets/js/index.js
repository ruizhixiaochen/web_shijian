$(function () {
    getUserInfo()

    // 点击按钮实现退出功能
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('确定退出码?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            location.href = './login.html'
            layer.close(index);
        });
    })
})

// 获取用户信息
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'GET',
        success: function (res) {
            if (res.status !== 0) { return layui.layer.msg('连接失败了'); }
            renderAvatar(res.data)
        },
        complete: function (res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败! ') {
                localStorage.removeItem('token')
                location.href = './login.html'
            }
        }
    })
}

//渲染头像,名字
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('欢迎 ' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}

