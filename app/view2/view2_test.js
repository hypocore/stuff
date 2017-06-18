'use strict';

describe('myApp.View2Ctrl module', function() {

  beforeEach(module('myApp.view2'));

  // beforeEach(module('myApp.view2', function($provide) {
  //     $provide.factory('portFactory', function ($http, $timeout) { 

  //   var portGoods = [];
  //   var portWealth;
  //   var factory = this;

  //   angular.extend(factory, {
  //       message: '',
  //       valueArray: [],
  //       generateRandom: generateRandom,
  //       sayHi: sayHi,
  //       returnHey: returnHey,
  //       randomizeGoods: randomizeGoods,
  //       getPortGoods: getPortGoods,
  //       setPortGoods: setPortGoods,
  //       addPortGoods: addPortGoods,
  //       getPortWealth: getPortWealth,
  //       setPortWealth: setPortWealth,
  //       addPortWealth: addPortWealth,
  //       subtractPortWealth: subtractPortWealth

  //   });

  //   return factory;


  //   function generateRandom(factor){
  //       var randomNumber = (Math.floor((Math.random() * 10) + 1)) * factor;
  //       factory.valueArray.push(randomNumber);
  //   }

  //   function _getRandomNumber(factor){
  //       return (Math.floor((Math.random() * 10) + 1)) * factor;
  //   }

  //   function sayHi(){
  //       factory.message = "hi";
  //   }

  //   function returnHey(){
  //       return 'hey';
  //   }

  //   function randomizeGoods(){
  //       angular.forEach(portGoods, function(item, index){
  //           item.quantity = generateRandom(5);
  //       });
  //   }

  //   function getPortGoods(){
  //       return portGoods;
  //   }

  //   function setPortGoods(){
  //       portGoods = [{"name": "gold",
  //                       "unitPrice": 100,
  //                       "quantity": 50,
  //                       "legal": true},
  //                       {"name": "tea",
  //                       "unitPrice": 80,
  //                       "quantity": 50,
  //                       "legal": true
  //                       }];

  //       $http({
  //           method: 'GET',
  //           url: 'data/localGoods.json',
  //           headers: {
  //               'Content-Type': 'application/json',
  //               'Accept': 'application/json'
  //           },
  //           data: {}
  //       }).success(function (response) {
  //           for(var i = 0; i < response.length; i++){
  //               portGoods.push(response[i]);
  //           };
          
  //       }).catch(function(error){
  //           console.log('error');
  //       });
  //   }

  //   function addPortGoods(){

  //   }

  //   function getPortWealth(){
  //       return portWealth;
  //   }

  //   function setPortWealth(){
  //       portWealth = _getRandomNumber(500);
  //   }

  //   function addPortWealth(amount){
  //       portWealth += amount;
  //   }

  //   function subtractPortWealth(amount){
  //       portWealth -= amount;
  //   }

  //   // End fake factory
  //   });
  // }));

  var scope;
  var rootScope;
  var view2Ctrl;
  var $httpBackend, requestHandler;
  var $q;
  var portFactory;
  var testSpy;
  beforeEach(inject(function($rootScope, $controller, _$q_, _portFactory_){

    rootScope = $rootScope;
    scope = $rootScope.$new();
    $q = _$q_;
    portFactory = _portFactory_;
    
    view2Ctrl = $controller('View2Ctrl', {$scope: scope});

  }));

  describe('Calling a function that requires a factory', function(){

    it('should work', function(){
      // portFactory = jasmine.createSpy(portFactory, 'sayHi').and.returnValue('hi');

      spyOn(portFactory, 'sayHi').and.callThrough();
      portFactory.sayHi();
      expect(portFactory.message).toEqual('hi');
    });

    it('should be equal to factory.message', function(){
      // testSpy = jasmine.createSpy(portFactory, 'sayHi').and.returnValue('hi');


      // spyOn(portFactory, 'sayHi').and.callThrough();
      // portFactory.sayHi();
      spyOn(view2Ctrl, 'getFactoryToSayHi').and.callThrough();
      view2Ctrl.getFactoryToSayHi();
      expect(view2Ctrl.controllerMessage).toEqual('hi');
      expect(view2Ctrl.controllerMessage).toEqual(jasmine.any(String));
    });

    it('should return hey from the factory', function(){
      // testSpy = jasmine.createSpy(portFactory, 'sayHi').and.returnValue('hi');

      spyOn(portFactory, 'returnHey').and.returnValue('hey');
      spyOn(view2Ctrl, 'getFactoryToReturnHey').and.callThrough();
      view2Ctrl.getFactoryToReturnHey();
      expect(view2Ctrl.controllerMessageTwo).toEqual('hey');
      expect(portFactory.returnHey).toHaveBeenCalled();
      expect(view2Ctrl.controllerMessageTwo).toEqual(jasmine.any(String));
    });

  // End factory describe
  });

  // describe('Calling a function that requires a factory', function(){

  //   it('should not work without the factory being provided', function(){
  //     spyOn(view2Ctrl, 'produceRandomGoods').and.callThrough();
  //     view2Ctrl.produceRandomGoods(view2Ctrl.localgoods[0]);
  //     expect(view2Ctrl.localgoods[0].quantity).toBeGreaterThan(59);
  //   });

  // // End factory describe
  // });

  describe('Port 2 controller', function(){
    it('Port 2 controller should be defined', function() {
      //spec body
      expect(view2Ctrl).toBeDefined();
    });

    it('Object array localgoods should be defined', function(){
      var localgoods = view2Ctrl.localgoods;

      expect(localgoods).toBeDefined();
    });
  });

  describe('spyOn buyProduct', function(){
    beforeEach(function(){
      spyOn(view2Ctrl, 'buyProduct');
      view2Ctrl.buyProduct(view2Ctrl.localgoods[0]);
    });

    it('buyProduct should be called', function(){
      expect(view2Ctrl.buyProduct).toHaveBeenCalled();
    });

    it('buyProduct should have been called with view2Ctrl.localgoods[0]', function(){
      expect(view2Ctrl.buyProduct).toHaveBeenCalledWith(view2Ctrl.localgoods[0]);
    });

    // This fails. Proves that spyOn doesn't actually execute the function unless you use and.callThrough
    // it('The quantity of gold should equal 49', function(){
    //   expect(view2Ctrl.localgoods[0].quantity).toEqual(49);
    // });

  //   it('scope.test should be null', function(){
  //     expect(scope.test).toBeNull();
  //   });

  });

  describe('spyOn(someObject, \'someFunction\').and.callThrough()', function(){

    beforeEach(function(){
      
      spyOn(view2Ctrl, 'buyProduct').and.callThrough();
      view2Ctrl.buyProduct(view2Ctrl.localgoods[0]);
    });

    it('buyProduct should be called', function(){
      expect(view2Ctrl.buyProduct).toHaveBeenCalled();
    });

    it('buyProduct should have been called with view2Ctrl.localgoods[0]', function(){
      expect(view2Ctrl.buyProduct).toHaveBeenCalledWith(view2Ctrl.localgoods[0]);
    });

    it('The quantity of gold should be a number', function(){
      expect(view2Ctrl.localgoods[0].quantity).toEqual(jasmine.any(Number));
    });

    it('buyProduct should be called', function(){
      expect(view2Ctrl.buyProduct.calls.any()).toEqual(true);
    });

    it('buyProduct should be called once', function(){
      expect(view2Ctrl.buyProduct.calls.count()).toEqual(1);
    });

    it('buyProduct should be called twice, once in the before and once in the spec', function(){
      view2Ctrl.buyProduct(view2Ctrl.localgoods[0]);
      expect(view2Ctrl.buyProduct.calls.count()).toEqual(2);
    });

  });

  describe('spyOn something and call the fake function', function(){

    var initialQuantity;
    beforeEach(function(){
      
    spyOn(view2Ctrl, 'buyProduct').and.callFake(function(fakeProduct){
      fakeProduct.quantity -= 3;
    });
      initialQuantity = view2Ctrl.localgoods[0].quantity;
      view2Ctrl.buyProduct(view2Ctrl.localgoods[0]);
    });

    it('buyProduct should be called', function(){
      expect(view2Ctrl.buyProduct).toHaveBeenCalled();
    });

    it('buyProduct should have been called with view2Ctrl.localgoods[0]', function(){
      expect(view2Ctrl.buyProduct).toHaveBeenCalledWith(view2Ctrl.localgoods[0]);
    });

    it('The quantity of gold should be a number', function(){
      expect(view2Ctrl.localgoods[0].quantity).toEqual(initialQuantity - 3);
      expect(view2Ctrl.localgoods[0].quantity).toEqual(jasmine.any(Number));
    });

  });


//    it('should fail authentication', function() {

//      // Notice how you can change the response even after it was set
//      authRequestHandler.respond(401, '');

//      $httpBackend.expectGET('/auth.py');
//      var controller = createController();
//      $httpBackend.flush();
//      expect($rootScope.status).toBe('Failed...');
//    });



 

  describe('Message on test with broadcast from test', function(){


    beforeEach(inject(function(){

    }));

    it('should have set messages to one total', function(){
      scope.$broadcast('signal');
      expect(view2Ctrl.messages).toBe(1);
    });
  });

  describe('Spy on broadcast', function(){


    it('should see what the broadcast message was and the arguments passed', function(){
      spyOn(scope, "$broadcast");
      view2Ctrl.broadcastMessage();

      expect(scope.$broadcast).toHaveBeenCalledWith('newStuff', 3);

    })
  });

  describe('Spy on rootscope broadcast', function(){


    it('should see what the broadcast message was and the arguments passed', function(){
      spyOn(rootScope, "$broadcast");
      view2Ctrl.broadcastRootscopeMsg();

      expect(rootScope.$broadcast).toHaveBeenCalledWith('rootMessage', 4);

    })
  });

  describe('Resolve a promise so that weather is not safe', function(){

    // var $timeout;
    // beforeEach(inject(function($injector){
    //   $timeout = $injector.get('$timeout');
    //         // Set up the mock http service responses
    //   $httpBackend = $injector.get('$httpBackend');

    //   requestHandler = $httpBackend.when('GET', 'data/localGoods.json')
    //                                     .respond('');
    // }));


    //   afterEach(function(){
    //     $httpBackend.verifyNoOutstandingExpectation();
    //     $httpBackend.verifyNoOutstandingRequest();
    //     $timeout.verifyNoPendingTasks();
    //   });


    it('should resolve the promise as being false', function(done){
      // It must be in the same it block
      setTimeout(function(){
        view2Ctrl.reportWeather();
        expect(view2Ctrl.safeWeather).toEqual(false);
        done();
      }, 50);

      view2Ctrl.checkSafeWeather();
      done();
      

      // rootScope.$digest();

      // $httpBackend.flush();
      // $timeout.flush();

    });
  });

  // Jasmine clock only works with setTimeout
  describe('Jasmine clock: Increment after timeout', function(){

    beforeEach(function(){
      jasmine.clock().install();
      
    });

    afterEach(function(){
      jasmine.clock().uninstall();
    });

    it('should have localgoods[0] quantity at 50', function(){
      expect(view2Ctrl.localgoods[0].quantity).toBe(50);
    });

    it('should fail to increment quantity if no time has been artifically passed', function(){
      
      expect(view2Ctrl.localgoods[0].quantity).toBe(50);
    });

    // Jasmine clock tick only works when you have used setTimeout.

    // it('should increment quantity if time has artifically been passed', function(){
    //   spyOn(view2Ctrl, 'produceGoods').and.callThrough();
    //   view2Ctrl.produceGoods(view2Ctrl.localgoods[0]);
    //   jasmine.clock().tick(8000);
    //   expect(view2Ctrl.localgoods[0].quantity).toBe(51);

    // });
  });

  describe('Increment after timeout without using jasmine clock', function(){
    var $timeout;
    beforeEach(inject(function($injector){
      $timeout = $injector.get('$timeout');
            // Set up the mock http service responses
      $httpBackend = $injector.get('$httpBackend');

      requestHandler = $httpBackend.when('GET', 'data/localGoods.json')
                                        .respond('');
    }));

    afterEach(function(){
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
      $timeout.verifyNoPendingTasks();
    });

    // it('should have localgoods[0] quantity at 50 before flush', function(){
    //   expect(view2Ctrl.localgoods[0].quantity).toBe(50);
    //   spyOn(view2Ctrl, 'produceGoods').and.callThrough();
    //   view2Ctrl.produceGoods(view2Ctrl.localgoods[0]);
    //   $timeout.flush();
    //   $httpBackend.flush();
    // });

    // it('should fail to increment quantity if no time has been artifically passed', function(){
    //   expect(view2Ctrl.localgoods[0].quantity).toBe(50);
    //   spyOn(view2Ctrl, 'produceGoods').and.callThrough();
    //   view2Ctrl.produceGoods(view2Ctrl.localgoods[0]);
    //   $timeout.flush();
    //   $httpBackend.flush();
    // });

    it('should increment quantity after timeouts have been flushed', function(){
      spyOn(view2Ctrl, 'produceGoods').and.callThrough();
      view2Ctrl.produceGoods(view2Ctrl.localgoods[0]);
      $httpBackend.flush();
      $timeout.flush();
      
      // timeout.flush(0) is only required when there is an httpBackend call 
      // that hasn't been flushed before calling timeout
      // $timeout.flush(0);
      

      expect(view2Ctrl.localgoods[0].quantity).toBe(51);
    });

  });

  // describe('The backend call promise resolution', function(){

  //   var http;

  //   beforeEach(inject(function($httpBackend){
  //     http = $httpBackend;
  //   }));

  //   it('should have a 3rd entry for localgoods', function(done){

  //     var extraEntryForLocalgoods = function(){
  //       expect(view2Ctrl.localgoods[2]).toBeDefined();
  //     };

  //     var failOut = function(error){
  //       expect(error).toBeUndefined();
  //     };

  //     http.expectGET('data/localgoods.json').respond(200, [{
  //                                                   "name": "monkeys",
  //                                                   "unitPrice": 200,
  //                                                   "quantity": 50,
  //                                                   "legal": true
  //                                                 }, {
  //                                                   "name": "saffron",
  //                                                   "unitPrice": 300,
  //                                                   "quantity": 50,
  //                                                   "legal": true
  //                                                 }, {
  //                                                   "name": "alcohol",
  //                                                   "unitPrice": 20,
  //                                                   "quantity": 50,
  //                                                   "legal": false
  //                                                 }, {
  //                                                   "name": "silk",
  //                                                   "unitPrice": 70,
  //                                                   "quantity": 50,
  //                                                   "legal": true
  //                                                 }]
  //                                               );

        // This doesn't work at all because this isn't a promise, it just results in a backend call:
  //     view2Ctrl.init()
  //     .then(extraEntryForLocalgoods)
  //     .catch(failOut)
  //     .finally(done);

  //     http.flush();

  //   });
  // });
});


// // testing controller
// describe('MyController', function() {
//    var $httpBackend, $rootScope, createController, authRequestHandler;

//    // Set up the module
//    beforeEach(module('myApp.view2'));

//    beforeEach(inject(function($injector) {
//      // Set up the mock http service responses
//      $httpBackend = $injector.get('$httpBackend');
//      // backend definition common for all tests
//      authRequestHandler = $httpBackend.when('GET', '/auth.py')
//                             .respond({userId: 'userX'}, {'A-Token': 'xxx'});

//      // Get hold of a scope (i.e. the root scope)
//      $rootScope = $injector.get('$rootScope');
//      // The $controller service is used to create instances of controllers
//      var $controller = $injector.get('$controller');

//      createController = function() {
//        return $controller('MyController', {'$scope' : $rootScope });
//      };
//    }));


//    afterEach(function() {
//      $httpBackend.verifyNoOutstandingExpectation();
//      $httpBackend.verifyNoOutstandingRequest();
//    });


//    it('should fetch authentication token', function() {
//      $httpBackend.expectGET('/auth.py');
//      var controller = createController();
//      $httpBackend.flush();
//    });


//    it('should fail authentication', function() {

//      // Notice how you can change the response even after it was set
//      authRequestHandler.respond(401, '');

//      $httpBackend.expectGET('/auth.py');
//      var controller = createController();
//      $httpBackend.flush();
//      expect($rootScope.status).toBe('Failed...');
//    });


//    it('should send msg to server', function() {
//      var controller = createController();
//      $httpBackend.flush();

//      // now you don’t care about the authentication, but
//      // the controller will still send the request and
//      // $httpBackend will respond without you having to
//      // specify the expectation and response for this request

//      $httpBackend.expectPOST('/add-msg.py', 'message content').respond(201, '');
//      $rootScope.saveMessage('message content');
//      expect($rootScope.status).toBe('Saving...');
//      $httpBackend.flush();
//      expect($rootScope.status).toBe('');
//    });


//    it('should send auth header', function() {
//      var controller = createController();
//      $httpBackend.flush();

//      $httpBackend.expectPOST('/add-msg.py', undefined, function(headers) {
//        // check if the header was sent, if it wasn't the expectation won't
//        // match the request and the test will fail
//        return headers['Authorization'] === 'xxx';
//      }).respond(201, '');

//      $rootScope.saveMessage('whatever');
//      $httpBackend.flush();
//    });
// });
