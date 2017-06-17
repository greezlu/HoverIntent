function HoverIntent (obj, positive, negative, speed) {
	if (arguments.length<2) return;

	this.obj = obj;
	this.positive = positive;	

	if (arguments.length >= 4) {
		this.negative = arguments[2];
		this.speed = arguments[3];
	} else if (arguments.length == 3) {
		if ( typeof(arguments[2]) == 'number' ) {
			this.speed = arguments[2];
		} else {
			this.speed = 500;
			this.negative = arguments[2];
		};
	} else if (arguments.length <= 2) {
		this.speed = 500;
	};

	var interval, x, X, y, Y, time, context = this, mouseEvent;

	context.obj.addEventListener('mouseover', mouseCome);
	context.obj.addEventListener('mouseout', mouseLeft);

	function mouseCome (e) {
		if (interval) return;

		x = X = e.clientX;
		y = Y = e.clientY;
		mouseEvent = e;
		time = +Date.now();

		context.obj.addEventListener('mousemove', writeSpeed);
		interval = setInterval (speedCount, 100);
	};

	function speedCount () {
		var currentTime = +Date.now();
		var speedNew = Math.sqrt( Math.pow((X-x),2) + Math.pow((Y-y),2) )/(currentTime-time)*1000;

		time = currentTime;
		X = x;
		Y = y;

		if (speedNew<=context.speed) {
			clearInterval(interval);
			interval = undefined;
			context.obj.removeEventListener('mousemove', writeSpeed);
			context.positive(mouseEvent);
		}
	};

	function mouseLeft (e) {
		clearInterval(interval);
		interval = undefined;
		context.obj.removeEventListener('mousemove', writeSpeed);
		context.negative(e);
	};

	function writeSpeed (e) {
		x = e.clientX;
		y = e.clientY;
		mouseEvent = e;
	};

	this.changeTarget = function (target) {
		if (!target) return;
		this.obj.removeEventListener('mouseover', mouseCome);
		this.obj.removeEventListener('mouseout', mouseLeft);

		target.addEventListener('mouseover', mouseCome);
		target.addEventListener('mouseout', mouseLeft);

		this.obj = target;
		return this.obj;
	};

	this.deactivateListeners = function () {
		this.obj.removeEventListener('mouseover', mouseCome);
		this.obj.removeEventListener('mouseout', mouseLeft);
		return "Listeners Diactivated";
	};

	this.activateListeners = function () {
		this.obj.addEventListener('mouseover', mouseCome);
		this.obj.addEventListener('mouseout', mouseLeft);
		return "Listeners Activated";
	};
};