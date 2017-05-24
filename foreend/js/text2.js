var toId = function() {
    var toId = location.search;
    return toId.indexOf("=");
};

var getId = function() {
    var setId = location.search;
    var start = toId();
    var getId = setId.slice(start + 1, setId.length);
    return getId;
};
var newGetId = function() {
    var getId = window.location.href.split('/')[window.location.href.split('/').length - 1];
    return getId;
};
//帖子详情数据加载请求
var details = function() {
    var postId = getId();
    var xmlHttp1 = new XMLHttpRequest();
    xmlHttp1.onreadystatechange = function() {
        if (xmlHttp1.readyState == 4 && xmlHttp1.status == 200) {
            var result = JSON.parse(xmlHttp1.responseText);
            console.log(result.inforesult);
            main(result.inforesult);
            create1(result.inforesult.post_comments);
        }
    };
    var backendurl = url + "/v1/post/id/detail/?" + "post_id=" + postId;
    xmlHttp1.open("GET", backendurl, true);
    xmlHttp1.send();
};
// details();

function hidden() {
    var comment = document.getElementsByClassName("comment")[0];
    if (document.getElementsByClassName("tourist")) {
        comment.style.display = "none";
    } else {
        comment.style.display = "block";
    }
}

var review = function() {
    var comment = document.getElementsByClassName("comment")[0];
    comment.style.display = "block";
};

//删除帖子
function del() {
    var postId = getId();
    var usertoken = getCookie("usertoken");
    var xmlHttp2 = new XMLHttpRequest();
    console.log(del)
    xmlHttp2.onreadystatechange = function() {
        if (xmlHttp2.readyState == 4 && xmlHttp2.status == 200) {
            var result = JSON.parse(xmlHttp2.responseText);
            alert(result.infomsg);
            window.history.go(-1);
        }
    };
    var backendurl = url + "/v1/post/delete/";
    xmlHttp2.open("POST", backendurl, true);
    xmlHttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp2.send("usertoken_str=" + usertoken + "&post_id=" + postId);
};

function newdel() {
    swal({
            title: "确定删除吗？",
            text: "你将无法恢复帖子！",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "确定删除！",
            closeOnConfirm: false
        },
        function() {
            swal("删除！", "帖子已经被删除。", "success");
            var postId = newGetId();
            var usertoken = getCookie("usertoken");
            var xmlHttp2 = new XMLHttpRequest();
            xmlHttp2.onreadystatechange = function() {
                if (xmlHttp2.readyState == 4 && xmlHttp2.status == 200) {
                    var result = JSON.parse(xmlHttp2.responseText);
                    mdui.snackbar({
                        message: result.infomsg
                    });
                    setTimeout(function() { window.history.go(-1); }, 1000)
                }
            };
            var backendurl = url + "/v1/post/delete/";
            xmlHttp2.open("POST", backendurl, true);
            xmlHttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlHttp2.send("usertoken_str=" + usertoken + "&post_id=" + postId);
        });
};

//发布评论
function toTrue() {
    var postId = getId();
    var usertoken = getCookie("usertoken");
    var comment = document.getElementsByClassName("comment-value")[0].value;
    var xmlHttp2 = new XMLHttpRequest();
    xmlHttp2.onreadystatechange = function() {
        if (xmlHttp2.readyState == 4 && xmlHttp2.status == 200) {
            var result = JSON.parse(xmlHttp2.responseText);
            alert('评论成功');
            window.location.reload();

        }
    };
    var backendurl = url + "/v1/post/comment/";
    xmlHttp2.open("POST", backendurl, true);
    xmlHttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlHttp2.send("usertoken_str=" + usertoken + "&post_id=" + postId + "&comment_str=" + comment);
}

function newToTrue(text) {
    var postId = newGetId();
    var usertoken = getCookie("usertoken");
    if(!ismobile()){var comment = text.replace(/&/g, 'tihuanfu');}
    if(ismobile()){var comment = document.getElementById('mobile').value}
    var xmlHttp2 = new XMLHttpRequest();
    console.log(comment)
    if (comment == "<p><br></p>"||comment == ""||comment == undefined) {
        mdui.snackbar({
            message: "评论不能为空！"
        });
    } else {
        xmlHttp2.onreadystatechange = function() {
            if (xmlHttp2.readyState == 4 && xmlHttp2.status == 200) {
                var result = JSON.parse(xmlHttp2.responseText);
                mdui.snackbar({
                    message: "评论成功"
                });
                setTimeout(function() { window.location.reload(); }, 1000)

            }
        };
        var backendurl = url + "/v1/post/comment/";
        xmlHttp2.open("POST", backendurl, true);
        xmlHttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp2.send("usertoken_str=" + usertoken + "&post_id=" + postId + "&comment_str=" + comment);
    }
}

//创建评论数据块
function create1(result) {
    var oParent = document.getElementsByClassName("two_box_three")[0]; // 父级对象
    for (var i = 0; i < result.length; i++) {
        var tour = document.createElement('div');
        tour.className = 'tourist';
        oParent.appendChild(tour);

        var message = document.createElement('div');
        message.className = 'tourist-message';
        tour.appendChild(message);
        var content = document.createElement('div');
        content.className = 'tourist-content';
        content.innerHTML = result[i].comment_text;
        tour.appendChild(content);

        var img = document.createElement('img');
        img.src = result[i].comment_userhead;
        message.appendChild(img);
        message.appendChild(document.createElement('br'));
        message.appendChild(document.createElement('br'));
        var h3 = document.createElement('h3');
        h3.innerHTML = result[i].comment_username;
        message.appendChild(h3);
        //console.log(document.getElementsByClassName("content_main")[i].innerHTML)
    }
}

function main(result) {
    //console.log(result);
    var title = document.getElementsByClassName("title")[0];
    var time = document.getElementsByClassName("time")[0];
    var img = document.getElementsByClassName("img")[0];
    var h3 = document.getElementsByClassName("h3")[0];
    var content = document.getElementsByClassName("two_box_content")[0];
    var img2 = document.getElementsByClassName("img2")[0];
    title.innerHTML = result.post_title;
    h3.innerHTML = result.post_username;
    time.innerHTML = result.post_time;
    img.src = result.post_userhead;
    content.innerHTML = result.post_content;
    img2.src = result.post_pics[0];
}

//数据块内容
function school(figure) {
    var ifManage = getCookie("ifManage");
    if (ifManage == "1") {
        window.location.href = "../html/manage.html";
    } else {
        window.location.href = "../html/login.html";
    }
}
//删除我的帖子
function deleteMyPost(post_id) {
    return function() {
        usertoken = getCookie("usertoken");
        var r = confirm("是否确认要删除该帖子？");
        if (r == true) {
            var xmlHttp1 = new XMLHttpRequest();
            xmlHttp1.onreadystatechange = function() {
                if (xmlHttp1.readyState == 4 && xmlHttp1.status == 200) {
                    var result = JSON.parse(xmlHttp1.responseText);
                    console.log(result);
                    alert(result.infomsg);
                    if (result.infostatus == true) {
                        window.location.href = "../html/myPost.html";
                    }
                }
            };
            var backendurl = url + "/v1/post/delete/";
            xmlHttp1.open("POST", backendurl, true);
            xmlHttp1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlHttp1.send("usertoken_str=" + usertoken + "&post_id=" + post_id);
        }
    }
}
