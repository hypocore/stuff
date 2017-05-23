'use strict';

angular.module('myApp.view2')
.factory('portFactory', ['$http', 
                        '$timeout',
                        function($http, 
                                $timeout) {
    
    
    var factory = this;

    angular.extend(factory, {
        message: '',
        valueArray: [],
        generateRandom: generateRandom,
        sayHi: sayHi,
        returnHey: returnHey

    });

    return factory;


    function generateRandom(factor){
        var randomNumber = (Math.floor((Math.random() * 10) + 1)) * factor;
        factory.valueArray.push(randomNumber);
    }

    function sayHi(){
        factory.message = "hi";
    }

    function returnHey(){
        return 'hey';
    }


}]);

