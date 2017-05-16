var div = document.createElement("div");
div.setAttribute("id","log");
div.style.display = "block";
div.style.position = "absolute";
div.style.width = "100%";
div.style.height = "100px";
div.style.zIndex = "100";
div.style.backgroundColor = "rgba(202,202,202,1)";
div.style.overflowY = "scroll";
div.style.bottom = "0px";
var body = document.getElementsByTagName("body")[0];
body.appendChild(div);
function log(message){
    var log = document.getElementById("log");
    if(log==undefined)
        return;
    var subdiv = document.createElement("div");
    subdiv.style.display = "inline-block";
    subdiv.style.position = "relative";
    subdiv.style.width = "100%";
    subdiv.style.height = "10px";
    subdiv.style.zIndex = "100";
    subdiv.style.wordWrap = "break-word";
    subdiv.innerHTML = message;
    log.appendChild(subdiv);
    log.appendChild(document.createElement("br"));
}




