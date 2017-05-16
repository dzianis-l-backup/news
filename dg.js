///
///data-generator = dg
///


var app = angular.module('dg',['ngSanitize']);
///
///controllers
///
app.controller('dgctrl',function($scope,$timeout,$rootScope){

	var pattern = /^\s*-?\d+$/gmi;
		
	var SETTINGS = initializeSettings();
	///
	///data load procedures
	///
	databaseQueries(SETTINGS ,$scope );//currentSession , masSession , games
	$scope.users = SETTINGS.users; // users
	$scope.distributions = SETTINGS.distributions; // users
	$scope.clear = function(scope){
		//scope.$digest();
	};
	$scope.generate = generate;
	$scope.dataBlocksTwo = [
	
	];

	///
	///model section
	///

	$scope.dataBlocksOne = [
	{
		id:'angleMin',

		idForRange:'angleMax',
		
		text:'Angle min',
		
		model:'',

		isValid:false,

		pattern:pattern,

		min:-20,

		max:90
		
	},
	{
	
		id:'angleMax',

		idForRange:'angleMin',
	
		text:'Angle max',
		
		model:'',

		isValid:false,

		pattern:pattern,

		min:-20,

		max:90
	},
	{
		id:'minScore',

		idForRange:'maxScore',
	
		text:'Min score',
		
		model:'',

		isValid:false,

		pattern:pattern,

		min:0,

		max:1500
	
	},
	{
		
		id:'maxScore',

		idForRange:'minScore',	
		
		text:'Max score',
		
		model:'',

		isValid:false,

		pattern:pattern,

		min:0,

		max:1500
	},
		
	{
		id:'gameSessionsMin',

		idForRange:'gameSessionsMax',	
		
		text:'Times per day min',
		
		model:'',

		isValid:false,

		pattern:pattern,

		min:0,

		max:10
		
	},
	{
		
		id:'gameSessionsMax',

		idForRange:'gameSessionsMin',
		
		text:'Times per day max',
		
		model:'',

		isValid:false,

		pattern:pattern,

		min:0,

		max:10
	},

	
	
	{
		id:'activeTimeMin',

		idForRange:'activeTimeMax',

		text:'Active time(minutes) min',
		model:'',

		isValid:false,

		pattern:pattern,

		min:0,

		max:1440
	},
	{
		id:'activeTimeMax',

		idForRange:'activeTimeMin',

		text:'Active time(minutes) max',

		model:'',

		isValid:false,

		pattern:pattern,

		min:0,

		max:1440
	},
	{
		id:'stage',
		text:'Stage',
		model:'',

		isValid:false,

		pattern:pattern,

		min:0,

		max:10
	},
	{
		id:'level',
		text:'Level',
		model:'',

		isValid:false,

		pattern:pattern,

		min:0,

		max:10
	},
	];


	$scope.startDate = {
    	startDate:"",				
    	isValid:false
	}

	$scope.days = {
    	days:"",				
    	isValid:false
	}

	$scope.selectedGame = {
    	selectedGame:"",				
    	isValid:false
	}

	$scope.selectedUser = {
    	selectedUser:"",				
    	isValid:false
	}


	$scope.mon = {
		index:1,
		isChecked:true
	};
	$scope.tue = {
		index:2,
		isChecked:true
	};
	$scope.wed = {
		index:3,
		isChecked:true
	};
	$scope.thu = {
		index:4,
		isChecked:true
	};
	$scope.fri = {
		index:5,
		isChecked:true
	};
	$scope.sat = {
		index:6,
		isChecked:true
	};
	$scope.sun = {
		index:0,
		isChecked:true
	};

	$scope.logs = [];

	$scope.mon.isChecked = $scope.tue.isChecked = $scope.wed.isChecked = $scope.thu.isChecked = $scope.fri.isChecked = $scope.sat.isChecked = $scope.sun.isChecked = true;

	$scope.removeOldData = true;
	
    $scope.validate = function(scope){
    	var m = validateData(scope.data.model,scope.data.pattern);//if data entered correctly
    	var value;
    	if(m!==null){

    		if(validateLimits(m,scope.data.min,scope.data.max)){//if the data are in the limits range
    			
    			scope.data.isValid = true;//if valid
    		}

    		else scope.data.isValid = false;// if limits
    	}
    	
    	else{

			scope.data.isValid = false; //if null

    	}
    	
    };

    $scope.startDateChanged = function(){
    	document.getElementById("startDate").setAttribute("style","border:1px solid green;width:200px;");
		$scope.startDate.isValid = true;
    }


	$scope.$watch('days.days', function (newValue, oldValue) {
	   	var m = $scope.days.days.match(/^\s*\d+$/gmi);
    	var value;
    	if(m!==null){
    		value = m[0].replace(/ /gm,"");
    		if(value > 0 && value < 32)
    			$scope.days.isValid = true;
    		else $scope.days.isValid = false;
    	}
    	else{
			$scope.days.isValid = false;
    	}
    		
   		}, true);

	$scope.$watch('selectedGame.selectedGame', function (newValue, oldValue) {
		if(newValue =="" && oldValue==""){
			document.getElementById("game").setAttribute("style","border:1px solid red;");
			$scope.selectedGame.isValid = false;
		}			
		
		else {
			document.getElementById("game").setAttribute("style","border:1px solid green;");
			$scope.selectedGame.isValid = true;
		}
	  }, true);

	$scope.$watch('selectedUser.selectedUser', function (newValue, oldValue) {
		if(newValue =="" && oldValue==""){
			document.getElementById("user").setAttribute("style","border:1px solid red;");
			$scope.selectedUser.isValid = false;
		}
		else{
			document.getElementById("user").setAttribute("style","border:1px solid green;");
			$scope.selectedUser.isValid = true;
		}
		
	  }, true);

	$scope.$watch('startDate.startDate', function (newValue, oldValue) {
		if(newValue =="" && oldValue==""){
			document.getElementById("startDate").setAttribute("style","border:1px solid red;width:200px;");
			$scope.startDate.isValid = false;
		}
		else {
			document.getElementById("startDate").setAttribute("style","border:1px solid green;width:200px;");
			$scope.startDate.isValid = true;
		}
		
	  }, true);

	
});
///
///funtions declared in controller
///

function generate(scope){

	///
	///Validation ended
	///
	var validationLog = summaryValidation(scope);

	if(validationLog instanceof Array){
		scope.logs.push({message:"<br>"+new Date().toString()+"<br>",success:false});
		for(i=0;i<validationLog.length;++i){
			scope.logs.push({message:"<br>"+ validationLog[i].message,success:false});
		}		
		return;
	}
	else{
		scope.logs.push({message:"<br>"+new Date().toString()+"<br>"+ validationLog.message,success:true});
	}
	


	var d = document;
	var requestObject = {};
	for(i=0;i<scope.dataBlocksTwo.length;++i){
		//alert(d.getElementById(scope.dataBlocksTwo[i].id1).value);
		//alert(d.getElementById(scope.dataBlocksTwo[i].id2).value);
		requestObject[scope.dataBlocksTwo[i].id1] = d.getElementById(scope.dataBlocksTwo[i].id1).value;
		requestObject[scope.dataBlocksTwo[i].id2] = d.getElementById(scope.dataBlocksTwo[i].id2).value;

	}
	for(i=0;i<scope.dataBlocksOne.length;++i){
		//alert(d.getElementById(scope.dataBlocksOne[i].id).value);
		requestObject[scope.dataBlocksOne[i].id] = d.getElementById(scope.dataBlocksOne[i].id).value;
	}
	var gameIndex = d.getElementById('game').selectedIndex;
	var gameOptions = d.getElementById('game').options;
	requestObject. game = gameOptions[gameIndex].text;

	var userIndex = d.getElementById('user').selectedIndex;
	var userOptions = d.getElementById('user').options;
	requestObject. user = userOptions[userIndex].text;

	requestObject. days = d.getElementById('days').value;
	requestObject. startDate = d.getElementById('startDate').value;

	///
	///bad way, baaaad
	///

	requestObject.daysToReject = [];
	if(!scope.mon.isChecked)
		requestObject.daysToReject.push(scope.mon.index);
	if(!scope.tue.isChecked)
		requestObject.daysToReject.push(scope.tue.index);
	if(!scope.wed.isChecked)
		requestObject.daysToReject.push(scope.wed.index);
	if(!scope.thu.isChecked)
		requestObject.daysToReject.push(scope.thu.index);
	if(!scope.fri.isChecked)
		requestObject.daysToReject.push(scope.fri.index);
	if(!scope.sat.isChecked)
		requestObject.daysToReject.push(scope.sat.index);
	if(!scope.sun.isChecked)
		requestObject.daysToReject.push(scope.sun.index);

	console.log(requestObject);
	///
	///from uniform.js
	///
	
	var generatedData = generateUniform(requestObject.startDate,

		parseFloat(requestObject.days),
		(	parseFloat(requestObject.angleMin) < parseFloat(requestObject.angleMax) ? parseFloat(requestObject.angleMin) :	parseFloat(requestObject.angleMax) ),
		(	parseFloat(requestObject.angleMin) > parseFloat(requestObject.angleMax) ? parseFloat(requestObject.angleMin) :	parseFloat(requestObject.angleMax) ),
		
		(	parseFloat(requestObject.minScore) < parseFloat(requestObject.maxScore) ? parseFloat(requestObject.minScore) :	parseFloat(requestObject.maxScore) ),
		(	parseFloat(requestObject.minScore) > parseFloat(requestObject.maxScore) ? parseFloat(requestObject.minScore) :	parseFloat(requestObject.maxScore) ),
		
		(	parseFloat(requestObject.activeTimeMin) < parseFloat(requestObject.activeTimeMax) ? parseFloat(requestObject.activeTimeMin) :	parseFloat(requestObject.activeTimeMax) ),
		(	parseFloat(requestObject.activeTimeMin) > parseFloat(requestObject.activeTimeMax) ? parseFloat(requestObject.activeTimeMin) :	parseFloat(requestObject.activeTimeMax) ),
		
		(	parseFloat(requestObject.gameSessionsMin) < parseFloat(requestObject.gameSessionsMax) ? parseFloat(requestObject.gameSessionsMin) :	parseFloat(requestObject.gameSessionsMax) ),
		(	parseFloat(requestObject.gameSessionsMin) > parseFloat(requestObject.gameSessionsMax) ? parseFloat(requestObject.gameSessionsMin) :	parseFloat(requestObject.gameSessionsMax) ),
	
		
		requestObject.daysToReject
		);



	console.log(generatedData);

	var sqlQueries = createQueries(requestObject. user,requestObject.game,generatedData,requestObject.stage,requestObject.level,scope.currentSession);

	for(j=0;j<generatedData.length;++j){
		scope.logs.push({message:"<br>Data<br>User: "+requestObject. user+
			"<br>Game: "+requestObject.game+
			"<br>Min angle: "+generatedData[j].minAngle+
			"<br>Max angle: "+generatedData[j].maxAngle+
			"<br>Score: "+generatedData[j].score+
			"<br>Day: "+generatedData[j].day+
			"<br>Start time: "+generatedData[j].startTime+
			"<br>End time: "+generatedData[j].endTime+"<br>",success:true});	
		}	

	console.log(sqlQueries);

	///
	///callback caps
	///
	var callbacksSuccess = [];
	for(k=0;k<sqlQueries.length;++k){
		callbacksSuccess.push(emptyCallbackSuccess);
	}
	var callbacksError = [];
	for(k=0;k<sqlQueries.length;++k){
		callbacksError.push(emptyCallbackError);
	}

	///
	///Remove old data
	///
	if(scope.removeOldData==true){
		var sqlStr = "delete from `patient_statistics` where `patient_id`='"+requestObject. user+"' and `game_name`='"+requestObject.game+"' and `day` between '"+generatedData[0].day+"' and '" +generatedData[generatedData.length-1].day+ "'";
		sqlQueries.unshift(sqlStr);
		callbacksSuccess.unshift(removeOldDataSuccess);
		callbacksError.unshift(removeOldDataError);
	}
	request("http://motusnova.zavadatar.com:3001/api/db_query",sqlQueries,callbacksSuccess,callbacksError,0,sqlQueries.length,scope);//recursive async requests
	///
	///reload the page
	///
	var SETTINGS = initializeSettings();
	databaseQueries(SETTINGS ,scope );
}
function summaryValidation(scope){

	var arrayFailure = [];

	for(i=0;i<scope.dataBlocksOne.length;++i){
		if(!scope.dataBlocksOne[i].isValid)
			arrayFailure.push( {
				message:"<br>Validation failure: "+scope.dataBlocksOne[i].id+" - invalid field value<br>",
				status:false
			});
	}
	if(!scope.startDate.isValid){
		arrayFailure.push( {
				message:"<br>Validation failure: startDate - invalid field value<br>",
				status:false
			});
	}

	if(!scope.days.isValid){
			arrayFailure.push( {
				message:"<br>Validation failure: days - invalid field value<br>",
				status:false
			});
	}

	if(!scope.selectedGame.isValid){
			arrayFailure.push( {
				message:"<br>Validation failure: game - invalid field value<br>",
				status:false
			});
	}

	if(!scope.selectedUser.isValid){
			arrayFailure.push( {
				message:"<br>Validation failure: user - invalid field value<br>",
				status:false
			});
	}

	if(arrayFailure.length>0)
		return arrayFailure;

	return {
		message:"<br>Validation success: all input data are correct<br>",
		status:true
	}
	
}


function postGeneratedDate(requestObject,url,scope){
	var xhr = new XMLHttpRequest();
    xhr.open("POST",url ,true);//async
   
    xhr.onreadystatechange = function(){
        if(this.readyState!=4)
            return;
        else {
            if (this.status == 200){
            	console.log("success   url:"+this.responseURL+";response headers:"+this.getAllResponseHeaders());				       
            }
            else {            	
				console.log("error   url:"+this.responseURL+";response headers:"+this.getAllResponseHeaders());	
				scope.logs.push({message:"<br>Error<br>Status: "+xhr.status+"<br>StatusText: "+xhr.statusText+"<br>",success:false});			
            }
        }
    }

    xhr.timeout = 30000;//30 sec
    xhr.ontimeout = function(){
    	console.log("error   url:"+this.responseURL+";response headers:"+this.getAllResponseHeaders());	
    	scope.logs.push({message:"<br>Error<br>Status: "+xhr.status+"<br>StatusText: "+xhr.statusText+"<br>",success:false});
    }
    var sql = "INSERT INTO `patient_statistics`(`patient_id`,\
     `game_name`, `day`, `start_time`, `end_time`, `score`,\
      `minangle`, `maxangle`, `stage`,\
       `level`, `session`) VALUES ('"+requestObject.user+"','"+requestObject.game+"','"+requestObject.startDate+"','"+'00:00:00'+"','"+'23:59:59'+"','"+requestObject.scoreMax+"','"+requestObject.angleMin+"','"+requestObject.angleMax+"','"+requestObject.stage+"','"+requestObject.level+"','"+7+"')";

    var requestString = {
        authToken:"234",
        dbReq:sql
    }

    xhr.setRequestHeader("Content-Type","application/json");
    var serialized = JSON.stringify(requestString);
    console.log(requestString);
    xhr.send(serialized);    
}



function createQueries(user,game,generatedData,stage,level,session){
	//generatedDate is an array with generated data accordingl to 
	//game sessions and days
	sqlArray = [];
	for(k=0;k<generatedData.length;++k){
		sqlArray.push("INSERT INTO `patient_statistics`(`patient_id`,\
     `game_name`, `day`, `start_time`, `end_time`, `score`,\
      `minangle`, `maxangle`, `stage`,\
       `level`, `session`) VALUES ('"+user+
       "','"+game+
       "','"+generatedData[k].day+
       "','"+generatedData[k].startTime+
       "','"+generatedData[k].endTime+
       "','"+generatedData[k].score+
       "','"+generatedData[k].minAngle+
       "','"+generatedData[k].maxAngle+
       "','"+stage+
       "','"+level+
       "','"+session+
       "')"
		);
	}

	return sqlArray;
}

///
///directives
///
app.directive("error",function(){
    return {
        restrict: "E",
        template: '<div ng-show="isError" ng-bind="errorMessage" style="position:absolute;width:100%;height:80px;top:0px;font-size:15px;font-weight:bold;color:white;background-color:rgba(255,0,0,0.7); border-radius: 5px;padding: 0;z-index: 10; text-align:center;line-height: 80px;"></div>',
        link:function(scope,elem,attrs){
            scope.isError = false;
            scope.errorMessage = "";
        }
    }
});

app.directive("currentsession",function(){
    return {
        restrict: "E",
        template: '<div ng-show="isCurrentSession" style="position:absolute;width:50px;height:30px;top:0px;left:0px;font-size:12px;font-weight:bold;color:black; padding: 0;z-index: 10; text-align:center;">'+
        'current session - {{currentSession}}</div>',
        link:function(scope,elem,attrs){
            scope.isCurrentSession = false;
            scope.currentSession = ""//"¯\_(ツ)_/¯";
        }
    }
});

app.directive("maxsession",function(){
    return {
        restrict: "E",
        template: '<div ng-show="isMaxSession" style="position:absolute;width:50px;height:30px;top:0px;right:0px;font-size:12px;font-weight:bold;color:black;padding: 0;z-index: 10; text-align:center;">'+
        'max session - {{maxSession}}</div>',
        link:function(scope,elem,attrs){
            scope.isMaxSession = false;
            scope.maxSession = "";
        }
    }
});

///
///not angular functions
///


function databaseQueries(SETTINGS,scope){//serial of requests to the server

	var requestQuantity = SETTINGS.sqlQueries.length;
	request(SETTINGS.url,SETTINGS.sqlQueries,SETTINGS.callbackSuccessArray,SETTINGS.callbackErrorArray,0,requestQuantity,scope);//recursive async requests

}

function initializeSettings(){
	var SETTINGS = {
		users:['AB0049','AB0050','AB0051'],//,'TEST1','TEST2','TEST3'
		distributions:['uniform'],//'N(0,1)'
		url:"http://motusnova.zavadatar.com:3001/api/db_query",//
		sqlQueries:["SELECT MAX(  `session` )"+ 
			"FROM  `patient_statistics`"+
			"WHERE  `session` >0",//session number

			//"SELECT MIN(  `session-limit` ) \
			//FROM  `session-parameters`",//session limit - the smallest one

			"SELECT * FROM  `games`"],
		callbackSuccessArray:[

			currentSessionNumber,
			//maxSessionNumber,
			listOfGames//list of games loaded
		],

		callbackErrorArray:[

			callbackErrorCap,
			//callbackErrorCap,
			callbackErrorCap

		]
	}
	return SETTINGS;
}

function request(url,sqlQueries,callbackSuccessArray,callbackErrorArray,k,n,scope){
  
  	if(k>=n){
  		return;
  	}
    var xhr = new XMLHttpRequest();
    xhr.open("POST",url ,true);//async
   
    xhr.onreadystatechange = function(){
        if(this.readyState!=4)
            return;
        else {
            if (this.status == 200){
                 var data = JSON.parse(this.responseText);
				    if(data != undefined){

				    	callbackSuccessArray[k](this,scope);//
				        console.log("success   url:"+this.responseURL+";response headers:"+this.getAllResponseHeaders());
				        request(url,sqlQueries,callbackSuccessArray,callbackErrorArray,++k,n,scope);

				    }
				    else {
				        callbackErrorArray[k](this,scope);
				        console.log("error   url:"+this.responseURL+";response headers:"+this.getAllResponseHeaders());				       
				    }
            }
            else {
            	callbackErrorArray[k](this,scope);
				console.log("error   url:"+this.responseURL+";response headers:"+this.getAllResponseHeaders());				
            }
        }
    }

    xhr.timeout = 30000;//30 sec
    xhr.ontimeout = function(){
        callbackErrorArray[k](this,scope);
    }

    var requestString = {
        authToken:"234",
        dbReq:sqlQueries[k]
    }

    xhr.setRequestHeader("Content-Type","application/json");
    var serialized = JSON.stringify(requestString);

    xhr.send(serialized);    
}


function currentSessionNumber(xhr,scope){
	var result = JSON.parse(xhr.responseText);//reference
	if(result.length!=0)
		scope.currentSession = result[0]['MAX(  `session` )']+1;
	else scope.currentSession = 1;//if no sessions yet
	scope.isCurrentSession =true;
	console.log(scope.currentSession);
	//scope.$digest();
	emptyCallbackSuccess(xhr,scope);
}

function maxSessionNumber(xhr,scope){
	var result = JSON.parse(xhr.responseText)[0];//reference
	
	scope.maxSession = result["MIN(  `session-limit` )"];
	if(scope.currentSession>scope.maxSession)
		console.log('currentSession > maxSession');


	console.log(scope.maxSession);

	scope.isCurrentSession =true;
	scope.isMaxSession =true;

	scope.$digest();
}


function listOfGames(xhr,scope){
	var result = JSON.parse(xhr.responseText)[0];//reference
	console.log(result);
	scope.games = result;
	//scope.$digest();
	emptyCallbackSuccess(xhr,scope);
}

function callbackErrorCap(xhr,scope){
	scope.logs.push({message:"<br>Error<br>Status: "+xhr.status+"<br>StatusText: "+xhr.statusText+"<br>",success:false});	
	scope.$digest();
} 
function callbackSuccessCap(xhr,scope){
	scope.logs.push({message:"\Success<br>Status: "+xhr.status+"<br>StatusText: "+xhr.statusText+"<br>",success:true});
	scope.$digest();	
} 

function emptyCallbackSuccess(xhr,scope){
	console.log("Success post request");
	scope.logs.push({message:'<br> '+"Success"+' <br> ' + "status: " + xhr.status + ' <br> ' + 'statusText: ' + xhr.statusText + ' <br> ' + "responseText: " + xhr.responseText + ' <br> ' + 'responseUrl: ' + xhr.responseURL  + '<br>' ,success:true});
	scope.$digest();
}
function emptyCallbackError(xhr,scope){
	console.log("Error post request");
	scope.logs.push({message:'<br>' +"Error"+' <br> ' + "status: " + xhr.status + ' <br> ' + 'statusText: ' + xhr.statusText + ' <br> ' + "responseText: " + xhr.responseText + ' <br>' + 'responseUrl: ' + xhr.responseURL + '<br>',success:false});
	scope.$digest();
}


function validateLimits(str,min,max){
	if(str > min && str < max)
    	return true;
	return false;
}

function validateRange(scope){
	id.indexOf('Max')
	if(str > min && str < max)
    	return true;
	return false;
}

function validateData(str,pattern){
		var m = str.match(pattern);
    	var value;
    	if(m!==null){
    		value = m[0].replace(/ /gm,"");
    		return value;
    	}
    	else{
			return null;
    	}
}

function removeOldDataSuccess(xhr,scope){
	console.log("Success post request");
	scope.logs.push({message:'<br>' +"Success"+' <br> '+"Old data removed"+' <br> ' + "status: " + xhr.status + ' <br> ' + 'statusText: ' + xhr.statusText + ' <br> ' ,success:true});
	scope.$digest();
}

function removeOldDataError(xhr,scope){
	console.log("Error post request");
	scope.logs.push({message:'<br>' +"Error"+' <br> '+"Old data have not been removed"+'<br>'+ "status: " + xhr.status + ' <br> ' + 'statusText: ' + xhr.statusText + ' <br> ' + "responseText: " + xhr.responseText + ' <br>' + 'responseUrl: ' + xhr.responseURL + '<br>',success:false});
	scope.$digest();
}

