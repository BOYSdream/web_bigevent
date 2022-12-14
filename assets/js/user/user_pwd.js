$(function () {
  const form = layui.form
  const layer = layui.layer

  form.verify({
    pwd: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ],

    difpwd: function(value) {
      if(value === $('[name=oldPwd]').val()){
        return '新旧密码不能相同'
      }
    },

    repwd: function(value) {
      if(value !== $('[name=newPwd]').val()){
        return '两次密码输入不一致'
      }
    }
  })

  // 发起请求 重置密码
  $('.layui-form').on('submit',function(e){
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: res => {
        if(res.status !== 0) return layer.msg('更新密码失败')

        layer.msg('更新密码成功')

        // 清空表单
        $(this)[0].reset()
      }
    })
  })
})