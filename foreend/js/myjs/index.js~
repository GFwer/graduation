var xmlHttp = createxmlhttp();
var xmlHttp1 = createxmlhttp();

function loadtable() {
	            
    xmlHttp.onreadystatechange = function(){
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var result = JSON.parse(xmlHttp.responseText);
            var aimtable = document.getElementById("assntable");
            var allrow = aimtable.rows;
            for(var i in result["inforesult"]){
                var row = aimtable.insertRow();
                allrow[row.rowIndex].insertCell().innerHTML = result["inforesult"][i]["assn_id"];
                allrow[row.rowIndex].insertCell().innerHTML = "<a href='#' onclick=operation(" + result["inforesult"][i]["assn_id"] + ")>"+result["inforesult"][i]["assn_name"]+"</a>";
                allrow[row.rowIndex].insertCell().innerHTML = "<a href='#' onclick=removeline('http://" + backendserver + ":" + backendport + "/v1/assn/delete/?assn_id=" + result["inforesult"][i]["assn_id"] + "')>删除</a>";
            }
        }
    }
    xmlHttp.open("GET", "http://" + backendserver + ":" + backendport  + "/v1/assn/all/show/", true);
    xmlHttp.send();
}

function operation(assnid){
    setCookie("assnid",assnid,1);
    window.location.href = "./pages/detail.html";
}

function removeline(url){
    if(confirm("确认要删除？")){ 
        xmlHttp1.onreadystatechange=function(){
            if (xmlHttp1.readyState==4 && xmlHttp1.status==200){
                var result = JSON.parse(xmlHttp1.responseText);
                alert(result["infomsg"]);
                window.location.href="index.html";
            }
        }
        xmlHttp1.open("GET",url,false);
        xmlHttp1.send();
    }
}
