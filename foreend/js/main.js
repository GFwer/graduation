
//数据块加载请求
var fun=function(figure,num){
    var xmlHttp1=new XMLHttpRequest();
    xmlHttp1.onreadystatechange = function () {
        if (xmlHttp1.readyState == 4 && xmlHttp1.status == 200) {
            var result = JSON.parse(xmlHttp1.responseText);
            //console.log(result.inforesult);
            createBox(result.inforesult);
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

//创建数据块
function createBox(result){
    console.log(result);
    if(result !="已经没有帖子了"){
        var oParent=document.getElementById('two');// 父级对象
        for(var i=0;i<result.length;i++){
            var a=document.createElement('a');
            a.href="../html/post.html?"+"id="+result[i].post_id;
            oParent.appendChild(a);

            var oProject=document.createElement('div');
            oProject.className='project f-cb';
            a.appendChild(oProject);

            var oMess=document.createElement('div');
            oMess.className='project_message';
            oProject.appendChild(oMess);
            var oCont=document.createElement('div');
            oCont.className='content';
            oProject.appendChild(oCont);

            var oImg=document.createElement('img');
            oImg.src=result[i].post_userhead;
            oMess.appendChild(oImg);
            var br1=document.createElement('br');
            oMess.appendChild(br1);
            var oName=document.createElement('div');
            oName.className='user_name';
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
function checkscrollside(){
    var bodyH=document.getElementById('body').offsetHeight - 20;
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var mainH =  window.innerHeight;
    return (bodyH< scrollTop+mainH)?true:false;//到达指定高度后 返回true，触发waterfall()函数
    //console.log(bodyH+"  "+scrollTop+"   "+mainH+"    ");
}
//checkscrollside()

//判断是否已登录
function userToken() {
    usertoken=getCookie('usertoken');
    var ul1=document.getElementsByClassName("ul1")[0];
    var ul2=document.getElementsByClassName("ul2")[0];
    if (usertoken) {
        ul1.style.display="none";
        ul2.style.display="block";
        document.getElementsByClassName("user_name")[1].value=usertoken;
    }
    else {
        ul1.style.display="block";
        ul2.style.display="none";
        toLogin();
    }
}