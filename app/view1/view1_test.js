'use strict';

describe('myApp.view1 module', function() {

  beforeEach(module('myApp.view1'));
  var $httpBackend, $rootScope, createController, authRequestHandler;
  var scope;
  beforeEach(inject(function($rootScope) {
      scope = $rootScope.$new ();
  }));

  describe('view1 controller', function(){

    it('Port 1 controller should be defined', inject(function($controller) {
      //spec body

      var view1Ctrl = $controller('View1Ctrl', {$scope: scope});
      expect(view1Ctrl).toBeDefined();
    }));

  });

});
