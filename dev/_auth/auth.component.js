angular.module('app')
    .service('authenticate',['$http','$location',function($h,$l){

        var self = this;
        this.setSessionData = function(data){
            var role;
            var l;
            switch(data.flag){
                case "isAdmin":
                    role = "isAdmin"
                    l = '/admin'
                    break;
                case "isReviewer":
                    role = "isReviewer"
                    l = '/reviewer'
                    break;
                default:
                    role = "isUser"
                    l = '/user'
                    break;
            }
            sessionStorage.setItem("flag",role);
            sessionStorage.setItem("token",data.token);
            $l.path(l)
        }

        this.signIn = controller => {

            var message = {
                login:controller.login,
                password:controller.password,
                salt:Sha1.hash(controller.password+Math.random().toString().substring(0,5)),
                token:sessionStorage.token
            }

            console.log(`auth: data to send: ${message.toString()}`)

            $h.post(`/api/signin`,message)
                .then(function successCb(res){
                    console.log('auth: sign in success')
                    self.setSessionData(res.data)
                })
                .catch(function errorCb(err){
                    console.log('auth: error')
                });
        }

        this.signUp = controller => {

            var message = {
                login:controller.login,
                password:controller.password,
                salt:Sha1.hash(controller.password+Math.random().toString().substring(0,5)),
                token:sessionStorage.token
            }

            console.log(`auth: data to send: login:${message.login},password:${message.password}`)

            $h.post(`/api/signup`,message)
                .then(function successCb(res){
                    console.log('auth: sing up success')
                    //self.setSessionData(res.data)
                })
                .catch(function errorCb(err){
                    console.log('auth: error')
                });
        }


    }])
    .component('auth',{
        templateUrl:'_auth/auth.html',
        controller:function auth(authenticate){
            console.log('auth component loaded')
            var self = this
            self.signIn =()=>{
                authenticate.signIn(self)
            }
            self.signUp =()=>{
                authenticate.signUp(self)
            }
        }
    })