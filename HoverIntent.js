function HoverIntent (obj, funcPos, funcNeg, sens) {
	if (arguments.length<2) throw new Error("Missing arguments. Must be at least 2.");

	var elem = arguments[0],
			positive = arguments[1],
			negative,
			speed;

	if (arguments.length >= 4) {
		negative = arguments[2];
		speed = arguments[3];
	} else if (arguments.length == 3) {
		if ( typeof(arguments[2]) == 'number') {
			speed = arguments[2];
		} else {
			speed= 500;
			negative = arguments[2];
		};
	} else if (arguments.length == 2) {
		speed = 500;
	};

	var checkSpeedInterval,
			cX, pX, xY, pY,
			pTime,
			context = this,
			mouseEvent,
			isHover = false;

	elem.addEventListener('mouseover', onMouseOver);
	elem.addEventListener('mouseout', onMouseOut);

	function onMouseOver (e) {
		onMouseMove(e);
		if (!checkSpeedInterval) {
			pX = cX;
			pY = cY;
			pTime = +Date.now();
			elem.addEventListener('mousemove', onMouseMove);
			checkSpeedInterval = setInterval (speedCount, 100);
		};		
	};

	function speedCount () {
		var cTime = +Date.now();
		var cSpeed = Math.sqrt( Math.pow((cX-pX),2) + Math.pow((cY-pY),2) )/(cTime-pTime)*1000;

		if (cSpeed>context.sensitivity) {
			pTime = cTime;
			pX = cX;
			pY = cY;
		} else {
			isHover = true;
			stopSpeedCheck();
			positive(mouseEvent);
		};
	};

	function onMouseOut (e) {
		if ( !e.relatedTarget || !elem.contains(e.relatedTarget) ) {
			stopSpeedCheck();
			if (isHover) {
				isHover = false;
				if (negative) negative(e);
			};
		};		
	};

	function onMouseMove (e) {
		cX = e.clientX;
		cY = e.clientY;
		mouseEvent = e;
	};

	function stopSpeedCheck () {
		clearInterval(checkSpeedInterval);
		checkSpeedInterval = undefined;
		mouseEvent = undefined;
		elem.removeEventListener('mousemove', onMouseMove);
	};

	this.changeTarget = function (target) {
		if (arguments.length<1) throw new Error("Missing argument");

		var targetClass = target.toString().slice(8, -1);
		if (targetClass != "HTMLDivElement") throw new Error("Argument must be an HTML DOM Object");

		context.deactivateListeners();
		elem = target;
		context.activateListeners();

		return elem;
	};

	this.deactivateListeners = function () {
		elem.removeEventListener('mouseover', onMouseOver);
		elem.removeEventListener('mouseout', onMouseOut);
		return elem;
	};

	this.activateListeners = function () {
		elem.addEventListener('mouseover', onMouseOver);
		elem.addEventListener('mouseout', onMouseOut);
		return elem;
	};

	Object.defineProperty(this, "sensitivity", {
		set: function (value) {
			var n = parseInt(value);
			if ( typeof  n != 'number' || !isFinite(n) ) {
				 throw new Error("Value must be a finite Number");
			};
			speed = n;
			return speed;
		},
		get: function(){
			return speed;
		}
	});

	Object.defineProperty(this, "positive", {
		set: function (value) {
			if (typeof value != 'function' ) {
				 throw new Error("Argument must be a Function");
			};
			positive = value;
		},
		get: function () {
			return positive;
		}
	});

	Object.defineProperty(this, "negative", {
		set: function (value) {
			if (typeof value != 'function' ) {
				 throw new Error("Argument must be a Function");
			};
			negative = value;
		},
		get: function () {
			return negative;
		}
	});
};
