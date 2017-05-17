/**
 * Created by Administrator on 2016/11/1 0001.
 */
//注册
function toSign() {
    var sign = document.getElementsByClassName('sign')[0];
    sign.style.display = "block";
    sign.style.zIndex = "1";
}
//取消
function toCancel() {
    var sign = document.getElementsByClassName('sign')[0];
    sign.style.display = "none";
    document.getElementsByClassName('user_name')[1].value = "";
    document.getElementsByClassName('user_password')[1].value = "";
    document.getElementsByClassName('user_repassword')[0].value = "";
}
//确认注册
function toSure() {
    var urlarr = window.location.href.split('#');
    var lasturl = urlarr[urlarr.length - 1];
    if (lasturl == 'signup') {
        var user_name = document.getElementsByClassName('user_name')[1].value;
    } else {
        var user_name = document.getElementsByClassName('user_name')[2].value;
    }
    var user_password = document.getElementsByClassName('user_password')[1].value;
    var user_repassword = document.getElementsByClassName('user_repassword')[0].value;
    if (user_name == "") {
        alert("用户名不能为空");
    } else if (user_password == "") {
        alert("密码不能为空");
    } else if (user_password !== user_repassword) {
        alert("两次输入的密码不一致");
        alert(aaaa)
    } else {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                console.log(user_name);
                var sign = document.getElementsByClassName('sign')[0];
                sign.style.display = "none";
                user_name = "";
                user_password = "";
                user_repassword = "";
                result = JSON.parse(xmlHttp.responseText);
                alert(result["infomsg"]);
            }
        };
        var backendurl = url + "/v1/user/signup/";
        xmlHttp.open("POST", backendurl, true);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send("user_name=" + user_name + "&user_password=" + user_password);
    }
}
//新修改确认注册
function newtoSure() {
    var urlarr = window.location.href.split('#');
    var lasturl = urlarr[urlarr.length - 1];
    if (lasturl == 'signup') {
        var user_name = document.getElementsByClassName('user_name')[1].value;
    }
    var user_password = document.getElementsByClassName('user_password')[1].value;
    var user_repassword = document.getElementsByClassName('user_repassword')[0].value;
    if (user_name == "") {
        alert("用户名不能为空");
    } else if (user_password == "") {
        alert("密码不能为空");
    } else if (user_password !== user_repassword) {
        alert("两次输入的密码不一致");
        alert(aaaa)
    } else {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                console.log(user_name);
                // var sign = document.getElementsByClassName('sign')[0];
                // sign.style.display="none";
                user_name = "";
                user_password = "";
                user_repassword = "";
                result = JSON.parse(xmlHttp.responseText);
                alert(result["infomsg"]);
                if (result["infostatus"]) {
                    $('.in').addClass('active');
                    $('.up').removeClass('active');
                    $('.formin').addClass("formdisplay");
                    $('.formup').removeClass("formdisplay");
                }
            }
        };
        var backendurl = url + "/v1/user/signup/";
        xmlHttp.open("POST", backendurl, true);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send("user_name=" + user_name + "&user_password=" + user_password);
        // window.location.href="../html/idnex.html#sign";
    }
}
//读取用户名
var inCookies = function() {
    var user_name = getCookie("username");
    var username1 = document.getElementsByClassName("user_name")[0];
    var sign = document.getElementsByClassName('sign')[0];
    var ul1 = document.getElementsByClassName("ul1")[0];
    var ul2 = document.getElementsByClassName("ul2")[0];
    if (getCookie("usertoken")) {
        username1.innerHTML = user_name;
        sign.style.display = "none";
        ul1.style.display = "none";
        ul2.style.display = "block";
    } else {
        sign.style.display = "none";
        ul1.style.display = "block";
        ul2.style.display = "none";
    }
};
inCookies();
//登录
var toLogin = function() {
    var user_name = document.getElementsByClassName("user_name")[0].value;
    var user_password = document.getElementsByClassName("user_password")[0].value;
    if (user_name == "" || user_password == "") {
        alert("用户名或者密码不能为空")
    } else {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                result = JSON.parse(xmlHttp.responseText);
                if (result.infostatus) {
                    alert(result.infomsg);
                    setCookie("usertoken", result.inforesult.usertoken_str, 1);
                    setCookie("ifManage", result.inforesult.user_privilege, 1);
                    setCookie("username", user_name, 1);
                    inCookies();
                    if (result.inforesult.user_privilege == "0") {
                        window.location.href = "../html/login.html";
                    } else if (result.inforesult.user_privilege == "1") {
                        window.location.href = "../html/manage.html";
                    }
                } else {
                    alert(result["infomsg"]);
                }
            }
        };
        var backendurl = url + "/v1/user/login/";
        xmlHttp.open("POST", backendurl, true);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send("user_name=" + user_name + "&user_password=" + user_password);
    }
};
//修改登录
function toLogin() {
    var user_name = document.getElementsByClassName("user_name")[0].value;
    var user_password = document.getElementsByClassName("user_password")[0].value;
    if (user_name == "" || user_password == "") {
        alert("用户名或者密码不能为空")
    } else {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                result = JSON.parse(xmlHttp.responseText);
                if (result.infostatus) {
                    alert(result.infomsg);
                    setCookie("usertoken", result.inforesult.usertoken_str, 1);
                    setCookie("ifManage", result.inforesult.user_privilege, 1);
                    setCookie("username", user_name, 1);
                    // inCookies();
                    if (result.inforesult.user_privilege == "0") {
                        if (window.location.href.split('/').length == 4) {
                            window.location.href = "./html/login.html";
                        } else {
                            window.location.href = "./login.html";
                        }
                    } else if (result.inforesult.user_privilege == "1") {
                        if (window.location.href.split('/').length == 4) {
                            window.location.href = "./html/manage.html";
                        } else {
                            window.location.href = "./manage.html";
                        }
                    }
                } else {
                    alert(result["infomsg"]);
                }
            }
        };
        var backendurl = url + "/v1/user/login/";
        xmlHttp.open("POST", backendurl, true);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send("user_name=" + user_name + "&user_password=" + user_password);
    }
};
//存储cookie
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

//获取cookie
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}
//我的言论
function myPost() {
    window.location.href = "../html/myPost.html";
}

//删除usertoken
function secede() {
    var user_name = getCookie("username");
    var usertoken = getCookie("usertoken");
    var ifManage = getCookie("ifManage");
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            result = JSON.parse(xmlHttp.responseText);
            if (result.infostatus == true) {
                setCookie("ifManage", result["infostatus"]["user_privilege"], -10);
                setCookie("usertoken", result["inforesult"], -10);
                setCookie("username", null, -10);
                // inCookies();
                // document.getElementsByClassName("user_name")[0].value = "";
                // document.getElementsByClassName("user_password")[0].value = "";
            }
            // alert("退出账号成功！");
            mdui.snackbar({
                message: '退出账号成功！'
            });
            setTimeout(
                window.location.href = './index.html', 2000
            )
        }
    };
    var backendurl = url + "/v1/token/delete/";
    xmlHttp.open("POST", backendurl, true);
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.send("usertoken_str=" + usertoken);
}
//发表言论
function publishPost() {
    window.location.href = "../html/publishPost.html";
}
//回到主页
function toForst() {
    if (getCookie("ifManage") == "1") {
        window.location.href = "../html/manage.html";
    } else {
        window.location.href = "../html/login.html";
    }
}
