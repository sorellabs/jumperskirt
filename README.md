jumperskirt
===========

[![Build Status](https://secure.travis-ci.org/robotlolita/jumperskirt.png?branch=master)](https://travis-ci.org/robotlolita/jumperskirt)
[![NPM version](https://badge.fury.io/js/jumperskirt.png)](http://badge.fury.io/js/jumperskirt)
[![Dependencies Status](https://david-dm.org/robotlolita/jumperskirt.png)](https://david-dm.org/robotlolita/jumperskirt)
[![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges)


The UI framework with frills, on top of Stylus and React


## Example

```js
( ... )
```


## Installing

The easiest way is to grab it from NPM. If you're running in a Browser
environment, you can use [Browserify][]

    $ npm install jumperskirt


### Using with CommonJS

If you're not using NPM, [Download the latest release][release], and require
the `jumperskirt.umd.js` file:

```js
var JumperSkirt = require('jumperskirt')
```


### Using with AMD

[Download the latest release][release], and require the `jumperskirt.umd.js`
file:

```js
require(['jumperskirt'], function(JumperSkirt) {
  ( ... )
})
```


### Using without modules

[Download the latest release][release], and load the `jumperskirt.umd.js`
file. The properties are exposed in the global `JumperSkirt` object:

```html
<script src="/path/to/jumperskirt.umd.js"></script>
```


### Compiling from source

If you want to compile this library from the source, you'll need [Git][],
[Make][], [Node.js][], and run the following commands:

    $ git clone git://github.com/robotlolita/jumperskirt.git
    $ cd jumperskirt
    $ npm install
    $ make bundle
    
This will generate the `dist/jumperskirt.umd.js` file, which you can load in
any JavaScript environment.

    
## Documentation

You can [read the documentation online][docs] or build it yourself:

    $ git clone git://github.com/robotlolita/jumperskirt.git
    $ cd jumperskirt
    $ npm install
    $ make documentation

Then open the file `docs/index.html` in your browser.


## Platform support

This library assumes an ES5 environment, but can be easily supported in ES3
platforms by the use of shims. Just include [es5-shim][] :)


## Licence

Copyright (c) 2014 Quildreen Motta.

Released under the [MIT licence](https://github.com/robotlolita/jumperskirt/blob/master/LICENCE).

<!-- links -->
[Fantasy Land]: https://github.com/fantasyland/fantasy-land
[Browserify]: http://browserify.org/
[Git]: http://git-scm.com/
[Make]: http://www.gnu.org/software/make/
[Node.js]: http://nodejs.org/
[es5-shim]: https://github.com/kriskowal/es5-shim
[docs]: http://robotlolita.github.io/jumperskirt
<!-- [release: https://github.com/robotlolita/jumperskirt/releases/download/v$VERSION/jumperskirt-$VERSION.tar.gz] -->
[release]: https://github.com/robotlolita/jumperskirt/releases/download/v0.1.4/jumperskirt-0.1.4.tar.gz
<!-- [/release] -->
