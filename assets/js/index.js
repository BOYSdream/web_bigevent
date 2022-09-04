$(function () {
  // 获取用户信息
  getUserInfo()

  const layer = layui.layer

  // 点击退出按钮 退出登录
  $('#btnLogout').on('click',function(){
    layer.confirm('确认退出登录?', {icon: 3, title:'提示'}, function(index){
      //do something
      // 1.清除本地存储token数据
      localStorage.removeItem('token')
      // 2.跳转到登录页面
      location.href = '/大事件/CODE/login.html'
      
      layer.close(index);
    })
  })
});

function getUserInfo() {
  // 发起Ajax请求 获取用户信息
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    // headers 就是请求头配置对象
    // headers: {
    //   Authorization: localStorage.getItem("token") || '',
    // },
    success: (res) => {
      console.log(res)
      if(res.status !== 0) return layui.layer.msg('获取用户信息失败')
      // 调用函数 渲染头像
      renderAvatar(res.data)
    },
    // 不论成功还是失败 都会执行 complete 回调函数
    // complete: (res) => {
    //   const resData = res.responseJSON
    //   if(resData.status === 1 && resData.message === '身份认证失败！'){
    //     // 1.清空 本地存储 token数据
    //     localStorage.removeItem('token')
    //     // 2.跳转到登录页面
    //     location.href = '/大事件/CODE/login.html'
    //   }
    // } 
  });
}

// 定义渲染头像的函数
function renderAvatar(user) {
  // 1.获取用户名称 优先获取nickname
  const name = user.nickname || user.username
  // 2.替换欢迎用户的文本
  $('#welcome').html('欢迎&nbsp;&nbsp'+name)
  // 3.渲染头像
  if(user.user_pic !== null){
    $('.layui-nav-img').attr('src',user.user_pic).show().siblings('.text-avatar').hide()
  }else{
    // 获取用户名的第一个字符
    const first = name[0].toUpperCase()
    $('.text-avatar').text(first).show().siblings('.layui-nav-img').hide()
  }
}