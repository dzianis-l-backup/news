angular.module('app')
        .service('adminService',['$http','$rootScope',function($h,$rootScope){
        var self = this

        this.getComments = controller => {
            var message = {news:controller.id,token:sessionStorage.getItem("token")}
            $h.post(`/comments`,message)
                .then(function successCb(res){
                    console.log('user: success')
                    controller.comments = res.data;
                })
                .catch(function errorCb(err){
                    console.log('news error')
                });
        }


        this.switchBlock = (controller,c,toBlock) => {
            var message = {id: c.user,token:sessionStorage.getItem("token"),block:toBlock}
            $h.post(`/block`,message)
                .then(function successCb(res){
                    console.log('admin: success')
                })
                .catch(function errorCb(err){
                    console.log('admin error')
                });
            }

        this.delete = (controller,c) => {
           var message = {id: c.user,token:sessionStorage.getItem("token")}
            $h.post(`/delete`,message)
                .then(function successCb(res){
                    console.log('admin: success')
                    self.getComments(controller)
                })
                .catch(function errorCb(err){
                    console.log('admin error')
                });
        }


        this.addNews = (controller) => {
            var message = {link: controller.link, title: controller.title, description: controller.description,  token: sessionStorage.getItem("token")}

            $h.post(`/addNews`, message)
                .then(function successCb(res) {
                    console.log('admin: success')
                    //self.getComments(controller)
                    //to refresh news panel
                    $rootScope.$broadcast('reloadNews',{});
                })
                .catch(function errorCb(err) {
                    console.log('admin error')
                });
        }


    }])

    .component('admin',{
        templateUrl:'_admin/admin.html',
        controller:function admin($scope,$rootScope,adminService){
            var self = this;
            console.log('admin')

            self.newsExpanded = function newsExpanded(e,item){
                console.log(`user: news clicked: ${item}`)
                self.id = item.id // id of news

                adminService.getComments(self)
            }

            $scope.$on("news", self.newsExpanded);
            if($rootScope.currentNews) self.newsExpanded(undefined,$rootScope.currentNews)

            self.ban = function(c){
                adminService.switchBlock(self,c,1)
            }

            self.unban = function(c){
                adminService.switchBlock(self,c,0)
            }

            self.delete = function(c){
                adminService.delete(self,c)
            }

            self.addNews = function(c){
                adminService.addNews(self)
            }



        }
    })