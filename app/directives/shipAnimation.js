angular.module('myApp')
.directive("shipAnimation", function(){
  return{
    restrict: 'A',
    templateUrl: 'templates/canvasTopBar.html',
    link: function(scope, element){
      var context = element.find('canvas')[0].getContext("2d");

      context.beginPath();
      context.arc(100,75,50,0,2*Math.PI);
      context.stroke();
    }
  }
});