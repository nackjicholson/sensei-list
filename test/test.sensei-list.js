define([
  'jquery',
  'backbone',
  'chai',
  'lib/sensei-list'
], function($, Backbone, chai, senseiList) { 
  'use strict';

  var expect = chai.expect;

  describe('sensei-list', function() {
    it('expect 1 + 1 to equal 2', function() {
      var sum = 1 + 1;
      expect(sum).to.equal(2);
    });
  });
});