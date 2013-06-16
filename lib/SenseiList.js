// ## SenseiList.js
// 
// // author: Will Vaughn
//
// > description
// 
// The below Use Anywhere setup was so graciously provided to me by:
// <https://github.com/umdjs/umd/blob/master/returnExports.js>

(function (root, factory) {
    // Add CommonJS support back in if we decide to publish this and gcm on npm.
    // It would be nice to figure out how to manage all this with browserify.
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([
          'jquery',
          'underscore',
          'backbone',
          'backbone.babysitter',
          'backbone-gcm'
        ], factory);
    } else {
        // Browser globals (root is window)
        root.SenseiList = factory(
          root.jQuery,
          root._,
          root.Backbone,
          root.ChildViewContainer,
          root.gcm
        );
  }
}(this, function ($, _, Backbone, ChildViewContainer, gcm) {
  'use strict';

  // This is SenseiList.
  var SenseiList = Backbone.View.extend({
    testMethod: function() {}
  });

  return SenseiList;
}));