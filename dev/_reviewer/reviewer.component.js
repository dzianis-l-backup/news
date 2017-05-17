angular.module('app')
    .service('reviewerService',['$http','$rootScope',function($h,$rootScope){
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

        this.deleteComment = (controller,c) => {
            var message = {id: c.id,token:sessionStorage.getItem("token")}//comments id
            $h.post(`/deleteComments`,message)
                .then(function successCb(res){
                    console.log('admin: success')
                    self.getComments(controller)
                })
                .catch(function errorCb(err){
                    console.log('admin error')
                });
        }

    }])

    .component('reviewer',{
        templateUrl:'_reviewer/reviewer.html',
        controller:function admin($scope,$rootScope,reviewerService){
            var self = this;
            console.log('reviewer')

            self.newsExpanded = function newsExpanded(e,item){//to pen new in a new tab
                console.log(`reviewer: news clicked: ${item}`)
                self.id = item.id // id of news

                reviewerService.getComments(self)
            }

            $scope.$on("news", self.newsExpanded);
            if($rootScope.currentNews) self.newsExpanded(undefined,$rootScope.currentNews)


            self.deleteComment = function(c){
                reviewerService.deleteComment(self,c)
            }

        }
    })