function createxmlhttp(){
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlhttp;
}

/*
发送ajax的GET请求
url是请求路由
params是请求参数
callback是回调函数
*/
function getxmlhttp(url, params, callback) {
    var parstr = "t=" + Math.random(1000) + "&";
    for (var i in params) {
        parstr = parstr + i + "=" + params[i] + "&";
    }
    parstr = parstr.substring(0, parstr.length - 1);
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var result = JSON.parse(xmlhttp.responseText);
            callback(result);
        }
    };
    xmlhttp.open("GET", "http://" + backendserver + ":" + backendport + url + "?" + parstr, true);
    xmlhttp.send();
}

/*
发送ajax的POST请求
url是请求路由
params是请求参数
callback是回调函数
*/
function postxmlhttp(url, params, callback) {
    var parstr = "t=" + Math.random(1000) + "&";
    for (var i in params) {
        parstr = parstr + i + "=" + params[i] + "&";
    }
    parstr = parstr.substring(0, parstr.length - 1);
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var result = JSON.parse(xmlhttp.responseText);
            callback(result);
        }
    };
    xmlhttp.open("POST", "http://" + backendserver + ":" + backendport + url, true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send(parstr);
}
