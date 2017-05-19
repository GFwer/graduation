//数据块加载请求
var fun = function(figure, num) {
    var xmlHttp1 = new XMLHttpRequest();
    xmlHttp1.onreadystatechange = function() {
        if (xmlHttp1.readyState == 4 && xmlHttp1.status == 200) {
            var result = JSON.parse(xmlHttp1.responseText);
            //console.log(result.inforesult);
            createBox(result.inforesult);
        }
    };
    num = num + "";
    figure = figure + "";
    var qqqq = "category_name=" + figure + "&startposi=" + num + "&pagesize=" + "5";
    var backendurl = url + "/v1/post/list/?" + qqqq;
    xmlHttp1.open("GET", backendurl, true);
    xmlHttp1.send();
};

//数据块内容
function school(figure) {
    var oParent = document.getElementById('two'); // 父级对象
    oParent.innerHTML = "";
    // for (var i = 0; i < 4; i++) {
    //     document.getElementById("school" + i).style.backgroundColor = "inherit";
    // }
    // document.getElementById("school" + figure).style.backgroundColor = "orange";
    window.figure = figure;
    fun(figure, 0);
}


//创建数据块
function createBox(result) {
    console.log(result);
    if (result != "已经没有帖子了") {
        var oParent = document.getElementById('two'); // 父级对象
        for (var i = 0; i < result.length; i++) {
            var a = document.createElement('li');
            // a.href = "../html/post.html?" + "id=" + result[i].post_id;
            a.className = "mdui-list-item" +"mdui-ripple";
            oParent.appendChild(a);

            var oProject = document.createElement('div');
            oProject.className = 'project f-cb';
            a.appendChild(oProject);

            var oMess = document.createElement('div');
            oMess.className = 'project_message mdui-list-item-avatar';
            oProject.appendChild(oMess);
            var oCont = document.createElement('div');
            oCont.className = 'content mdui-list-item-content';
            oProject.appendChild(oCont);

            var oImg = document.createElement('img');
            // oImg.src=result[i].post_userhead;
            var user_split = "holder.js/40x40?theme=sky&text=" + result[i].user_name.substr(0, 1);
            console.log(user_split);
            oImg.setAttribute("data-src", user_split);
            oMess.appendChild(oImg);
            var br1 = document.createElement('br');
            oMess.appendChild(br1);
            var oName = document.createElement('div');
            oName.className = 'user_name2 mdui-list-item-content';
            oMess.appendChild(oName);
            oName.innerHTML = result[i].user_name;

            var oTit = document.createElement('div');
            oTit.className = 'content_title';
            oCont.appendChild(oTit);
            oTit.innerHTML = result[i].post_title;
            var br2 = document.createElement('br');
            oCont.appendChild(br2);
            var oMain = document.createElement('div');
            oMain.className = 'content_main';
            oCont.appendChild(oMain);
            oMain.innerHTML = result[i].post_content;
            var oTime = document.createElement('div');
            oTime.className = 'content_time';
            oCont.appendChild(oTime);
            oTime.innerHTML = result[i].post_time;
            //console.log(document.getElementsByClassName("content_main")[i].innerHTML)
        }
    }
}
/**
 * 页面滚动
 */
// $('[data-scroll]').on('click', function(e) {
//     var $this = $(this);
//     var hash = $this.attr('href').split('#')[1];
//     var $target = $('#' + hash);
//     var scrollTop = $target.offset().top;
//     $('html, body').stop().animate({ scrollTop: scrollTop }, 300, 'linear');
// });

/**
 * 图片占位符
 */
Holder.addTheme("gray", {
    bg: "#BCBEC0",
    fg: "rgba(255, 255, 255, 1)",
    size: 12,
    fontweight: "normal"
});
Holder.addTheme("me", {
    bg: "#8C9EFF",
    fg: "rgba(255, 255, 255, 1)",
    size: 16,
    fontweight: "normal"
});

/**
 * 处理示例
 */
$('.viewsource').on('click', function() {
    var $this = $(this);
    var $example = $this.parents('.doc-example').eq(0).toggleClass('doc-example-showcode');
});


/**
 * 设置文档主题
 */
(function() {
    var DEFAULT_PRIMARY = 'indigo';
    var DEFAULT_ACCENT = 'pink';
    var DEFAULT_LAYOUT = '';

    var setDocsTheme = function(theme) {
        if (typeof theme.primary === 'undefined') {
            theme.primary = false;
        }
        if (typeof theme.accent === 'undefined') {
            theme.accent = false;
        }
        if (typeof theme.layout === 'undefined') {
            theme.layout = false;
        }

        var i, len;
        var $body = $('body');

        var classStr = $body.attr('class');
        var classs = classStr.split(' ');

        // 设置主色
        if (theme.primary !== false) {
            for (i = 0, len = classs.length; i < len; i++) {
                if (classs[i].indexOf('mdui-theme-primary-') === 0) {
                    $body.removeClass(classs[i])
                }
            }
            $body.addClass('mdui-theme-primary-' + theme.primary);
            document.cookie = 'docs-theme-primary=' + theme.primary;
            $('input[name="doc-theme-primary"][value="' + theme.primary + '"]').prop('checked', true);
        }

        // 设置强调色
        if (theme.accent !== false) {
            for (i = 0, len = classs.length; i < len; i++) {
                if (classs[i].indexOf('mdui-theme-accent-') === 0) {
                    $body.removeClass(classs[i]);
                }
            }
            $body.addClass('mdui-theme-accent-' + theme.accent);
            document.cookie = 'docs-theme-accent=' + theme.accent;
            $('input[name="doc-theme-accent"][value="' + theme.accent + '"]').prop('checked', true);
        }

        // 设置主题色
        if (theme.layout !== false) {
            for (i = 0, len = classs.length; i < len; i++) {
                if (classs[i].indexOf('mdui-theme-layout-') === 0) {
                    $body.removeClass(classs[i]);
                }
            }
            if (theme.layout !== '') {
                $body.addClass('mdui-theme-layout-' + theme.layout);
            }
            document.cookie = 'docs-theme-layout=' + theme.layout;
            $('input[name="doc-theme-layout"][value="' + theme.layout + '"]').prop('checked', true);
        }
    };

    // 切换主色
    $(document).on('change', 'input[name="doc-theme-primary"]', function() {
        setDocsTheme({
            primary: $(this).val()
        });
    });

    // 切换强调色
    $(document).on('change', 'input[name="doc-theme-accent"]', function() {
        setDocsTheme({
            accent: $(this).val()
        });
    });

    // 切换主题色
    $(document).on('change', 'input[name="doc-theme-layout"]', function() {
        setDocsTheme({
            layout: $(this).val()
        });
    });

    // 恢复默认主题
    $(document).on('cancel.mdui.dialog', '#dialog-docs-theme', function() {
        setDocsTheme({
            primary: DEFAULT_PRIMARY,
            accent: DEFAULT_ACCENT,
            layout: DEFAULT_LAYOUT
        });
    });
})();


window.figure = "0";
window.i = "0";
window.num = "0";

fun(window.figure, 0);
//瀑布流

function a() {
    //var num= 0,i=0;
    window.onscroll = function() {
        if (checkscrollside()) {
            i++;
            num = i * 5 + 5;
            fun(window.figure, num);
        }
    };
}
a();
//检查是否具备了加载数据块的条件
function checkscrollside() {
    var bodyH = document.getElementById('body').offsetHeight - 20;
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var mainH = window.innerHeight;
    return (bodyH < scrollTop + mainH) ? true : false; //到达指定高度后 返回true，触发waterfall()函数
    //console.log(bodyH+"  "+scrollTop+"   "+mainH+"    ");
}
//checkscrollside()

//判断是否已登录
function userToken() {
    usertoken = getCookie('usertoken');
    var ul1 = document.getElementsByClassName("ul1")[0];
    var ul2 = document.getElementsByClassName("ul2")[0];
    if (usertoken) {
        ul1.style.display = "none";
        ul2.style.display = "block";
        document.getElementsByClassName("user_name")[1].value = usertoken;
    } else {
        ul1.style.display = "block";
        ul2.style.display = "none";
        toLogin();
    }
}
