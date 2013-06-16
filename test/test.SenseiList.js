// TODO Test constructor methods somehow.
// TODO investigate if it makes sense to rewrite some tests with sinon.

define([
  'jquery',
  'backbone',
  'chai',
  'lib/SenseiList'
], function($, Backbone, chai, SenseiList) { 
  'use strict';

  var expect = chai.expect;

  describe('SenseiList', function() {
    var Hero
      , Heroes
      , HeroItem
      , HeroesList
      , list;

    Hero = Backbone.Model.extend({});
    Heroes = Backbone.Collection.extend({
      model: Hero
    });

    HeroItem = Backbone.View.extend({});
    HeroesList = SenseiList.extend({
      itemView: HeroItem
    });

    beforeEach(function() {
      this.view = list = new HeroesList({
        collection: new Heroes([
          {name: "Mr. Miyagi"},
          {name: "Daniel LaRusso"},
          {name: "Jack Nicholson"}
        ])
      });
    });

    afterEach(function() {
      this.view.off();
      this.view.collection.off();
      delete this.view.babies;
      delete this.view.collection;
      delete this.view;
    });

    it('expect SenseiList to be a function', function() {
      expect(SenseiList).to.be.a('function');
    });

    describe('.render()', function() {
      it('is a method', function() {
        expect(list.render).to.be.a('function');
      });

      it('calls _renderBabies', function(done) {
        list._renderBabies = function() {
          done();
        };

        list.render();
      });
    });

    describe('._renderBabies()', function() {
      it('is a method', function() {
        expect(list._renderBabies).to.be.a('function');
      });

      it('calls `this.freeAllBabies`', function(done) {
        list.freeAllBabies = function() {
          done();
        };

        list._renderBabies();
      });

      it('calls `this.addAllBabies`', function(done) {
        list.addAllBabies = function() {
          done();
        };

        list._renderBabies();
      });
    });

    describe('.addAllBabies()', function() {
      it('is a method', function() {
        expect(list.addAllBabies).to.be.a('function');
      });

      it('calls `this.addItem` for each model in `this.collection`', function() {
        var numCalls = 0
          , len = list.collection.length;

        list.addItem = function(model, ItemView) {
          numCalls++;
        };

        list.addAllBabies();

        expect(numCalls).to.equal(len);
      });
    });

    describe('addBaby', function() {
      it('is a method', function() {
        expect(list.addBaby).to.be.a('function');
      });

      it('calls `this.addItem` passes model and item view class', function(done) {
        var first = list.collection.first()
          , ItemView = list.itemView;

        list.addItem = function(model, ItemView) {
          expect(model).to.eql(first);
          expect(ItemView).to.eql(ItemView);
          done();
        };

        list.addBaby(first, ItemView);
      });
    });

    describe('.addItem()', function() {
      it('is a method', function() {
        expect(list.addItem).to.be.a('function');
      });

      it('adds a view to the `this.babies` object', function(done) {
        var first = list.collection.first()
          , ItemView = list.itemView;

        list.babies.add = function(itemView) {
          expect(itemView).to.be.instanceof(ItemView);
          expect(itemView.model).to.be.eql(first);
          done();
        };

        list.addItem(first, ItemView);
      });

      it('passes rendered itemView instance to `this.appendHtml`', function(done) {
        var first = list.collection.first()
          , cv = list
          , ItemView = cv.itemView;

        list.appendHtml = function(collectionView, itemView) {
          expect(collectionView).to.equal(cv);
          expect(itemView).to.be.instanceof(ItemView);
          expect(itemView.model).to.be.eql(first);
          done();
        };

        cv.addItem(first, ItemView);
      });
    });

    describe('.freeAllBabies()', function() {
      beforeEach(function() {
        list.render();
      });

      it('is a method', function() {
        expect(list.freeAllBabies).to.be.a('function');
      });

      it('calls `this.freeBaby` for every view stored in `this.babies`', function() {
        var calls = 0
          , len = list.babies.length
          , ItemView = list.itemView;

        expect(len).to.equal(3);

        list.freeBaby = function(view) {
          expect(view).to.be.instanceof(ItemView);
          calls++;
        };

        list.freeAllBabies();

        expect(calls).to.equal(len);
      });
    });

    describe('.freeBaby()', function() {
      var baby;

      beforeEach(function() {
        list.render();
        baby = list.babies.findByIndex(0);
      });

      afterEach(function() {
        baby = undefined;
      });

      it('is a method', function() {
        expect(list.freeBaby).to.be.a('function');
      });

      it('tells the list to stop listening to the baby', function(done) {

        list.stopListening = function(view) {
          expect(view).to.eql(baby);
          done();
        };

        list.freeBaby(baby);
      });

      it('frees the view if possible', function(done) {
        // define baby.free
        baby.free = function() {
          done();
        };

        list.freeBaby(baby);
      });

      it('removes the view if it cannot free it', function(done) {
        // so baby.free isn't defined.
        baby.remove = function() {
          done();
        };

        list.freeBaby(baby);
      });

      it('removes the view from `this.babies`', function(done) {
        list.babies.remove = function(view) {
          expect(view).to.eql(baby);
          done();
        };

        list.freeBaby(baby);
      });

      it('does nothing if no view is passed', function() {
        var wasCalled = false
          , baby = list.babies.findByIndex(0);

        list.babies.remove = function(view) {
          wasCalled = true; 
        };
        
        list.freeBaby();

        expect(wasCalled).to.be.false;
      });
    });

    describe('.freeItem()', function() {
      beforeEach(function() {
        list.render();
      });

      it('is a method', function() {
        expect(list.freeItem).to.be.a('function');
      });

      it('gets the baby view, by the model it holds', function(done) {
        var first = list.collection.first();

        list.babies.findByModel = function(model) {
          expect(model).to.eql(first);
          done();
        };

        list.freeItem(first);
      }); 

      it('passes the view to `this.freeBaby` for removal', function(done) {
        var last = list.collection.last()
          , ItemView = list.itemView;

        list.freeBaby = function(itemView) {
          expect(itemView.model).to.eql(last);
          done();
        };

        list.freeItem(last);
      });
    });

    describe('.free()', function() {
      it('is a method', function() {
        expect(list.free).to.be.a('function');
      });

      it('calls `this.freeAllBabies`', function(done) {
        list.freeAllBabies = function() {
          done();
        };

        list.free();
      });

      it('removes the list from the DOM', function(done) {
        list.remove = function() {
          done();
        };

        list.free();
      });

      it('turns off the collections event listeners', function(done) {
        // saving original version of off.
        var og = list.collection.off;

        // Spy on off.
        list.collection.off = function() {
          // reset it so afterEach hook can run properly.
          list.collection.off = og;
          done();
        };

        list.free();
        // that was suuuuuper hacky.
      });
    });

    describe('.appendHtml()', function() {
      it('is a method', function() {
        expect(list.appendHtml).to.be.a('function');
      });

      it('uses `this.$el.append` to place itemView.el on the DOM', function(done) {
        var ItemView = list.itemView
          , itemView = new ItemView();

        itemView.render();

        list.$el.append = function(htmlStr) {
          expect(htmlStr).to.eql(itemView.el);
          done();
        };

        list.appendHtml(list, itemView);
      });
    });
  });
});