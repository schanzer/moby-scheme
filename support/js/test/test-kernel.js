var Rational = plt.types.Rational;
var FloatPoint = plt.types.FloatPoint;
var Complex = plt.types.Complex;
var Kernel = plt.Kernel;
var PI = plt.Kernel.pi;
var String = plt.types.String;
var Symbol = plt.types.Symbol;
var Logic = plt.types.Logic;
var Cons = plt.types.Cons;
var Empty = plt.types.Empty;
var EMPTY = Empty.EMPTY;
var Char = plt.types.Char;

function getTests() {

    return new Test.Unit.Runner({

	setup: function() {
	},
	
	teardown: function() {
	    
	},


	
	testRationalReduction: function() {
            var n1 = Rational.makeInstance(1,2);
            var n2 = Rational.makeInstance(5, 10);
            var n3 = Rational.makeInstance(5, 12);
            this.assert(n1.isEqual(n2));
            this.assert(! n2.isEqual(n3));
	},

	testEqual: function(){
	    var n1 = Rational.makeInstance(2,1);
	    var n2 = FloatPoint.makeInstance(2.0);
	    this.assert(Kernel.equal_question_(n1, n2));
	    
	    var n3 = Complex.makeInstance(2,0);
	    var n4 = Complex.makeInstance(2,1);
	    this.assert(Kernel.equal_question_(n1, n3));
	    this.assert(!Kernel.equal_question_(n3, n4));
	    
	    this.assert(Kernel.equal_question_(String.makeInstance("hi"), String.makeInstance("hi")));


            this.assert(Kernel._equal_(Rational.makeInstance(1, 2),
                                       Rational.makeInstance(2, 4),
                                       [])); 

            this.assert(false == Kernel._equal_(Rational.makeInstance(1, 2),
						Rational.makeInstance(2, 5),
						[])); 

	},
	
	testAbs : function(){
	    var n1 = Rational.makeInstance(-2,1);
	    var n2 = Rational.makeInstance(4, 2);
	    var n3 = Complex.makeInstance(2.0, 0);
	    this.assert(Kernel.equal_question_(Kernel.abs(n1), n2));
	    this.assert(Kernel.equal_question_(Kernel.abs(n3), n2));
	},
	
	testAdd : function(){
	    var n1 = [Rational.makeInstance(2,1), Rational.makeInstance(3,1)];
	    this.assert(Kernel.equal_question_(Kernel._plus_(n1), Rational.makeInstance(5,1)));
	    var n2 = [Rational.makeInstance(2,1), FloatPoint.makeInstance(2.1)];
	    this.assert(Kernel.equal_question_(Kernel._plus_(n2), FloatPoint.makeInstance(4.1)));
	    var n3 = [Rational.makeInstance(2,1), Complex.makeInstance(2, 2)];
	    this.assert(Kernel.equal_question_(Kernel._plus_(n3), Complex.makeInstance(4, 2)));
	    var n4 = [FloatPoint.makeInstance(3.1), Complex.makeInstance(2, 2)];
	    var a1 = Kernel._plus_(n4);
	    this.assert(Kernel.equal_question_(a1, Complex.makeInstance(5.1, 2)));
	    var n5 = [Complex.makeInstance(2, 2), Complex.makeInstance(3, 2)];
	    this.assert(Kernel.equal_question_(Kernel._plus_(n5), Complex.makeInstance(5, 4)));
	},

	testAdd1 : function() {
	    this.assert(Kernel.equal_question_(Kernel.add1(Rational.ZERO), 
					       Rational.ONE));

	    this.assert(Kernel.equal_question_(Kernel.add1(Rational.ONE), 
					       Rational.makeInstance(2)));

	    this.assert(Kernel.equal_question_(Kernel.add1(Rational.makeInstance(2)), 
					       Rational.makeInstance(3)));
	},


	testSub1 : function() {
	    this.assert(Kernel.equal_question_(Kernel.sub1(Rational.ZERO), 
					       Rational.makeInstance(-1)));

	    this.assert(Kernel.equal_question_(Kernel.sub1(Rational.ONE), 
					       Rational.makeInstance(0)));

	    this.assert(Kernel.equal_question_(Kernel.sub1(Rational.makeInstance(2)), 
					       Rational.makeInstance(1)));
	},

	
	testSubtract : function(){
	    var n1 = [Rational.makeInstance(2,1), Rational.makeInstance(3,1)];
	    this.assert(Kernel.equal_question_(Kernel._dash_(Rational.ZERO, n1), Rational.makeInstance(-5,1)));		
	    var n2 = [Rational.makeInstance(2,1), FloatPoint.makeInstance(2.1)];
	    this.assert(Kernel.equal_question_(Kernel._dash_(Rational.ZERO, n2), FloatPoint.makeInstance(-4.1)));
	    var n3 = [Rational.makeInstance(2,1), Complex.makeInstance(2, 2)];
	    this.assert(Kernel.equal_question_(Kernel._dash_(Rational.ZERO, n3), Complex.makeInstance(-4, -2)));
	    var n4 = [FloatPoint.makeInstance(2.1), Complex.makeInstance(2, 2)];
	    this.assert(Kernel.equal_question_(Kernel._dash_(Rational.ZERO, n4), Complex.makeInstance(-4.1, -2)));
	    var n5 = [Complex.makeInstance(2, 2), Complex.makeInstance(3, 2)];
	    this.assert(Kernel.equal_question_(Kernel._dash_(Rational.ZERO, n5), Complex.makeInstance(-5, -4)));
	    
	},
	
	testMultiply : function(){
	    var n1 = [Rational.makeInstance(2,1), Rational.makeInstance(3,1)];
	    this.assert(Kernel.equal_question_(Kernel._star_(n1), Rational.makeInstance(6,1)));
	    var n2 = [Rational.makeInstance(2,1), FloatPoint.makeInstance(2.1)];
	    this.assert(Kernel.equal_question_(Kernel._star_(n2), FloatPoint.makeInstance(4.2)));
	    var n3 = [Rational.makeInstance(2,1), Complex.makeInstance(2, 2)];
	    this.assert(Kernel.equal_question_(Kernel._star_(n3), Complex.makeInstance(4, 4)));
	    var n4 = [FloatPoint.makeInstance(2.1), Complex.makeInstance(2, 2)];
	    this.assert(Kernel.equal_question_(Kernel._star_(n4), Complex.makeInstance(4.2, 4.2)));
	    var n5 = [Complex.makeInstance(2, 2), Complex.makeInstance(3, 2)];
	    this.assert(Kernel.equal_question_(Kernel._star_(n5), Complex.makeInstance(2, 10)));
	},
	
	
	testDivide : function(){
	    var n1 = [Rational.makeInstance(2,1), Rational.makeInstance(3,1)];
	    var six = Rational.makeInstance(6, 1);
	    this.assert(Kernel.equal_question_(Kernel._slash_(six, n1), Rational.ONE));
	    var n2 = [FloatPoint.makeInstance(1.5), FloatPoint.makeInstance(4.0)];
	    this.assert(Kernel.equal_question_(Kernel._slash_(six, n2), Rational.ONE));
	    var n3 = [Complex.makeInstance(3, 4), Complex.makeInstance(3, -4)];
	    this.assert(Kernel.equal_question_(Kernel._slash_(FloatPoint.makeInstance(150), n3), six));
	},
	
	
	testConjugate : function(){
	    var n1 = Rational.makeInstance(2,1);
	    var n2 = FloatPoint.makeInstance(2.1);
	    this.assert(Kernel.equal_question_(n1, Kernel.conjugate(n1)));
	    this.assert(Kernel.equal_question_(n2, Kernel.conjugate(n2)));
	    this.assert(Kernel.equal_question_(Complex.makeInstance(1, 2), Kernel.conjugate(Complex.makeInstance(1, -2))));
	},
	
	testMagnitude : function(){
	    var n1 = Rational.makeInstance(2,1);
	    var n2 = FloatPoint.makeInstance(2.1);
	    this.assert(Kernel.equal_question_(n1, Kernel.magnitude(n1)));
	    this.assert(Kernel.equal_question_(n2, Kernel.magnitude(n2)));
	    this.assert(Kernel.equal_question_(Complex.makeInstance(5, 0), Kernel.magnitude(Complex.makeInstance(3, -4))));
	},
	
	testComparison : function(){	
	    this.assert(Kernel._greaterthan_(Rational.makeInstance(2,1), Rational.makeInstance(1,1), []));
	    this.assert(Kernel._greaterthan_(FloatPoint.makeInstance(2.1), Rational.makeInstance(2,1), []));
	    this.assert(Kernel._greaterthan__equal_(FloatPoint.makeInstance(2.0), Rational.makeInstance(2,1), []));
	    this.assert(Kernel._greaterthan__equal_(Complex.makeInstance(2.0, 0), Rational.makeInstance(2,1), []));


            this.assert(Kernel._lessthan_(Rational.makeInstance(2),
					  Rational.makeInstance(3), []));

            this.assert(! Kernel._lessthan_(Rational.makeInstance(3),
                                            Rational.makeInstance(2), []));
            this.assertRaise("TypeError",
                             function() {
				 Kernel._lessthan_(2, 3, [])});
            this.assertRaise("TypeError",
                             function() {
				 Kernel._greaterthan_("2", "3", [])});

            this.assert(! Kernel._greaterthan_(Rational.makeInstance(2),
                                               Rational.makeInstance(3), []));

            this.assert(Kernel._greaterthan_(Rational.makeInstance(3),
                                             Rational.makeInstance(2), []));

            this.assert(! Kernel._greaterthan_(Rational.makeInstance(3),
                                               Rational.makeInstance(3), []));

            this.assert(Kernel._lessthan__equal_(Rational.makeInstance(17),
						 Rational.makeInstance(17), []));

            this.assert(Kernel._lessthan__equal_(Rational.makeInstance(16),
						 Rational.makeInstance(17), []));

            this.assert(!Kernel._lessthan__equal_(Rational.makeInstance(16),
						  Rational.makeInstance(15), []));
            this.assertRaise("TypeError",
                             function() {
				 Kernel._lessthan__equal_("2", "3", [])});
	},


	testComparison2 : function () {
	    var num = Rational.makeInstance(0, 1);
	    var upper = Rational.makeInstance(480, 1);

	    this.assert(Kernel._lessthan_(Rational.makeInstance(5, 1),
					  upper, []));
	    this.assert(Kernel._lessthan_(Rational.makeInstance(6, 1),
					  upper, []));
	    this.assert(Kernel._lessthan_(Rational.makeInstance(7, 1),
					  upper, []));
	    this.assert(Kernel._lessthan_(Rational.makeInstance(8, 1),
					  upper, []));
	    this.assert(Kernel._lessthan_(Rational.makeInstance(9, 1),
					  upper, []));

	    for (var i = 0; i < 60; i++) {
		this.assert(Kernel._lessthan_
			    (num, upper, []));
		num = Kernel._plus_([num, Rational.ONE]);
	    }
	},

	
	testAtan : function(){
	    this.assert(Kernel.equal_question_(Kernel.atan(Rational.ONE), plt.Kernel.pi.half().half()));
	},
	
	testLog : function(){
	    this.assert(Kernel.equal_question_(Kernel.log(Rational.ONE), Rational.ZERO));		
	    this.assert(Kernel.equal_question_(Kernel.log(Complex.makeInstance(0,1)), plt.Kernel.pi.toComplex().timesI().half()));
	    this.assert(Kernel.equal_question_(Kernel.log(FloatPoint.makeInstance(-1)), plt.Kernel.pi.toComplex().timesI()));
	},
	
	testAngle : function(){
	    this.assert(Kernel.equal_question_(Kernel.angle(Complex.makeInstance(0,1)), PI.half()));
	    this.assert(Kernel.equal_question_(Kernel.angle(Complex.makeInstance(1,1)), PI.half().half()));
	    this.assert(Kernel.equal_question_(Kernel.angle(FloatPoint.makeInstance(-1)), PI));
	    this.assert(Kernel.equal_question_(Kernel.angle(Complex.makeInstance(-1, 1)), PI.multiply(FloatPoint.makeInstance(0.75))));
	    this.assert(Kernel.equal_question_(Kernel.angle(Complex.makeInstance(-1, -1)), PI.multiply(FloatPoint.makeInstance(-0.75))));
	    this.assert(Kernel.equal_question_(Kernel.angle(Complex.makeInstance(1, -1)), PI.half().half().minus()));
	},
	
	testExp : function(){
	    this.assert(Kernel._equal_(Kernel.exp(Rational.ZERO), Rational.ONE, []));
	    this.assert(Kernel._equal_(Kernel.exp(Rational.ONE),
				       Kernel.e, []));
	    this.assert(Kernel._equal__tilde_(Kernel.exp(Rational.makeInstance(2)), 
					      Kernel.sqr(Kernel.e),
					      FloatPoint.makeInstance(0.0001)));
	},
	
	
	testExpt : function(){
	    //var i = plt.types.Complex.makeInstance(0, 1);
	    //this.assert(Kernel.equal_question_(Kernel.expt(i, i), Kernel.exp(PI.half().minus())));
	    this.assert(Kernel.equal_question_(Kernel.expt(FloatPoint.makeInstance(2), FloatPoint.makeInstance(3)), FloatPoint.makeInstance(8)));
	},
	
	
	testSin : function(){
	    this.assert(Kernel.equal_question_(Kernel.sin(PI.divide(FloatPoint.makeInstance(2))), Rational.ONE));
	},
	
	testCos : function(){
	    this.assert(Kernel.equal_question_(Kernel.cos(Rational.ZERO), Rational.ONE));
	},
	

	testSqr: function() {
	    var n1 = Rational.makeInstance(42);
	    this.assertEqual(1764, Kernel.sqr(n1).toInteger());
	    this.assertRaise("TypeError",
			     function() { Kernel.sqr("42"); });
	},

	testIntegerSqrt: function() {
	    var n1 = Rational.makeInstance(36);
	    var n2 = Rational.makeInstance(6);
	
	    this.assertEqual(n2, Kernel.integer_dash_sqrt(n1));
	    this.assertRaise("TypeError", function() { Kernel.integer_dash_sqrt(FloatPoint.makeInstance(3.5)); }); 
	},


	testSqrt : function(){
	    this.assert(Kernel.equal_question_(Kernel.sqrt(FloatPoint.makeInstance(4)), FloatPoint.makeInstance(2)));
	    this.assert(Kernel.equal_question_(Kernel.sqrt(FloatPoint.makeInstance(-1)), Complex.makeInstance(0,1)));
	},
	
	testAcos : function(){
	    this.assert(Kernel.equal_question_(Kernel.acos(Rational.ONE), Rational.ZERO));
	    this.assert(Kernel.equal_question_(Kernel.acos(FloatPoint.makeInstance(-1)), PI));
	},
	
	testAsin : function(){
	    this.assert(Kernel.equal_question_(Kernel.asin(Rational.ZERO), Rational.ZERO));
	    this.assert(Kernel.equal_question_(Kernel.asin(Rational.ONE.minus()), PI.half().minus()));
	    this.assert(Kernel.equal_question_(Kernel.asin(Rational.ONE), PI.half()));
	},
	
	testTan : function(){
	    this.assert(Kernel.equal_question_(Kernel.tan(Rational.ZERO), Rational.ZERO));
	},
	
	testComplex_question_ : function(){
	    this.assert(Kernel.complex_question_(PI));
	    this.assert(Kernel.complex_question_(Rational.ONE));
	    this.assert(Kernel.complex_question_(Complex.makeInstance(0,1)));
	    this.assert(!Kernel.complex_question_(plt.types.Empty.EMPTY));
	    this.assert(!Kernel.complex_question_(String.makeInstance("hi")));
	    this.assert(!Kernel.complex_question_(Symbol.makeInstance('h')));
	},
	
	testCosh : function(){
	    this.assert(Kernel.equal_question_(Kernel.cosh(Rational.ZERO), Rational.ONE));
	},
	
	testSinh : function(){
	    this.assert(Kernel.equal_question_(Kernel.sinh(Rational.ZERO), Rational.ZERO));
	},
	
	testDenominator : function(){
	    this.assert(Kernel.equal_question_(Kernel.denominator(Rational.makeInstance(7,2)), Rational.makeInstance(2,1)));
	},
	
	testNumerator : function(){
	    this.assert(Kernel.equal_question_(Kernel.numerator(Rational.makeInstance(7,2)), Rational.makeInstance(7,1)));
	},


	testIsExact : function() {
	    this.assert(Kernel.exact_question_(Rational.makeInstance(3)));
	    this.assert(! Kernel.exact_question_(FloatPoint.makeInstance(3.0)));
	    this.assert(! Kernel.exact_question_(FloatPoint.makeInstance(3.5)));
	},

	testIsInexact : function() {
	    this.assert(! Kernel.inexact_question_(Rational.makeInstance(3)));
	    this.assert(Kernel.inexact_question_(FloatPoint.makeInstance(3.0)));
	    this.assert(Kernel.inexact_question_(FloatPoint.makeInstance(3.5)));
	},


		
	testOdd_question_ : function(){
	    this.assert(Kernel.odd_question_(Rational.ONE));
	    this.assert(! Kernel.odd_question_(Rational.ZERO));
	    this.assert(Kernel.odd_question_(FloatPoint.makeInstance(1)));
	    this.assert(Kernel.odd_question_(Complex.makeInstance(1, 0)));
	},
	
	testEven_question_ : function(){
	    this.assert(Kernel.even_question_(Rational.ZERO));
	    this.assert(! Kernel.even_question_(Rational.ONE));
	    this.assert(Kernel.even_question_(FloatPoint.makeInstance(2)));
	    this.assert(Kernel.even_question_(Complex.makeInstance(2, 0)));
	},
	
	testPositive_question_ : function(){
	    this.assert(Kernel.positive_question_(Rational.ONE));
	    this.assert(!Kernel.positive_question_(Rational.ZERO));
	    this.assert(Kernel.positive_question_(FloatPoint.makeInstance(1.1)));
	    this.assert(Kernel.positive_question_(Complex.makeInstance(1,0)));
	},
	
	testNegative_question_ : function(){
	    this.assert(Kernel.negative_question_(Rational.makeInstance(-5)));
	    this.assert(!Kernel.negative_question_(Rational.ONE));
	    this.assert(!Kernel.negative_question_(Rational.ZERO));
	    this.assert(!Kernel.negative_question_(FloatPoint.makeInstance(1.1)));
	    this.assert(!Kernel.negative_question_(Complex.makeInstance(1,0)));
	},
	
	testCeiling : function(){
	    this.assert(Kernel.equal_question_(Kernel.ceiling(Rational.ONE), Rational.ONE));
	    this.assert(Kernel.equal_question_(Kernel.ceiling(PI), FloatPoint.makeInstance(4)));
	    this.assert(Kernel.equal_question_(Kernel.ceiling(Complex.makeInstance(3.1,0)), FloatPoint.makeInstance(4)));
	},
	
	testFloor : function(){
	    this.assert(Kernel.equal_question_(Kernel.floor(Rational.ONE), Rational.ONE));
	    this.assert(Kernel.equal_question_(Kernel.floor(PI), FloatPoint.makeInstance(3)));
	    this.assert(Kernel.equal_question_(Kernel.floor(Complex.makeInstance(3.1,0)), FloatPoint.makeInstance(3)));
	},
	
	testImag_dash_part : function(){
	    this.assert(Kernel.equal_question_(Kernel.imag_dash_part(Rational.ONE), Rational.ZERO));
	    this.assert(Kernel.equal_question_(Kernel.imag_dash_part(PI), Rational.ZERO));
	    this.assert(Kernel.equal_question_(Kernel.imag_dash_part(Complex.makeInstance(0,1)), Rational.ONE));
	},
	
	testReal_dash_part : function(){
	    this.assert(Kernel.equal_question_(Kernel.real_dash_part(Rational.ONE), Rational.ONE));
	    this.assert(Kernel.equal_question_(Kernel.real_dash_part(PI), PI));
	    this.assert(Kernel.equal_question_(Kernel.real_dash_part(Complex.makeInstance(0,1)), Rational.ZERO));
	},
	
	testInteger_question_ : function(){
	    this.assert(Kernel.integer_question_(Rational.ONE));
	    this.assert(Kernel.integer_question_(FloatPoint.makeInstance(3.0)));
	    this.assert(!Kernel.integer_question_(FloatPoint.makeInstance(3.1)));
	    this.assert(Kernel.integer_question_(Complex.makeInstance(3,0)));
	    this.assert(!Kernel.integer_question_(Complex.makeInstance(3.1,0)));
	},
	
	testMake_dash_rectangular: function(){
	    this.assert(Kernel.equal_question_(Kernel.make_dash_rectangular(Rational.ONE, Rational.ONE), Complex.makeInstance(1,1)));
	},
	
	testMaxAndMin : function(){
	    var n1 = FloatPoint.makeInstance(-1);
	    var n2 = Rational.ZERO;
	    var n3 = Rational.ONE;
	    var n4 = Complex.makeInstance(4,0);
	    this.assert(Kernel.equal_question_(n4, Kernel.max(n1, [n2,n3,n4])));
	    this.assert(Kernel.equal_question_(n1, Kernel.min(n1, [n2,n3,n4])));

            var n5 = FloatPoint.makeInstance(1.1);
            this.assertEqual(n5, Kernel.max(n1, [n2, n3, n5]));
            this.assertEqual(n1, Kernel.min(n2, [n3, n4, n5, n1]));
	},
	
	testNumberQuestion : function() {
            this.assert(Kernel.number_question_(plt.types.Rational.makeInstance(42)));
            this.assert(Kernel.number_question_(42) == false);
	},


	testNumber_dash__greaterthan_string : function(){
	    this.assert(Kernel.string_equal__question_(String.makeInstance("1"), Kernel.number_dash__greaterthan_string(Rational.ONE),[]));
	    this.assert(!Kernel.string_equal__question_(String.makeInstance("2"), Kernel.number_dash__greaterthan_string(Rational.ONE),[]));
	},
	
	testString_equal__question_	: function(){
	    var s1 = String.makeInstance("hi");
	    var s2 = String.makeInstance("hi");
	    var s3 = String.makeInstance("hi");
	    var s4 = String.makeInstance("hi2");
	    this.assert(Kernel.string_equal__question_(s1, s2, [s3]));
	    this.assert(!Kernel.string_equal__question_(s1,s2,[s4]));
	},
	
	testString_lessthan__equal__question_: function(){
	    var s1 = String.makeInstance("hi");
	    var s2 = String.makeInstance("hi");
	    var s3 = String.makeInstance("hi2");
	    var s4 = String.makeInstance("a");
	    this.assert(Kernel.string_lessthan__equal__question_(s1, s2, [s3]));
	    this.assert(!Kernel.string_lessthan__equal__question_(s1,s2,[s4]));
	},
	
	testString_lessthan__question_: function(){
	    var s1 = String.makeInstance("ha");
	    var s2 = String.makeInstance("hi");
	    var s3 = String.makeInstance("hi2");
	    var s4 = String.makeInstance("hi");
	    this.assert(Kernel.string_lessthan__question_(s1, s2, [s3]));
	    this.assert(!Kernel.string_lessthan__question_(s1,s2,[s4]));
	},
	
	testString_greaterthan__equal__question_: function(){
	    var s1 = String.makeInstance("hi");
	    var s2 = String.makeInstance("ha");
	    var s3 = String.makeInstance("ha");
	    var s4 = String.makeInstance("hi");
	    this.assert(Kernel.string_greaterthan__equal__question_(s1, s2, [s3]));
	    this.assert(!Kernel.string_greaterthan__equal__question_(s1,s2,[s4]));
	},
	
	testString_greaterthan__question_: function(){
	    var s1 = String.makeInstance("hi");
	    var s2 = String.makeInstance("hb");
	    var s3 = String.makeInstance("ha");
	    var s4 = String.makeInstance("hb");
	    this.assert(Kernel.string_greaterthan__question_(s1, s2, [s3]));
	    this.assert(!Kernel.string_greaterthan__question_(s1,s2,[s4]));
	},
	
	testQuotient : function(){
	    this.assert(Kernel.equal_question_(Kernel.quotient(FloatPoint.makeInstance(3), FloatPoint.makeInstance(4)), Rational.ZERO));	
	    this.assert(Kernel.equal_question_(Kernel.quotient(FloatPoint.makeInstance(4), FloatPoint.makeInstance(3)), Rational.ONE));
	},
	
	testRemainder : function(){
	    this.assert(Kernel.equal_question_(Kernel.remainder(FloatPoint.makeInstance(3), FloatPoint.makeInstance(4)), FloatPoint.makeInstance(3)));	
	    this.assert(Kernel.equal_question_(Kernel.remainder(FloatPoint.makeInstance(4), FloatPoint.makeInstance(3)), FloatPoint.makeInstance(1)));
	},

	
	testModulo : function() {
	    var n1 = Rational.makeInstance(17);
	    var n2 = Rational.makeInstance(3);
	    var n3 = Rational.makeInstance(2);
	    this.assertEqual(n3, Kernel.modulo(n1, n2));
	    this.assertEqual(n2, Kernel.modulo(n2, n1));
	},


	testReal_question_ : function(){
	    this.assert(Kernel.real_question_(PI));
	    this.assert(Kernel.real_question_(Rational.ONE));
	    this.assert(!Kernel.real_question_(Complex.makeInstance(0,1)));
	    this.assert(Kernel.real_question_(Complex.makeInstance(1,0)));
	    this.assert(!Kernel.real_question_(plt.types.Empty.EMPTY));
	    this.assert(!Kernel.real_question_(String.makeInstance("hi")));
	    this.assert(!Kernel.real_question_(Symbol.makeInstance('h')));
	},
	
	testRound : function(){
	    this.assert(Kernel.equal_question_(Kernel.round(FloatPoint.makeInstance(3.499999)), FloatPoint.makeInstance(3), []));
	    this.assert(Kernel.equal_question_(Kernel.round(FloatPoint.makeInstance(3.5)), FloatPoint.makeInstance(4), []));
	    this.assert(Kernel.equal_question_(Kernel.round(FloatPoint.makeInstance(3.51)), FloatPoint.makeInstance(4), []));
	},
	
	testSgn : function(){
	    this.assert(Kernel.equal_question_(Kernel.sgn(FloatPoint.makeInstance(4)), Rational.ONE));
	    this.assert(Kernel.equal_question_(Kernel.sgn(FloatPoint.makeInstance(-4)), Rational.NEGATIVE_ONE));
	    this.assert(Kernel.equal_question_(Kernel.sgn(Rational.ZERO), Rational.ZERO));
	},
	
	testZero_question_ : function(){
	    this.assert(Kernel.zero_question_(Rational.ZERO));
	    this.assert(!Kernel.zero_question_(Rational.ONE));
	    this.assert(Kernel.zero_question_(Complex.makeInstance(0,0)));
	},
	
	testBoolean_equal__question_ : function(){
	    this.assert(Kernel.boolean_equal__question_(Logic.TRUE, Logic.TRUE));
	    this.assert(!Kernel.boolean_equal__question_(Logic.TRUE, Logic.FALSE));
	    this.assert(Kernel.boolean_equal__question_(Logic.FALSE, Logic.FALSE));	
	},
	
	testBoolean_question_ : function(){
	    this.assert(Kernel.boolean_question_(Logic.TRUE));
	    this.assert(Kernel.boolean_question_(Logic.FALSE));
	    this.assert(!Kernel.boolean_question_(PI));
	},
	
	testFalse_question_: function(){
	    this.assert(Kernel.false_question_(Logic.FALSE));
	    this.assert(!Kernel.false_question_(Logic.TRUE));
	    this.assert(!Kernel.false_question_(PI));
	},
	
	testNot : function(){
	    this.assert(Kernel.not(Logic.FALSE).valueOf());
	    this.assert(!Kernel.not(Logic.TRUE).valueOf());
	},
	
	testSymbol_dash__greaterthan_string : function(){
	    this.assert(Kernel.string_equal__question_(Kernel.symbol_dash__greaterthan_string(Symbol.makeInstance("ha")), String.makeInstance("ha"), []));
	},
	
	testSymbol_equal__question_ : function(){
	    this.assert(Kernel.symbol_equal__question_(Symbol.makeInstance("hi"), Symbol.makeInstance("hi")));
	    this.assert(!Kernel.symbol_equal__question_(Symbol.makeInstance("hi"), Symbol.makeInstance("hi1")));
	},
	
	testSymbol_question_ : function(){
	    this.assert(Kernel.symbol_question_(Symbol.makeInstance("hi")));
	    this.assert(!Kernel.symbol_question_(String.makeInstance("hi")));
	},
	
	testEmpty_question_ : function(){
	    this.assert(Kernel.empty_question_(Empty.EMPTY));
	    this.assert(!Kernel.empty_question_(Cons.makeInstance(Rational.ONE, Empty.EMPTY)));
	},
	
	testReverse : function(){
	    var lst1 = Cons.makeInstance(FloatPoint.makeInstance(1), Cons.makeInstance(FloatPoint.makeInstance(2),
										       Cons.makeInstance(FloatPoint.makeInstance(3), Cons.makeInstance(FloatPoint.makeInstance(4), EMPTY))));
	    var lst2 = Cons.makeInstance(FloatPoint.makeInstance(4), Cons.makeInstance(FloatPoint.makeInstance(3),
										       Cons.makeInstance(FloatPoint.makeInstance(2), Cons.makeInstance(FloatPoint.makeInstance(1), EMPTY))));
	    var lst3 = Kernel.reverse(lst1);
	    while (!lst2.isEmpty()){
		this.assert(Kernel.equal_question_(lst2.first(), lst3.first()));
		lst2 = lst2.rest();
		lst3 = lst3.rest();
	    }
	},
	
	testAppend : function(){		
	    var lst1 = Cons.makeInstance(FloatPoint.makeInstance(1), Cons.makeInstance(FloatPoint.makeInstance(2), EMPTY));
	    var lst2 = Cons.makeInstance(FloatPoint.makeInstance(3), Cons.makeInstance(FloatPoint.makeInstance(4), EMPTY));
	    var lst3 = Cons.makeInstance(FloatPoint.makeInstance(5), Cons.makeInstance(FloatPoint.makeInstance(6), EMPTY));
	    var lst4 = Cons.makeInstance(FloatPoint.makeInstance(7), Cons.makeInstance(FloatPoint.makeInstance(8), EMPTY));
	    
	    var lst6 = Kernel.append(lst1, [lst2, lst3, lst4]);
	    
	    var i;
	    for (i = 1; i < 9; i++){
		this.assert(Kernel.equal_question_(lst6.first(), FloatPoint.makeInstance(i), []));
		lst6 = lst6.rest();
	    }
	},
	
	testEq_question_ : function(){
	    var a = FloatPoint.makeInstance(2);
	    var b = FloatPoint.makeInstance(3);
	    var c = FloatPoint.makeInstance(2);
	    this.assert(!Kernel.eq_question_(a, b));
	    this.assert(Kernel.eq_question_(a,a));
	    this.assert(!Kernel.eq_question_(a, c));
	},
	
	testAssq : function(){
	    var lst = Cons.makeInstance(Cons.makeInstance(Rational.ONE, EMPTY), Cons.makeInstance(Cons.makeInstance(FloatPoint.makeInstance(2), EMPTY), Cons.makeInstance(Cons.makeInstance(FloatPoint.makeInstance(3), EMPTY), EMPTY)));
	    
	    this.assert(Kernel.false_question_(Kernel.assq(FloatPoint.makeInstance(4), lst)));
	    this.assert(!Kernel.assq(Rational.ONE, lst).isEmpty());
	},
	
	testCaaar : function(){
	    var lst = Cons.makeInstance(Cons.makeInstance(Cons.makeInstance(Rational.ONE, EMPTY), EMPTY), EMPTY);
	    this.assert(Kernel.equal_question_(Kernel.caaar(lst), FloatPoint.makeInstance(1)));
	},
	
	testCaadr : function(){
	    var lst = Cons.makeInstance(Cons.makeInstance(Cons.makeInstance(Rational.ONE, Cons.makeInstance(FloatPoint.makeInstance(2), EMPTY)), EMPTY), EMPTY);
	    this.assert(Kernel.equal_question_(Kernel.caadr(lst).first(), FloatPoint.makeInstance(2)));
	}, 
	
	testCaar : function(){
	    var lst = Cons.makeInstance(Cons.makeInstance(Rational.ONE, EMPTY), EMPTY)
	    this.assert(Kernel.equal_question_(Kernel.caar(lst), FloatPoint.makeInstance(1)));
	},
	
	testCadar : function(){
	    var lst = Cons.makeInstance(Cons.makeInstance(FloatPoint.makeInstance(1), Cons.makeInstance(FloatPoint.makeInstance(2, Cons.makeInstance(FloatPoint.makeInstance(3), EMPTY))), EMPTY));
	    this.assert(Kernel.equal_question_(Kernel.cadar(lst), FloatPoint.makeInstance(2)));
	},
	
	testCadddr : function(){
	    var lst = Cons.makeInstance(FloatPoint.makeInstance(1), Cons.makeInstance(FloatPoint.makeInstance(2), Cons.makeInstance(FloatPoint.makeInstance(3), Cons.makeInstance(FloatPoint.makeInstance(4), EMPTY))));
	    this.assert(Kernel.equal_question_(Kernel.cadddr(lst), FloatPoint.makeInstance(4)));
	},
	
	testCaddr : function(){
	    var lst = Cons.makeInstance(FloatPoint.makeInstance(1), Cons.makeInstance(FloatPoint.makeInstance(2), Cons.makeInstance(FloatPoint.makeInstance(3), EMPTY)));
	    this.assert(Kernel.equal_question_(Kernel.caddr(lst), FloatPoint.makeInstance(3)));
	},
	
	testCadr : function(){
	    var lst = Cons.makeInstance(FloatPoint.makeInstance(1), Cons.makeInstance(FloatPoint.makeInstance(2), EMPTY));
	    this.assert(Kernel.equal_question_(Kernel.cadr(lst), FloatPoint.makeInstance(2)));
	},
	
	testCar : function(){
	    var lst = Cons.makeInstance(FloatPoint.makeInstance(1), EMPTY);
	    this.assert(Kernel.equal_question_(Kernel.car(lst), FloatPoint.makeInstance(1)));
	},
	
	testCdaar : function(){
	    var lst = Cons.makeInstance(Cons.makeInstance(Cons.makeInstance(FloatPoint.makeInstance(1), Cons.makeInstance(FloatPoint.makeInstance(2), EMPTY)), EMPTY), EMPTY);
	    this.assert(Kernel.equal_question_(Kernel.cdaar(lst).first(), FloatPoint.makeInstance(2)));
	},
	
	testCdadr : function(){
	    var lst = Cons.makeInstance(FloatPoint.makeInstance(1), Cons.makeInstance(Cons.makeInstance(FloatPoint.makeInstance(2), Cons.makeInstance(FloatPoint.makeInstance(3), EMPTY)), Cons.makeInstance(FloatPoint.makeInstance(4), EMPTY)));
	    this.assert(Kernel.equal_question_(Kernel.cdadr(lst).first(), FloatPoint.makeInstance(3)));
	},
	
	testCdar : function(){
	    var lst = Cons.makeInstance(Cons.makeInstance(FloatPoint.makeInstance(2), Cons.makeInstance(FloatPoint.makeInstance(3), EMPTY)), EMPTY);
	    this.assert(Kernel.equal_question_(Kernel.cdar(lst).first(), FloatPoint.makeInstance(3)));
	},
	
	testCddar : function(){
	    var lst = Cons.makeInstance(Cons.makeInstance(FloatPoint.makeInstance(1), Cons.makeInstance(FloatPoint.makeInstance(2), Cons.makeInstance(FloatPoint.makeInstance(3), EMPTY))), EMPTY);
	    this.assert(Kernel.equal_question_(Kernel.cddar(lst).first(), FloatPoint.makeInstance(3)));
	},
	
	testCdddr: function(){
	    var lst = Cons.makeInstance(FloatPoint.makeInstance(1), Cons.makeInstance(FloatPoint.makeInstance(2), Cons.makeInstance(FloatPoint.makeInstance(3), Cons.makeInstance(FloatPoint.makeInstance(4), EMPTY))));
	    this.assert(Kernel.equal_question_(Kernel.cdddr(lst).first(), FloatPoint.makeInstance(4)));
	},
	
	testCddr : function(){
	    var lst = Cons.makeInstance(FloatPoint.makeInstance(1), Cons.makeInstance(FloatPoint.makeInstance(2), Cons.makeInstance(FloatPoint.makeInstance(3), EMPTY)));
	    this.assert(Kernel.equal_question_(Kernel.cddr(lst).first(), FloatPoint.makeInstance(3)));
	},
	
	testCdr : function(){
	    var lst = Cons.makeInstance(FloatPoint.makeInstance(1), Cons.makeInstance(FloatPoint.makeInstance(2), EMPTY));
	    this.assert(Kernel.equal_question_(Kernel.cdr(lst).first(), FloatPoint.makeInstance(2)));
	},
	
	testCons_question_ : function(){
	    this.assert(Kernel.cons_question_(Cons.makeInstance(Rational.ONE, EMPTY)));
	    this.assert(!Kernel.cons_question_(EMPTY));
	},
	
	testSixth : function(){
	    var lst = Cons.makeInstance(FloatPoint.makeInstance(1), Cons.makeInstance(FloatPoint.makeInstance(2), Cons.makeInstance(FloatPoint.makeInstance(3), Cons.makeInstance(FloatPoint.makeInstance(4), Cons.makeInstance(FloatPoint.makeInstance(5), Cons.makeInstance(FloatPoint.makeInstance(6), EMPTY))))));
	    this.assert(Kernel.equal_question_(Kernel.sixth(lst), FloatPoint.makeInstance(6)));
	},
	
	testSeventh : function(){
	    var lst = Cons.makeInstance(FloatPoint.makeInstance(1), Cons.makeInstance(FloatPoint.makeInstance(2), Cons.makeInstance(FloatPoint.makeInstance(3), Cons.makeInstance(FloatPoint.makeInstance(4), Cons.makeInstance(FloatPoint.makeInstance(5), Cons.makeInstance(FloatPoint.makeInstance(6), Cons.makeInstance(FloatPoint.makeInstance(7), EMPTY)))))));
	    this.assert(Kernel.equal_question_(Kernel.seventh(lst), FloatPoint.makeInstance(7)));
	},
	
	testEighth : function(){
	    var lst = Cons.makeInstance(FloatPoint.makeInstance(1), Cons.makeInstance(FloatPoint.makeInstance(2), Cons.makeInstance(FloatPoint.makeInstance(3), Cons.makeInstance(FloatPoint.makeInstance(4), Cons.makeInstance(FloatPoint.makeInstance(5), Cons.makeInstance(FloatPoint.makeInstance(6), Cons.makeInstance(FloatPoint.makeInstance(7), Cons.makeInstance(FloatPoint.makeInstance(8), EMPTY))))))));
	    this.assert(Kernel.equal_question_(Kernel.eighth(lst), FloatPoint.makeInstance(8)));
	},
	
	testLength : function(){
	    var lst1 = Cons.makeInstance(FloatPoint.makeInstance(1), Cons.makeInstance(FloatPoint.makeInstance(2), Cons.makeInstance(FloatPoint.makeInstance(3), EMPTY)));
	    var lst2 = EMPTY;
	    this.assert(Kernel.equal_question_(Kernel.length(lst1), FloatPoint.makeInstance(3)));
	    this.assert(Kernel.equal_question_(Kernel.length(lst2), FloatPoint.makeInstance(0)));
	},
	
	testList : function(){
	    var arr = [FloatPoint.makeInstance(1), FloatPoint.makeInstance(2)];
	    var lst = Kernel.list(arr);
	    for (var i = 1; i <= 2; i++){
		this.assert(Kernel.equal_question_(lst.first(), FloatPoint.makeInstance(i)));
		lst = lst.rest();
	    }
	},
	
	testList_star_simple : function() {
	    this.assert(Kernel.equal_question_(Kernel.list_star_(plt.types.String.makeInstance("hello"),
								 [plt.types.Empty.EMPTY]),
                                               Kernel.list([plt.types.String.makeInstance("hello")])));
	},

	testList_star_ : function(){
	    var lst1 = Cons.makeInstance(FloatPoint.makeInstance(3),
					 Cons.makeInstance(FloatPoint.makeInstance(4), EMPTY));
	    
	    var lst2 = Kernel.list_star_(FloatPoint.makeInstance(1),
					 [FloatPoint.makeInstance(2), lst1]);
	    for (var i = 1; i <= 4; i++){
		this.assert(Kernel.equal_question_(lst2.first(), FloatPoint.makeInstance(i)));
		lst2 = lst2.rest();
	    }
	},
	
	testList_dash_ref : function(){
	    var arr = [FloatPoint.makeInstance(2), FloatPoint.makeInstance(3), FloatPoint.makeInstance(4)];
	    var lst = Kernel.list(arr);

	    this.assert(Kernel.equal_question_(Kernel.list_dash_ref(lst, Rational.makeInstance(2, 1)), FloatPoint.makeInstance(4)));	
	},
	
	testMember : function(){
	    var arr = [FloatPoint.makeInstance(2), FloatPoint.makeInstance(3), FloatPoint.makeInstance(4)];
	    var lst = Kernel.list(arr);
	    this.assert(Kernel.member(FloatPoint.makeInstance(4), lst));
	    this.assert(!Kernel.member(FloatPoint.makeInstance(5), lst));
	},
	
	testMemq : function(){
	    var a = FloatPoint.makeInstance(3);
	    var arr = [FloatPoint.makeInstance(2), a, FloatPoint.makeInstance(4)];
	    var lst = Kernel.list(arr);
	    this.assert(Kernel.equal_question_(Kernel.memq(a, lst).first(), a));
	    this.assert(!Kernel.memq(FloatPoint.makeInstance(5), lst));
	},
	
	testNull_question_: function(){
	    this.assert(!Kernel.null_question_(Rational.ONE));
	    this.assert(Kernel.null_question_(EMPTY));
	},
	
	testPair_question_ : function(){
	    this.assert(!Kernel.pair_question_(EMPTY));
	    this.assert(Kernel.pair_question_(Cons.makeInstance(1, EMPTY)));
	},
	
	
	testString_dash__greaterthan_number : function(){
	    this.assert(!Kernel.string_dash__greaterthan_number("hi"));
	    this.assert(Kernel.equal_question_(Kernel.string_dash__greaterthan_number("5"), FloatPoint.makeInstance(5)));
	},
	
	testString_dash__greaterthan_symbol : function(){
	    this.assert(Kernel.symbol_equal__question_(Kernel.string_dash__greaterthan_symbol(String.makeInstance("hi")), Symbol.makeInstance("hi")));
	    this.assert(!Kernel.symbol_equal__question_(Kernel.string_dash__greaterthan_symbol(String.makeInstance("hi")), Symbol.makeInstance("hi5")));
	},
	
	testString_dash_append : function(){
	    var arr = [String.makeInstance("hello"),String.makeInstance("zhe"),String.makeInstance("zhang")];
	    var str = Kernel.string_dash_append(arr);
	    this.assert(Kernel.string_equal__question_(str, String.makeInstance("hellozhezhang"), []));
	    this.assert(!Kernel.string_equal__question_(str, String.makeInstance("hellozhezhang1"), []));
	},
	
	testString_dash_ci_equal__question_ : function(){
	    this.assert(Kernel.string_dash_ci_equal__question_(String.makeInstance("hi"), String.makeInstance("Hi"), []));
	    this.assert(!Kernel.string_dash_ci_equal__question_(String.makeInstance("hi"), String.makeInstance("Hi1"), []));
	},
	
	testString_dash_ci_lessthan__equal__question_ : function(){
	    this.assert(Kernel.string_dash_ci_lessthan__equal__question_(String.makeInstance("hi"), String.makeInstance("Hi1"), []));
	    
	    this.assert(Kernel.string_dash_ci_lessthan__equal__question_(String.makeInstance("hi"), String.makeInstance("Hi"), []));
	    this.assert(!Kernel.string_dash_ci_lessthan__equal__question_(String.makeInstance("hi1"), String.makeInstance("Hi"), []));	
	},
	
	testString_dash_ci_lessthan__question_ : function(){
	    this.assert(Kernel.string_dash_ci_lessthan__question_(String.makeInstance("hi"), String.makeInstance("Hi1"), []));
	    
	    this.assert(!Kernel.string_dash_ci_lessthan__question_(String.makeInstance("hi"), String.makeInstance("Hi"), []));
	    this.assert(!Kernel.string_dash_ci_lessthan__question_(String.makeInstance("hi1"), String.makeInstance("Hi"), []));	
	},
	
	testString_dash_copy : function(){
	    var str1 = String.makeInstance("hi");
	    var str2 = Kernel.string_dash_copy(str1);
	    this.assert(Kernel.string_equal__question_(str1, str2, []));
	    // Unnecessary to test for eq-ness of strings: in beginner student level, strings are immutable already.
	    //		this.assert(!Kernel.eq_question_(str1, str2));

	},
	
	testString_dash_length : function(){
	    this.assert(Kernel.equal_question_(Kernel.string_dash_length(String.makeInstance("")), Rational.ZERO));
	    this.assert(Kernel.equal_question_(Kernel.string_dash_length(String.makeInstance("hi")), FloatPoint.makeInstance(2)));
	},
	
	testString_dash_ref : function(){
	    var zhe = String.makeInstance("zhe");
	    var i = FloatPoint.makeInstance(2);
	    this.assert(Kernel.string_equal__question_(String.makeInstance("e"), Kernel.string_dash_ref(zhe, i), []));
	}, 
	
	testString_question_ : function(){
	    this.assert(!Kernel.string_question_(Rational.ONE));
	    this.assert(Kernel.string_question_(String.makeInstance("hi")));
	},
	
	testSubstring : function(){
	    var str1 = String.makeInstance("he");
	    var str2 = String.makeInstance("hello");
	    var str3 = Kernel.substring(str2, FloatPoint.makeInstance(0), FloatPoint.makeInstance(2));
	    
	    this.assert(Kernel.string_equal__question_(str1, str3, []));
	},
	
	testChar_dash__greaterthan_integer : function(){	
	    this.assert(Kernel.equal_question_(FloatPoint.makeInstance(101), Kernel.char_dash__greaterthan_integer(Char.makeInstance("e"))));	
	},
	
	testInteger_dash__greaterthan_char : function(){
	    this.assert(Kernel.equal_question_(Char.makeInstance("e"), Kernel.integer_dash__greaterthan_char(Rational.makeInstance(101, 1))));
	},
	
	testChar_dash_alphabetic_question_ : function(){
	    this.assert(Kernel.char_dash_alphabetic_question_(Char.makeInstance("e")));
	    this.assert(!Kernel.char_dash_alphabetic_question_(Char.makeInstance("1")));
	},
	
	testChar_equal__question_ : function(){
	    var s1 = Char.makeInstance("h");
	    var s2 = Char.makeInstance("h");
	    var s3 = Char.makeInstance("h");
	    var s4 = Char.makeInstance("g");
	    this.assert(Kernel.char_equal__question_(s1, s2, [s3]));
	    this.assert(!Kernel.char_equal__question_(s1,s2,[s4]));
	},
	
	testChar_lessthan__question_ : function(){
	    var s1 = Char.makeInstance("h");
	    var s2 = Char.makeInstance("g");
	    var s3 = Char.makeInstance("g");
	    this.assert(Kernel.char_lessthan__question_(s2, s1, []));
	    this.assert(!Kernel.char_lessthan__question_(s2, s3, []));
	},
	
	testChar_lessthan__equal__question_ : function(){
	    var s1 = Char.makeInstance("h");
	    var s2 = Char.makeInstance("g");
	    var s3 = Char.makeInstance("g");
	    this.assert(Kernel.char_lessthan__equal__question_(s2, s1, []));
	    this.assert(Kernel.char_lessthan__equal__question_(s2, s3, []));
	    this.assert(!Kernel.char_lessthan__equal__question_(s1, s2, []));
	},
	
	testChar_dash_ci_equal__question_ : function(){
	    var s1 = Char.makeInstance("h");
	    var s2 = Char.makeInstance("H");
	    var s3 = Char.makeInstance("g");
	    this.assert(Kernel.char_dash_ci_equal__question_(s1, s2, []));
	    this.assert(!Kernel.char_dash_ci_equal__question_(s1, s3, []));
	},
	
	testChar_dash_ci_lessthan__question_ : function(){
	    var s1 = Char.makeInstance("h");
	    var s2 = Char.makeInstance("H");
	    var s3 = Char.makeInstance("g");
	    this.assert(Kernel.char_dash_ci_lessthan__question_(s3, s1, []));
	    this.assert(Kernel.char_dash_ci_lessthan__question_(s3, s2, []));
	    this.assert(!Kernel.char_dash_ci_lessthan__question_(s3, s3, []));
	    this.assert(!Kernel.char_dash_ci_lessthan__question_(s1, s3, []));
	},
	
	testChar_dash_ci_lessthan__equal__question_ : function(){
	    var s1 = Char.makeInstance("h");
	    var s2 = Char.makeInstance("H");
	    var s3 = Char.makeInstance("g");
	    this.assert(Kernel.char_dash_ci_lessthan__equal__question_(s3, s1, []));
	    this.assert(Kernel.char_dash_ci_lessthan__equal__question_(s3, s2, []));
	    this.assert(Kernel.char_dash_ci_lessthan__equal__question_(s3, s3, []));
	    this.assert(!Kernel.char_dash_ci_lessthan__equal__question_(s1, s3, []));
	},
	
	testChar_dash_downcase : function(){
	    var s1 = Char.makeInstance("h");
	    var s2 = Char.makeInstance("H");
	    this.assert(Kernel.char_equal__question_(s1, Kernel.char_dash_downcase(s2),[]));
	},
	
	testChar_dash_lower_dash_case_question_	: function(){
	    var c1 = Char.makeInstance("h");
	    var c2 = Char.makeInstance("H");
	    var c3 = Char.makeInstance("1");
	    this.assert(Kernel.char_dash_lower_dash_case_question_(c1));
	    this.assert(!Kernel.char_dash_lower_dash_case_question_(c2));
	    this.assert(!Kernel.char_dash_lower_dash_case_question_(c3));
	},
	
	testChar_dash_numeric_question_ : function(){
	    var c1 = Char.makeInstance("1");
	    var c2 = Char.makeInstance("h");
	    this.assert(Kernel.char_dash_numeric_question_(c1));
	    this.assert(!Kernel.char_dash_numeric_question_(c2));
	},
	
	testChar_dash_upcase : function(){
	    var s1 = Char.makeInstance("h");
	    var s2 = Char.makeInstance("H");
	    this.assert(Kernel.char_equal__question_(s2, Kernel.char_dash_upcase(s1),[]));
	},
	
	testChar_dash_upper_dash_case_question_	: function(){
	    var c1 = Char.makeInstance("h");
	    var c2 = Char.makeInstance("H");
	    var c3 = Char.makeInstance("1");
	    this.assert(Kernel.char_dash_upper_dash_case_question_(c2));
	    this.assert(!Kernel.char_dash_upper_dash_case_question_(c1));
	    this.assert(!Kernel.char_dash_upper_dash_case_question_(c3));
	},
	
	testChar_dash_whitespace_question_ : function(){
	    this.assert(Kernel.char_dash_whitespace_question_(Char.makeInstance(" ")));
	    this.assert(!Kernel.char_dash_whitespace_question_(Char.makeInstance("a")));
	},
	
	testList_dash__greaterthan_string : function(){
	    var arr = [Char.makeInstance("z"), Char.makeInstance("h"), Char.makeInstance("e")];	
	    var lst = Kernel.list(arr);
	    var str = Kernel.list_dash__greaterthan_string(lst);
	    this.assert(Kernel.equal_question_(str, String.makeInstance("zhe")));
	},
	
	testMake_dash_string : function(){
	    var str = String.makeInstance("zz");
	    var c = Char.makeInstance("z");
	    var n = Rational.makeInstance(2, 1);
	    var str2 = Kernel.make_dash_string(n, c);
	    this.assert(Kernel.equal_question_(str, str2));
	},
	
	testString_dash__greaterthan_list : function(){
	    var lst = Kernel.string_dash__greaterthan_list(String.makeInstance("zhe"));
	    Kernel.equal_question_(lst.first(), Char.makeInstance("z"));
	    lst = lst.rest();
	    Kernel.equal_question_(lst.first(), Char.makeInstance("h"));
	    lst = lst.rest();
	    Kernel.equal_question_(lst.first(), Char.makeInstance("e"));
	},
	

	testToWrittenString : function() {
            this.assertEqual(String.makeInstance('hello').toWrittenString(),
                             '"hello"');
            this.assertEqual(Kernel.make_dash_posn(FloatPoint.makeInstance(3),
						   FloatPoint.makeInstance(4)).toWrittenString(),
                             '(make-posn 3 4)');
            this.assertEqual(Logic.TRUE.toWrittenString(), "true");
            this.assertEqual(Logic.FALSE.toWrittenString(), "false");


            this.assertEqual(Cons.makeInstance(Cons.makeInstance(FloatPoint.makeInstance(2),
								 Empty.EMPTY),
                                               Empty.EMPTY).toWrittenString(),
                             "((2))");
            this.assertEqual(FloatPoint.makeInstance(3.1415).toWrittenString(),
                             "3.1415");
            this.assertEqual(Cons.makeInstance(Cons.makeInstance(FloatPoint.makeInstance(3.1415),
								 Empty.EMPTY),
                                               Empty.EMPTY).toWrittenString(),
                             "((3.1415))");

	}
    }); 

}