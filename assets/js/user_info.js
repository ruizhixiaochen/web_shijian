var layer = layui.layer
var form = layui.form
$(function () {
    initUserInfo()
    form.verify({
        nickname: function (val) {
            if (val.length > 6) {
                return '长度要在1--6之间'
            }
        }
    })

})

//初始化信息
function initUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) { return layer.msg('连接失败') }
            form.val('formUserInfo', res.data)
        }
    })
}

//修改用户信息
$('.layui-form').submit(function (e) {
    e.preventDefault()
    $.ajax({
        method: 'post',
        url: '/my/userinfo',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) { return layer.msg('失败了') }
            layer.msg('更新成功')
            window.parent.getUserInfo()
        }
    })
})


//重置表单数据
$('#btnReset').click(function (e) {
    e.preventDefault()
    initUserInfo()
})
