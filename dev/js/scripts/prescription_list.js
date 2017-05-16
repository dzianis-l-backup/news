function Prescription(name,repetitions,stage,level,activeTime){
    this.name = name;
    this.repetitions = repetitions;
    this.stage = stage;
    this.level = level;
    this.activeTime = activeTime;
}
function addZero(num){
    str = num.toString()
    if(str.length == 1)
        str = '0' + str;
    return str;
}
function addNumber(obj,arr){
    obj.number = arr.length+1;
    return obj;
}
function changeNumber(arr){
   for(i=0;i<arr.length;++i){
       arr[i].number = i+1;
   }
}
var prescApp = angular.module("prescApp",[]);
prescApp.controller("prescController",['$scope',function($scope){

    $("#calendar").datepicker({dateFormat:"yyyy-mm-dd",
        onSelect: function(dateText) {
            var date = $(this).datepicker('getDate');
            document.getElementById("date").innerHTML= addZero(date.getFullYear())+"-"+addZero(date.getMonth()+1)+"-"+addZero(date.getDate());
            getPrescription($scope);
        }

    });

    $scope.i = 0;
    $scope.prescription_list = [

    ];
    $scope.patient_id = sessionStorage.getItem("patient_id") == undefined ? "no patient": sessionStorage.getItem("patient_id") ;
    $scope.gameNameList = [];
    $scope.gameNameSelect = function(scope){
        if($scope.prescription_list.length>=4){
            var id = document.getElementById("games");
            if(id==undefined)
                return;
            var pannel = document.createElement("div");
            pannel.style.width = id.offsetWidth+"px";
            pannel.style.height = id.offsetHeight+"px";
            pannel.style.top = 0;
            pannel.style.left = 0;
            pannel.style.backgroundColor = "rgba(150,150,150,0.5)";
            pannel.style.position="absolute";
            pannel.id = "pannelGame";
            pannel.style.zIndex="10";
            id.appendChild(pannel);

        }
        if($scope.prescription_list.length<5) {
            var gameName = scope.gameName;
            $scope.prescription_list.push(addNumber({
                name: gameName,
                repetitions: 0,
                stage: 0,
                level: 0,
                activeTime:0
            }, $scope.prescription_list));
        }

    };
    $scope.gameRemove = function(scope){

        var pannelGame = document.getElementById("pannelGame");
        if(pannelGame!=undefined){
            pannelGame.parentElement.removeChild(pannelGame);
        }




        var num = scope.game.number;
        for(i=0;i<$scope.prescription_list.length ;++i){
            if($scope.prescription_list[i].number==num) {
                $scope.prescription_list.splice(i,1);
                changeNumber($scope.prescription_list);
                var pannel = document.getElementById((scope.game.number+1)+"pannel");
                if(pannel==undefined)
                    return;
                pannel.parentElement.removeChild(pannel);
            }
        }
    };
    $scope.submit = function(scope){
        //number in id

    };

    $scope.edit = function(scope){
        //number in id
        var list = document.getElementById("listContainer");
        if(list==undefined)
            return;
        var edit = document.getElementById("edit");
        if(edit==undefined)
            return;
        edit.style.display="none";
        var pannelList = document.getElementById("pannelList");
        if(pannelList==undefined)
            return;
        pannelList.parentElement.removeChild(pannelList);

    };
    $scope.validate = function(str){
        if(str == undefined)
            return;
        var s = str.toString();

        var m = s.trim().match(/\D/im);
        if(m)
            return " ";
        return s;

    };
    $scope.requestForGames = function(){
        var patient = sessionStorage.getItem("patient_id");
        if(patient==undefined)
            return;
        var xhr = new XMLHttpRequest();
        xhr.open("POST","http://46.101.128.92:3001/api/db_query" ,true);
        xhr.onreadystatechange = function(){
            if(this.readyState!=4)
                return;
            else {
                if (this.status == 200)
                    success(this);
                else error(this.responseText)
            }
        }
        xhr.timeout = 30000;
        xhr.ontimeout = function(){
            error();
        }
        var dbReq = "SELECT * from games";
        var request = {
            authToken:"234",
            dbReq:dbReq
        }
        xhr.setRequestHeader("Content-Type","application/json");
        var serialized = JSON.stringify(request);
        xhr.send(serialized);

        function success(obj){
            var responseText = obj.responseText;
            var gameNameList = JSON.parse(responseText)[0];
            var keys = Object.keys(gameNameList);
            for(i=0;i<keys.length;++i)
                $scope.gameNameList.push(gameNameList[keys[i]]);
            $scope.$digest();
        }
        function error(){
            alert("no games loaded...")
        }
    }
    $scope.createPrescription = function(){
        deleteOldPrescription($scope);
    }
    $scope.requestForGames();
    getPrescription($scope);

}]);

(function(){
    var date = new Date();
    document.getElementById("date").innerHTML = addZero(date.getFullYear())+"-"+addZero(date.getMonth()+1)+"-"+addZero(date.getDate());
})()


function createPrescriptionQuery(obj){
    var patient = sessionStorage.getItem("patient_id");
    if(patient==undefined)
        return;
    if(obj.length==0)
        return;
    if(document.getElementById("date").innerHTML==undefined ||document.getElementById("date").innerHTML=="")
        return;
    var query="INSERT INTO  `exercise_list` (  `date` ,  `patient_id` ,  `exercise_id` ,  `game_name` ,  `cycles` ,  `stage` ,  `level`, `active_time` )  ";
    query+=" VALUES ( '"+ document.getElementById("date").innerHTML+"',  '"+patient+"',  '"+obj[0].number+"',  '"+obj[0].name+"',  '"+obj[0].repetitions+"',  '"+obj[0].stage+"',  '"+obj[0].level+"' ,  '"+obj[0].activeTime+"'   )";

    for(i=1;i<obj.length;++i){
        query+=",  ( '"+ document.getElementById("date").innerHTML+"',  '"+patient+"',  '"+obj[i].number+"',  '"+obj[i].name+"',  '"+obj[i].repetitions+"',  '"+obj[i].stage+"',  '"+obj[i].level+"' ,  '"+obj[i].activeTime+"'   )";

    }
    return query;

}

function changeScreen(){


    //var elm = document.getElementById("prescription");
    //var newone = elm.cloneNode(true);
    //elm.parentNode.replaceChild(newone, elm);
}
window.onkeypress = function(e){
    if(e.which == 13)
    submit.click();
}
function getPrescription($scope){
    var patient = sessionStorage.getItem("patient_id");
    if(patient==undefined)
        return;
    var date = document.getElementById("date").innerHTML;
    if(date==undefined)
        return;
    if(patient==undefined)
        return;

    var xhr = new XMLHttpRequest();
    xhr.open("POST","http://46.101.128.92:3001/api/db_query" ,true);
    xhr.onreadystatechange = function(){
        if(this.readyState!=4)
            return;
        else {
            if (this.status == 200)
                success(this);
            else error(this.responseText)
        }
    }
    xhr.timeout = 30000;
    xhr.ontimeout = function(){
        error();
    }
    var dbReq = "SELECT * FROM `exercise_list` where `date`='"+date+"' and patient_id='"+patient+"' order by `exercise_id` asc";
    var request = {
        authToken:"234",
        dbReq:dbReq
    }
    xhr.setRequestHeader("Content-Type","application/json");
    var serialized = JSON.stringify(request);
    xhr.send(serialized);

    function success(obj){
        var responseText = obj.responseText;
        var prescription_list = JSON.parse(responseText);
        $scope.prescription_list = prescription_list.map(function(item){
           return new Prescription(item.game_name,item.cycles,item.stage,item.level,item.active_time);
        });
        changeNumber($scope.prescription_list);
        $scope.$digest();
    }
    function error(){
        alert("no games loaded...")
    }
}


function deleteOldPrescription($scope){
    var patient = sessionStorage.getItem("patient_id");
    if(patient==undefined)
        return;
    var date = document.getElementById("date").innerHTML;
    if(date==undefined)
        return;


    var xhr = new XMLHttpRequest();
    xhr.open("POST","http://46.101.128.92:3001/api/db_query" ,true);
    xhr.onreadystatechange = function(){
        if(this.readyState!=4)
            return;
        else {
            if (this.status == 200)
                success(this,$scope);
            else error(this.responseText)
        }
    }
    xhr.timeout = 30000;
    xhr.ontimeout = function(){
        error();
    }
    var dbReq = "DELETE FROM `exercise_list` where `date`='"+date+"' and patient_id='"+patient+"' ";
    var request = {
        authToken:"234",
        dbReq:dbReq
    }
    xhr.setRequestHeader("Content-Type","application/json");
    var serialized = JSON.stringify(request);
    xhr.send(serialized);

    function success(obj,$scope){
        alert('old deleted');
        pastePrescription($scope);
    }
    function error(){
        alert("no games loaded...")
    }
}
function pastePrescription($scope){

    var patient = sessionStorage.getItem("patient_id");
    if(patient==undefined)
        return;
    if($scope.prescription_list.length==0){
        alert("no data in presription list");
        return;
    }
    var strQuery = createPrescriptionQuery($scope.prescription_list);
    var xhr = new XMLHttpRequest();
    xhr.open("POST","http://46.101.128.92:3001/api/db_query" ,true);
    xhr.onreadystatechange = function(){
        if(this.readyState!=4)
            return;
        else {
            if (this.status == 200)
                success();
            else error()
        }
    }
    xhr.timeout = 30000;
    xhr.ontimeout = function(){
        error(this.responseText);
    }

    var dbReq = strQuery;
    var request = {
        authToken:"234",
        dbReq:dbReq
    }
    xhr.setRequestHeader("Content-Type","application/json");
    var serialized = JSON.stringify(request);
    xhr.send(serialized);

    function success(){
        alert("success");
        $("#left").fadeOut(400);
        var id = document.getElementById("listContainer");
        var pannel = document.createElement("div");
        pannel.style.width = id.offsetWidth+"px";
        pannel.style.height = id.offsetHeight+"px";
        pannel.style.top = 0;
        pannel.style.left = 0;
        pannel.style.backgroundColor = "rgba(150,150,150,0.5)";
        pannel.style.position="absolute";
        pannel.id = "pannelList";
        pannel.style.zIndex="10";

        var edit = document.getElementById("edit");
        if(edit==undefined)
            return;
        edit.style.display = "inline-block";
        id.appendChild(pannel);
        $("#left").fadeIn(400);
    }
    function error(){
        alert("prescription creation failed...");
    }
}

(function(){
    back.innerHTML = (sessionStorage.getItem("patient_id")==undefined?"":sessionStorage.getItem("patient_id"));
    back.onclick = function(){
        redirect("./user.html");
}})()
