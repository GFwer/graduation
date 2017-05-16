/**
 * Created by Administrator on 2016/10/30 0030.
 */
var fun=function(figure,num){
    var xmlHttp1=new XMLHttpRequest();
    xmlHttp1.onreadystatechange = function () {
        if (xmlHttp1.readyState == 4 && xmlHttp1.status == 200) {
            var result = JSON.parse(xmlHttp1.responseText);
            console.log(result.inforesult);
            createBox(result.inforesult);
        }
    };
    num=num+"";
    figure=figure+"";
    var qqqq="category_name="+figure+ "&startposi="+num+"&pagesize="+"5";
    var backendurl =  "http://192.168.1.103:5000/v1/post/list/?"+qqqq;
    xmlHttp1.open("GET", backendurl, true);
    xmlHttp1.send();
};