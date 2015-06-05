'use strict';

/* Controllers */

angular.module('aips.controllers', []).
    controller('HomepageCtrl', ['$scope', '$http', 'CsrfService', 'urls', '$filter', '$routeParams', 'UserService', function($scope, $http, $csrf, urls, $filter, $routeParams, $user){
        console.log('HomepageCtrl');
        $scope.act_name = '我的活动报名';
        $scope.dropdown_model = 'test';
        /**
         $scope.phonenum = '';
         $scope.step = 0;
         **/
        $scope.create_act = function(){
            var param = {
                'name': $scope.act_name
            };
            $csrf.set_csrf(param);
            $http.post(urls.api + '/act/create', $.param(param)).success(function(data, status){
                console.log(data);
                if(data.error.code == 1){
                    window.location.href = '/act/' + data.act_id + '/manage';
                }
            });
        };
    }]).
    controller('ActivityManageCtrl', ['$scope', '$http', 'CsrfService', 'urls', '$filter', '$routeParams', 'UserService', function($scope, $http, $csrf, urls, $filter, $routeParams, $user){
        console.log('ActivityManageCtrl');
    }]).
    controller('DevCtrl', ['$scope', '$http', 'urls', 'CsrfService', function($scope, $http, urls, $csrf){
        //console.log('DevCtrl');
        $scope.api_url = '/test';
        $scope.param_list = [];
        $scope.add_param = function(){
            $scope.param_list.push({'key':'', 'value':''});
        };
        $scope.response = {};
        $scope.api_post = function(){
            var param_dict = {};
            for(var index in $scope.param_list){
                param_dict[$scope.param_list[index]['key']] = $scope.param_list[index]['value'];
            }
            //console.log(param_dict);
            $csrf.set_csrf(param_dict);
            $http.post(urls.api + $scope.api_url, $.param(param_dict)).success(function(data){
                //console.log(data);
                $scope.response = data;
            });
        };
        $scope.api_get = function(){
            var param_url = '';
            for(var index in $scope.param_list){
                if(index != 0){
                    param_url += '&';
                }else{
                    param_url = '?';
                }
                param_url += $scope.param_list[index]['key'] + '=' + $scope.param_list[index]['value'];
            }
            //console.log(param_url);
            $http.get(urls.api + $scope.api_url + param_url).success(function(data){
                //console.log(data);
                $scope.response = data;
            });
        };
        $scope.clean_param = function(){
            $scope.param_list = [];
        };
    }]);
