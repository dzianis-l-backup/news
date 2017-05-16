angular.module('app',['ngRoute'])
    .config(['$locationProvider','$routeProvider',function($l,$r){
        $l.hashPrefix('!');
        $r
            .when('/admin', {
            template: '<admin></admin>'
            })
            .when('/auth', {
                template: '<auth></auth>'
            })
            .when('/reviewer', {
                template: '<reviewer></reviewer>'
            })
            .when('/user', {
                template: '<user></user>'
            })
            .when('/notFound', {
                template: '<not-found></not-found>'
            })
            .otherwise('/notFound');
    }])
    .service('loadNews',['$http',function($h){
        this.getNews = controller => {
            $h.get(`/api/news`)
                .then(function successCb(res){
                    console.log('news success')
                    controller.news = res.data;
                })
                .catch(function errorCb(err){
                    console.log('news error')
                });
        }

    }])
    .component('panel',{
       templateUrl:"_panel/panel.html",
        controller: function(loadNews){
            var self = this
            loadNews.getNews(self);
        }
    });
/*
    .controller('anCtrl',function($scope){
    $scope.news = [];
    $scope.comments = [];
    $scope.getComments = getComments;
    $scope.getNews = getNews;
    $scope.getNews(function(data){
        var news = JSON.parse(data);
        $scope.news = news;
        $scope.$digest();
    });
    $scope.expand = function(n){

        getComments(function(data){
            var comments = JSON.parse(data);
            $scope.comments = comments;

            var flag = sessionStorage.getItem("flag");

            $scope.currentNews = n;

            if(flag=="isAdmin"){
                $scope.isAuth =false;
                $scope.isUser =false;
                $scope.isReviewer =false;
                $scope.isAdmin =true;

                $scope.$digest();
                return;

            }

            if(flag=="isReviewer"){
                $scope.isAuth =false;
                $scope.isUser =false;

                $scope.isAdmin =false;
                $scope.isReviewer =true;

                $scope.$digest();
                return;
            }
            $scope.isAuth =false;
            $scope.isAdmin = false;
            $scope.isReviewer = false;
            $scope.isUser = true;
            $scope.$digest();


        },n);

    };

    $scope.ban = function(c){
        var user = c.user;
        blockUser(function (message) {
            log(message);
            $scope.expand($scope.currentNews);
            $scope.$digest();
        },user,1);

    };



    $scope.unban = function(c){
        var user = c.user;
        blockUser(function (message) {
            log(message);
            $scope.expand($scope.currentNews);
            $scope.$digest();
        },user,0);

    };

    $scope.delete = function(c){
        var user = c.user;
        deleteUser(function (message) {
            log(message);
            $scope.expand($scope.currentNews);
            $scope.$digest();
        },user);

    };


    $scope.postComment = function(cA){

        var news = $scope.currentNews.id;
        var message = cA;
        postCommentUser(function (message) {
            log(message);
            $scope.expand($scope.currentNews);
            $scope.$digest();
        },news,message);

    };

    $scope.addNews = function(link,title,description){


        addNewsUser(function (message) {
            log(message);
            $scope.getNews(function(data){
                var news = JSON.parse(data);
                $scope.news = news;
                $scope.$digest();
            });
        },link,title,description);

    };

    $scope.deleteComment = function(n){


        deleteCommentUser(function (message) {
            log(message);
            $scope.expand($scope.currentNews);
            $scope.$digest();
        },n.id);

    };


    $scope.signIn = signIn;

    $scope.signUp = signUp;

});











function dataCollect(){
    var login = document.getElementById('login').value;
    var password = document.getElementById('password').value;
    var salt = Math.random().toString().substring(0,5);
    log(login,password,salt,password+salt);
    log(Sha1.hash(password+salt));
    return {
        login:login,
        password:password,
        salt:salt
    }
}

function signIn(scope){
    request("signin",scope);
};

function signUp(scope){
    request("signup",scope);
};

function request(url,scope){

    var xhr = new XMLHttpRequest();
    xhr.open("POST","http://localhost:3000/api/"+url ,true);
    xhr.onreadystatechange=function(){
        if(xhr.readyState == 4){
            if(xhr.status==200) {
                log(xhr.responseText);
                var token = JSON.parse(xhr.responseText).token;
                var flag = JSON.parse(xhr.responseText).flag;
                if(token!=undefined){
                    sessionStorage.setItem("token",token);
                    scope.isAuth = false;
                    if(flag=="isAdmin"){
                        scope.isAdmin =true;
                        sessionStorage.setItem("flag","isAdmin");
                        scope.$digest();
                        return;

                    }

                    if(flag=="isReviewer"){
                        scope.isReviewer = true;
                        sessionStorage.setItem("flag","isReviewer");
                        scope.$digest();
                        return;
                    }
                    sessionStorage.setItem("flag","isUser");
                    scope.isUser = true;
                    scope.$digest();


                }


            }
            else{
                log("error");
            }
        }
    };

    xhr.timeout = 30000;
    xhr.ontimeout = function(){
        log("timeout error");
    };

    var request = dataCollect();
    var token = sessionStorage.token;
    if(token != undefined)
        request.token = token;

    xhr.setRequestHeader("Content-Type","application/json");
    var serialized = JSON.stringify(request);
    xhr.send(serialized);
}




function getNews(callback){
    var xhr = new XMLHttpRequest();
    xhr.open("POST","http://localhost:3000/api/"+"news" ,true);
    xhr.onreadystatechange=function(){
        if(xhr.readyState == 4){
            if(xhr.status==200) {
                callback(xhr.responseText);
            }
            else{

            }
        }
    };

    xhr.timeout = 30000;
    xhr.ontimeout = function(){
        log("timeout error");
    };

    var request = {};
    var token = sessionStorage.token;
    if(token != undefined)
        request.token = token;

    xhr.setRequestHeader("Content-Type","application/json");
    var serialized = JSON.stringify(request);
    xhr.send(serialized);
}

function getComments(callback,news){
    var news = news.id;
    var xhr = new XMLHttpRequest();
    xhr.open("POST","http://localhost:3000/"+"comments" ,true);
    xhr.onreadystatechange=function(){
        if(xhr.readyState == 4){
            if(xhr.status==200) {
                callback(xhr.responseText);
            }
            else{

            }
        }
    };

    xhr.timeout = 30000;
    xhr.ontimeout = function(){
        log("timeout error");
    };

    var request = {};
    var token = sessionStorage.token;
    if(token != undefined)
        request.token = token;

    request.news = news;

    xhr.setRequestHeader("Content-Type","application/json");
    var serialized = JSON.stringify(request);
    xhr.send(serialized);
}

function changeLayout(callback){

}

function blockUser(callback,id,block){

    var xhr = new XMLHttpRequest();
    xhr.open("POST","http://localhost:3000/"+"block" ,true);
    xhr.onreadystatechange=function(){
        if(xhr.readyState == 4){
            if(xhr.status==200) {
                callback(xhr.responseText);
            }
            else{

            }
        }
    };

    xhr.timeout = 30000;
    xhr.ontimeout = function(){
        log("timeout error");
    };

    var request = {};
    var token = sessionStorage.token;
    if(token != undefined)
        request.token = token;

    request.id = id;
    request.block = block;


    xhr.setRequestHeader("Content-Type","application/json");
    var serialized = JSON.stringify(request);
    xhr.send(serialized);
}

function deleteUser(callback,id,block){

    var xhr = new XMLHttpRequest();
    xhr.open("POST","http://localhost:3000/"+"delete" ,true);
    xhr.onreadystatechange=function(){
        if(xhr.readyState == 4){
            if(xhr.status==200) {
                callback(xhr.responseText);
            }
            else{

            }
        }
    };

    xhr.timeout = 30000;
    xhr.ontimeout = function(){
        log("timeout error");
    };

    var request = {};
    var token = sessionStorage.token;
    if(token != undefined)
        request.token = token;

    request.id = id;
    request.block = block;


    xhr.setRequestHeader("Content-Type","application/json");
    var serialized = JSON.stringify(request);
    xhr.send(serialized);
}

function postCommentUser(callback,id,message){

    var xhr = new XMLHttpRequest();
    xhr.open("POST","http://localhost:3000/"+"postComment" ,true);
    xhr.onreadystatechange=function(){
        if(xhr.readyState == 4){
            if(xhr.status==200) {
                callback(xhr.responseText);
            }
            else{

            }
        }
    };

    xhr.timeout = 30000;
    xhr.ontimeout = function(){
        log("timeout error");
    };

    var request = {};
    var token = sessionStorage.token;
    if(token != undefined)
        request.token = token;

    request.news = id;
    request.message = message;


    xhr.setRequestHeader("Content-Type","application/json");
    var serialized = JSON.stringify(request);
    xhr.send(serialized);
}

function addNewsUser(callback,link,title,description){

    var xhr = new XMLHttpRequest();
    xhr.open("POST","http://localhost:3000/"+"addNews" ,true);
    xhr.onreadystatechange=function(){
        if(xhr.readyState == 4){
            if(xhr.status==200) {
                callback(xhr.responseText);
            }
            else{

            }
        }
    };

    xhr.timeout = 30000;
    xhr.ontimeout = function(){
        log("timeout error");
    };

    var request = {};
    var token = sessionStorage.token;
    if(token != undefined)
        request.token = token;

    request.link = link;
    request.title = title;
    request.description = description;


    xhr.setRequestHeader("Content-Type","application/json");
    var serialized = JSON.stringify(request);
    xhr.send(serialized);
}

function deleteCommentUser(callback,id){

    var xhr = new XMLHttpRequest();
    xhr.open("POST","http://localhost:3000/"+"deleteComments" ,true);
    xhr.onreadystatechange=function(){
        if(xhr.readyState == 4){
            if(xhr.status==200) {
                callback(xhr.responseText);
            }
            else{

            }
        }
    };

    xhr.timeout = 30000;
    xhr.ontimeout = function(){
        log("timeout error");
    };

    var request = {};
    var token = sessionStorage.token;
    if(token != undefined)
        request.token = token;

    request.id = id;


    xhr.setRequestHeader("Content-Type","application/json");
    var serialized = JSON.stringify(request);
    xhr.send(serialized);
}
*/