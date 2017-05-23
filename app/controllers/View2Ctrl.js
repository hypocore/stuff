'use strict';

angular.module('myApp.view2')
.controller('View2Ctrl', ['$scope', 
                            '$rootScope', 
                            '$http', 
                            '$timeout',
                            'portFactory',
                            function($scope, 
                                    $rootScope,
                                    $http, 
                                    $timeout,
                                    portFactory) {
    
    var productionTimeout;
    var vm = this;

    angular.extend(vm, {
        localgoods: {},
        name: [],
        price: [],
        messages: 0,
        backendStatus: undefined,
        controllerMessage: '',
        controllerMessageTwo: '',

        buyProduct: buyProduct,
        sellProduct: sellProduct,
        addProduct: addProduct,
        produceGoods: produceGoods,
        produceRandomGoods: produceRandomGoods,
        broadcastMessage: broadcastMessage,
        broadcastRootscopeMsg: broadcastRootscopeMsg,
        getFactoryToSayHi: getFactoryToSayHi,
        getFactoryToReturnHey: getFactoryToReturnHey,
        init: init

    });

    vm.init();

    function buyProduct(product){

      product.quantity -= 1;

    }

    function sellProduct(product){
      product.quantity += 1;
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

    function init(){

        vm.localgoods = [{"name": "gold",
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
                vm.localgoods.push(response[i]);
            };
          
        }).catch(function(error){
            vm.backendStatus = 'error';
        });


        $scope.$on('signal', function(){
            vm.messages += 1;
        });

    }




}]);

