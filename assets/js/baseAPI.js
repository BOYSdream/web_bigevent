// 在每次调用 $.get() 或 $.post() 或 $.ajax() 之前 
// 会先调用该函数
$.ajaxPrefilter(function(options){
  // 发起真正的ajax请求前 统一拼接请求的根路径
  options.url = 'http://big-event-api-t.itheima.net'+options.url
  console.log(options.url)
})