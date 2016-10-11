function Tap(el, callback) {
	this.el = typeof el === 'object' ? el : $(el);
	this.moved = false; //flags if the finger has moved
	this.startX = 0; //starting x coordinate
	this.startY = 0; //starting y coordinate
	this.time = null;
	this.callback = callback;
	var el = this.el,
		handleEvent = this.handleEvent;
	el.on('touchstart', handleEvent.bind(this));
	el.on('touchmove', handleEvent.bind(this));
	el.on('touchend', handleEvent.bind(this));
}

Tap.prototype = {
	'constructor': Tap,
	'handleEvent': function(event) {
		switch (event.type) {
			case 'touchstart':this.start(event);break;
			case 'touchend':this.end(event);break;
		}
	},
	'start': function(event){
		this.startX = event.targetTouches[0].pageX;
		this.startY = event.targetTouches[0].pageY;
		this.time = new Date();
	},
	'end': function(event){
		var nowTarget = event.changedTouches[0];
		if(Math.abs(nowTarget.pageX - this.startX) < 10 && Math.abs(nowTarget.pageY - this.startY) < 10 && new Date() - this.time < 250 && typeof this.callback == 'function'){
			this.callback(nowTarget)
		}
	}
};