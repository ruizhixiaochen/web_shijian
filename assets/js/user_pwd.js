var form = layui.form
$(function () {
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        samepwd: function (val) {
            if (val === $('[name=oldPwd]').val()) { return '不能与原密码相同' }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码不一致'
            }
        }
    })

    $('.layui-form').submit(function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) { return layer.msg('失败喽') }
                layer.msg('修改成功')
                $('.layui-form')[0].reset()
            }
        })
    })
})
