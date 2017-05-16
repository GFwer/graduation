
//数据块加载请求
var fun=function(figure,num){
    var xmlHttp1=new XMLHttpRequest();
    xmlHttp1.onreadystatechange = function () {
        if (xmlHttp1.readyState == 4 && xmlHttp1.status == 200) {
            var result = JSON.parse(xmlHttp1.responseText);
            createBox(result.inforesult,figure);
        }
    };
    num=num+"";
    figure=figure+"";
    var qqqq="category_name="+figure+ "&startposi="+num+"&pagesize="+"5";
    var backendurl =  url+"/v1/post/list/?"+qqqq;
    xmlHttp1.open("GET", backendurl, true);
    xmlHttp1.send();
};

//数据块内容
function school(figure){
    var oParent=document.getElementById('two');// 父级对象
    oParent.innerHTML="";
    for(var i=0;i<4;i++){
        document.getElementById("school"+i).style.backgroundColor="inherit";
    }
    document.getElementById("school"+figure).style.backgroundColor="orange";
    window.figure=figure;
    fun(figure,0);
}

//删除帖子
function deleteMyPost(post_id){
    return function(){
        var r=confirm("是否确认要删除该帖子？");
        if(r==true){
            var usertoken=getCookie("usertoken");
            var xmlHttp1=new XMLHttpRequest();
            xmlHttp1.onreadystatechange = function () {
                if (xmlHttp1.readyState == 4 && xmlHttp1.status == 200) {
                    var result = JSON.parse(xmlHttp1.responseText);
                    window.location.reload();
                    console.log(result);
                }
            };
            var backendurl = url+"/v1/post/delete/";
            xmlHttp1.open("POST", backendurl, true);
            xmlHttp1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlHttp1.send("usertoken_str="+usertoken+"&post_id="+post_id);
        }
    }
}

//置顶帖子
function toTop(post_id,figure){
    return function(){
        var usertoken=getCookie("usertoken");
        var xmlHttp1=new XMLHttpRequest();
        xmlHttp1.onreadystatechange = function () {
            if (xmlHttp1.readyState == 4 && xmlHttp1.status == 200) {
                var result = JSON.parse(xmlHttp1.responseText);
                window.location.reload();
            }
        };
        var backendurl = url+"/v1/post/top/";
        xmlHttp1.open("POST", backendurl, true);
        xmlHttp1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp1.send("usertoken_str="+usertoken+"&post_id="+post_id+"&category_name="+figure);
    }
}

//取消置顶帖子
function cancelTop(post_id,figure){
    return function(){
        var usertoken=getCookie("usertoken");
        var xmlHttp1=new XMLHttpRequest();
        xmlHttp1.onreadystatechange = function () {
            if (xmlHttp1.readyState == 4 && xmlHttp1.status == 200) {
                var result = JSON.parse(xmlHttp1.responseText);
                window.location.reload();
            }
        };
        var backendurl = url+"/v1/post/top/cancel/";
        xmlHttp1.open("POST", backendurl, true);
        xmlHttp1.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp1.send("usertoken_str="+usertoken+"&post_id="+post_id+"category_name="+figure);
    }
}

//创建数据块
function createBox(result,figure){
    if(result !="已经没有帖子了"){
        var oParent=document.getElementById('two');// 父级对象
        for(var i=0;i<result.length;i++){
            var oProject=document.createElement('div');
            oProject.className='project f-cb';
            oParent.appendChild(oProject);

            var deleteMyPost=document.createElement('input');
            deleteMyPost.type="button";
            deleteMyPost.className='deleteMyPost';
            deleteMyPost.onclick= window.deleteMyPost(result[i].post_id);
            deleteMyPost.value="删除";
            oProject.appendChild(deleteMyPost);

            var toTop=document.createElement('input');
            toTop.type="button";
            toTop.className='toTop';
            toTop.onclick= window.toTop(result[i].post_id,figure);
            toTop.value="置顶";
            oProject.appendChild(toTop);

            var cancelTop=document.createElement('input');
            cancelTop.type="button";
            cancelTop.className='cancelTop';
            cancelTop.onclick= window.cancelTop(result[i].post_id,figure);
            cancelTop.value="取消置顶";
            oProject.appendChild(cancelTop);

            if(result[i].post_topstatu == "1"){
                toTop.style.display = "none";
                cancelTop.style.display = "block";
            }else if(result[i].post_topstatu == "0"){
                toTop.style.display = "block";
                cancelTop.style.display = "none";
            }

            var aa=document.createElement('a');
            aa.href="../html/post.html?"+"id="+result[i].post_id;
            oProject.appendChild(aa);

            var oMess=document.createElement('div');
            oMess.className='project_message';
            aa.appendChild(oMess);
            var oCont=document.createElement('div');
            oCont.className='content';
            aa.appendChild(oCont);

            var oImg=document.createElement('img');
            oImg.src=result[i].post_userhead;
            oMess.appendChild(oImg);
            var br1=document.createElement('br');
            oMess.appendChild(br1);
            var oName=document.createElement('div');
            oName.className='userName';
            oMess.appendChild(oName);
            oName.innerHTML=result[i].user_name;

            var oTit=document.createElement('div');
            oTit.className='content_title';
            oCont.appendChild(oTit);
            oTit.innerHTML=result[i].post_title;
            var br2=document.createElement('br');
            oCont.appendChild(br2);
            var oMain=document.createElement('div');
            oMain.className='content_main';
            oCont.appendChild(oMain);
            oMain.innerHTML=result[i].post_content;
            var oTime=document.createElement('div');
            oTime.className='content_time';
            oCont.appendChild(oTime);
            oTime.innerHTML=result[i].post_time;
            //console.log(document.getElementsByClassName("content_main")[i].innerHTML)
        }
    }
}
window.figure="0";
window.i="0";
window.num="0";

fun(window.figure,0);
//瀑布流
function a(){
    //var num= 0,i=0;
    window.onscroll=function(){
        if(checkscrollside()){
            i++;
            num=i*5+5;
            fun(window.figure,num);
        }
    };
}
a();

//        检查是否具备了加载数据块的条件
function checkscrollside() {
    var bodyH = document.getElementById('body').offsetHeight - 20;
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var mainH = window.innerHeight;
    return (bodyH < scrollTop + mainH) ? true : false;//到达指定高度后 返回true，触发waterfall()函数
}