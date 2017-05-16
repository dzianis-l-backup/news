var left = function(self){
    self.style.textAlign = "left";
    self.placeholder = "";
    self.style.border = "3px solid #e3e4dc";
    self.style.backgroundColor =  "rgba(138,138,138,0.3)";

}
var center = function(self){
    self.style.textAlign = "center";
    self.placeholder = self.id.toUpperCase();
    self.style.border = "3px solid transparent";
    self.style.backgroundColor = "#e3e4dc";

}
var submitOn = function(self){
    self.style.marginTop= "20px";
    self.style.paddingTop = "10px";
    self.style.paddingBottom = "10px";
    self.style.width = "234px";
    self.style.color = "#54b433";
    self.style.backgroundColor = "#fff";
    self.style.border = "3px solid transparent";
    self.style.cursor = "pointer";
}
var submitOff = function(self){
    self.style.color = "#fff";
    self.style.border = "3px solid transparent";
    self.style.backgroundColor = "#54b433";
    self.style.cursor = "auto";
}
function make4Digits(digit){
    var str = (digit+"").length;
    switch(str){
        case 1:
            digit = "000"+digit;
            return digit;
            break;
        case 2:
            digit = "00"+digit;
            return digit;
            break;
        case 3:
            digit = "0"+digit;
            return digit;
            break;
        case 4:
            digit = ""+digit;
            return digit;
            break;
    }
}
function detecFromCharToIndex(ind){
    switch(ind){
        case 'A':
            return 0;
            break;
        case 'B':
            return 1;
            break;
        case 'C':
            return 2;
            break;
        case 'D':
            return 3;
            break;
        case 'E':
            return 4;
            break;
        case 'F':
            return 5;
            break;
        case 'G':
            return 6;
            break;
        case 'H':
            return 7;
            break;
        case 'I':
            return 8;
            break;
        case 'J':
            return 9;
            break;
        case 'K':
            return 10;
            break;
        case 'L':
            return 11;
            break;
        case 'M':
            return 12;
            break;
        case 'N':
            return 13;
            break;
        case 'O':
            return 14;
            break;
        case 'P':
            return 15;
            break;
        case 'Q':
            return 16;
            break;
        case 'R':
            return 17;
            break;
        case 'S':
            return 18;
            break;
        case 'T':
            return 19;
            break;
        case 'U':
            return 20;
            break;
        case 'V':
            return 21;
            break;
        case 'W':
            return 22;
            break;
        case 'X':
            return 23;
            break;
        case 'Y':
            return 24;
            break;
        case 'Z':
            return 25;
            break;
        default:
            return -1;
    }
}
function detectFromIndexToChar(char){
    switch(char){
        case 0:
            return 'A';
            break;
        case 1:
            return 'B';
            break;
        case 2:
            return 'C';
            break;
        case 3:
            return 'D';
            break;
        case 4:
            return 'E';
            break;
        case 5:
            return 'F';
            break;
        case 6:
            return 'G';
            break;
        case 7:
            return 'H';
            break;
        case 8:
            return 'I';
            break;
        case 9:
            return 'J';
            break;
        case 10:
            return 'K';
            break;
        case 11:
            return 'L';
            break;
        case 12:
            return 'M';
            break;
        case 13:
            return 'N';
            break;
        case 14:
            return 'O';
            break;
        case 15:
            return 'P';
            break;
        case 16:
            return 'Q';
            break;
        case 17:
            return 'R';
            break;
        case 18:
            return 'S';
            break;
        case 19:
            return 'T';
            break;
        case 20:
            return 'U';
            break;
        case 21:
            return 'V';
            break;
        case 22:
            return 'W';
            break;
        case 23:
            return 'X';
            break;
        case 24:
            return 'Y';
            break;
        case 25:
            return 'Z';
            break;
        default:
            return -1;
            break;
    }
}
var signUp = angular.module("signUp",[]);
signUp.controller("signUpController",function($scope){
    $scope.$watch(function(){return $scope.firstname},function(newV,oldV){
        if(!newV)
            return;
        var res = newV.match(/[^\s]{1,}/i);
        if(!res)
            return;
        else $scope.firstNameIsValid = (res[0]==newV);

    });
    $scope.$watch(function(){return $scope.middlename},function(newV,oldV){
        if(!newV)
            return;
        var res = newV.match(/[^\s]{1,}/i);
        if(!res)
            return;
        else $scope.middlenameIsValid = (res[0]==newV);

    });
    $scope.$watch(function(){return $scope.lastname},function(newV,oldV){
        if(!newV)
            return;
        var res = newV.match(/[^\s]{1,}/i);
        if(!res)
            return;
        else $scope.lastnameIsValid = (res[0]==newV);

    });
    $scope.$watch(function(){return $scope.birthdate},function(newV,oldV){
        /*if(!newV)
            return;
        var res = newV.match(/\d{2}[.\/-]\d{2}[.\/-]\d{4}/i);
        if(!res)
            return;
        else $scope.birthdateIsValid = (res[0]==newV);*/

    });
    $scope.$watch(function(){return $scope.phonenumber},function(newV,oldV){
        if(!newV)
            return;
        var res = newV.match(/\d{1,}/i);
        if(!res)
            return;
        else $scope.phonenumberIsValid = (res[0]==newV);

    });
    $scope.$watch(function(){return $scope.injury},function(newV,oldV){
        if(!newV)
            return;
        var res = newV.match(/[\w\d\s]{1,}/i);
        if(!res)
            return;
        else $scope.injuryIsValid = (res[0]==newV);

    });
    $scope.$watch(function(){return $scope.dateincidence},function(newV,oldV){
        if(!newV)
            return;
        if(newV.getTime()>new Date().getTime())
            $scope.dateincidenceIsValid = false;

    });
    $scope.$watch(function(){return $scope.nameChecked},function(newV,oldV){
        if($scope.mode=="Clinic"){
            $scope.nameChecked=true;
            displayName.innerHTML="Mentor Pro User";
            return;
        }
        if(newV) {
            displayName.innerHTML = "Mentor Pro User";
        }
        if(!newV){
            displayName.innerHTML=($scope.firstname== undefined ? "": $scope.firstname) + " " + ($scope.lastname== undefined ? "": $scope.lastname);
        }
    });
    $scope.$watch(function(){return $scope.mode},function(newV,oldV) {

        if (newV == "Clinic") {
            $scope.nameChecked = true;
            displayName.innerHTML = "Mentor Pro User";
        }
    });
    $scope.$watch(function(){return $scope.firstname +" "+$scope.lastname},function(newV,oldV){
        if(newV==undefined)
            return;
        if($scope.firstname==undefined)
            $scope.firstname = "";
        if($scope.lastname==undefined)
            $scope.lastname = "";

        if($scope.mode=="Clinic"||$scope.nameChecked==true) {
            displayName.innerHTML = "Mentor Pro User";
            return;
        }
        if($scope.nameChecked){
            displayName.innerHTML = "Mentor Pro User";
        }//true
        else{
            displayName.innerHTML=($scope.firstname== undefined ? "": $scope.firstname) + " " + ($scope.lastname== undefined ? "": $scope.lastname);
        }

    });
    /*$scope.$watch(function(){return $scope.passwordChecked},function(newV,oldV){
        if(newV)
            password.style.backgroundColor =   confirmPassword.style.backgroundColor  ="#e3e4dc";
            password.style.color =   confirmPassword.style.color  = "#000";
            password.placeholder ="password";  confirmPassword.placeholder  = "confirmpassword";
        if(!newV){
            password.style.backgroundColor =   confirmPassword.style.backgroundColor  ="transparent";
            password.style.color =   confirmPassword.style.color  = "transparent";
            password.placeholder =   confirmPassword.placeholder  = "";
        }
    });*/
});
submit.onclick=transaction1
;
function transaction1(){


    var session = window.sessionStorage;
    var pas = session.getItem("password");
    var id = session.getItem("id");
    var clinic_id = session.getItem("clinic_id");
    if(!id || !clinic_id || !pas) {
        alert("No data about clinic");
        return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open("POST","http://46.101.128.92:3001/api/db_query" ,true);
    xhr.onreadystatechange=function(){
        if(xhr.readyState == 4){
            if(xhr.status==200) {
                alert('transaction1 - OK');
                transaction2();
            }
            if(xhr.status!=200)
                alert('bad');
        }
    };

    xhr.timeout = 30000;
    xhr.ontimeout = function(){
        alert("bad");
    }
    var dbReq = "INSERT INTO `_patient`(`id`, `is_active`, `clinic_id`, `mode`, `last_connection`) VALUES ('"+sessionStorage.getItem("id")+"','Y','"+sessionStorage.getItem("clinic_id")+"','"+mode.value+"','1970-04-07 00:00:00') ";
    var request = {
        authToken:"234",
        dbReq:dbReq
    }
    xhr.setRequestHeader("Content-Type","application/json");
    var serialized = JSON.stringify(request);
    xhr.send(serialized);
};
function transaction2(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST","http://46.101.128.92:3001/api/db_query" ,true);
    xhr.onreadystatechange=function(){
        if(xhr.readyState == 4){
            if(xhr.status==200) {
                alert('transaction2 - OK');
                transaction3();
                selectIdAndUser_Name();

            }
            if(xhr.status!=200)
                alert('bad');
        }
    };
    xhr.timeout = 30000;
    xhr.ontimeout = function(){
        alert("bad");
    }
    var dbReq = "INSERT INTO  `patient_credentials` ( `patient_id`, `user_name`,`password`) VALUES (  '"+sessionStorage.getItem("id")+"', '"+sessionStorage.getItem("user_name")+"',  '"+sessionStorage.getItem('password')+"')  ";

    var request = {
        authToken:"234",
        dbReq:dbReq
    }
    xhr.setRequestHeader("Content-Type","application/json");
    var serialized = JSON.stringify(request);
    xhr.send(serialized);

}
function transaction3(){
    var xhr = new XMLHttpRequest();
    xhr.open("POST","http://46.101.128.92:3001/api/db_query" ,true);
    xhr.onreadystatechange=function(){
        if(xhr.readyState == 4){
            if(xhr.status==200) {
                alert('transaction3 - OK');
            }
            if(xhr.status!=200)
                alert('bad');
        }
    };
    xhr.timeout = 30000;
    xhr.ontimeout = function(){
        alert("bad");
    }
    var user = {
        firstName:firstName.value,
        middleName:middleName.value,
        lastName:lastName.value,
        birthdate:birthdate.value,
        phoneNumber:phoneNumber.value,
        injury:injury.value,
        dateIncidence:dateIncidence.value,
        affectedSide:document.getElementById('affectedSide').children[document.getElementById('affectedSide').selectedIndex].value,
        dominantSide:document.getElementById('dominantSide').children[document.getElementById('dominantSide').selectedIndex].value,
        mode:mode.value,
        displayName:displayName.innerHTML,
        id:sessionStorage.getItem("id"),
        password:sessionStorage.getItem("password"),
        clinic_id:sessionStorage.getItem("clinic_id")
    }

    var dbReq =  "INSERT INTO `patient_details`(`id`, `first_name`, `middle_name`, `last_name`, `birthdate`, `phone_number`, `injury`, `date_of_incidence`, `affected_side`, `dominant_side`, `mode`,`display_name`) VALUES ('"+user.id+"','"+user.firstName+"','"+user.middleName+"','"+user.lastName+"','"+user.birthdate+"','"+user.phoneNumber+"','"+user.injury+"','"+user.dateIncidence+"','"+user.affectedSide+"','"+user.dominantSide+"','"+user.mode+"','"+user.displayName+"')";
    var request = {
        authToken:"234",
        dbReq:dbReq
    }
    xhr.setRequestHeader("Content-Type","application/json");
    var serialized = JSON.stringify(request);
    xhr.send(serialized);
}



function iterateId(responseText){
    var number = responseText.substr(2,4);
    var text = responseText.substr(0,2);
    number = new Number(number);
    var newId;
    if(number>=9999) {
        number = "0000";
        var _2 = detecFromCharToIndex(text[1]);
        var _2 = new Number(_2)+1;
        if (_2 == 26){
            _2=0;
            var _1L ='A';
            var _1 = detecFromCharToIndex(text[0]);
            _1 = _1 + 1;
            var _0L =  detectFromIndexToChar(_1);
            newId = _0L + _1L + make4Digits(number);
        }
        else{
            var _0L =text[0];
            var _1L = detectFromIndexToChar(_2);
            newId = _0L + _1L + make4Digits(number);
        }


    }
    else {
        ++number;
        newId = text +  make4Digits(number);
    }
    return newId;
}


function iterateUser_name(responseText){
    var number = responseText.substr(5);
    var text = responseText.substr(0,5);
    number = new Number(number);
    number=number+1;
    return text+number;
}



function fillInputFields(){
    var session = sessionStorage;
    clinic_id.value = session.getItem("clinic_id");
    user_id.value =  session.getItem("id");
    user_name.value = session.getItem("user_name");
    password.value = session.getItem("password");
}







function selectIdAndUser_Name(){// 2 selects
    var session = window.sessionStorage;
    var clinic_id = session.getItem("clinic_id");
    if(!clinic_id){
        alert("No clinic_id");
        return;
    }
    //////
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
    var dbReq = "SELECT  MAX(id) as id, MAX(user_name) as user_name FROM `_patient`  INNER JOIN `patient_credentials`";
    var request = {
        authToken:"234",
        dbReq:dbReq
    }
    xhr.setRequestHeader("Content-Type","application/json");
    var serialized = JSON.stringify(request);
    xhr.send(serialized);

    function success(obj){
        var responseText = obj.responseText;
        var id = JSON.parse(responseText)[0]["id"];//the only json obj
        var user_name = JSON.parse(responseText)[0]["user_name"];
        sessionStorage.setItem('id',iterateId(id));
        sessionStorage.setItem('user_name',iterateId(user_name));
        sessionStorage.setItem('password',"AAAAAA");
        fillInputFields();
        //insertFormData(newId,window.sessionStorage.getItem("clinic_id"));//id, clinic_id
    }
    function error(){
        alert("Id cannot be accessed...")
    }

}

selectIdAndUser_Name();
back.innerHTML = (sessionStorage.getItem("clinic_id")==undefined?"":sessionStorage.getItem("clinic_id"));
back.onclick = function(){
    redirect("grid.html");
}
