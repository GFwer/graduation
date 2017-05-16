var toId=function(){
    var toId=location.search;
    return toId.indexOf("=");
};

var getId=function(){
    var setId=location.search;
    var start=toId();
    var getId=setId.slice(start+1,setId.length);
    details(getId);
    del(getId);
    //console.log(getId);
};
getId();

function hidden(){
    var comment=document.getElementsByClassName("comment")[0];
    if(document.getElementsByClassName("tourist")){
        comment.style.display="none";
    }else{
        comment.style.display="block";
    }
}
var review = function(){
    var comment=document.getElementsByClassName("comment")[0];
    comment.style.display="block";
};
//删除帖子
function del(getId){
    var r=confirm("是否确认要删除该帖子？");
    if(r==true){
        var xmlHttp1=new XMLHttpRequest();
        xmlHttp1.onreadystatechange = function () {
            if (xmlHttp1.readyState == 4 && xmlHttp1.status == 200) {
                var result = JSON.parse(xmlHttp1.responseText);
                alert(result);
                window.history.go(-1);

            }
        };
        var backendurl = url+"/v1/post/delete/";
        xmlHttp.open("POST", backendurl, true);
        xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlHttp.send("post_id="+getId+"&usertoken_str="+usertoken);
    }
}

//帖子详情数据加载请求
var details=function(id){
    var xmlHttp1=new XMLHttpRequest();
    xmlHttp1.onreadystatechange = function () {
        if (xmlHttp1.readyState == 4 && xmlHttp1.status == 200) {
            var result = JSON.parse(xmlHttp1.responseText);
            main(result);
            create1(result);
        }
    };
    var backendurl =  url+"/v1/post/list/?"+"post_id="+id;
    xmlHttp1.open("GET", backendurl, true);
    xmlHttp1.send();
};

function main(result){
    var title=document.getElementsByClassName("title")[0];
    var time=document.getElementsByClassName("time")[0];
    var img=document.getElementsByClassName("img")[0];
    var h3=document.getElementsByClassName("h3")[0];
    var content=document.getElementsByClassName("two_box_content")[0];
    var img2=document.getElementsByClassName("img2")[0];
    title.innerHTML=result.post_title;
    h3.innerHTML=result.user_name;
    time.innerHTML=result.post_time;
    img.innerHTML=result.src;
    content.innerHTML=result.post_content
}

//创建评论数据块
function create1(result){
    var oParent=document.getElementById('two_box_three');// 父级对象
    for(var i=0;i<result.length;i++){
        var tourist=document.createElement('div');
        tourist.className='tourist';
        oParent.appendChild(tourist);

        var message=document.createElement('div');
        message.className='tourist-message';
        tourist.appendChild(message);
        var content=document.createElement('div');
        content.className='tourist-content';
        content.innerHTML=result[i].
            tourist.appendChild(content);

        var img=document.createElement('img');
        img.src=result[i].
            message.appendChild(img);
        message.appendChild(document.createElement('br'));
        message.appendChild(document.createElement('br'));
        var h3=document.createElement('h3');
        h3.innerHTML=result[i].
            message.appendChild(h3);
        //console.log(document.getElementsByClassName("content_main")[i].innerHTML)
    }
}