'use strict';

angular.module('myApp.view2')
.controller('View2Ctrl', ['$scope', 
                            '$rootScope', 
                            '$http', 
                            '$timeout',
                            '$q',
                            'portFactory',
                            'shipFactory',
                            function($scope, 
                                    $rootScope,
                                    $http, 
                                    $timeout,
                                    $q,
                                    portFactory,
                                    shipFactory) {
    
    var productionTimeout;
    var defer = $q.defer();
    var waitForCoastPatrol = defer.promise;
    var coastPatrolDelay;


    var vm = this;

    angular.extend(vm, {
        localgoods: {},
        name: [],
        price: [],
        messages: 0,
        backendStatus: undefined,
        controllerMessage: '',
        controllerMessageTwo: '',
        showCheats: false,
        portWealth: 0,
        shipWealth: 0,
        safeWeather: true,

        buyProduct: buyProduct,
        sellProduct: sellProduct,
        addProduct: addProduct,
        produceGoods: produceGoods,
        produceRandomGoods: produceRandomGoods,
        broadcastMessage: broadcastMessage,
        broadcastRootscopeMsg: broadcastRootscopeMsg,
        getFactoryToSayHi: getFactoryToSayHi,
        getFactoryToReturnHey: getFactoryToReturnHey,
        setRandomGoods: setRandomGoods,
        checkSafeWeather: checkSafeWeather,
        reportWeather: reportWeather,
        init: init

    });

    vm.init();

    function buyProduct(product){

      // If the ship has enough money to buy the product:
      if(shipFactory.getShipWealth() > product.unitPrice){

        // Take the value of the product away from the ship
        shipFactory.subtractShipWealth(product.unitPrice);
        vm.shipWealth = shipFactory.getShipWealth();

        // Add the value of the product to the port
        portFactory.addPortWealth(product.unitPrice);
        vm.portWealth = portFactory.getPortWealth();

        product.quantity -= 1;
      }

    }

    function sellProduct(product){

        // If the port has enough to buy the product
        if(portFactory.getPortWealth() > product.unitPrice){
            // Take the value of the product away from the port
            portFactory.subtractPortWealth(product.unitPrice);
            vm.portWealth = portFactory.getPortWealth();

            // Add the value of the product to the ship's coffers
            shipFactory.addShipWealth(product.unitPrice);
            vm.shipWealth = shipFactory.getShipWealth();

            product.quantity += 1;
        }

    }

    function produceGoods(product){
        productionTimeout = $timeout(function(){
            product.quantity += 1;
        }, 1000);
    }

    function produceRandomGoods(product){
        product.quantity += portFactory.generateRandom(10);
    }

    function broadcastMessage(){
        $scope.$broadcast('newStuff', 3);
    }

    function broadcastRootscopeMsg(){
        $rootScope.$broadcast('rootMessage', 4);
    }

    function addProduct(){
        var newProduct = {
            name: vm.newProduct.name,
            unitPrice: parseInt(vm.newProduct.unitPrice),
            quantity: parseInt(vm.newProduct.quantity),
            legal: vm.newProduct.legal
          };

        vm.localgoods.push(newProduct);

        vm.newProduct.name = "";
        vm.newProduct.unitPrice = "";
        vm.newProduct.quantity = "";
        vm.newProduct.legal = false;
    }

    function getFactoryToSayHi(){
        portFactory.sayHi();
        vm.controllerMessage = portFactory.message;
    }

    function getFactoryToReturnHey(){
        vm.controllerMessageTwo = portFactory.returnHey();
    }

    function setRandomGoods(factor){
        portFactory.randomizeGoods(factor);
    }

   
    function checkSafeWeather(){
        waitForCoastPatrol.then(null, null, function(safeToPutToSea){
            vm.safeWeather = safeToPutToSea;
        });
    }
    

    function reportWeather(){
        defer.notify(false);
    }

    function init(){

        portFactory.setPortGoods();
        portFactory.setPortWealth();
        shipFactory.setShipWealth(100);

        vm.localgoods = portFactory.getPortGoods();
        vm.portWealth = portFactory.getPortWealth();
        vm.shipWealth = shipFactory.getShipWealth();

        $scope.$on('signal', function(){
            vm.messages += 1;
        });



    }




}]);

