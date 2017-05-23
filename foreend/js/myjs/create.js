var usertoken = getCookie("usertoken");

function getClass(e) {
    return e.value;
}
//数据块内容
function school(figure) {
    inCookies();
    if (getCookie("ifManage") == "1") {
        window.location.href = "../html/manage.html";
    } else {
        window.location.href = "../html/login.html";
    }
}

function publishpost() {
    var gatTitle = document.getElementsByClassName("gatTitle")[0].value;
    var getContent = document.getElementsByClassName("getContent")[0].value;
    var e = document.getElementById("mySelect");
    var select = getClass(e);
    var pics = new Array();
    var piccontainer = objbyid("piccontainer");
    var piclist = piccontainer.childNodes;
    for (var i = 0; i < piclist.length; i++) {
        var picobj = piclist[i].childNodes[0].src;
        pics.push(picobj);
    }
    console.log(pics)
    if (gatTitle.length < 1 || getContent.length < 1) {
        alert("标题或内容不能为空！");
    } else {
        pics = JSON.stringify(pics);
        console.log({
            "usertoken_str": usertoken,
            "post_title": gatTitle,
            "post_content": getContent,
            "category_name": select,
            "post_pics": pics
        })
        postxmlhttp("/v1/post/append/", {
            "usertoken_str": usertoken,
            "post_title": gatTitle,
            "post_content": getContent,
            "category_name": select,
            "post_pics": pics
        }, function(result) {
            if (result["infostatus"]) {
                alert(result["infomsg"]);

                // window.location.replace("./myPost.html");
            } else {
                alert(result["infomsg"]);
            }
        });
    }
}

/*
图片裁切
*/
function cutimage() {
    var filename = valuebyid("filename");
    var x1 = valuebyid("x1");
    var y1 = valuebyid("y1");
    var x2 = valuebyid("x2");
    var y2 = valuebyid("y2");
    var cw = valuebyid("cw");
    var ch = valuebyid("ch");
    getxmlhttp("/v1/file/post/imagecut/", {
            "filename": filename,
            "x1": x1,
            "y1": y1,
            "x2": x2,
            "y2": y2,
            "cw": cw,
            "ch": ch
        },
        function(result) {
            $("#uploadpicmodal2").modal("hide");
            var container = objbyid("piccontainer");
            var piccontainter = makeobj("div", {
                "class": "img-thumbnail",
                "style": "width: 200px;float:left;margin-right:2px;margin-bottom:2px;text-align:center;padding:2px;",
                "id": "pic" + result["infomsg"]
            });
            var img = makeobj("img", {
                "class": "img-thumbnail",
                "src": result["infomsg"],
                "name": "goodspics",
                "style": "width: 200px;height: 200px;",
                "alt": "货物图片"
            });
            var removebutton = makeobj("button", {
                "class": "btn btn-danger",
                "onclick": "removepic('" + result["infomsg"] + "')",
                "style": "width: 100%;"
            }, "删除");
            piccontainter.appendChild(img);
            piccontainter.appendChild(removebutton);
            container.appendChild(piccontainter);
        }
    );
}

/*
删除上传的图片
*/
function removepic(picaddr) {
    getxmlhttp("/v1/picture/remove/", {
            "usertoken_str": usertoken,
            "pic_address": picaddr
        },
        function(result) {
            if (result["infostatus"]) {
                var node = objbyid("pic" + picaddr);
                var container = objbyid("piccontainer");
                container.removeChild(node);
            } else {
                alert(result["infomsg"]);
            }
        }
    );
}
