/**
 * Created by Administrator on 2016/11/1 0001.
 */
function border() {
    var urlarr2 = window.location.href.split('#/');
    var lasturl2 = urlarr2[1];
    if (lasturl2 == 'tab-2') {
        $('#2').addClass('bordercss');
        $('#1').removeClass('bordercss');
        $('#3').removeClass('bordercss');
        $('#4').removeClass('bordercss');
    } else if (lasturl2 == 'tab-3') {
        $('#3').addClass('bordercss');
        $('#1').removeClass('bordercss');
        $('#2').removeClass('bordercss');
        $('#4').removeClass('bordercss');
    } else if (lasturl2 == 'tab-4') {
        $('#4').addClass('bordercss');
        $('#1').removeClass('bordercss');
        $('#3').removeClass('bordercss');
        $('#2').removeClass('bordercss');
    } else {
        $('#1').addClass('bordercss');
        $('#2').removeClass('bordercss');
        $('#3').removeClass('bordercss');
        $('#4').removeClass('bordercss');
    }
}
//载入特效
$(document).ready(function() {
    $('.preloader').fadeOut(1000); // set duration in brackets
    border();


});
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
        mdui.snackbar({
            message: "用户名不能为空"
        });
        shake("loginform");
    } else if (user_password == "") {
        mdui.snackbar({
            message: "密码不能为空"
        });
        shake("loginform");
    } else if (user_password !== user_repassword) {
        mdui.snackbar({
            message: "两次输入的密码不一致"
        });
        shake("loginform");
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
                mdui.snackbar({
                    message: result["infomsg"]
                });
                if (result["infomsg"] != "注册成功") {
                    shake("loginform");
                }
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
        mdui.snackbar({
            message: "用户名不能为空"
        });
        shake("loginform");
    } else if (user_password == "") {
        mdui.snackbar({
            message: "密码不能为空"
        });
        shake("loginform");
    } else if (user_password !== user_repassword) {
        mdui.snackbar({
            message: "两次输入的密码不一致"
        });
        shake("loginform");
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
                mdui.snackbar({
                    message: result["infomsg"]
                });
                if (result["infomsg"] != "注册成功") {
                    shake("loginform");
                }
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
    // var sign = document.getElementsByClassName('sign')[0];
    // var ul1 = document.getElementsByClassName("ul1")[0];
    // var ul2 = document.getElementsByClassName("ul2")[0];
    if (getCookie("username") != "" && getCookie("username") != "null") {
        username1.innerHTML = user_name;
        // console.log(user_name);
        // sign.style.display = "none";
        // ul1.style.display = "none";
        // ul2.style.display = "block";
    } else {
        // sign.style.display = "none";
        // ul1.style.display = "block";
        // ul2.style.display = "none";
        var urlarr = window.location.href.split('/');
        var domain = urlarr[urlarr.length - 1].split('.')[0];
        if (domain != 'index' && window.location.href != localhost) {
            var body = document.getElementById("body");
            body.style.display = "none";
            alert("尚未登录");
            window.location.href = "./index.html";
        }
        // console.log(urlarr[urlarr.length - 1])

        // alert("尚未登录");
        // window.location.href = "./html/index.html";

    }
};
inCookies();
//登录
var toLogin = function() {
    var user_name = document.getElementsByClassName("user_name")[0].value;
    var user_password = document.getElementsByClassName("user_password")[0].value;
    if (user_name == "" || user_password == "") {
        mdui.snackbar({
            message: "用户名或者密码不能为空"
        });
        shake("loginform");
    } else {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                result = JSON.parse(xmlHttp.responseText);
                if (result.infostatus) {
                    mdui.snackbar({
                        message: result["infomsg"]
                    });
                    setTimeout(function() {
                        setCookie("usertoken", result.inforesult.usertoken_str, 1);
                        setCookie("ifManage", result.inforesult.user_privilege, 1);
                        setCookie("username", user_name, 1);
                        inCookies();
                        if (result.inforesult.user_privilege == "0") {
                            window.location.href = "../html/login.html";
                        } else if (result.inforesult.user_privilege == "1") {
                            window.location.href = "../html/manage.html";
                        }
                    }, 300)

                } else {
                    mdui.snackbar({
                        message: result["infomsg"]
                    });
                    shake("loginform");
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
        mdui.snackbar({
            message: "用户名或者密码不能为空"
        });
        shake("loginform");
    } else {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                result = JSON.parse(xmlHttp.responseText);
                if (result.infostatus) {
                    mdui.snackbar({
                        message: result["infomsg"]
                    });
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
                    mdui.snackbar({
                        message: result["infomsg"]
                    });
                    shake("loginform");
                }
            }
        };
        var backendurl = url + "/v1/user/login/";
        xmlHttp.open("POST", backendurl, true);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send("user_name=" + user_name + "&user_password=" + user_password);
    }
};

function shake(classname) {
    $('.' + classname).addClass('animated shake');
    setTimeout(function() {
        // $('.well').addClass('rotateIn')
        $('.' + classname).removeClass('shake');
    }, 700);
    setTimeout(function() {
        // $('.well').removeClass('rotateIn')
    }, 2000)
}

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
                console.log(result);
                setCookie("ifManage", result["infostatus"]["user_privilege"], 1);
                setCookie("usertoken", result["inforesult"], 1);
                // console.log(getCookie('usertoken'));
                setCookie("username", null, 1);
                // inCookies();
                // document.getElementsByClassName("user_name")[0].value = "";
                // document.getElementsByClassName("user_password")[0].value = "";
            }
            // alert("退出账号成功！");
            mdui.snackbar({
                message: '退出账号成功！'
            });
            exit();
        }
    };
    var backendurl = url + "/v1/token/delete/";
    xmlHttp.open("POST", backendurl, true);
    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp.send("usertoken_str=" + usertoken);
}

function exit() {
    setTimeout(function() { window.location.href = './index.html'; }, 1500);
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
// (function() {
//     var user_name = getCookie("username");
//     var urlarr = window.location.href.split('/');
//     if (user_name == null) {
//         if（ urlarr[urlarr.length - 1] != "login.html"） {
//             console.log(非登录)
//         }
//         else {
//             console.log(登录)
//         }
//     } else {
//         console.log(有用户名)
//     }
// })();
function ismobile() {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        return true;
    } else {
        return false;
    }
}
