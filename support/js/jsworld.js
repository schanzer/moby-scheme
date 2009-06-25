var org = org || {};
org.plt = org.plt || {};
org.plt.world = org.plt.world || {};
org.plt.world.MobyJsworld = {};

(function() {

    var Jsworld = org.plt.world.MobyJsworld;

    // The real low-level jsworld module:
    var _js = plt.Jsworld;


    //////////////////////////////////////////////////////////////////////
    //From this point forward, we define wrappers to integrate jsworld
    //with Moby.


    // deepListToArray: any -> any
    // Converts list structure to array structure.
    function deepListToArray(x) {
	var thing = x;
	if (org.plt.Kernel.empty_question_(thing)) {
	    return [];
	} else if (org.plt.Kernel.pair_question_(thing)) {
	    var result = [];
	    while (!thing.isEmpty()) {
		result.push(deepListToArray(thing.first()));
		thing = thing.rest();
	    }
	    return result;
	} else {
	    return x;
	}
    }

    // assocListToAssocArray: (listof (list X Y)) -> (hashof X Y)
    function assocListToAssocArray(aList) {
	var result = {};
	while (! aList.isEmpty()) {
	    var key = aList.first().first();
	    var val = aList.first().rest().first();
	    result[key] = val;
	    aList = aList.rest();
	}
	return result;
    }


    // getBigBangWindow: -> window
    function getBigBangWindow() {
        if (window.document.getElementById("jsworld-div") != undefined) {
	    return window;
	}

        var newWindow = window.open(
	    "big-bang.html",
	    "big-bang");
	    //"toolbar=false,location=false,directories=false,status=false,menubar=false,width="+width+",height="+height);
	if (newWindow == null) { 
            throw new Error("Error: Not allowed to create a new window."); }

	return newWindow;
    }


    // types are
    // sexp: (cons node (listof sexp))
    // css-style: (node (listof (list string string)))

    // Exports:




    // bigBang: world (listof (list string string)) (listof handler) -> world
    Jsworld.bigBang = function(initWorld, attribs, handlers) {

	var mainWindow = getBigBangWindow();
	var toplevelNode = mainWindow.document.getElementById("jsworld-div");

	var config = new org.plt.world.config.WorldConfig();
	for(var i = 0; i < handlers.length; i++) {
	  config = handlers[i](config);
	}
	
	var wrappedHandlers = [];
	
	if (config.lookup('onDraw')) {
	  function wrappedRedraw(w) {
	    var result = [toplevelNode, 
			  deepListToArray(config.lookup('onDraw')([w]))];
	    return result;
	  }

	  function wrappedRedrawCss(w) {
	    var result = deepListToArray(config.lookup('onDrawCss')([w]));
	    return result;
	  }
	  wrappedHandlers.push(_js.on_draw(wrappedRedraw, wrappedRedrawCss));
	}


	if (config.lookup('onTick')) {
	  function wrappedTick(w) {
	    var result = config.lookup('onTick')([w]);
	    return result;
	  }
	  
	  var wrappedDelay = config.lookup('tickDelay');
	  wrappedHandlers.push(_js.on_tick(wrappedDelay, wrappedTick));
	}

	return _js.big_bang(toplevelNode,
			    initWorld,
			    wrappedHandlers,
			    assocListToAssocArray(attribs));
    }




    // p: assoc -> node
    Jsworld.p = function(attribsAssocList) {
	return _js.p(assocListToAssocArray(attribsAssocList));
    };

    // div: assoc -> node
    Jsworld.div = function (attribsAssocList) {
	return _js.div(assocListToAssocArray(attribsAssocList));
    };

    // button: (world -> world) assoc -> node
    Jsworld.button = function(f, attribsAssocList) {
	function wrappedF(world) {
	    return f([world]);
	}
	// fixme: we need to wrap the function
	return _js.button(wrappedF,
			  assocListToAssocArray(attribsAssocList));
    };

    // input: string assoc -> node
    Jsworld.input = function(type, attribsAssocList) {
	return _js.input(type, assocListToAssocArray(attribsAssocList));
    };

    // text: string assoc -> node
    Jsworld.text = function(s, attribsAssocList) {
	return _js.text(s, assocListToAssocArray(attribsAssocList));
    }



    // fixme: add support for select, option, textarea, h1, canvas


})();
