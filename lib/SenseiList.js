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
          'backbone.babysitter'
        ], factory);
    } else {
        // Browser globals (root is window)
        root.SenseiList = factory(
          root.jQuery,
          root._,
          root.Backbone,
          root.ChildViewContainer
        );
  }
}(this, function ($, _, Backbone, ChildViewContainer) {
  'use strict';

  // This is SenseiList.
  var SenseiList = Backbone.View.extend({

    constructor: function() {
      _.bindAll(this, "render");

      this._setupBabysitter();

      var args = Array.prototype.slice.apply(arguments);
      Backbone.View.prototype.constructor.apply(this, args);

      this._setupListeners();
    },

    // Non-api method to build a babysitter object for managing the List's babies.
    _setupBabysitter: function() {
      this.babies = new ChildViewContainer();
    },

    // Non-api method for creating collection event listeners.
    _setupListeners: function() {
      this.listenTo(this.collection, "add", this.addBaby, this);
      this.listenTo(this.collection, "remove", this.freeItem, this);
      this.listenTo(this.collection, "reset", this.render, this);
    },

    // Renders the list.
    // Override to change or add functionality to this method.
    render: function() {
      this._renderBabies();
      return this;
    },

    // Frees up for garbage collection any babies still around, and then adds back.
    _renderBabies: function() {
      this.freeAllBabies();

      if (this.collection && this.collection.length > 0) {
        this.addAllBabies();
      }
    },

    // Iterates on the collection, passing every model to `this.addItem`. 
    addAllBabies: function() {
      var ItemView;

      // a this.getItemView method could keep me from repeating this itemView check in addBaby. 
      if (!this.itemView) {
        throwError("An `itemView` must be specified", "NoItemViewError");
      }

      this.collection.each(function(model) {
        ItemView = this.itemView; 
        this.addItem(model, ItemView);
      }, this);
    },


    // Handler for collection "add".
    // Passes model to `this.addItem`.
    addBaby: function(model, collection, options) {
      var ItemView
        , view;

      // a this.getItemView method could keep me from repeating this itemView check in addAllbabies. 
      if (!this.itemView) {
        throwError("An `itemView` must be specified", "NoItemViewError");
      }

      ItemView = this.itemView;

      this.addItem(model, ItemView);
    },

    // Instantiates a new ItemView, adds it to `this.babies`, and renders it.
    addItem: function(model, ItemView) {
      var view = new ItemView({model: model});
      this.babies.add(view);

      view.render();
      this.appendHtml(this, view);
    },

    // Frees up all babies for garbage collection.
    freeAllBabies: function() {
      this.babies.each(function(view) {
        this.freeBaby(view);
      }, this);
    },

    // Frees up an item view for garbage collection, removes it from dom, and from the `this.babies` object.
    freeBaby: function(view) {
      if (view){
        this.stopListening(view);

        // call 'free' or 'remove', depending on which is found
        if (view.free) { view.free(); }
        else if (view.remove) { view.remove(); }

        this.babies.remove(view);
      }
    },

    // Finds an itemView by its model and then frees it up for garbage collection.
    freeItem: function(model) {
      var view = this.babies.findByModel(model);
      this.freeBaby(view);
    },

    // Frees up all children, and the list itself for garbage collection.
    free: function() {
      this.freeAllBabies();
      this.remove();
      this.collection.off();
    },

    // Append the HTML to the collection's `el`.
    // Override this method to do something other
    // then `.append`.
    appendHtml: function(collectionView, itemView){
      collectionView.$el.append(itemView.el);
    }
  });

  return SenseiList;
}));