var layer = layui.layer
$(function () {
    var $image = $('#image')
    const options = { aspectRatio: 1, preview: '.img-preview' }
    $image.cropper(options)

    $('#shangchuan').on('click', function () {
        $('#file').click()
    })

    $('#file').change(function (e) {
        var filelist = e.target.files
        if (filelist.length === 0) { return layer.msg('请选择图片') }

        var file = e.target.files[0]
        var newImgURL = URL.createObjectURL(file)
        $image.cropper('destroy') // 销毁旧的裁剪区域 
            .attr('src', newImgURL) // 重新设置图片路径 
            .cropper(options) // 重新初始化裁剪区域
    })

    $('#queding').on('click', function () {
        var dataURL = $image.cropper('getCroppedCanvas', {    // 创建一个 Canvas 画布 
            width: 100, height: 100
        }).toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符a串

        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) { return layer.msg('更换头像失败') }
                layer.msg('更换成功')
                window.parent.getUserInfo()
            }
        })
    })
})