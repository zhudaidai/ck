function getUserInfo (){
    $.ajax ({
        method: "GET",
        url:'/my/userinfo',
        headers: {
            Authorization: localStorage.getItem("token"),
        },
        success: (res) => {
            console.log(res);
            if (res.status !== 0) return layer.msg (res.message);
            layer.msg('获取用户信息成功')
            renderAvatar(res.data)
        },
        complete: (res) => {
            if(
                res.responseJSON.status ===1&&
                res.responseJSON.message ==='身份认证失败！'
            ) {
                localStorage.removeItem('token');
                location.href='/login.html'
            }
        }
    })
    
}
const renderAvatar =(user) => {
    const name =user.nickname || user.username
    $("#welcome").html(`欢迎 ${name}`);
    // 按需渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        // 渲染文本头像
        $(".layui-nav-img").hide();
        let first = name[0].toUpperCase();
        $(".text-avatar").html(first);
    }
}
$("#btnLogout").click(() => {
    layui.layer.confirm(
        "确定退出登录？",
        { icon: 3, title: "" },
        function (index) {
            // 清空本地存储里面的 token
            localStorage.removeItem("token");
            // 重新跳转到登录页面
            location.href = "/login.html";
        }
    );
});
getUserInfo()

function change() {
  $('#change').addClass('layui-this').next().removeClass('layui-this')
    }