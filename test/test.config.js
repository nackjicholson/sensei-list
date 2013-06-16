require.config({
  baseUrl: '/',
  paths: {
    jquery: '/bower_components/jquery/jquery',
    underscore: '/bower_components/underscore/underscore',
    backbone: '/bower_components/backbone/backbone',
    'backbone.babysitter': '/bower_components/backbone.babysitter/lib/amd/backbone.babysitter',
    'backbone-gcm': '/bower_components/backbone-gcm/backbone-gcm',
    chai: '/bower_components/chai/chai'
  },
  shim: {
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    }
  }
});

require([
  'test/test.SenseiList'
], function() {
  if (window.mochaPhantomJS) { mochaPhantomJS.run(); }
  else { mocha.run(); }
});
