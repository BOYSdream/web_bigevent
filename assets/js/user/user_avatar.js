$(function () {
  const layer = layui.layer;

  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $("#image");
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  // 上传按钮绑定点击事件
  $("#btnChoose").on("click", () => {
    $("#file").click();
  });

  // 文件选择框绑定change事件
  $("#file").on("change", (e) => {
    // 获取用户上传的文件
    const filelist = e.target.files;
    // 判断
    if (filelist.length === 0) return layer.msg("请选择图片");

    // 1.拿到上传的图片
    const file = e.target.files[0];
    // 2.将文件 转化为路径
    const imgUrl = URL.createObjectURL(file);
    // 3.重新初始化裁剪区域
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", imgUrl) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  // 确定按钮绑定点击事件
  $("#btnUpload").on("click", () => {
    // 1.获取处理后的图片
    var dataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png"); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    // 2.发起请求 上传头像
    $.ajax({ 
      method: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL
      },
      success: res => {
        if(res.status !== 0) return layer.msg('上传头像失败')

        layer.msg('上传头像成功')

        // 调用父页面中的函数
        window.parent.getUserInfo()
      }
    })
  });
});
