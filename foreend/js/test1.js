//注册
function toSign(){
    var sign = document.getElementsByClassName('sign')[0];
    sign.style.display="block";
    sign.style.zIndex="1";
}
function toCancel(){
    var sign = document.getElementsByClassName('sign')[0];
    sign.style.display="none";
    document.getElementsByClassName('user_name')[1].value="";
    document.getElementsByClassName('user_password')[1].value="";
    document.getElementsByClassName('user_repassword')[0].value="";
}
function toSure(){
    var user_name = document.getElementsByClassName('user_name')[1].value;
    var user_password = document.getElementsByClassName('user_password')[1].value;
    var user_repassword = document.getElementsByClassName('user_repassword')[0].value;
    if(user_name==""){
        alert("用户名不能为空");
    }else if(user_password==""){
        alert("密码不能为空");
    }else if(user_password !== user_repassword){
        alert("两次输入的密码不一致");
        alert(aaaa)
    }else{
        var xmlHttp=new XMLHttpRequest();
        xmlHttp.onreadystatechange = function () {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                var sign = document.getElementsByClassName('sign')[0];
                sign.style.zIndex=-999;
                user_name="";
                user_password="";
                user_repassword="";
                result = JSON.parse(xmlHttp.responseText);
                alert(result["infomsg"]);
            }
        };
        var backendurl = url+"/v1/user/signup/";
        xmlHttp.open("POST", backendurl, true);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send("user_name=" + user_name + "&user_password=" + user_password);
    }
}
//登录
var toLogin=function(){
    var user_name=document.getElementsByClassName("user_name")[0].value;
    var user_password=document.getElementsByClassName("user_password")[0].value;
    var user_repassword=document.getElementsByClassName("user_repassword")[0].value;
    var ul1=document.getElementsByClassName("ul1")[0];
    var ul2=document.getElementsByClassName("ul2")[0];
    if(user_name=="" || user_password==""){
        alert("用户名或者密码不能为空")
    }else{
        //var xmlHttp=new XMLHttpRequest();
        //xmlHttp.onreadystatechange = function () {
        //    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        //        result = JSON.parse(xmlHttp.responseText);
        //        alert(result["infomsg"]);
                checkCookie();
                var sign = document.getElementsByClassName('sign')[0];
                sign.style.display="none";
                user_name="";
                user_password="";
                user_repassword="";
                ul1.style.display="none";
                ul2.style.display="block";
            }
        //}
    //    var backendurl = url+"/v1/user/login/";
    //    xmlHttp.open("POST", backendurl, true);
    //    xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    //    xmlHttp.send("user_name=" + user_name + "&user_password=" + user_password);
    //}
};

//获取账号名
function getCookie(c_name)
{
    if (document.cookie.length>0)
    {
        c_start=document.cookie.indexOf(c_name + "=");
        if (c_start!=-1)
        {
            c_start=c_start + c_name.length+1;
            c_end=document.cookie.indexOf(";",c_start);
            if (c_end==-1) c_end=document.cookie.length;
            return unescape(document.cookie.substring(c_start,c_end))
        }
    }
    return ""
}

function setCookie(c_name,value)
{
    document.cookie=c_name+ "=" +escape(value);
}

function checkCookie()
{
    username=getCookie('username');
    if (username!=null && username!="") {
        username=document.getElementsByClassName("user_name")[0].value;
        document.getElementsByClassName("user_name")[1].innerHTML=username;
    }
    else {
        alert("想查看更多，请登录哟 ^o^ ");
        username=document.getElementsByClassName("user_name")[0].value;
        if (username!=null && username!="")
        {
            setCookie('username',username)
        }
    }
}

var fun=function(figure,num){
    var dataInt = {"0":[
        {"post_id":"a1","user_name":"aa1","post_title":"校园信息1","src":'../img/0.jpg',"post_content":"校园信息,校园信息，校园信息，校园信息，校园信息校园信息"},
        {"post_id":"a2","user_name":"aa2","post_title":"校园信息2","src":'../img/0.jpg',"post_content":"校园信息,校园信息，校园信息，校园信息，校园信息校园信息"},
        {"post_id":"a3","user_name":"aa3","post_title":"校园信息3","src":'../img/0.jpg',"post_content":"校园信息,校园信息，校园信息，校园信息，校园信息校园信息"},
        {"post_id":"a4","user_name":"aa4","post_title":"校园信息4","src":'../img/0.jpg',"post_content":"校园信息,校园信息，校园信息，校园信息，校园信息校园信息"},
        {"post_id":"a5","user_name":"aa5","post_title":"校园信息5","src":'../img/0.jpg',"post_content":"校园信息,校园信息，校园信息，校园信息，校园信息校园信息"},
        {"post_id":"a6","user_name":"aa6","post_title":"校园信息6","src":'../img/0.jpg',"post_content":"校园信息,校园信息，校园信息，校园信息，校园信息校园信息"},
        {"post_id":"a7","user_name":"aa7","post_title":"校园信息7","src":'../img/0.jpg',"post_content":"校园信息,校园信息，校园信息，校园信息，校园信息校园信息"},
        {"post_id":"a8","user_name":"aa8","post_title":"校园信息8","src":'../img/0.jpg',"post_content":"校园信息,校园信息，校园信息，校园信息，校园信息校园信息"}
    ],"1":[
        {"post_id":"b1","user_name":"bb1","post_title":"学习交流1","src":'../img/1.jpg',"post_content":"学习交流，学习交流，学习交流，学习交流，学习交流，学习交流，"},
        {"post_id":"b2","user_name":"bb2","post_title":"学习交流2","src":'../img/1.jpg',"post_content":"学习交流，学习交流，学习交流，学习交流，学习交流，学习交流，"},
        {"post_id":"b3","user_name":"bb3","post_title":"学习交流3","src":'../img/1.jpg',"post_content":"学习交流，学习交流，学习交流，学习交流，学习交流，学习交流，"},
        {"post_id":"b4","user_name":"bb4","post_title":"学习交流4","src":'../img/1.jpg',"post_content":"学习交流，学习交流，学习交流，学习交流，学习交流，学习交流，"},
        {"post_id":"b5","user_name":"bb5","post_title":"学习交流5","src":'../img/1.jpg',"post_content":"学习交流，学习交流，学习交流，学习交流，学习交流，学习交流，"},
        {"post_id":"b6","user_name":"bb6","post_title":"学习交流6","src":'../img/1.jpg',"post_content":"学习交流，学习交流，学习交流，学习交流，学习交流，学习交流，"},
        {"post_id":"b7","user_name":"bb7","post_title":"学习交流7","src":'../img/1.jpg',"post_content":"学习交流，学习交流，学习交流，学习交流，学习交流，学习交流，"},
        {"post_id":"b8","user_name":"bb8","post_title":"学习交流8","src":'../img/1.jpg',"post_content":"学习交流，学习交流，学习交流，学习交流，学习交流，学习交流，"}
    ],"2":[
        {"post_id":"b1","user_name":"cc1","post_title":"吃喝玩乐1","src":'../img/2.jpg',"post_content":"吃喝玩乐，吃喝玩乐，吃喝玩乐,吃喝玩乐吃喝玩乐吃喝玩乐,吃喝玩乐,吃喝玩乐","post_time":"1992,10,5"},
        {"post_id":"b2","user_name":"cc2","post_title":"吃喝玩乐2","src":'../img/2.jpg',"post_content":"吃喝玩乐，吃喝玩乐，吃喝玩乐,吃喝玩乐吃喝玩乐吃喝玩乐,吃喝玩乐,吃喝玩乐"},
        {"post_id":"b3","user_name":"cc3","post_title":"吃喝玩乐3","src":'../img/2.jpg',"post_content":"吃喝玩乐，吃喝玩乐，吃喝玩乐,吃喝玩乐吃喝玩乐吃喝玩乐,吃喝玩乐,吃喝玩乐"},
        {"post_id":"b4","user_name":"cc4","post_title":"吃喝玩乐4","src":'../img/2.jpg',"post_content":"吃喝玩乐，吃喝玩乐，吃喝玩乐,吃喝玩乐吃喝玩乐吃喝玩乐,吃喝玩乐,吃喝玩乐"},
        {"post_id":"b5","user_name":"cc5","post_title":"吃喝玩乐5","src":'../img/2.jpg',"post_content":"吃喝玩乐，吃喝玩乐，吃喝玩乐,吃喝玩乐吃喝玩乐吃喝玩乐,吃喝玩乐,吃喝玩乐"},
        {"post_id":"b6","user_name":"cc6","post_title":"吃喝玩乐6","src":'../img/2.jpg',"post_content":"吃喝玩乐，吃喝玩乐，吃喝玩乐,吃喝玩乐吃喝玩乐吃喝玩乐,吃喝玩乐,吃喝玩乐"},
        {"post_id":"b7","user_name":"cc7","post_title":"吃喝玩乐7","src":'../img/2.jpg',"post_content":"吃喝玩乐，吃喝玩乐，吃喝玩乐,吃喝玩乐吃喝玩乐吃喝玩乐,吃喝玩乐,吃喝玩乐"},
        {"post_id":"b8","user_name":"cc8","post_title":"吃喝玩乐8","src":'../img/2.jpg',"post_content":"吃喝玩乐，吃喝玩乐，吃喝玩乐,吃喝玩乐吃喝玩乐吃喝玩乐,吃喝玩乐,吃喝玩乐"},
    ],"3":[
        {"post_id":"c1","user_name":"dd1","post_title":"失物招领1","src":'../img/3.jpg',"post_content":"吃喝玩乐，吃喝玩乐，吃喝玩乐,吃喝玩乐吃喝玩乐吃喝玩乐,吃喝玩乐,吃喝玩乐"},
        {"post_id":"c2","user_name":"dd2","post_title":"失物招领2","src":'../img/3.jpg',"post_content":"吃喝玩乐，吃喝玩乐，吃喝玩乐,吃喝玩乐吃喝玩乐吃喝玩乐,吃喝玩乐,吃喝玩乐"},
        {"post_id":"c3","user_name":"dd3","post_title":"失物招领3","src":'../img/3.jpg',"post_content":"吃喝玩乐，吃喝玩乐，吃喝玩乐,吃喝玩乐吃喝玩乐吃喝玩乐,吃喝玩乐,吃喝玩乐"},
        {"post_id":"c4","user_name":"dd4","post_title":"失物招领4","src":'../img/3.jpg',"post_content":"吃喝玩乐，吃喝玩乐，吃喝玩乐,吃喝玩乐吃喝玩乐吃喝玩乐,吃喝玩乐,吃喝玩乐"},
        {"post_id":"c5","user_name":"dd5","post_title":"失物招领5","src":'../img/3.jpg',"post_content":"吃喝玩乐，吃喝玩乐，吃喝玩乐,吃喝玩乐吃喝玩乐吃喝玩乐,吃喝玩乐,吃喝玩乐"},
        {"post_id":"c6","user_name":"dd6","post_title":"失物招领6","src":'../img/3.jpg',"post_content":"吃喝玩乐，吃喝玩乐，吃喝玩乐,吃喝玩乐吃喝玩乐吃喝玩乐,吃喝玩乐,吃喝玩乐"},
        {"post_id":"c7","user_name":"dd7","post_title":"失物招领7","src":'../img/3.jpg',"post_content":"吃喝玩乐，吃喝玩乐，吃喝玩乐,吃喝玩乐吃喝玩乐吃喝玩乐,吃喝玩乐,吃喝玩乐"},
        {"post_id":"c8","user_name":"dd8","post_title":"失物招领8","src":'../img/3.jpg',"post_content":"吃喝玩乐，吃喝玩乐，吃喝玩乐,吃喝玩乐吃喝玩乐吃喝玩乐,吃喝玩乐,吃喝玩乐"},
    ]
    };
    for(var i in dataInt){
        if(i==figure){
            createBox(dataInt[figure],num);
        }
    }
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
    fun(figure);
}

//创建数据块
function createBox(result,num){
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
        oImg.src=result[i].src;
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
window.figure="0";
fun(window.figure,0);
//瀑布流
function a(){
    var num= 0,i=0;
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

