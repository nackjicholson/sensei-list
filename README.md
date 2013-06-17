# sensei-list

[![Build Status](https://secure.travis-ci.org/CascadeEnergy/sensei-list.png?branch=master)](https://travis-ci.org/CascadeEnergy/sensei-list)

The SenseiList is an auto garbage collected list view inspired by (aka "ripped off from") Backbone.Marionette's CollectionView. It is recommended that if you are in a situation where you can use [Marionette](https://github.com/marionettejs/backbone.marionette), that you do so. This view contains the bare minimum of what Marionette.CollectionView can do.

Contributers:

- Will Vaughn

---
### [Contents](id:contents)
- [Usage](#usage)
- [Install](#install)
- [Why](#why)
- [Example](#example)
- [API](#api)
- [Tests](#tests)
- [Support](#support)

---
### [Usage](id:usage)

    var HeroItem = Backbone.View.extend({});
    var HeroesList = SenseiList.extend({
      itemView: HeroItem
    });

see the [example](#example) for more.

---
[top](#contents)
### [Install](id:install)

I may release this as a bower package if I need to. You should really just use Marionette though. I can't stress that enough.

<!--

Bower is a package manager for the web built by twitter, you should check it out, and download this package.

`$ npm install bower -g`  
`$ bower install sensei-list --save `

The `--save` flag will save sensei-list as a dependency in your project's `bower.json` file.

OR  

-->

Download this project, take `sensei-list.js` or `sensei-list.min.js` files out and put them wherever you would like.

---
[top](#contents)
### [Why](id:why)

I needed a garbage collection solution for List views, and was not in a spot in my project where I could afford to incorporate Backbone.Marionette. I decided to blatantly copy the techniques of the marionette framework which I am very interested in learning. Pulling the functionality of CollectionView out, and writing my own tests against it was a great learning experience. As stated above, it is recommended that you use Marionette if you're able to, otherwise feel free to use SenseiList, it can be a quick and dirty solution.

---
[top](#contents)
### [Example](id:example)

There is a small how-to in this repository at [example/example.html](https://github.com/CascadeEnergy/sensei-list/blob/master/example/example.html). 

The example is very basic. It begins with a list of some xmen, you can add new heroes to the collection, remove individual ones, or clear the entire list.

To run the example.

```
$ git clone git@github.com:CascadeEnergy/sensei-list.git
$ cd sensei-list/
$ bower install
$ node ./util/web-server.js
```

and then navigate to <http://localhost:8000/example/example.html>

---
[top](#contents)
### [API](id:api)

_api docs needed_

---
[top](#contents)
### [Tests](id:tests)

Tests are in the `test/` directory, they are written with mocha, and run via `testrunner.html`. To get the dependencies for testing, you must have npm and bower installed: `npm install -g bower`.

Single Test Run. This is how travis-ci runs the tests.

```
$ git clone git@github.com:CascadeEnergy/sensei-list.git  
$ cd sensei-list/
$ npm install
$ bower install
$ npm test
```

**OR**  

Run them in the terminal as you Develop!!!

```
$ git clone git@github.com:CascadeEnergy/sensei-list.git  
$ cd sensei-list/
$ npm install
$ bower install
```

Start a server in one terminal window.  
`$ grunt nodemon`

And then in another terminal window.

```   
$ cd sensei-list/ 
$ grunt watch
```

and then just start developing. Grunt will run automated tests with [mocha-phantomjs](https://github.com/metaskills/mocha-phantomjs), and JSHint whenever you save files.

Also tests in the browser at <http://localhost:8000/testrunner.html>

---
[top](#contents)
### [Support](id:support)

You can make an issue. Pull requests welcome.

Come talk to me on IRC freenode: `#sensei`

component generated with yeoman and [backbone-module](https://github.com/nackjicholson/generator-backbone-module)