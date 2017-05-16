var leftLogin = function(self){
    self.style.textAlign = "left";
    self.placeholder = "";
    self.style.border = "3px solid #2073d1";
    self.style.color = "#2073b1";
    self.style.backgroundColor = "transparent";

}
var centerLogin = function(self){
    self.style.textAlign = "center";
    self.placeholder = "Login";
    self.style.color = "#2073b1";
    self.style.border = "3px solid transparent";
    self.style.backgroundColor = "#e3e4dc";
}
var leftPassword = function(self){
    self.style.textAlign = "left";
    self.placeholder = "";
    self.style.border = "3px solid #2073d1";
    self.style.color = "#2073b1";
    self.style.backgroundColor = "transparent";

}
var centerPassword= function(self){
    self.style.textAlign = "center";
    self.placeholder = "Password";
    self.style.color = "#2073b1";
    self.style.border = "3px solid transparent";
    self.style.backgroundColor = "#e3e4dc";
}
var submitOn = function(self){
    self.style.marginTop= "20px";
    self.style.paddingTop = "10px";
    self.style.paddingBottom = "10px";
    self.style.width = "234px";
    self.style.color = "#2073d1";
    self.style.backgroundColor = "#fff";
    self.style.border = "3px solid transparent";
    self.style.cursor = "pointer";
}
var submitOff = function(self){
    self.style.color = "#2073d1";
    self.style.border = "3px solid transparent";
    self.style.backgroundColor = "#e3e4dc";
    self.style.cursor = "auto";
}
var submitOver = function(self){
    self.style.marginTop= "20px";
    self.style.paddingTop = "10px";
    self.style.paddingBottom = "10px";

    self.style.width = "234px";

    self.style.color = "#54b433";
    self.style.border = "3px solid transparent";
    self.style.backgroundColor = "#ffffff";
}
var submitOut = function(self){
    self.style.marginTop= "20px";
    self.style.paddingTop = "10px";
    self.style.paddingBottom = "10px";
    self.style.width = "234px";
    self.style.color = "#fff";
    self.style.backgroundColor = "#54b433";
    self.style.border = "3px solid transparent";
}
submit.onclick= function(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST","http://46.101.128.92:3001/api/db_query" ,true);
    xhr.onreadystatechange = function(){
        if(this.readyState!=4)
            return;
        else {
            if (this.status == 200 && this.readyState==4)
                success(this);
            else error(this.responseText)
        }
    }
    xhr.timeout = 30000;
    xhr.ontimeout = function(){
        error(this.responseText);
    }
    var dbReq = "SELECT `clinic_user_name`, `clinic_id` FROM `clinic_credentials` WHERE clinic_user_name='"+login.value+"' and password='"+password.value+"'";
    var request = {
        authToken:"234",
        dbReq:dbReq
    }
    xhr.setRequestHeader("Content-Type","application/json");
    var serialized = JSON.stringify(request);
    xhr.send(serialized);
}
function success(xhr){
    var responseText = JSON.parse(xhr.responseText)[0];
    if(responseText == undefined)
        return;
    sesionStrg = window.sessionStorage;
    var cl = responseText["clinic_id"];
    sesionStrg.setItem('clinic_id',cl);
    var a = document.createElement("a");
    a.href="grid.html";
    document.getElementsByTagName("body")[0].appendChild(a);
    a.click();
}
function error(str){
    alert(str);
}