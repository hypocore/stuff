angular.module('myApp')
.directive("moneyMask", ['$timeout', function($timeout){
  return {
    restrict: 'A',
    require: 'ngModel',
    link: link,
    scope: { ngModel: '='}

    }

    function link(scope, element, attrs, ctrl){
      element.on('input', function(){
        element.val(1);
        console.log("hey");
      });
    }
}]);
