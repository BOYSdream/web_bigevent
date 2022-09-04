$(function () {
  // 点击去注册
  $('.reg-herf').on('click',() => {
    $('.login-box').hide().siblings('.reg-box').show()
  })

  // 点击去登录
  $('.login-herf').on('click',() => {
    $('.reg-box').hide().siblings('.login-box').show()
  })


  // 从 layUI 中获取form对象
  const form = layui.form
  // 从 layUI 中获取layer对象
  const layer = layui.layer

  // 通过 form.verify() 自定义验证规则
  form.verify({
    // 定义一个叫做pwd的验证规则
    pwd: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] ,
    // 检验两次密码输入是否一致的规则
    repwd: function(value){
      // 获取密码输入框的值
      const pwd = $('.reg-box [name=password]').val()
      // 进行比较
      if(pwd !== value){
        return '两次密码输入不一致'
      }
    }
  })


  // 监听注册表单的提交事件
  $('#form_reg').on('submit',(e) => {
    e.preventDefault()
    // 获取表单的值
    const username = $('#form_reg [name=username]').val()
    const password = $('#form_reg [name=password]').val()
    $.ajax({
      method:'POST',
      url: '/api/reguser',
      data:{
        username,
        password
      },
      success: res => {
        if(res.status !== 0) return layer.msg(res.message)

        layer.msg('注册成功，请登录！')

        // 模拟人为点击去登录
        $('.login-herf').click()
      }
    })
  })


  // 监听登录表单的提交事件
  $('#form_login').on('submit',function(e){
    // 阻止默认的提交行为
    e.preventDefault()
    // 发起ajax请求
    $.ajax({
      method: 'POST',
      url: '/api/login',
      // 快速获取表单数据
      data: $(this).serialize(),
      success: res => {
        if(res.status !== 0) return layer.msg('登录失败！')

        layer.msg('登录成功！')

        // 将res中的token存储到 本地存储
        localStorage.setItem('token',res.token)

        // 跳转到后台管理页面
        location.href = '/大事件/CODE/index.html'
        // location.href = 'http://www.baidu.com'
      }
    })
  })
})