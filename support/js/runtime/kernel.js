goog.provide('plt.Kernel');



//////////////////////////////////////////////////////////////////////
// Kernel
// Depends on types.js.
//
// FIXME: there's a circular dependency between types.js and
// kernel.js.  It hasn't bitten us yet only because the circular
// references are in functions, rather than toplevel expressions, but
// we need to be careful.


(function() {

    var NumberTower = plt.types.NumberTower;




    // Compatibility hack: add Array.indexOf if it doesn't exist.
    if(!Array.indexOf){
	Array.prototype.indexOf = function(obj){
	    for(var i=0; i<this.length; i++){
		if(this[i]==obj){
		    return i;
		}
	    }
	    return -1;
	}
    }
    

    // Compatibility for attaching events to nodes.
    var attachEvent = function(node, eventName, fn) {
	if (node.addEventListener) {
	    // Mozilla
	    node.addEventListener(eventName, fn, false);
	} else {
	    // IE
	    node.attachEvent('on' + eventName, fn, false);
	}
    };

    var detachEvent = function(node, eventName, fn) {
	if (node.addEventListener) {
	    // Mozilla
	    node.removeEventListener(eventName, fn, false);
	} else {
	    // IE
	    node.detachEvent('on' + eventName, fn, false);
	}
    }



    // Inheritance from pg 168: Javascript, the Definitive Guide.
    var heir = function(p) {
	var f = function() {}
	f.prototype = p;
	return new f();
    }



    //////////////////////////////////////////////////////////////////////
    var getExternalModuleValue = function(module, name) {

	// munge: string -> string
	var munge = function(name) {
	    var C = plt.Kernel.invokeModule("moby/compiler").EXPORTS;
	    return (C.identifier_dash__greaterthan_munged_dash_java_dash_identifier(
		plt.types.Symbol.makeInstance(name))).toString();
	}
	
	// getModule: string -> module
	// Returns a module that knows how to map scheme names to javascript
	// names.
	var getModule = function(name) {
	    var theModule = plt.Kernel.invokeModule(name);
	    var exports = theModule.EXPORTS;
	    return {
		theModule: theModule,
		getFunction: function(n) {
		    return exports[munge(n)];
		}};
	}
	return getModule(module).getFunction(name);
    };





    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    // Union/find for circular equality testing.

    var UnionFind = function() {
	// this.parenMap holds the arrows from an arbitrary pointer
	// to its parent.
	this.parentMap = plt.types.makeLowLevelEqHash();
    }

    // find: ptr -> UnionFindNode
    // Returns the representative for this ptr.
    UnionFind.prototype.find = function(ptr) {
	var parent = (this.parentMap.containsKey(ptr) ? 
		      this.parentMap.get(ptr) : ptr);
	if (parent === ptr) {
	    return parent;
	} else {
	    var rep = this.find(parent);
	    // Path compression:
	    this.parentMap.put(ptr, rep);
	    return rep;
	}
    };

    // merge: ptr ptr -> void
    // Merge the representative nodes for ptr1 and ptr2.
    UnionFind.prototype.merge = function(ptr1, ptr2) {
	this.parentMap.put(this.find(ptr1), this.find(ptr2));
    };


    
    //////////////////////////////////////////////////////////////////////



    var throwMobyError = plt.types.throwMobyError;


    //////////////////////////////////////////////////////////////////////



    // Returns true if x is a number.
    var isNumber = plt.types.isNumber;

    var isSymbol = function(x) {
	return (x != null && x != undefined && x instanceof plt.types.Symbol);
    }

    var isChar = function(x) {
	return x != null && x != undefined && x instanceof plt.types.Char;
    }


    var isString = function(x) {
	return typeof(x) == 'string';
	//return x != null && x != undefined && x instanceof plt.types.String;
    }

    var isBoolean = function(x) {
	return (x == plt.types.Logic.TRUE || x == plt.types.Logic.FALSE);
    }

    var isPair = function(x) {
	return x != null && x != undefined && x instanceof plt.types.Cons;
    }

    var isEmpty = function(x) {
	return x != null && x != undefined && x instanceof plt.types.Empty;
    }

    var isReal = function(x) {
	return (isNumber(x) && x.isReal());

    }

    var isRational = function(x) {
	return isNumber(x) && x.isRational();
    }


    var isComplex = function(x) {
	return isNumber(x);}

    var isFunction = function(x) {
	return typeof(x) == 'function';
    }

    // Returns true if x is an integer.
    var isInteger = function(x) {
	return (isNumber(x) && x.isInteger());
    }

    var isNatural = function(x) {
	return isNumber(x) && x.isInteger() && x.toFixnum() >= 0;
    }


    // isAlphabeticString: string -> boolean
    var isAlphabeticString = function(s) {
	for(var i = 0; i < s.length; i++) {
	    if (! ((s[i] >= "a" && s[i] <= "z") ||
		   (s[i] >= "A" && s[i] <= "Z"))) {
		return false;
	    }
	}
	return true;
    }

    // isWhitespaceString: string -> boolean
    var isWhitespaceString = (function() {
	var pat = new RegExp("^\\s*$");
	return function(s) {
	    return (s.match(pat) ? true : false);
	}
    }());




    // Returns true if x is a vector
    var isVector = function(x) {
	return x != null && x != undefined && (x instanceof plt.types.Vector);
    }



    // arrayEach: (arrayof X) (X -> void) -> void
    // Apply some function on each element of the array.
    var arrayEach = function(arr, f) {
	for (var i = 0; i < arr.length; i++) {
	    f.apply(arr[i], [arr[i], i]);
	}
    }


    // Apply a chaining test on pairs of elements of the list [first, second, rest ...].
    var chainTest = function(test, first, second, rest) {
	if (! test(first, second).valueOf())
	    return false;
	if (rest.length == 0)
	    return true;
	if (! test(second, rest[0]).valueOf())
	    return false;
	for(var i = 0; i < rest.length - 1; i++) {
	    if (! test(rest[i], rest[i+1]).valueOf())
		return false;
	}
	return true;
    }
    

    // Apply a search on pairs of elements of the list [first, rest ...].
    var chainFind = function(comparator, first, rest) {
	var i;
	var best = first;
	for(i = 0; i < rest.length; i++) {
	    if (! (comparator(best, rest[i])).valueOf()) {
		best = rest[i];
	    }
	}
	return best;
    }
    

    // Returns true if x is a list.
    var isList = function(x) {
	return x != null && x != undefined && ((x instanceof plt.types.Cons) || (x instanceof plt.types.Empty));
    }


    // ordinalize: fixnum -> string
    // Adds the ordinal suffix to an fixnum, according to the rules in
    // http://en.wikipedia.org/wiki/Names_of_numbers_in_English#Ordinal_numbers
    var ordinalize = function(n) {
	var suffixes = ["th", "st", "nd", "rd", "th",
			"th", "th", "th", "th", "th"];
	if ((Math.floor(n / 10) % 10) == 1) {
	    return n + "th";
	} else {
	    return n + suffixes[n % 10];
	}
    };


//     var makeTypeErrorMessage = function(functionName, typeName, position, value) {
// 	return plt.Kernel.format(
// 	    "~a: expects type <~a> as ~a argument, given: ~s",
// 	    [functionName, 
// 	     typeName,
// 	     ordinalize(position),
// 	     value]);
//     }


    // Checks if x satisfies f.  If not, a type error of msg is thrown.
    var check = function(x, f, functionName, typeName, position) {
	if (! f(x)) {
	    plt.Kernel.throwTypeError(functionName, position, typeName, x);
// 	    throw new MobyTypeError(
// 		makeTypeErrorMessage(functionName, typeName, position, x));
	}
    }

    // Throws exception if x is not a list.
    var checkList = function(x, functionName, position) {
	if (! isList(x)) {
	    var E = plt.Kernel.invokeModule("moby/runtime/error-struct").EXPORTS;
	    plt.Kernel.throwTypeError(functionName, 
				      position, 
				      E.make_dash_moby_dash_expected_colon_list(), 
				      x);
// 	    throw new MobyTypeError(
// 		makeTypeErrorMessage(functionName, "list", position, x));
	}
    }

    // Checks if x is a list of f.  If not, throws a MobyTypeError of msg.
    var checkListof = function(x, f, functionName, typeName, position) {
	var E = plt.Kernel.invokeModule("moby/runtime/error-struct").EXPORTS;
	if (! isList(x)) {
	    plt.Kernel.throwTypeError(functionName, 
				      position, 
				      E.make_dash_moby_dash_expected_colon_listof(
					  E.make_dash_moby_dash_expected_colon_something(
					      typeName)), 
				      x);
// 	    throw new MobyTypeError(
// 		makeTypeErrorMessage(functionName, "listof " + typeName, position, x));
	}
	while (! x.isEmpty()) {
	    if (! f(x.first())) {
		plt.Kernel.throwTypeError(functionName, 
					  position, 
					  E.make_dash_moby_dash_expected_colon_listof(
					      E.make_dash_moby_dash_expected_colon_something(
						  typeName)), 
					  x);
// 		throw new MobyTypeError(makeTypeErrorMessage(functionName, "listof " + typeName, position, x));
	    }
	    x = x.rest();
	}
    }


    // makeChainingComparator: (X -> boolean) string (X X (arrayof X) -> boolean) -> (X X (arrayof X) -> boolean) 
    var makeChainingComparator = function(typeCheckF, typeName, comparisonF, comparatorName) {
	return function(first, second, rest) {
	    check(first, typeCheckF, comparatorName, typeName, 1);
	    check(second, typeCheckF, comparatorName, typeName, 2);
	    arrayEach(rest, 
		      function(x, i) { check(x, typeCheckF, comparatorName, typeName, i+3) });
	    return comparisonF(first, second, rest);
	}
    }



    var makeNumericChainingComparator = function(test, comparatorName) {
	return makeChainingComparator(isNumber, "number",
				      function(first, second, rest) {
					  return chainTest(test, first, second, rest);
				      },
				      comparatorName);
    }

    var makeCharChainingComparator = function(test, comparatorName) {
	return makeChainingComparator(isChar, "char",
				      function(first, second, rest) {
					  return chainTest(test, first, second, rest);
				      },
				      comparatorName);
    }


    var makeStringChainingComparator = function(test, comparatorName) {
	return makeChainingComparator(isString, "string",
				      function(first, second, rest) {
					  return chainTest(test, first, second, rest);
				      },
				      comparatorName);
    }




    plt.Kernel = {
	
	_heir : heir,

	pi : plt.types.FloatPoint.pi,
	e : plt.types.FloatPoint.e,
	
	struct_question_: function(thing) {
	    return (thing != null && 
		    thing != undefined && 
		    thing instanceof plt.types.Struct);
	},
	
	number_question_ : function(x){
	    return isNumber(x);
	},
	
	equal_question_ : function(x, y) {
	    return plt.types.isEqual(x, y, new UnionFind());
	},


	equal_tilde__question_ : function(x, y, delta) {
	    check(delta, isNumber, "equal~?", "number", 3);
	    if (isNumber(x) && isNumber(y)) {
		return NumberTower.approxEqual(x, y, delta);
	    } else {
		return plt.types.isEqual(x, y, new UnionFind());
	    }
	},

	
	eq_question_ : function(x, y){
	    return (x == y);
	}, 
	

	eqv_question_ : function(x, y){
	    if (isNumber(x) && isNumber(y)) {
		return NumberTower.eqv(x, y);
	    } else if (isChar(x) && isChar(y)) {
		return x.getValue() == y.getValue();
	    }
	    return x === y;
	},
	

	identity : function (x){
	    return x;
	},
	
	
	cons: function(x, y) {
	    checkList(y, "cons", 2);
	    return plt.types.Cons.makeInstance(x, y);
	},
	
	first: function(thing) {
	    checkList(thing, "first", 1);
	    return thing.first();
	},
	
	rest: function(thing) {
	    checkList(thing, "rest", 1);
	    return thing.rest();
	},
	
	
	second: function(thing) {
	    checkList(thing, "second", 1);
	    return thing.rest().first();
	},
	
	third: function(thing) {
	    checkList(thing, "third", 1);
	    return thing.rest().rest().first();
	},
	
	fourth: function(thing) {
	    checkList(thing, "fourth", 1);
	    return thing.rest().rest().rest().first();
	},
	
	fifth: function(thing) {
	    checkList(thing, "fifth", 1);
	    return thing.rest().rest().rest().rest().first();
	},
	
	
	random: function(x) {
	    check(x, isInteger, "random", "integer", 1);
	    return plt.types.Rational.makeInstance(Math.floor(NumberTower.toFixnum(x) * 
							      Math.random()),
						   1);
	},
	
	current_dash_seconds: function () {
	    return plt.types.Rational.makeInstance(
		Math.floor(new Date().getTime() / 1000));
	},


	floor: function(x) {
	    check(x, isNumber, "floor", "number", 1);
	    return x.floor();
	},
	
	ceiling: function(x) {
	    check(x, isNumber, "ceiling", "number", 1);
	    return x.ceiling();
	},
	
	sqrt: function(x) {
	    check(x, isNumber, "sqrt", "number", 1);
	    return x.sqrt();
	},

	integer_dash_sqrt: function(x) {
	    check(x, isInteger, "integer-sqrt", "integer", 1);
	    var result = x.sqrt();
	    if (isRational(result)) {
		return plt.types.Rational.makeInstance(result.toFixnum());
	    } else if (isReal(result)) {
		return plt.types.Rational.makeInstance(result.toFixnum());
	    } else {

		// it must be complex.
		return plt.types.Complex.makeInstance(
		    plt.types.Rational.makeInstance
		    (plt.Kernel.real_dash_part(result).toFixnum()),
		    plt.types.Rational.makeInstance
		    (plt.Kernel.imag_dash_part(result).toFixnum()));
	    }
	},
	
	sqr: function(x) {
	    check(x, isNumber, "sqr", "number", 1);
	    return NumberTower.sqr(x);
	},
	
	sin: function(x) {
	    check(x, isNumber, "sin", "number", 1);
	    return x.sin();
	},
	
	cos: function(x) {
	    check(x, isNumber, "cos", "number", 1);
	    return x.cos();
	},
	
	modulo: function(m, n) {
	    check(m, isNumber, "modulo", "number", 1);
	    check(n, isNumber, "modulo", "number", 2);
	    return NumberTower.modulo(m, n);
	},
	
	zero_question_: function(m) {
	    check(m, isNumber, "zero?", "number", 1);
	    return NumberTower.equal(m, plt.types.Rational.ZERO);
	},
	
	
	_equal__tilde_ : function(x, y, delta) {
	    check(x, isNumber, "=~", "number", 1);
	    check(y, isNumber, "=~", "number", 2);
	    check(delta, isNumber, "=~", "number", 3);
	    return NumberTower.approxEqual(x, y, delta);
	},
	
	abs: function(x) {
	    check(x, isNumber, "abs", "number", 1);
	    return NumberTower.abs(x);
	},
	
	add1 : function(x) {
	    check(x, isNumber, "add1", "number", 1);
	    return NumberTower.add(x, plt.types.Rational.ONE);
	},
	
	
	sub1 : function(x) {
	    check(x, isNumber, "sub1", "number", 1);
	    return NumberTower.subtract(x, plt.types.Rational.ONE);
	},
	
	
	_plus_ : function(args) {
	    arrayEach(args, function(x, i) { check(x, isNumber, "+", "number", i+1) });
	    var i, sum = plt.types.Rational.ZERO;
	    for(i = 0; i < args.length; i++) {
		sum = NumberTower.add(sum, args[i]);
	    }
	    return sum;
	},
	

	_dash_ : function(first, args) {
	    check(first, isNumber, "-", "number", 1);
	    arrayEach(args, function(x, i) { check(x, isNumber, "-", "number", i+2) });
	    if (args.length == 0) {
		return NumberTower.subtract
		(plt.types.Rational.ZERO, first);
	    }
	    
	    var i, diff = first;
	    for(i = 0; i < args.length; i++) {
		diff = NumberTower.subtract(diff, args[i]);
	    }
	    return diff;
	},
	
	
	_star_ : function(args) {
	    arrayEach(args, function(x, i) { check(x, isNumber, "*", "number", i+1) });
	    var i, prod = plt.types.Rational.ONE;
	    for(i = 0; i < args.length; i++) {
		prod = NumberTower.multiply(prod, args[i]);
	    }
	    return prod;    
	},
	
	
	_slash_ : function(first, args) {
	    check(first, isNumber, "/", "number", 1);
	    arrayEach(args, function(x, i) { check(x, isNumber, "/", "number", i+2) });
	    var i, div = first;
	    if (args.length == 0) {
		return NumberTower.divide(plt.types.Rational.ONE, div);
	    } else {
		for(i = 0; i < args.length; i++) {
		    div = NumberTower.divide(div, args[i]);
		}
		return div;    
	    }
	},
	

	_equal_ : makeNumericChainingComparator(NumberTower.equal, "="),
	_greaterthan__equal_: makeNumericChainingComparator(NumberTower.greaterThanOrEqual, ">="),
	_lessthan__equal_: makeNumericChainingComparator(NumberTower.lessThanOrEqual, "<="),
	_greaterthan_: makeNumericChainingComparator(NumberTower.greaterThan, ">"),
	_lessthan_: makeNumericChainingComparator(NumberTower.lessThan, "<"),

	
	min : function(first, rest) {
	    check(first, isNumber, "min", "number", 1);
	    arrayEach(rest, function(x, i) { check(this, isNumber, "min", "number", i+2); });
	    return chainFind(NumberTower.lessThanOrEqual,
			     first, 
			     rest);
	},
	
	max : function(first, rest) {
	    check(first, isNumber, "max", "number", 1);
	    arrayEach(rest, function(x, i) { check(this, isNumber, "max", "number", i+2); });
	    return chainFind(NumberTower.greaterThanOrEqual,
			     first, 
			     rest);
	},
	

	lcm : function(first, rest) {
	    check(first, isInteger, "lcm", "number", 1);
	    arrayEach(rest, function(x, i) { check(this, isInteger, "lcm", "number", i+2); });
	    return NumberTower.lcm(first, rest);
	},

	
	gcd : function(first, rest) {
	    check(first, isInteger, "gcd", "number", 1);
	    arrayEach(rest, function(x, i) {
		check(this, isInteger, "gcd", "number", i+2); 
	    });
	    return NumberTower.gcd(first, rest);
	},

	exact_dash__greaterthan_inexact: function(x) {
	    check(x, isNumber, "exact->inexact", "number", 1);
	    return plt.types.FloatPoint.makeInstance(x.toFloat());
	},
	
	inexact_dash__greaterthan_exact: function(x) {
	    check(x, isNumber, "inexact->exact", "number", 1);
	    return NumberTower.toExact(x);
	},

	exact_question_ : function(x) {
	    check(x, isNumber, "exact?", "number", 1);
	    return x.isExact();
	},

	inexact_question_ : function(x) {
	    check(x, isNumber, "inexact?", "number", 1);
	    return ! x.isExact();
	},
	
	rational_question_ : function(x) {
	    return (isNumber(x) && x.isRational());
	},

	number_dash__greaterthan_string: function(x) {
	    check(x, isNumber, "number->string", "number", 1);
	    return plt.types.String.makeInstance(plt.types.toWrittenString(x));
	},
	
	conjugate: function(x){
	    check(x, isNumber, "conjugate", "number", 1);
	    return x.conjugate();
	},
	
	magnitude: function(x){
	    check(x, isNumber, "magnitude", "number", 1);
	    return x.magnitude();
	},
	
	log : function(x) {
	    check(x, isNumber, "log", "number", 1);
	    return x.log();
	},
	
	angle : function(x) {
	    check(x, isNumber, "angle", "number", 1);
	    return x.angle();
	},
	
	atan : function(x, args) {
	    if (args.length == 0) {
		check(x, isNumber, "atan", "number", 1);
		return x.atan();
	    } else if (args.length == 1) {
		check(x, isReal, "atan", "number", 1);
		check(args[0], isReal, "atan", "number", 2);
		return plt.types.FloatPoint.makeInstance(
		    Math.atan2(NumberTower.toFloat(x),
			       NumberTower.toFloat(args[0])));
	    } else {
		var A = plt.Kernel.invokeModule("moby/runtime/arity-struct").EXPORTS;
		throwMobyError(locHashToLoc(plt.Kernel.lastLoc),
			       "make-moby-error-type:application-arity",
			       [plt.types.Symbol.makeInstance("atan"),
				A.make_dash_arity_colon_mixed(
				   plt.types.Cons.makeInstance(
				       A.make_dash_arity_colon_fixed(
					   plt.types.Rational.ONE),
				       plt.types.Cons.makeInstance(
					   A.make_dash_arity_colon_fixed(
					       plt.types.Rational.TWO),
					   plt.types.Empty.EMPTY))),
				plt.types.Rational.makeInstance(args.length)]);
	    }
	},
	
	expt : function(x, y){
	    check(x, isNumber, "expt", "number", 1);
	    check(y, isNumber, "expt", "number", 2);
	    return NumberTower.expt(x, y);
	},
	
	exp : function(x){
	    check(x, isNumber, "exp", "number", 1);
	    return x.exp();
	},
	
	acos : function(x){
	    check(x, isNumber, "acos", "number", 1);
	    return x.acos();
	},
	
	asin : function(x){
	    check(x, isNumber, "asin", "number", 1);
	    return x.asin();
	},
	
	tan : function(x){
	    check(x, isNumber, "tan", "number", 1);
	    return NumberTower.divide(x.sin(), x.cos());
	},
	
	complex_question_ : function(x){
	    return isComplex(x);
	},
	
	cosh : function(x) {
	    check(x, isNumber, "cosh", "number", 1);
	    return NumberTower.half(NumberTower.add(NumberTower.exp(x), 
						    NumberTower.exp(NumberTower.minus(x))));
	},
	
	sinh : function(x) {
	    check(x, isNumber, "sinh", "number", 1);
	    return NumberTower.half(NumberTower.subtract(NumberTower.exp(x),
							 NumberTower.exp(NumberTower.minus(x))));
	},
	
	denominator : function(x) {
	    check(x, isRational, "denominator", "rational", 1);
	    return x.denominator();
	},
	
	numerator : function(x){
	    check(x, isRational, "numerator", "rational", 1);
	    return x.numerator();
	},
	
	odd_question_ : function(x){
	    check(x, isNumber, "odd?", "number", 1);
	    return (Math.abs((x.toFixnum() % 2)) == 1);
	},
	
	even_question_ : function(x) {
	    check(x, isNumber, "even?", "number", 1);
	    return (Math.abs((x.toFixnum() % 2)) == 0);
	},
	
	positive_question_ : function(x){
	    check(x, isNumber, "positive?", "number", 1);
	    return NumberTower.greaterThan(x, plt.types.Rational.ZERO);
	},
	
	negative_question_ : function(x){
	    check(x, isNumber, "negative?", "number", 1);
	    return NumberTower.lessThan(x, plt.types.Rational.ZERO);
	},
	
	imag_dash_part : function(x){
	    check(x, isNumber, "imag-part", "number", 1);
	    return x.imag_dash_part();
	},
	
	real_dash_part : function(x){
	    check(x, isNumber, "real-part", "number", 1);
	    return x.real_dash_part();
	},
	

	make_dash_polar: function(r, theta) {
	    // special case: if theta is zero, just return
	    // the scalar.
	    if (NumberTower.equal(theta, plt.types.Rational.ZERO)) {
		return r;
	    }
	    var x = NumberTower.multiply(r, theta.cos());
	    var y = NumberTower.multiply(r, theta.sin());
	    return plt.types.Complex.makeInstance(x, y);
	},

	integer_question_ : function(x){
	    return (isInteger(x));
	},
	
	make_dash_rectangular : function(x, y){
	    return plt.types.Complex.makeInstance(x, y);
	},
	
	quotient : function(x, y){
	    check(x, isInteger, "quotient", "integer", 1);
	    check(y, isInteger, "quotient", "integer", 2);
	    var div = NumberTower.divide(x,y);
	    if (plt.Kernel.positive_question_(div)) {
		return plt.types.Rational.makeInstance(div.floor().toFixnum(),
						       1);
	    } else {
		return plt.types.Rational.makeInstance(div.ceiling().toFixnum(),
						       1);
	    }
	},
	
	remainder : function(x, y) {
	    check(x, isNumber, "remainder", "number", 1);
	    check(y, isNumber, "remainder", "number", 2);
	    return plt.types.Rational.makeInstance(x.toFixnum() % y.toFixnum(), 1);
	},
	

	real_question_ : function(x){
	    return isReal(x);
	},
	
	
	round : function(x){
	    check(x, isNumber, "round", "number", 1);
	    return x.round();
	},
	
	sgn : function(x){
	    check(x, isNumber, "sgn", "number", 1);
	    if (NumberTower.greaterThan(x, plt.types.Rational.ZERO))
		return plt.types.Rational.ONE;
	    if (NumberTower.lessThan(x, plt.types.Rational.ZERO))
		return plt.types.Rational.NEGATIVE_ONE;
	    else
		return plt.types.Rational.ZERO;
	},
	


	boolean_equal__question_ : function(x, y){
	    check(x, isBoolean, "boolean=?", "boolean", 1);
	    check(y, isBoolean, "boolean=?", "boolean", 2);
	    return x == y;
	},
	
	boolean_question_ : function(x){
	    return isBoolean(x);
	},
	
	false_question_ : function(x){
	    return (x == plt.types.Logic.FALSE);
	},
	
	not : function(x){
	    // Restriction on x being a boolean has been weakened.
	    //check(x, isBoolean, "not", "boolean", 1);

	    if (!x || x === plt.types.Logic.FALSE)
		return plt.types.Logic.TRUE;
	    return plt.types.Logic.FALSE;

	    //return (!( x && x.valueOf() )) ? plt.types.Logic.TRUE : plt.types.Logic.FALSE;
	},
	
	symbol_dash__greaterthan_string : function(x){
	    check(x, isSymbol, "symbol->string", "symbol", 1);
	    return plt.types.String.makeInstance(x.val);
	},
	
	symbol_equal__question_ : function(x, y){
	    check(x, isSymbol, "symbol=?", "symbol", 1);
	    check(y, isSymbol, "symbol=?", "symbol", 2);
	    return (x.val == y.val);
	},
	
	symbol_question_ : function(x){
	    return isSymbol(x);
	},
	
	
	append : function(args){
	    var i;
	    for (i = 0; i < args.length; i++) {
		checkList(args[i], "append", i+1);
	    }

	    if (args.length == 0) { 
		return plt.types.Empty.EMPTY;
	    }
            var ret = args[0];
	    for (i = 1; i < args.length; i++) {
		ret = ret.append(args[i]);
	    }
	    return ret;
	},
	
	reverse : function(lst){
	    checkList(lst, "reverse", 1);
	    return plt.types.Cons.reverse(lst);
	}, 
	
	assq : function(x, lst){
	    checkList(lst, "assq", 2);
	    while (!lst.isEmpty() && !plt.Kernel.eq_question_(x, lst.first().first()))
		lst = lst.rest();
	    if (lst.isEmpty())
		return plt.types.Logic.FALSE;
	    else return lst.first();
	},
	
	caaar : function(lst){
	    checkList(lst, "caaar", 1);
	    return lst.first().first().first();
	},
	
	caadr : function(lst){
	    checkList(lst, "caadr", 1);
	    return lst.first().first().rest();
	},
	
	caar : function(lst){
	    checkList(lst, "caar", 1);
	    return lst.first().first();
	},
	
	cadar : function(lst){
	    checkList(lst, "cadar", 1);
	    return lst.first().rest().first();
	},
	
	cadddr : function(lst){
	    checkList(lst, "cadddr", 1);
	    return lst.rest().rest().rest().first();
	},
	
	caddr : function(lst){
	    checkList(lst, "caddr", 1);
	    return lst.rest().rest().first();
	},
	
	cadr : function(lst){
	    checkList(lst, "cadr", 1);
	    return lst.rest().first();
	},
	
	car : function(lst){
	    checkList(lst, "car", 1);
	    return lst.first();
	},
	
	cdaar : function(lst){
	    checkList(lst, "cdaar", 1);
	    return lst.first().first().rest();
	},
	
	cdadr : function(lst){
	    checkList(lst, "cdadr", 1);
	    return lst.rest().first().rest();
	},
	
	cdar : function(lst){
	    checkList(lst, "cdar", 1);
	    return lst.first().rest();
	},
	
	cddar : function(lst){
	    checkList(lst, "cddar", 1);
	    return lst.first().rest().rest();
	},
	
	cdddr : function(lst){
	    checkList(lst, "cdddr", 1);
	    return lst.rest().rest().rest();
	},
	
	cddr : function(lst){
	    checkList(lst, "cddr", 1);
	    return lst.rest().rest();
	},
	
	cdr : function(lst){
	    checkList(lst, "cdr", 1);
	    return lst.rest();
	},

	null_question_ : function(x){
	    return isEmpty(x);
	},
	
	empty_question_: function(x) {
	    return isEmpty(x);
	},
	
	pair_question_ : function(x){
	    return isPair(x);
	},
	
	cons_question_: function(x){
	    return isPair(x);
	},

	list_question_: function(x) {
	    return isList(x);
	},

	
	sixth : function(lst){
	    checkList(lst, "sixth", 1);
	    return lst.rest().rest().rest().rest().rest().first();
	},
	
	seventh: function(lst){
	    checkList(lst, "seventh", 1);
	    return lst.rest().rest().rest().rest().rest().rest().first();
	},
	
	eighth : function(lst){
	    checkList(lst, "eighth", 1);
	    return lst.rest().rest().rest().rest().rest().rest().rest().first();
	},

	set_dash_car_bang_ : function(lst, newVal){
	    checkList(lst, "set-car!", 1);
	    lst.f = newVal;
	    return undefined;
	},

	set_dash_cdr_bang_ : function(lst, newListVal){
	    checkList(lst, "set-cdr!", 1);
	    checkList(newListVal, "set-cdr!", 2);
	    lst.r = newListVal;
	    return undefined;
	},
	
	length : function(lst){
	    checkList(lst, "length", 1);
	    var ret = plt.types.Rational.ZERO;
	    for (; !lst.isEmpty(); lst = lst.rest()) {
		ret = plt.Kernel.add1(ret);
	    }
	    return ret;
	},
	
	list : function(items){
	    var ret = plt.types.Empty.EMPTY;
	    for (var i = items.length - 1; i >=0; i--) {
		ret = plt.types.Cons.makeInstance(items[i], ret);
	    }
	    return ret;
	},
	
	list_star_ : function(items, otherItems){
	    var lastListItem = otherItems.pop();
	    if (lastListItem == undefined || ! lastListItem instanceof plt.types.Cons) {
		var S = plt.Kernel.invokeModule("moby/runtime/error-struct").EXPORTS;
		plt.Kernel.throwTypeError("list*",
					  otherItems.length + 2,
					  S.make_dash_moby_dash_expected_colon_list(),
					  lastListItem);
	    }
	    otherItems.unshift(items);
	    return plt.Kernel.append([plt.Kernel.list(otherItems), lastListItem]);
	},
	
	list_dash_ref : function(lst, x){
	    checkList(lst, "list-ref", 1);
	    check(x, isNatural, "list-ref", "natural", 2);
	    var i = plt.types.Rational.ZERO;
	    var len = 0;
	    for (; plt.Kernel._lessthan_(i, x,[]); i = plt.Kernel.add1(i)) {
		if (lst.isEmpty()) {
		    var S = plt.Kernel.invokeModule("moby/runtime/error-struct").EXPORTS;
		    throw S.make_dash_moby_dash_error(
			locHashToLoc(plt.Kernel.lastLoc),
			S.make_dash_moby_dash_error_dash_type_colon_index_dash_out_dash_of_dash_bounds(
			    plt.types.Rational.ZERO,
			    plt.types.Rational.makeInstance(len - 1),
			    x));
		}
		else {
		    len++;
		    lst = lst.rest();
		}
	    }
	    return lst.first();
	},
	
	remove : function(item, lst){
	    checkList(lst, "member", 2);
	    var originalLst = lst;
	    var aUnionFind = new UnionFind();
	    var result = plt.types.Empty.EMPTY;
	    while (!lst.isEmpty()){
		if (plt.types.isEqual(item, lst.first(), aUnionFind).valueOf()) {
		    return plt.Kernel.append([plt.Kernel.reverse(result),
					     lst.rest()]);
		} else {
		    result = plt.types.Cons.makeInstance(lst.first(),
							 result);
		    lst = lst.rest();
		}
	    }
	    return originalLst;
	},

	member : function(item, lst){
	    checkList(lst, "member", 2);
	    var aUnionFind = new UnionFind();
	    while (!lst.isEmpty()){
		if (plt.types.isEqual(item, lst.first(), aUnionFind).valueOf())
		    return plt.types.Logic.TRUE;
		lst = lst.rest();
	    }
	    
	    return plt.types.Logic.FALSE;
	},

	
	memq : function(item, lst){
	    checkList(lst, "memq", 2);
	    while (!lst.isEmpty()){
		if (plt.Kernel.eq_question_(item, lst.first()).valueOf())
		    return lst;
		lst = lst.rest();
	    }
	    
	    return plt.types.Logic.FALSE;
	},
	

	memv : function(item, lst){
	    checkList(lst, "memv", 2);
	    while (!lst.isEmpty()){
		if (plt.Kernel.eqv_question_(item, lst.first()).valueOf())
		    return lst;
		lst = lst.rest();
	    }
	    
	    return plt.types.Logic.FALSE;
	},


	memf : function(testF, lst) {
	    check(testF, isFunction, "memf", "function", 1);
	    checkList(lst, "memf", 2);
	    // TODO: add contract on higher order argument testF.    
	    while (!lst.isEmpty()){
		if (testF([lst.first()])) {
		    return lst;
		}
		lst = lst.rest();
	    }
	    return plt.types.Logic.FALSE;
	},


	compose: function(functions) {
	    // TODO: add contract on higher order argument testF.
	    return plt.types.liftToplevelToFunctionValue(
		function(v) {
		    for (var i = functions.length - 1; i >= 0; i--) {
			v = plt.Kernel.apply(functions[i], 
					     plt.types.Cons.makeInstance(
						 v, plt.types.Empty.EMPTY),
					     []);
		    }
		    return v;
		},
		plt.types.String.makeInstance("composed"),
		1,
		plt.types.Rational.makeInstance(1));
	},
	

	string_dash__greaterthan_number : function(str){
	    var stxModule = plt.Kernel.invokeModule("moby/runtime/stx");
	    check(str, isString, "string->number", "string", 1);
	    try {
		var stxList = plt.reader.readSchemeExpressions(str, "");
		if (NumberTower.equal(plt.Kernel.length(stxList),
						plt.types.Rational.ONE)) {
		    var result = stxModule.EXPORTS.stx_dash_e(stxList.first());
		    if (isNumber(result)) {
			return result;
		    } else {
			return plt.types.Logic.FALSE;
		    }
		} else {
		    return plt.types.Logic.FALSE;
		}
	    } catch (e) {
		return plt.types.Logic.FALSE;
	    }
	},
	

	string_dash__greaterthan_symbol : function(str){
	    check(str, isString, "string->symbol", "string", 1);
	    return plt.types.Symbol.makeInstance(str);
	},


	string_dash__greaterthan_int: function(str) {
	    check(str, isString, "string->int", "string", 1);
	    return plt.types.Rational.makeInstance(str.toString().charCodeAt(0), 1);
	},

	
	string_dash_append : function(arr){
	    arrayEach(arr, function(x, i) { check(x, isString, "string-append", "string", i+1) });
            return plt.types.String.makeInstance(arr.join(""));
	},


	replicate: function(n, s) {
	    check(n, isNatural, "replicate", "natural", 1);
	    check(s, isString, "replicate", "string", 2);
	    var buffer = [];
	    for (var i = 0; i < n.toFixnum(); i++) {
		buffer.push(s);
	    }
	    return plt.types.String.makeInstance(buffer.join(""));
	},

	
	string_equal__question_ : makeStringChainingComparator(
	    function(x, y){return x == y;}, "string=?"),
	

	string_lessthan__equal__question_: makeStringChainingComparator(
	    function(x, y){return x <= y;}, "string<=?"),


	string_lessthan__question_: makeStringChainingComparator(
	    function(x, y){return x < y;}, "string<?"),
	

	string_greaterthan__equal__question_: makeStringChainingComparator(
	    function(x, y){return x >= y;}, "string>=?"),
	

	string_greaterthan__question_: makeStringChainingComparator(
	    function(x, y){return x > y;}, "string>?"),
	

	string_dash_ci_equal__question_ : makeStringChainingComparator(
	    function(x, y){return x.toUpperCase() == y.toUpperCase();}, "string-ci=?"),
	

	string_dash_ci_lessthan__equal__question_ : makeStringChainingComparator(
	    function(x, y){return x.toUpperCase() <= y.toUpperCase();}, "string-ci<=?"),
	

	string_dash_ci_lessthan__question_ : makeStringChainingComparator(
	    function(x, y){return x.toUpperCase() < y.toUpperCase();}, "string-ci<?"),
	

	string_dash_ci_greaterthan__question_ : makeStringChainingComparator(
	    function(x, y){return x.toUpperCase() > y.toUpperCase();}, "string-ci>?"),
	

	string_dash_ci_greaterthan__equal__question_ : makeStringChainingComparator(
	    function(x, y){return x.toUpperCase() >= y.toUpperCase();}, "string-ci>=?"),
	

	string_dash_copy : function(str){
	    check(str, isString, "string-copy", "string", 1);
	    return str.substring(0, str.length);
	},
	
	string_dash_length : function(str){
	    check(str, isString, "string-length", "string", 1);
	    return plt.types.Rational.makeInstance(str.length, 1);
	},
	
	string_dash_ref : function(str, i){
	    check(str, isString, "string-ref", "string", 1);
	    check(i, isNatural, "string-ref", "natural", 2);
	    if (NumberTower.toFixnum(i) >= str.length) {
		var S = plt.Kernel.invokeModule("moby/runtime/error-struct").EXPORTS;
		throw S.make_dash_moby_dash_error(
		    locHashToLoc(plt.Kernel.lastLoc),
		    S.make_dash_moby_dash_error_dash_type_colon_index_dash_out_dash_of_dash_bounds(
			plt.types.Rational.ZERO,
			plt.types.Rational.makeInstance(str.length - 1),
			i));
	    }
	    return plt.types.Char.makeInstance(str.charAt(i.toFixnum()));
	},

	string_dash_ith : function (str, i) {
	    check(str, isString, "string-ith", "string", 1);
	    check(i, isNatural, "string-ith", "natural", 2);
	    if (i.toFixnum() >= str.length) {
		var S = plt.Kernel.invokeModule("moby/runtime/error-struct").EXPORTS;
		throw S.make_dash_moby_dash_error(
		    locHashToLoc(plt.Kernel.lastLoc),
		    S.make_dash_moby_dash_error_dash_type_colon_index_dash_out_dash_of_dash_bounds(
			plt.types.Rational.ZERO,
			plt.types.Rational.makeInstance(str.length - 1),
			i));
	    }
	    return plt.types.String.makeInstance(str.substring(i.toFixnum(), i.toFixnum()+1));
	},

	int_dash__greaterthan_string: function (i) {
	    check(i, isInteger, "int->string", "integer", 1);
	    return plt.types.String.makeInstance(String.fromCharCode(i.toFixnum()));
	},

	
	string_question_ : function(str){
	    return isString(str);
	},
	

	substring : function(str, begin, end){
	    check(str, isString, "substring", "string", 1);
	    check(begin, isNatural, "substring", "natural", 2);
	    check(end, isNatural, "substring", "natural", 3);
	    if (begin.toFixnum() > end.toFixnum()) {
		var S = plt.Kernel.invokeModule("moby/runtime/error-struct").EXPORTS;
		throw S.make_dash_moby_dash_error(
		    locHashToLoc(plt.Kernel.lastLoc),
		    S.make_dash_moby_dash_error_dash_type_colon_index_dash_out_dash_of_dash_bounds(
			begin,
			plt.types.Rational.makeInstance(str.length),
			end));
	    }
	    if (end.toFixnum() > str.length) {
		var S = plt.Kernel.invokeModule("moby/runtime/error-struct").EXPORTS;
		throw S.make_dash_moby_dash_error(
		    locHashToLoc(plt.Kernel.lastLoc),
		    S.make_dash_moby_dash_error_dash_type_colon_index_dash_out_dash_of_dash_bounds(
			begin,
			plt.types.Rational.makeInstance(str.length),
			end));
	    }
	    return String.makeInstance(str.substring(begin.toFixnum(), end.toFixnum()));
	},

	char_question_: function(x) {
	    return isChar(x);
	},
	
	char_dash__greaterthan_integer : function(ch){
	    check(ch, isChar, "char->integer", "char", 1);
	    var str = new String(ch.val);
	    return plt.types.Rational.makeInstance(str.charCodeAt(0), 1);
	},
	
	integer_dash__greaterthan_char : function(n){
	    check(n, isInteger, "integer->char", "integer", 1);
	    var str = String.fromCharCode(n.toFixnum());
	    return plt.types.Char.makeInstance(str);
	},
	
	
	char_equal__question_ : makeCharChainingComparator(
	    function(x, y) { return x.val == y.val; }, "char=?"),
	
	char_lessthan__question_ : makeCharChainingComparator(
	    function(x, y){ return x.val < y.val; }, "char<?"),
	
	
	char_lessthan__equal__question_ : makeCharChainingComparator(
	    function(x, y){ return x.val <= y.val; }, "char<=?"),

	
	char_greaterthan__question_ : makeCharChainingComparator(
	    function(x, y){ return x.val > y.val; }, "char>?"),
	
	char_greaterthan__equal__question_ : makeCharChainingComparator(
	    function(x, y){ return x.val >= y.val; }, "char>=?"),
	
	char_dash_ci_equal__question_ : makeCharChainingComparator(
	    function(x, y){ return x.val.toUpperCase() == y.val.toUpperCase(); }, "char-ci=?"),

	char_dash_ci_lessthan__question_ : makeCharChainingComparator(
	    function(x, y){ return x.val.toUpperCase() < y.val.toUpperCase(); }, "char-ci<?"),


	char_dash_ci_lessthan__equal__question_ : makeCharChainingComparator(
	    function(x, y){ return x.val.toUpperCase() <= y.val.toUpperCase(); }, "char-ci<=?"),
	
	char_dash_ci_greaterthan__question_ : makeCharChainingComparator(
	    function(x, y){ return x.val.toUpperCase() > y.val.toUpperCase(); }, "char-ci>?"),

	
	char_dash_ci_greaterthan__equal__question_ : makeCharChainingComparator(
	    function(x, y){ return x.val.toUpperCase() >= y.val.toUpperCase(); }, "char-ci>=?"),
	
	
	char_dash_numeric_question_ : function(ch){
	    check(ch, isChar, "char-numeric?", "char", 1);
	    var str = ch.val;
	    return (str >= "0" && str <= "9");
	},

	char_dash_alphabetic_question_ : function(ch){
	    check(ch, isChar, "char-alphabetic?", "char", 1);
	    var str = ch.val;
	    return isAlphabeticString(str);
	},

	char_dash_whitespace_question_ : function(ch){
	    check(ch, isChar, "char-whitespace?", "char", 1);
	    var str = ch.val;
	    return isWhitespaceString(str);
	},

	char_dash_upper_dash_case_question_ : function(ch){
	    check(ch, isChar, "char-upper-case?", "char", 1);
	    return isAlphabeticString(ch.val) && ch.val.toUpperCase() == ch.val;
	},
	
	char_dash_lower_dash_case_question_ : function(ch){
	    check(ch, isChar, "char-lower-case?", "char", 1);
	    return isAlphabeticString(ch.val) && ch.val.toLowerCase() == ch.val;
	},


	char_dash_upcase : function(ch){
	    check(ch, isChar, "char-upcase", "char", 1);
	    return plt.types.Char.makeInstance(ch.val.toUpperCase());
	},

	
	char_dash_downcase : function(ch){
	    check(ch, isChar, "char-downcase", "char", 1);
	    return plt.types.Char.makeInstance(ch.val.toLowerCase());
	},
	

	
	// list->string: (listof char) -> string
	list_dash__greaterthan_string : function(lst){
	    checkListof(lst, isChar, "list->string", "char", 1);
	    var ret = "";
	    while (!lst.isEmpty()){
		ret += lst.first().val;
		lst = lst.rest();
	    }
	    return plt.types.String.makeInstance(ret);
	},

	implode: function(lst) {
	    checkListof(lst, isString, "implode", "string", 1);
	    var ret = [];
	    while (!lst.isEmpty()){
		ret.push(lst.first().toString());
		lst = lst.rest();
	    }
	    return plt.types.String.makeInstance(ret.join(""));
	},
	



	string_dash_numeric_question_: function(s) {
	    check(s, isString, "string-numeric?", "string", 1);
	    for (var i = 0 ; i < s.length; i++) {
		if (s[i] < '0' || s[i] > '9') {
		    return plt.types.Logic.FALSE;
		}
	    }
	    return plt.types.Logic.TRUE;
	},


	string_dash_alphabetic_question_: function(s) {
	    check(s, isString, "string-alphabetic?", "string", 1);
	    return isAlphabeticString(s) ? plt.types.Logic.TRUE : plt.types.Logic.FALSE;
	},


	string_dash_whitespace_question_: function(s) {
	    check(s, isString, "string-whitespace?", "string", 1);
	    return isWhitespaceString(s) ? plt.types.Logic.TRUE : plt.types.Logic.FALSE;
	},


	string_dash_upper_dash_case_question_: function(s) {
	    check(s, isString, "string-upper-case?", "string", 1);
	    return isAlphabeticString(s) && s.toUpperCase() == s;
	},


	string_dash_lower_dash_case_question_: function(s) {
	    check(s, isString, "string-lower-case?", "string", 1);
	    return isAlphabeticString(s) && s.toLowerCase() == s;
	},


	string : function(chars) {
	    arrayEach(chars, function(x, i) { check(this, isChar, "string", "char", i+1); });
	    var buffer = [];
	    for(var i = 0; i < chars.length; i++) {
		buffer.push(chars[i].val);
	    }
	    return String.makeInstance(buffer.join(""));
	},


	make_dash_string : function(n, ch){
	    check(n, isNatural, "make-string", "natural", 1);
	    check(ch, isChar, "make-string", "char", 2);
	    var ret = "";
	    var c = ch.val;
	    var i = plt.types.Rational.ZERO;
	    for (;  plt.Kernel._lessthan_(i, n, []); i = plt.Kernel.add1(i)) {
		ret += c;
	    }
	    return plt.types.String.makeInstance(ret);
	},
	
	string_dash__greaterthan_list : function(str){
	    check(str, isString, "string->list", "string", 1);
	    var s = str;
	    var ret = plt.types.Empty.EMPTY;
	    for (var i = s.length - 1; i >= 0; i--) {
		ret = plt.types.Cons.makeInstance
		(plt.types.Char.makeInstance(s.charAt(i)),
		 ret);
	    }
	    return ret;
	},


	explode: function (str) {
	    check(str, isString, "explode", "string", 1);
	    var s = str;
	    var ret = plt.types.Empty.EMPTY;
	    for (var i = s.length - 1; i >= 0; i--) {
		ret = plt.types.Cons.makeInstance
		(plt.types.String.makeInstance(s.charAt(i)),
		 ret);
	    }
	    return ret;	    
	}



	
    };
    

    plt.Kernel.isEqual = plt.types.isEqual;

    // DEBUGGING: get out all the functions defined in the kernel.
    plt.Kernel._dumpKernelSymbols = function() {
	var result = plt.types.Empty.EMPTY;
	for (var sym in plt.Kernel) {
	    if (plt.Kernel.hasOwnProperty(sym)) {
		result = plt.types.Cons.makeInstance(plt.types.Symbol.makeInstance(sym),
						     result);
	    }
	}
	return result;
    };




    //////////////////////////////////////////////////////////////////////
    // Hashtable functions


    // make-hasheq: -> hash
    plt.Kernel.make_dash_hasheq = function() {
	return new plt.types.EqHashTable();
    };


    // make-hash: -> hash
    plt.Kernel.make_dash_hash = function() {
	return new plt.types.EqualHashTable();
    };


    // plt.Kernel.hashSet: hash object value -> undefined
    // Mutates the hash with a new key/value binding.
    plt.Kernel.hash_dash_set_bang_ = function(obj, key, val) {
	check(obj, isHash, "hash-set!", "hash", 1);
	obj.hash.put(key, val);
	return undefined;
    };

    plt.Kernel.hash_dash_ref = function(obj, key, defaultVal) {
	check(obj, isHash, "hash-ref", "hash", 1);
	if (obj.hash.containsKey(key)) {
	    return obj.hash.get(key);
	} else {
	    if (isFunction(defaultVal)) {
		return defaultVal([]);
	    }
	    return defaultVal;
	}
    };
    
    plt.Kernel.hash_dash_remove_bang_ = function(obj, key) {
	check(obj, isHash, "hash-remove!", "hash", 1);
	obj.hash.remove(key);
	return undefined;
    };

    plt.Kernel.hash_dash_map = function(ht, f) {
	check(ht, isHash, "hash-map", "hash", 1);
	var result = plt.types.Empty.EMPTY;
	var keys = ht.hash.keys();
	for (var i = 0; i < keys.length; i++){
	    var val = ht.hash.get(keys[i]);
	    result = plt.Kernel.cons(f([keys[i], val]),
				     result);
	}
	return result;
    };


    plt.Kernel.hash_dash_for_dash_each = function(ht, f) {
	check(ht, isHash, "hash-for-each", "hash", 1);
	var result = plt.types.Empty.EMPTY;
	var keys = ht.hash.keys();
	for (var i = 0; i < keys.length; i++){
	    var val = ht.hash.get(keys[i]);
	    f([keys[i], val]);
	}
	return undefined;
    };

    var isHash = function(x) {
	return ((x !== null) && 
		(x !== undefined) && 
		((x instanceof plt.types.EqHashTable) || 
		 (x instanceof plt.types.EqualHashTable)));
    }
    plt.Kernel.hash_question_ = isHash;



    //////////////////////////////////////////////////////////////////////

    

    plt.Kernel.apply = function(f, secondArg, restArgs) {
	var argList;
	var argArray = [];

	check(f, isFunction, "apply", "function", 1);
	if (restArgs.length == 0) {
	    argList = secondArg;
	    checkList(argList, "apply", 2);
	    while (! argList.isEmpty()) {
		var elt = argList.first()
		argArray.push(elt);
		argList = argList.rest();
	    }	
	} else {
	    argList = restArgs.pop();
	    checkList(argList, "apply", 3);
	    while (! argList.isEmpty()) {
		var elt = argList.first()
		argArray.push(elt);
		argList = argList.rest();
	    }	
	    while(restArgs.length > 0) {
		argArray.unshift(restArgs.pop());
	    }
	    argArray.unshift(secondArg);

	}
	if (procedureArityIncludes(f, argArray.length)) {
	    return f(argArray);
	} else {
	    throwMobyError(
		false,
		"make-moby-error-type:generic-runtime-error",
		[plt.Kernel.format(
		    "~a: expects ~a, given ~a: ~s", 
		    [f,
		     procedureArityDescription(f),
		     argArray.length,
		     plt.Kernel.list(argArray)])]);
	}
    };


    plt.Kernel.map = function(f, arglists) {
	check(f, isFunction, "map", "function", 1);
	arrayEach(arglists, function(x, i) { 
	    checkList(x, "map", i+2); });
	// TODO: add contract on higher order argument f.
	var results = plt.types.Empty.EMPTY;
	while (!arglists[0].isEmpty()) {
	    var args = [];
	    for (var i = 0; i < arglists.length; i++) {
		args.push(arglists[i].first());
		arglists[i] = arglists[i].rest();
	    }
	    results = plt.Kernel.cons(f(args), results);
	}
	return plt.Kernel.reverse(results);
    };


    plt.Kernel.for_dash_each = function(f, arglists) {
	check(f, isFunction, "for-each", "function", 1);
	arrayEach(arglists, function(x, i) { 
	    checkList(x, "for-each", i+2); });
	// TODO: add contract on higher order argument f.
	while (!arglists[0].isEmpty()) {
	    var args = [];
	    for (var i = 0; i < arglists.length; i++) {
		args.push(arglists[i].first());
		arglists[i] = arglists[i].rest();
	    }
	    f(args);
	}
	return undefined;
    };



    plt.Kernel.andmap = function(f, arglists) {
	check(f, isFunction, "andmap", "function", 1);
	arrayEach(arglists, function(x, i) { 
	    checkList(x, "andmap", i+2); });

	// TODO: add contract on higher order argument f.
	while (!arglists[0].isEmpty()) {
	    var args = [];
	    for (var i = 0; i < arglists.length; i++) {
		args.push(arglists[i].first());
		arglists[i] = arglists[i].rest();
	    }
	    if (! f(args)) {
		return plt.types.Logic.FALSE;
	    }
	}

	return plt.types.Logic.TRUE;
    };



    plt.Kernel.ormap = function(f, arglists) {
	check(f, isFunction, "ormap", "function", 1);
	arrayEach(arglists, function(x, i) { 
	    checkList(x, "ormap", i+2);});
	// TODO: add contract on higher order argument f.
	while (! arglists[0].isEmpty()) {
	    var args = [];
	    for (var i = 0; i < arglists.length; i++) {
		args.push(arglists[i].first());
		arglists[i] = arglists[i].rest();
	    }
	    if (f(args)) {
		return plt.types.Logic.TRUE;
	    }
	}
	return plt.types.Logic.FALSE;
    };





    plt.Kernel.filter = function(f, elts) {
	check(f, isFunction, "filter", "function", 1);
	check(elts, isList, "filter", "list", 2);
	// TODO: add contract on higher order argument f.
	var results = plt.types.Empty.EMPTY;
	while (! elts.isEmpty()) {
	    if (f([elts.first()])) {
		results = plt.types.Cons.makeInstance(elts.first(), results);
	    }
	    elts = elts.rest();
	}
	return plt.Kernel.reverse(results);
    };


    plt.Kernel.foldl = function(f, acc, arglists) {
	check(f, isFunction, "foldl", "function", 1);
	arrayEach(arglists, function(x, i) { check(x, isList, "foldl", "list", i+3)});
	// TODO: add contract on higher order argument f.
	var result = acc;
	while (!arglists[0].isEmpty()) {
	    var args = [];
	    for (var i = 0; i < arglists.length; i++) {
		args.push(arglists[i].first());
		arglists[i] = arglists[i].rest();
	    }
	    args.push(result);
	    result = f(args);
	}
	return result;
    };


    plt.Kernel.foldr = function(f, acc, arglists) {
	check(f, isFunction, "foldr", "function", 1);
	arrayEach(arglists, function(x, i) { check(x, isList, "foldr", "list", i+3)});
	// TODO: add contract on higher order argument f.
	var result = acc;
	for (var i = 0; i < arglists.length; i++) {
	    arglists[i] = plt.Kernel.reverse(arglists[i]);
	}
	while (!arglists[0].isEmpty()) {
	    var args = [];
	    for (var i = 0; i < arglists.length; i++) {
		args.push(arglists[i].first());
		arglists[i] = arglists[i].rest();
	    }
	    args.push(result);
	    result = f(args);
	}
	return result;
    };



    plt.Kernel.argmin = function(f, elts) {
	check(f, isFunction, "argmin", "function", 1);
	check(elts, isPair, "argmin", "nonempty list", 2);
	// TODO: add contract on higher order argument f.
	var bestSoFar = elts.first();
	var bestMetric = f([elts.first()]).toFloat();
	elts = elts.rest();

	while (! elts.isEmpty()) {
	    var nextMetric = f([elts.first()]).toFloat();
	    if (nextMetric < bestMetric) {
		bestSoFar = elts.first();
		bestMetric = nextMetric;
	    }
	    elts = elts.rest();
	}
	return bestSoFar;
    };


    plt.Kernel.argmax = function(f, elts) {
	check(f, isFunction, "argmax", "function", 1);
	check(elts, isPair, "argmax", "nonempty list", 2);
	// TODO: add contract on higher order argument f.
	var bestSoFar = elts.first();
	var bestMetric = f([elts.first()]).toFloat();
	elts = elts.rest();

	while (! elts.isEmpty()) {
	    var nextMetric = f([elts.first()]).toFloat();
	    if (nextMetric > bestMetric) {
		bestSoFar = elts.first();
		bestMetric = nextMetric;
	    }
	    elts = elts.rest();
	}
	return bestSoFar;
    };






    plt.Kernel.sort = function(l, cmpF) {
	check(l, isList, "sort", "list", 1);
	check(cmpF, isFunction, "sort", "function", 2);

	// TODO: add contract on higher order argument cmpF.
	var arr = [];
	while(!l.isEmpty()) {
	    arr.push(l.first());
	    l = l.rest();
	}
	arr.sort(function(x, y) { return cmpF([x, y]) ? -1 : 1; });
	return plt.Kernel.list(arr);
    };

    plt.Kernel.quicksort = plt.Kernel.sort;



    plt.Kernel.build_dash_list = function(n, f) {
	check(n, isNatural, "build-list", "natural", 1);
	check(f, isFunction, "build-list", "function", 2);

	// TODO: add contract on higher order argument f.
	var result = plt.types.Empty.EMPTY;
	for(var i = 0; i < n.toFixnum(); i++) {
	    result = plt.Kernel.cons(f([plt.types.Rational.makeInstance(i, 1)]),
				     result);
	}
	return plt.Kernel.reverse(result);
    };


    plt.Kernel.build_dash_string = function(n, f) {
	check(n, isNatural, "build-string", "natural", 1);
	check(f, isFunction, "build-string", "function", 2);

	// TODO: add contract on higher order argument f.
	var chars = [];
	for(var i = 0; i < n.toFixnum(); i++) {
	    var ch = f([plt.types.Rational.makeInstance(i, 1)]);
	    //	    check(ch, isChar, "char");
	    chars.push(ch.val);
	}
	return plt.types.String.makeInstance(chars.join(""));
    };




    plt.Kernel.format = function(formatStr, args) {
	check(formatStr, isString, "format", "string", 1);
	var pattern = new RegExp("~[sSaAn%~]", "g");
	var buffer = args;
	function f(s) {
	    if (s == "~~") {
		return "~";
	    } else if (s == '~n' || s == '~%') {
		return "\n";
	    } else if (s == '~s' || s == "~S") {
		if (buffer.length == 0) {
		    throwMobyError(false,
				   "make-moby-error-type:generic-runtime-error",
				   
				   ["format: fewer arguments passed than expected"]);
		}
		return plt.types.toWrittenString(buffer.shift());
	    } else if (s == '~a' || s == "~A") {
		if (buffer.length == 0) {
		    throwMobyError(false,
				   "make-moby-error-type:generic-runtime-error",
				   ["format: fewer arguments passed than expected"]);
		}
		return plt.types.toDisplayedString(buffer.shift());
	    } else {
		throwMobyError(false,
			       "make-moby-error-type:generic-runtime-error",
			       ["Unimplemented format " + s]);
	    }
	}
	var result = plt.types.String.makeInstance(formatStr.replace(pattern, f));
	if (buffer.length > 0) {
	    throwMobyError(false,
			   "make-moby-error-type:generic-runtime-error",
			   ["format: More arguments passed than expected"]);
	}
	return result;
    }


    // args: arrayof plt.types.Char
    plt.Kernel.string = function(args) {
	arrayEach(args, function(x, i) { check(x, isChar, "string", "char", i+1)});
	var vals = [];
	for(var i = 0; i < args.length; i++) {
	    vals.push(args[i].getValue());
	}
	return plt.types.String.makeInstance(vals.join(""));
    };

    


    plt.Kernel.procedure_question_ = function(f) {
	return isFunction(f);
    };
    

    plt.Kernel.procedure_dash_arity = function(f) {
	check(f, isFunction, "procedure-arity", "function", 1);
	return f.procedureArity;
    };


    // procedureArityIncludes: function fixnum -> boolean
    // Returns true if the procedure arity of f includes n; false otherwise.
    var procedureArityIncludes = function(f, n) {
	if (isPair(f.procedureArity)) {
	    return n >= f.procedureArity.rest().first().toFixnum();
	} else {
	    return n == f.procedureArity.toFixnum();
	}
    };
    
    // procedureArityDescription: function -> string
    var procedureArityDescription = function(f) {
	if (isPair(f.procedureArity)) {
	    return ("at least " + 
		    (f.procedureArity.rest().first().toFixnum() == 1) ? 
		    "one argument" : 
		    f.procedureArity.rest().first().toFixnum() + " arguments");
	} else {
	    return ((f.procedureArity.toFixnum() == 1) ? 
		    "one argument" : f.procedureArity.toFixnum() + " arguments");
	}
    };


    plt.Kernel.xml_dash__greaterthan_s_dash_exp  = function(s) {
	check(s, isString, "xml->s-exp", "string", 1);
	if (s.length == 0) { 
	    return plt.types.String.makeInstance(""); 
	}
	var xmlDoc;
	try {
	    //Internet Explorer
	    xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
	    xmlDoc.async="false";
	    xmlDoc.loadXML(s);
	    // FIXME: check parse errors
	}
	catch(e) {
	    var parser=new DOMParser();
	    xmlDoc=parser.parseFromString(s, "text/xml");
	    // FIXME: check parse errors
	}

	var parseAttributes = function(attrs) {
	    var result = plt.types.Empty.EMPTY;
	    for (var i = 0; i < attrs.length; i++) {
		var keyValue= plt.types.Cons.makeInstance(
		    plt.types.Symbol.makeInstance(attrs.item(i).nodeName),
		    plt.types.Cons.makeInstance(
			attrs.item(i).nodeValue,
			plt.types.Empty.EMPTY));
		result = plt.types.Cons.makeInstance(keyValue, result);
	    }
	    return plt.types.Cons.makeInstance(
		plt.types.Symbol.makeInstance("@"),
		plt.Kernel.reverse(result));
	};

	var parse = function(node) {
	    if (node.nodeType == Node.ELEMENT_NODE) {
		var result = plt.types.Empty.EMPTY;
		var child = node.firstChild;
		while (child != null) {
		    var nextResult = parse(child);
		    if (isString(nextResult) && 
			!result.isEmpty() &&
			isString(result.first())) {
			result = plt.types.Cons.makeInstance(result.first() + nextResult,
							     result.rest());
		    } else {
			result = plt.types.Cons.makeInstance(nextResult, result);
		    }
		    child = child.nextSibling;
		}
		result = plt.Kernel.reverse(result);
		result = plt.types.Cons.makeInstance(
		    parseAttributes(node.attributes),
		    result);
		result = plt.types.Cons.makeInstance(
		    plt.types.Symbol.makeInstance(node.nodeName),
		    result);
		return result;
	    } else if (node.nodeType == Node.TEXT_NODE) {
		return node.textContent;
	    } else if (node.nodeType == Node.CDATA_SECTION_NODE) {
		return node.data;
	    } else {
		return plt.types.Empty.EMPTY;
	    }
	};
	var result = parse(xmlDoc.firstChild);
	return result;
    };

    plt.Kernel.split_dash_whitespace = function(s) {
	s = s.replace(/^\s+/, "");
	s = s.replace(/\s+$/, "");
	return plt.Kernel.list(s.split(/\s+/));
    };
    


    //////////////////////////////////////////////////////////////////////
    // Boxes

    plt.Kernel.box = function(any) {
	return new plt.types.Box(any);
    };
    
    plt.Kernel.unbox = function(obj) {
	check(obj, plt.Kernel.box_question_, "unbox", "box", 1);
	return obj.unbox();
    };
    
    plt.Kernel.box_question_ = function(obj) {
	return obj != null && obj != undefined && obj instanceof plt.types.Box ;
    };

    plt.Kernel.set_dash_box_bang_ = function(obj, newVal) {
	check(obj, plt.Kernel.box_question_, "set-box!", "box", 1);
	obj.set(newVal);
	return undefined;
    };
    
    //////////////////////////////////////////////////////////////////////

    
    // Posns
    
    var posn = function(x,y) { 
	plt.types.Struct.call(this, "make-posn", [x, y]);
    }

    posn.prototype = heir(plt.types.Struct.prototype);

    var make_dash_posn = function(id0,id1) { 
	return new posn(id0,id1); 
    }

    var posn_dash_x = function(obj) { 
	check(obj, posn_question_, "posn-x", "posn", 1);
	return obj._fields[0]; 
    }

    var posn_dash_y = function(obj) { 
	check(obj, posn_question_, "posn-y", "posn", 1);
	return obj._fields[1]; 
    }

    var posn_question_ = function(obj) { 
        return obj != null && obj != undefined && obj instanceof posn ; 
    }
    
    plt.Kernel.make_dash_posn = make_dash_posn;
    plt.Kernel.posn_question_ = posn_question_;
    plt.Kernel.posn_dash_x = posn_dash_x;
    plt.Kernel.posn_dash_y = posn_dash_y;
    
    

    plt.Kernel.error = function(name, msg) {
	check(name, isSymbol, "error", "symbol", 1);
	check(msg, isString, "error", "string", 2);
	throwMobyError(false, 
		       "make-moby-error-type:generic-runtime-error",
		       [plt.Kernel.format("~a: ~a", [name, msg]).toString()]);
    };





    // reportError: (or exception string) -> void
    // Reports an error to the user, either at the console
    // if the console exists, or as alerts otherwise.
    plt.Kernel.reportError = function(e) {
	var reporter;
	if (typeof(console) != 'undefined' && 
	    typeof(console.log) != 'undefined') {
	    reporter = (function(x) { console.log(x); });
	} else {
	    reporter = (function(x) { alert(x); });
	}
	if (typeof e == 'string') {
	    reporter(e);
	} else if (e.msg) {
	    reporter(e.msg);
	} else {
	    reporter(e.toString());
	}
	if (plt.Kernel.lastLoc) {
	    var loc = plt.Kernel.lastLoc;
	    if (typeof(loc) === 'string') {
		reporter("Error was raised around " + loc);
	    } else if (typeof(loc) !== 'undefined' &&
		       typeof(loc.line) !== 'undefined') {
		reporter("Error was raised around: "
			 + plt.Kernel.locToString(loc));
	    }
	}
    };



    plt.Kernel._void_ = function(args) {
	return undefined;
    };





    plt.Kernel.build_dash_vector = function(n, f) {
	check(n, isNatural, "build-vector", "natural", 1);
	check(f, isFunction, "build-vector", "function", 2);
	var elts = [];
	for(var i = 0; i < n.toFixnum(); i++) {
	    elts[i] = f([plt.types.Rational.makeInstance(i, 1)])
	}
	return plt.types.Vector.makeInstance(n.toFixnum(),
					     elts);
    };

    plt.Kernel.make_dash_vector = function(n, args) {
	check(n, isNatural, "make-vector", "natural", 1);
	// FIXME: not quite right.  We need mixed arity function definition.
	check(args, function(x) { return x.length == 0 || x.length == 1}, "make-vector", "at most two", 2);
	var len = n.toFixnum();
	var i;
	var result = plt.types.Vector.makeInstance(len);
	if (args.length == 1) {
	    for (i = 0; i < len; i++) {
		result.set(i, args[0]);
	    }
	}
	return result;
    };

    plt.Kernel.vector = function(args) {
	return plt.types.Vector.makeInstance(args.length, args);
    };

    plt.Kernel.vector_dash_length = function(vec) {
	check(vec, isVector, "vector-length", "vector", 1);
	return plt.types.Rational.makeInstance(vec.length());
    };

    plt.Kernel.vector_dash__greaterthan_list = function(vec) {
	check(vec, isVector, "vector->list", "vector", 1);
	return vec.toList();
    };


    plt.Kernel.vector_dash_ref = function(vec, k) {
	check(vec, isVector, "vector-ref", "vector", 1);
	check(k, function(x) { return isNatural(x) && x.toFixnum() < vec.length()}, "vector-ref", "natural < vector length", 2);
	return vec.ref(k.toFixnum());
    };

    plt.Kernel.vector_dash_set_bang_ = function(vec, k, v) {
	check(vec, isVector, "vector-set!", "vector", 1);
	check(k, function(x) { return isNatural(x) && x.toFixnum() < vec.length()}, "vector-set!", "natural < vector length", 2);
	return vec.set(k.toFixnum(), v);
    };

    plt.Kernel.vector_question_ = function(x) {
	return isVector(x) ? plt.types.Logic.TRUE : plt.types.Logic.FALSE;
    }








    plt.Kernel.check_dash_expect = function(testThunk, expectedThunk, locSexp) {
	var val = testThunk([]);
	var expectedVal = expectedThunk([]);
	if (! plt.Kernel.equal_question_(val, expectedVal)) {
	    throwMobyError(locSexp, 
			   "make-moby-error-type:check-expect",
			   [expectedVal, val]);
	}
    };


    plt.Kernel.EXAMPLE = plt.Kernel.check_dash_expect;


    plt.Kernel.check_dash_within = function(testThunk, expectedThunk, boundsThunk, locSexp) {
	var val = testThunk([]);
	var expectedVal = expectedThunk([]);
	var boundsVal = boundsThunk([]);
	if (! plt.Kernel._equal__tilde_(val, expectedVal, boundsVal)) {
	    throwMobyError(locSexp, 
			   "make-moby-error-type:check-within",
			   [expectedVal,
			    val,
			    boundsVal]);
	}
    };

    plt.Kernel.check_dash_error = function(testThunk, msgThunk, locSexp) {
	var msg = msgThunk();
	var val;
	try {
	    val = testThunk();
	} catch (e) {
	    var isMobyError = getExternalModuleValue("moby/runtime/error-struct",
						     "moby-error?");
	    var getDom = getExternalModuleValue("moby/runtime/error-struct-to-dom",
						"moby-error-struct-to-dom-sexp");
	    var getDomContent = getExternalModuleValue("moby/runtime/dom-helpers",
						       "dom-string-content");
	    
	    if ((isMobyError(e) && 
		 getDomContent(getDom(e)) != msg)) {
		throwMobyError(locSexp,
			       "make-moby-error-type:check-error",
			       [msg, getDomContent(getDom(e))]);
	    } else if (e.msg && (e.msg != msg)) {
		throwMobyError(locSexp,
			       "make-moby-error-type:check-error",
			       [msg, e.msg])
	    } else {
		return;
	    }
	}
	throwMobyError(locSexp, 
		       "make-moby-error-type:check-error-no-error",
		       [msg, val]);
    };




    plt.Kernel.undefined_question_ = function(x) {
	return x === undefined;
    };



    // As a program runs, the lastLoc will be assigned to the last location
    // we've evaluated in the program.
    plt.Kernel.lastLoc = undefined;
    plt.Kernel.setLastLoc = function(locHash) {
	if (locHash === undefined) {
	    plt.Kernel.lastLoc = undefined;
	    return true;
	}
	plt.Kernel.lastLoc = locHash;
	return true;
    }

    plt.Kernel.locToString = function(lastLoc) {
	if (typeof(lastLoc) === 'string') {
	    return lastLoc;
	} else if (typeof(lastLoc) === 'undefined') {
	    return "undefined";
	} else {
	    return ("offset=" + lastLoc.offset
		    + ", line=" + lastLoc.line
		    + ", column=" + lastLoc.column
		    + ", span=" + lastLoc.span
		    + ", id=" + lastLoc.id);
	}
    };
    


    plt.Kernel.printf = function(formatStr, args) {
	var msg = plt.Kernel.format(formatStr, args);
	plt.Kernel.printHook(msg);
	return undefined;
    }

    plt.Kernel.printHook = function(str) {
    };



    // Throws an exception upward.
    plt.Kernel.raise = function(thing) {
	throw thing;
    }




    // invokeModule: module-name -> module
    // Make sure a module has been invoked.
    // Modules live in plt._MODULES[name].
    // Returns the invoked module.
    plt.Kernel.invokeModule = function(moduleName) {
	// FIXME!  Do something here to load the module, if it hasn't
	// already been loaded.  (Look at how goog.require and
	// goog.writeScriptTags work.)
	var aModule = plt._MODULES[moduleName];
	if (! aModule.isInvoked) {
	    aModule.isInvoked = true;
	    aModule.invoke();
	}
	return aModule;
    }


    //////////////////////////////////////////////////////////////////////


    var locHashToLoc = function(locHash) {
	var stxModule = plt.Kernel.invokeModule("moby/runtime/stx");
	if (locHash === undefined){
	    return stxModule.EXPORTS.make_dash_Loc(
		plt.types.Rational.ZERO,
		plt.types.Rational.ZERO,
		plt.types.Rational.ZERO,
		plt.types.Rational.ZERO,
		"<undefined>");
	} else {
	    return stxModule.EXPORTS.make_dash_Loc(
		plt.types.Rational.makeInstance(locHash.offset),
		plt.types.Rational.makeInstance(locHash.line),
		plt.types.Rational.makeInstance(locHash.column),
		plt.types.Rational.makeInstance(locHash.span),
		locHash.id);
	}
    };
    plt.Kernel.locHashToLoc = locHashToLoc;


    // throwTypeError: string fixnum (string | ExpectedValue)  schemevalue -> MobyError value
    // Helper function to throw a type error.
    plt.Kernel.throwTypeError = function(who, argumentPosition, expected, observed) {
	var E = plt.Kernel.invokeModule("moby/runtime/error-struct").EXPORTS;
	var makeMobyError = E.make_dash_moby_dash_error;
	var makeTypeMismatchType = E.make_dash_moby_dash_error_dash_type_colon_type_dash_mismatch;

	var coersedExpectedValue =
	    (typeof(expected) === 'string' ? 
	     E.make_dash_moby_dash_expected_colon_something(expected) : 
	     expected);

	throw makeMobyError(
	    locHashToLoc(plt.Kernel.lastLoc),
	    makeTypeMismatchType(plt.types.Symbol.makeInstance(who),
				 plt.types.Rational.makeInstance(argumentPosition),
				 coersedExpectedValue,
				 observed));
    };

    

    //////////////////////////////////////////////////////////////////////



    // Expose the predicates.
    plt.Kernel.isSymbol = isSymbol;
    plt.Kernel.isChar = isChar;
    plt.Kernel.isString = isString;
    plt.Kernel.isBoolean = isBoolean;
    plt.Kernel.isPair = isPair;
    plt.Kernel.isEmpty = isEmpty;
    plt.Kernel.isReal = isReal;
    plt.Kernel.isRational = isRational;
    plt.Kernel.isComplex = isComplex;
    plt.Kernel.isInteger = isInteger;
    plt.Kernel.isNatural = isNatural;
    plt.Kernel.isNumber = isNumber;
    plt.Kernel.isAlphabeticString = isAlphabeticString;
    plt.Kernel.isWhitespaceString = isWhitespaceString;
    plt.Kernel.isList = isList;
    plt.Kernel.isVector = isVector;
    plt.Kernel.isFunction = isFunction;
    

    plt.Kernel.arrayEach = arrayEach;

    // Expose the runtime type checkers.
    plt.Kernel.check = check;
    plt.Kernel.checkList = checkList;
    plt.Kernel.checkListof = checkListof;



    plt.Kernel.attachEvent = attachEvent;
    plt.Kernel.detachEvent = detachEvent;


    plt.Kernel.ordinalize = ordinalize;

    
})();
