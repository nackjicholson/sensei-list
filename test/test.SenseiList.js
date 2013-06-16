define([
  'jquery',
  'backbone',
  'chai',
  'lib/SenseiList'
], function($, Backbone, chai, SenseiList) { 
  'use strict';

  var expect = chai.expect;

  describe('SenseiList', function() {
    var HeroesList
      , list;

    HeroesList = SenseiList.extend({});

    beforeEach(function() {
      this.view = list = new HeroesList();
    });

    afterEach(function() {
      this.view.off();
      delete this.view;
    });

    it('expect 1 + 1 to equal 2', function() {
      var sum = 1 + 1;
      expect(sum).to.equal(2);
    });

    it('expect SenseiList to be a function', function() {
      expect(SenseiList).to.be.a('function');
    });

    describe('.testMethod()', function() {
      it('expect testMethod to be a method', function() {
        expect(list.testMethod).to.be.a('function');
      });
    });
  });
});