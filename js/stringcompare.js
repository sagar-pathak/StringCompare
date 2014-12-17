(function( window, undefined ) {
	var options = {
			'COMPARE_TYP' : 'wordcount'
	};

	var SC = function(master, slave, percentage){
		return new StringCompare(master, slave, percentage);
	};

	var StringCompare = function(master, slave, percentage) {
		this.version = '1.0';
		alert(master);
	};

	function mergeOptions(obj1,obj2){
	    var obj3 = {};
	    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
	    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
	    return obj3;
	}

	SC.setoptions = function(customOptions) {
		options = mergeOptions(options,customOptions);
		console.log(options);
	}

	/* Assigning SC object to global window object */
	if(!window.SC){
		window.SC = SC;
	}

})(window);