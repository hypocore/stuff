angular.module('myApp')
.directive('ngFocus', [function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: function(scope, element, attrs, ctrl) {
      ctrl.$focused = false;
      element.on('focus', function(evt) {
        scope.$apply(function() {
          ctrl.$focused = true;
        });
      }).on('blur', function(evt) {
          scope.$apply(function() {
          ctrl.$focused = false;
        });
      });
    }
  }
}])
