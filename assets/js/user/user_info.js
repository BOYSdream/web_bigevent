$(function () {
  const form = layui.form
  const layer = layui.layer
  
  form.verify({
    // nickname: [
    //   /^[\S]{1,6}$/
    //   ,'昵称必须1到6位，且不能出现空格'
    // ]

    nickname: function(value) {
      if(value.length > 6){
        return '昵称长度必须在1~6个字符之间！'
      }
    }
  })

  // 初始化用户的基本信息
  function initUserInfo() {
    // 发起ajax请求
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: res => {
        if(res.status !== 0) return layer.msg('获取用户基本信息失败')

        // 调用form.val()快速为表单赋值
        form.val('formUserinfo',res.data)
      }
    })
  }
  initUserInfo()

  // 点击重置按钮 重置表单数据
  $('#btnReset').on('click',e => {
    // 1.阻止默认重置行为
    e.preventDefault()
    // 2.重新调用 初始化用户信息的函数
    initUserInfo()
  })

  // 监听表单的提交事件 
  $('.layui-form').on('submit',(e) =>{
    // 1.阻止默认提交行为
    e.preventDefault()
    // 2.调用form.val()快速获取表单的值
    const vals = form.val('formUserinfo')
    // 3.发起ajax请求 
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: vals,
      success: res => {
        if(res.status !== 0) return layer.msg('更新用户信息失败')

        layer.msg('更新用户信息成功')
      }
    })
    // 4.调用父页面中的方法 重新渲染用户的头像和信息
    window.parent.getUserInfo()
  })
})