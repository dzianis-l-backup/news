var grid = angular.module("gridModu",[]);
function  addZero(number){
    if(number.toString().length==1)
        return '0'+number;
    else return number;
}
var getLastConnection = function(){
    var date = new Date(this.last_connection);
    return "" + addZero(date.getMonth()+1)+"/" + addZero(date.getDate()) +"/"+ (date.getFullYear()) + " "+ addZero(date.getHours())+":" + addZero(date.getMinutes());
}
var users=null;


grid.filter("gridFiltUser",function(){
    return function(massive,scope){

        if(scope.filtUser==undefined || massive ==null)
            return massive;
        else{

                var res =  scope.filtUser.trim()=="" ?  massive : massive.filter(function(item,i,arr){

                    return item.id.toLowerCase().indexOf(scope.filtUser.toLowerCase())>-1;
                });

            return res;
        }
    }});

grid.filter("gridFiltLoca",function(){
    return function(massive,scope){
        if(scope.filtLoca==undefined){
            return massive;
        }
        else{//text is presented
            {//10
                var massive = massive;
                return scope.filtLoca.trim()=="" ?  massive : massive.filter(function(item,i,arr){

                    return item.location.toLowerCase().indexOf(scope.filtLoca.toLowerCase())>-1;
                });
            }
        }
    }});

grid.filter("gridFiltClin",function(){
    return function(massive,scope){
        if(scope.filtClin==undefined || scope.filtClin==null )
            return massive;
        return massive.filter(function(item,i,arr){
            return item.clinic.toLowerCase().indexOf(scope.filtClin.trim().toLowerCase())>-1;
        });
    }});

grid.filter("gridFilterActive",function(){
    return function(massive,scope){
        if(scope.checkboxActive==undefined || scope.checkboxActive==null )
            return massive;
        if(massive==undefined || massive==null )
            return massive;
        if(scope.checkboxActive)
            return massive.filter(function(item,i,arr){
                return item.is_active=="Y";
            });
        else return massive;
        }})



grid.controller("gridCont",["$scope",function($scope){
    //initial quantity of users//$scope.quantity = 10;
    $scope.filtClin = null;//input filtering
    $scope.filtSele = null;//selection from select
    $scope.checkboxActive = false;
    $scope.sortUserAsce= function(){
        var data = $scope.users;
        if(data == null)
            return;
        var ind;
        var res;
        var user;
        var swap;
        var i = 0;
        for(; i < data.length-1 ; ++i){
            user = data[i] ;
            ind = i;
            for(j = i+1 ; j < data.length ; ++j) {
                res = user.id.localeCompare(data[j].id);
                if(res>0){
                   ind = j;
                    user = data[ind];
                }
            }
            swap = data[i];
            data[i] = data[ind];
            data[ind] = swap;

        }
        $scope.users = data;
    };
    $scope.sortUserDesc= function(){

        var data = $scope.users;
        if(data == null)
            return;
        var ind;
        var res;
        var user;
        var swap;
        var i = 0;
        for(; i < data.length-1 ; ++i){
            user = data[i] ;
            ind = i;
            for(j = i+1 ; j < data.length ; ++j) {
                res = user.id.localeCompare(data[j].id);
                if(res<0){
                    ind = j;
                    user = data[ind];
                }
            }
            swap = data[i];
            data[i] = data[ind];
            data[ind] = swap;

        }
        $scope.users = data;
    };
    $scope.sortLocaAsce= function(){

        var data = $scope.users;
        var ind;
        var res;
        var user;
        var swap;
        var i = 0;
        for(; i < data.length-1 ; ++i){
            user = data[i] ;
            ind = i;
            for(j = i+1 ; j < data.length ; ++j) {
                res = user.location.localeCompare(data[j].location);
                if(res>0){
                    ind = j;
                    user = data[ind];
                }
            }
            swap = data[i];
            data[i] = data[ind];
            data[ind] = swap;

        }
        $scope.users = data;
    };
    $scope.sortLocaDesc= function(){

        var data = $scope.users;
        var ind;
        var res;
        var user;
        var swap;
        var i = 0;
        for(; i < data.length-1 ; ++i){
            user = data[i] ;
            ind = i;
            for(j = i+1 ; j < data.length ; ++j) {
                res = user.location.localeCompare(data[j].location);
                if(res<0){
                    ind = j;
                    user = data[ind];
                }
            }
            swap = data[i];
            data[i] = data[ind];
            data[ind] = swap;

        }
        $scope.users = data;
    };
    $scope.sortActiAsce= function(){

        var data = $scope.users;
        var ind;
        var res;
        var user;
        var swap;
        var i = 0;
        for(; i < data.length-1 ; ++i){
            user = data[i] ;
            ind = i;
            for(j = i+1 ; j < data.length ; ++j) {
                res = user.active.toString().localeCompare(data[j].active.toString());
                if(res>0){
                    ind = j;
                    user = data[ind];
                }
            }
            swap = data[i];
            data[i] = data[ind];
            data[ind] = swap;

        }
        $scope.users = data;
    };
    $scope.sortActiDesc= function(){


        var data = $scope.users;
        var ind;
        var res;
        var user;
        var swap;
        var i = 0;
        for(; i < data.length-1 ; ++i){
            user = data[i] ;
            ind = i;
            for(j = i+1 ; j < data.length ; ++j) {
                res = user.active.toString().localeCompare(data[j].active.toString());
                if(res<0){
                    ind = j;
                    user = data[ind];
                }
            }
            swap = data[i];
            data[i] = data[ind];
            data[ind] = swap;

        }
        $scope.users = data;

    };
    $scope.allPatients = [
    ];
    /*$scope.users=[{clinic_id: "WD0001",
        id: "PU0001",
        is_active: "Y",
        last_connection: "2016-04-07T20:08:49.000Z",
        mode: "Clinic"}];*/
    //connection
    var clinic =  window.sessionStorage.getItem("clinic_id");
    if(clinic) {
        clinicName.innerHTML = "Clinic id: "+ clinic;
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
        var dbReq = "SELECT * FROM `_patient` WHERE clinic_id='"+clinic+"'";
        var request = {
            authToken:"234",
            dbReq:dbReq
        }
        xhr.setRequestHeader("Content-Type","application/json");
        var serialized = JSON.stringify(request);
        xhr.send(serialized);
    }
    function success(xhr){
        $scope.users = JSON.parse(xhr.responseText);
        $scope.checkboxActive = true;
        $scope.$apply();
    }
    function error(str){
        alert(str);
    }

    $scope.patients = $scope.allPatients;//.slice(0,$scope.quantity);
    $scope.$watch(function(){return $scope.users},function(newV,oldV){
        if($scope.users)
           return;
    });
    $scope.$watch(function(){return $scope.checkboxActive},function(newV,oldV){
        if($scope.checkboxActive)
            return;
    });


    $scope.$watch(function(){return $scope.filtSele},function(newV,oldV){
        if(newV==undefined || newV == null)
            return;
        $scope.users =  $scope.clinics.filter(function(item,i,arr){
            return item.clinic.toLowerCase().indexOf(newV.clinic.trim().toLowerCase())>-1;
        })[0].users;
    });
    $scope.check = function(patient){
        if(patient==null || patient==undefined)
            return;
            var index =  $scope.getIndex(patient);
            var current = repeat[index].children[1].className;
            if(patient.is_active=="N"){

                repeat[index].children[1].className = "col-1 inactiveDiv";
                repeat[index].children[1].children[0].className = "inactiveP";


            }
            else{
                repeat[index].children[1].className = "col-1  activeDiv";
                repeat[index].children[1].children[0].className = "activeP"
            }
        return patient.is_active;


    }
    $scope.getIndex = function(patient) {
        for (i = 0; i < $scope.users.length; ++i) {
            if ($scope.users[i].id == patient.id) {
                return i;
            }
            ;
        }
    }
    $scope.active = function(bool,patient){
        var index = $scope.getIndex(patient);
        var current = repeat[index].children[1].className;
        if(!bool){

            repeat[index].children[1].className = "col-1 inactiveDiv";
            repeat[index].children[1].children[0].className = "inactiveP";
            return "Inactive";

        }
        else{
            repeat[index].children[1].className = "col-1 activeDiv";
            repeat[index].children[1].children[0].className = "activeP";
            return "Active";
        }

    }
    $scope.processDate = function(date){
      if(date == undefined)
        return;
        if(date=="0000-00-00 00:00:00")
            return "not defined";
        var res = '';
        var dateArray = date.split("-");
        res += " "+dateArray[0]+"-"+ dateArray[1]+"-";
        var date = dateArray[2].split("T");
        res+=date[0]+" ";
        var time = date[1].split(".");
        res+=time[0]+" ";
        return res;
    }



}]);

var leftUser = function(self){
    self.style.textAlign = "left";
}
var centerUser = function(self) {
    self.style.textAlign = "center";
    self.placeholder = "user id";
    self.style.border = "3px solid transparent";
}

function redirectUserId(e){
    if(e.target.className!="ng-binding userText")
        return;
    sessionStorage.setItem("patient_id",e.target.innerHTML);
    redirect("user.html");
}
newUser.onclick = function(){
    redirect("signUp.html");
}
therapist.onclick = function(){
    redirect("oops.html");
}


