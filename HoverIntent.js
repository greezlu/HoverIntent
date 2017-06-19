function HoverIntent (obj, funcPos, funcNeg, sens) {
	if (arguments.length<2) throw new Error("Missing arguments");

	var elem, positive, negative, speed;

	elem = isTypeOf (arguments[0], "HTML");
	if (!elem) throw new Error("First argument must be an HTML Object");
	positive = isTypeOf (arguments[1], "function");
	if (!elem) throw new Error("Second argument must be a Function");

	var len = arguments.length;

	if (len === 3) {
		negative = isTypeOf (arguments[2], "function");
		if (!negative) {
			speed = isTypeOf (arguments[2], "number");
			if (!speed) throw new Error("Third argument must be a Function or Number");
		};
	} else if (len > 3) {
		negative = isTypeOf (arguments[2], "function");
		if (!negative) throw new Error("Third argument must be a Function");
		speed = isTypeOf (arguments[3], "number");
		if (!speed) throw new Error("Fourth argument must be a Number");
	} else {
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

		var targetChecked = isTypeOf (arguments[0], "HTML");
		if (!targetChecked) throw new Error("Argument must be an HTML Object");

		context.deactivateListeners();
		elem = targetChecked;
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

	function isTypeOf (element, type) {
		var feedback = null;
		switch (type) {
		case ('number'):
			var n = parseInt(element);
			if ( typeof  n == 'number' && isFinite(n) ) feedback = n;
			break;
		case ('function'):
			if ( typeof element == 'function' ) feedback = element;
			break;
		case ('HTML'):
			var targetClass = element.toString().slice(8, 12);
			if (targetClass == "HTML") feedback = element;
			break;
		};
		return feedback;
	};

	Object.defineProperty(this, "sensitivity", {
		set: function (value) {
			var sensNumber = isTypeOf(value, 'number');
			if (!sensNumber) throw new Error("Value must be a finite Number");
			speed = sensNumber;
			return speed;
		},
		get: function(){
			return speed;
		}
	});

	Object.defineProperty(this, "positive", {
		set: function (value) {
			var positiveCallback = isTypeOf(value, 'function');
			if (!positiveCallback) throw new Error("Argument must be a Function");
			positive = value;
		},
		get: function () {
			return positive;
		}
	});

	Object.defineProperty(this, "negative", {
		set: function (value) {
			var negativeCallback = isTypeOf(value, 'function');
			if (!negativeCallback) throw new Error("Argument must be a Function");
			negative = value;
		},
		get: function () {
			return negative;
		}
	});
};
