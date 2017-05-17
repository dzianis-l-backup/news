 angular.module('app')
     .service('loadComments',['$http',function($h,$rootScope){
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

         this.postComment = controller => {
             var message = {news:controller.id,token:sessionStorage.getItem("token"),message:controller.commentArea}
             controller.commentArea = ''
             $h.post(`/postComment`,message)
                 .then(function successCb(res){
                     console.log('user: success')
                     self.getComments(controller)
                 })
                 .catch(function errorCb(err){
                     console.log('news error')
                 });
         }

     }])
    .component('user',{
        templateUrl:'_user/user.html',
        controller:function user($scope,$rootScope,loadComments){
            var self = this;
            console.log('user')

            self.newsExpanded = function newsExpanded(e,item){
                console.log(`user: news clicked: ${item}`)
                self.id = item.id
                loadComments.getComments(self)
            }

            $scope.$on("news", self.newsExpanded);
            if($rootScope.currentNews) self.newsExpanded(undefined,$rootScope.currentNews)

            self.postComment =  function(){
                loadComments.postComment(self)
            }

        }
    })