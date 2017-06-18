'use strict';

angular.module('myApp.view2')
.factory('shipFactory', ['$http', 
                        '$timeout',
                        function($http, 
                                $timeout) {
    
    var shipGoods = [];
    var shipWealth;
    var factory = this;

    angular.extend(factory, {
        addShipGoods: addShipGoods,
        setShipWealth: setShipWealth,
        getShipWealth: getShipWealth,
        addShipWealth: addShipWealth,
        subtractShipWealth: subtractShipWealth

    });

    return factory;


    function addShipGoods(){

    }

    function getShipWealth(){
        return shipWealth;
    }

    function setShipWealth(amount){
        shipWealth = amount;
    }

    function addShipWealth(amount){
        shipWealth += amount;
    }

    function subtractShipWealth(amount){
        shipWealth -= amount;
    }


}]);

