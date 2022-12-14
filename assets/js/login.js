$(function () {
    $('#link_reg').on('click', function () {
        $('.reg-box').show()
        $('.login-box').hide()
    })

    $('#link_login').click(function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //layui中获取form对象 定制规则
    var form = layui.form
    form.verify({
        'pwd': [/^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        'repwd': function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致!'
            }
        }

    })


    // 注册接口
    var layer = layui.layer
    $('#gorm_reg').submit(function (e) {
        e.preventDefault()
        var username = $('#gorm_reg [name=username]').val()
        var password = $('#gorm_reg [name=password]').val()
        $.post(
            '/api/reguser', { username: username, password: password }, function (res) {
                if (res.status !== 0) { return layer.msg('失败了') }
                layer.msg('注册成功,请登录')
                $('#link_login').click()
            }
        )
    })

    //登录接口
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) { return layer.msg('失败') }
                layer.msg('登录成功')
                //将成功后得到的token进行保存
                localStorage.setItem('token', res.token)
                location.href = './index.html'
            }
        })
    })
})
