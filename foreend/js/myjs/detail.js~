var xmlHttp = createxmlhttp();

function assninfo() {
	assnid = getCookie("assnid");        
    xmlHttp.onreadystatechange = function(){
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            var result = JSON.parse(xmlHttp.responseText);
            document.getElementById("assnname").innerHTML=result["inforesult"]["assn_name"];
            var boxid = document.getElementById("box2");
            for (var i in result["inforesult"]["assn_pics"]) {
                var image = document.createElement("img");
                image.setAttribute("src",result["inforesult"]["assn_pics"][i]);
                image.setAttribute("width","260px");
                image.setAttribute("height","260px");
                boxid.appendChild(image);
            }         
        }
    }
    xmlHttp.open("GET", "http://" + backendserver + ":" + backendport  + "/v1/assn/info/show/?assn_id=" + assnid, true);
    xmlHttp.send();
}
