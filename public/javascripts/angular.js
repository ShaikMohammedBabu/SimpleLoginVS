//nav controller button active is not working ,see it..
var app = angular.module('myapp',[])
.controller('navCtrl', ['$scope','$location',function($scope,$location){
    $scope.isActive = function(destination){
        console.log("current path---> "+ $location.path());
        return destination === $location.path();
    }
    
}])
.controller('loginCtrl', function($scope, $http, $window){
    var data={};
    $scope.login = function(){
        data.username = $scope.email;
        data.password = $scope.password;
        $http.post('/letmein', data)//requests a page on the server and the response is set as the
        .then(function(response){    //value of the error variable
            console.log(response);
            if(response.data.error){
                $scope.error = response.data.msg;
            }else{
                $window.location = '/home';
                
            }
           // $scope.error = 'Invalid details';
        }, function(error){

        });
    };
})
.controller('registerCtrl', function($scope, $http, $window){
    var data = {};
    $scope.register = function(){
        data.firstname = $scope.firstname;
        data.lastname = $scope.lastname;
        data.username = $scope.username;
        data.email = $scope.email;
        data.url = $scope.url;
        data.telephone = $scope.telephone;
        data.password = $scope.password;
        data.mobile = $scope.mobile;
        data.birthday = $scope.birthday;
        data.gender = $scope.gender;
        data.terms = $scope.terms;
        $http.post('/addmyuser', data)
        .then(function(response){
            console.log(response);
        }, function(error){

        });
    };
});