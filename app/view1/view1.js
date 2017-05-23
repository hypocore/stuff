'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {

    $scope.buyProduct = function(product){
      product.quantity -= 1;
    };

    $scope.sellProduct = function(product){
      product.quantity += 1;
    };

    $scope.addProduct = function(){
      $scope.localgoods.push({
        name: $scope.newProduct.name,
        unitPrice: parseInt($scope.newProduct.unitPrice),
        quantity: parseInt($scope.newProduct.quantity),
        legal: $scope.newProduct.legal
      });

      $scope.newProduct.name = "";
      $scope.newProduct.unitPrice = "";
      $scope.newProduct.quantity = "";
      $scope.newProduct.legal = false;
    };

}]);
