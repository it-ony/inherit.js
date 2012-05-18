var should = require('should'),
    inherit = require('..').inherit;

describe('inherit.js', function() {

    describe('inherit', function() {

        it('#no parameter', function() {
            var fn = inherit();

            should.exist(fn);
            fn.prototype.should.be.an.instanceof(Object);
            fn.prototype.should.have.ownProperty('base');

        });

        it('#only classDefinition', function () {
            var fn = inherit({
                foo: function () {
                    return 1;
                }
            });

            should.exist(fn);
            fn.prototype.should.have.ownProperty('foo');

        });

        it('#only constructor name', function () {
            var fn = inherit('test');

            should.exist(fn);
            should.exist(fn.prototype.constructor);
            fn.prototype.constructor.should.have.ownProperty('name');
            fn.prototype.constructor.name.should.eql('test');

        });

        it('#constructor name and definition', function () {
            var fn = inherit('test', {
                foo: function() {
                    return "bar";
                }
            });

            should.exist(fn);
            fn.prototype.constructor.should.have.ownProperty('name', 'test');
            fn.prototype.should.have.ownProperty('foo');
            fn.prototype.foo.should.be.an.instanceof(Function);

            fn.prototype.foo().should.eql('bar');

        });

        it('#inherit from baseClass', function () {

            var base = inherit({
                foo: "bar"
            });

            var fn = inherit({
                x: 'y'
            }, base);

            should.exist(fn);
            fn.prototype.should.have.ownProperty('x');
            fn.prototype.x.should.eql('y');

            fn.prototype.should.not.have.ownProperty('foo');

            var instance = new fn();

            should.exist(instance.foo);
            should.exist(instance.x);

            instance.should.be.an.instanceof(base);

        });

        it('#inherit from baseClass with classname', function () {

            var base = inherit({
                foo: "bar"
            });

            var fn = inherit('fn', {
                x: 'y'
            }, base);

            should.exist(fn);
            fn.prototype.should.have.ownProperty('x');
            fn.prototype.x.should.eql('y');

            fn.prototype.should.not.have.ownProperty('foo');

            var instance = new fn();

            should.exist(instance.foo);
            should.exist(instance.x);

            instance.should.be.an.instanceof(base);

            should.exist(instance.constructor);
            instance.constructor.name.should.eql('fn');

        });


    });

    describe('.inherit', function() {

        it('#no parameter', function () {
            var fn = inherit.Base.inherit();

            should.exist(fn);
            fn.prototype.should.be.an.instanceof(Object);
            fn.prototype.should.have.ownProperty('base');

        });

        it('#only classDefinition', function () {
            var fn = inherit.Base.inherit({
                foo: function () {
                    return 1;
                }
            });

            should.exist(fn);
            fn.prototype.should.have.ownProperty('foo');

        });

        it('#only constructor name', function () {
            var fn = inherit.Base.inherit('test');

            should.exist(fn);
            should.exist(fn.prototype.constructor);
            fn.prototype.constructor.should.have.ownProperty('name');
            fn.prototype.constructor.name.should.eql('test');

        });


        it('#constructor name and definition', function () {
            var fn = inherit.Base.inherit('test', {
                foo: function () {
                    return "bar";
                }
            });

            should.exist(fn);
            fn.prototype.constructor.should.have.ownProperty('name', 'test');
            fn.prototype.should.have.ownProperty('foo');
            fn.prototype.foo.should.be.an.instanceof(Function);

            fn.prototype.foo().should.eql('bar');

        });

        it('#inherit from baseClass', function () {

            var base = function(){};
            base.prototype.foo = 'bar';

            var fn = base.inherit({
                x: 'y'
            });

            should.exist(fn);
            fn.prototype.should.have.ownProperty('x');
            fn.prototype.x.should.eql('y');

            fn.prototype.should.not.have.ownProperty('foo');

            var instance = new fn();

            should.exist(instance.foo);
            should.exist(instance.x);

            instance.should.be.an.instanceof(base);

        });

        it('#inherit from baseClass with classname', function () {

            var base = function () {};
            base.prototype.foo = 'bar';

            var fn = base.inherit('fn', {
                x: 'y'
            });

            should.exist(fn);
            fn.prototype.should.have.ownProperty('x');
            fn.prototype.x.should.eql('y');

            fn.prototype.should.not.have.ownProperty('foo');

            var instance = new fn();

            should.exist(instance.foo);
            should.exist(instance.x);

            instance.should.be.an.instanceof(base);

            should.exist(instance.constructor);
            instance.constructor.name.should.eql('fn');

        });

        it('#inherit with extended class', function () {

            var Type = inherit.Base.inherit({
                $modelFactory: function(){}
            });


            Type.of = function(factory) {
                return Type.inherit({
                    $modelFactory: factory
                });
            };

            var instance = new (Type.of(Object));
            (instance instanceof Type).should.be.ok;

        });

    });

    describe('inheritance', function() {

        it('instanceof', function() {

            var A = inherit.Base.inherit({
            });

            var B = A.inherit({
            });

            var C = B.inherit({
            });

            var instance = new C();
            (instance instanceof C).should.be.ok;
            (instance instanceof B).should.be.ok;
            (instance instanceof A).should.be.ok;
            (instance instanceof inherit.Base).should.be.ok;

        });

        it('ctor', function () {

            var a, b, c;

            var A = inherit.Base.inherit({
                ctor: function () {
                    a = 1;
                }
            });

            var B = A.inherit({
                ctor: function () {
                    this.callBase();
                    b = 2;
                }
            });

            var C = B.inherit({
                ctor: function () {
                    this.callBase();
                    c = 3;
                }
            });

            new C();

            should.exist(a);
            should.exist(b);
            should.exist(c);

            a.should.be.eql(1);
            b.should.be.eql(2);
            c.should.be.eql(3);

        });



        it('parameter passing', function () {

            var a, b, c;

            var A = inherit.Base.inherit({
                ctor: function (x, y, z) {
                    a = x;
                    b = y;
                    c = z;
                }
            });

            var B = A.inherit({
                ctor: function () {
                    this.callBase();
                }
            });

            var C = B.inherit({
                ctor: function () {
                    this.callBase();
                }
            });

            new C(1, 2, 3);

            should.exist(a);
            should.exist(b);
            should.exist(c);

            a.should.be.eql(1);
            b.should.be.eql(2);
            c.should.be.eql(3);

        });

        it('parameter passing 2', function () {

            var a, b, c;

            var A = inherit.Base.inherit({
                ctor: function (x, y, z) {
                    a = x;
                    b = y;
                    c = z;
                }
            });

            var B = A.inherit({
                ctor: function (x, y) {
                    this.callBase(x, y, 3);
                }
            });

            var C = B.inherit({
                ctor: function () {
                    this.callBase(1, 2);
                }
            });

            new C();

            should.exist(a);
            should.exist(b);
            should.exist(c);

            a.should.be.eql(1);
            b.should.be.eql(2);
            c.should.be.eql(3);

        });


        it('break callbase', function () {

            var a, b, c;

            var A = inherit.Base.inherit({
                ctor: function () {
                   a = 1;
                }
            });

            var B = A.inherit({
                ctor: function () {
                    b = 2;
                }
            });

            var C = B.inherit({
                ctor: function () {
                    c = 3;
                    this.callBase();
                }
            });

            new C();

            should.not.exist(a);
            should.exist(b);
            should.exist(c);

            b.should.be.eql(2);
            c.should.be.eql(3);

        });
    });
});
