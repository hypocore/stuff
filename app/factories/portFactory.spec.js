'use strict';
describe('Port Factory Tests', function(){

  beforeEach(module('myApp.view2'));

  var portFactory;
  var requestHandler;
  var $httpBackend;

  beforeEach(inject(function(_portFactory_){
    portFactory = _portFactory_;
  }));

  describe('Port Factory', function(){
    it('should exist', function(){
      expect(portFactory).toBeDefined();
    });
  });

  describe('Port Factory call for goods', function(){

    beforeEach(inject(function(_$httpBackend_){
      $httpBackend = _$httpBackend_;

      requestHandler = $httpBackend.when('GET', 'data/localGoods.json')
                        .respond([{"name": "monkeys",
                                    "unitPrice": 200,
                                    "quantity": 50,
                                    "legal": true
                                  }, {
                                    "name": "saffron",
                                    "unitPrice": 300,
                                    "quantity": 50,
                                    "legal": true
                                  }, {
                                    "name": "alcohol",
                                    "unitPrice": 20,
                                    "quantity": 50,
                                    "legal": false
                                  }, {
                                    "name": "silk",
                                    "unitPrice": 70,
                                    "quantity": 50,
                                    "legal": true
                                  }]
                                );

      portFactory.setPortGoods();

    }));

    afterEach(function(){
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should request the json data', function(){
      $httpBackend.expectGET('data/localGoods.json');
      $httpBackend.flush();
    });

    it('should return some goods', function(){
      requestHandler.respond('501', '');
      $httpBackend.flush();
    });
  });
});


  // describe('Make the backend call', function(){
  //   beforeEach(inject(function($injector){


  //     // Set up the mock http service responses
  //     $httpBackend = $injector.get('$httpBackend');

  //     requestHandler = $httpBackend.when('GET', 'data/localGoods.json')
  //                                       .respond([{
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

  //   }));

  //   afterEach(function(){
  //     $httpBackend.verifyNoOutstandingExpectation();
  //     $httpBackend.verifyNoOutstandingRequest();
  //   });

  //   it('should get the localgoods json data', function(){
  //     $httpBackend.expectGET('data/localGoods.json');
  //     $httpBackend.flush();
  //   });

  //   it('should fail to connect to the backend', function(){
  //     requestHandler.respond(501, '');
  //     $httpBackend.flush();
  //     expect(view2Ctrl.backendStatus).toBe('error');
  //   });

  //    });}
