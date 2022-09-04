// 在每次调用 $.get() 或 $.post() 或 $.ajax() 之前
// 会先调用该函数
$.ajaxPrefilter(function (options) {
  // 发起真正的ajax请求前 统一拼接请求的根路径
  options.url = "http://big-event-api-t.itheima.net" + options.url;

  // 统一为有权限的接口 配置 headers 请求头
  if (options.url.includes("/my/")) {
    options.headers = {
      Authorization: localStorage.getItem("token") || "",
    };
  }

  // 全局统一挂载 complete 回调函数
  options.complete = function (res) {
    const resData = res.responseJSON;
    if (resData.status === 1 && resData.message === "身份认证失败！") {
      // 1.清空 本地存储 token数据
      localStorage.removeItem("token");
      // 2.跳转到登录页面
      location.href = "/大事件/CODE/login.html";
    }
  };
});
