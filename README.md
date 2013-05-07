[![NPM version](https://badge.fury.io/js/inherit.js.png)](http://badge.fury.io/js/inherit.js)

inherit.js - Inheritance javascript library
==========

inherit.js is an inheritance javascript library, which supports base method calls an easy way along the inheritance path.

Usage
-----

### Declare a class

    var YourClass = inherit.Base.inherit({
        ctor: function(foo, bar) {
            // constructor
            this.foo = foo;
            this.bar = bar;
        },
        publicFunction: function() {
            // function declaration
        }
    });

### Inherit from your class

    var DerivedClass = YourClass.inherit({
        ctor: function(foo, bar) {
            // call base ctor
            this.base.ctor.call(this, foo, bar);
        },
        anotherPublicFunction: function(){
            // your code goes here
        },
        // overwrite method
        publicFunction: function() {
            // call base method
            this.base.publicFunction.callBase(this);

            // do other stuff
        }
    });

### Create instances

    var foo = new YourClass("foo", "bar");
    var bar = new DerivedClass("bar", "foo");


