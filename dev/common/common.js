function redirect(url){
    var a = document.createElement("a");
    var body  = document.getElementsByTagName("body")[0];
    a.href = url;
    body.appendChild(a);
    a.click();
}
function clearSessionStorageAndCookie(){
    document.cookie="";
    var session = sessionStorage;
    var i = session.length;
    while(i){

        var key = session.key(i-1);
        session.removeItem(key);
        --i;
    }
}
log_out.onclick = function(){
    clearSessionStorageAndCookie();
    redirect("index.html");
}