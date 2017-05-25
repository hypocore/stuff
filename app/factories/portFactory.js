'use strict';

angular.module('myApp.view2')
.factory('portFactory', ['$http', 
                        '$timeout',
                        function($http, 
                                $timeout) {
    
    var portGoods = [];
    var portWealth;
    var factory = this;

    angular.extend(factory, {
        message: '',
        valueArray: [],
        generateRandom: generateRandom,
        sayHi: sayHi,
        returnHey: returnHey,
        randomizeGoods: randomizeGoods,
        getPortGoods: getPortGoods,
        setPortGoods: setPortGoods,
        addPortGoods: addPortGoods,
        getPortWealth: getPortWealth,
        setPortWealth: setPortWealth,
        addPortWealth: addPortWealth,
        subtractPortWealth: subtractPortWealth

    });

    return factory;


    function generateRandom(factor){
        var randomNumber = (Math.floor((Math.random() * 10) + 1)) * factor;
        factory.valueArray.push(randomNumber);
    }

    function _getRandomNumber(factor){
        return (Math.floor((Math.random() * 10) + 1)) * factor;
    }

    function sayHi(){
        factory.message = "hi";
    }

    function returnHey(){
        return 'hey';
    }

    function randomizeGoods(){
        angular.forEach(portGoods, function(item, index){
            item.quantity = generateRandom(5);
        });
    }

    function getPortGoods(){
        return portGoods;
    }

    function setPortGoods(){
        portGoods = [{"name": "gold",
                        "unitPrice": 100,
                        "quantity": 50,
                        "legal": true},
                        {"name": "tea",
                        "unitPrice": 80,
                        "quantity": 50,
                        "legal": true
                        }];

        $http({
            method: 'GET',
            url: 'data/localGoods.json',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: {}
        }).success(function (response) {
            for(var i = 0; i < response.length; i++){
                portGoods.push(response[i]);
            };
          
        }).catch(function(error){
            console.log('error');
        });
    }

    function addPortGoods(){

    }

    function getPortWealth(){
        return portWealth;
    }

    function setPortWealth(){
        portWealth = _getRandomNumber(500);
    }

    function addPortWealth(amount){
        portWealth += amount;
    }

    function subtractPortWealth(amount){
        portWealth -= amount;
    }


}]);

