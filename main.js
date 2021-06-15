// (function($) {

// 	// PDF function===================
// 	$('table.matrix a').click (function(e) { 
// 		e.preventDefault();
// 		newSrc =$(this).attr("href");
// 		$("#modal").append("<iframe src='" + newSrc + "'></iframe>");
// 	})
// })(jQuery);

var txtType = function(el, toRotate, period){
	this.toRotate = toRotate;
	this.el = el;
	this.loopNum = 0;
	this.period = parseInt(period, 10) || 2000;
	this.txt = '';
	this.tick();
	this.isDeleting = false;
};

txtType.prototype.tick = function(){
	var i = this.loopNum % this.toRotate.length;
	var fullTxt = this.toRotate[i];

	if(this.isDeleting){
		this.txt = fullTxt.substring(0, this.txt.length - 1);
	}else{
		this.txt = fullTxt.substring(0, this.txt.length + 1);
	}

	this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

	var that = this;
	var delta = 200 - Math.random() * 100;
	
	if(this.isDeleting) 
		delta /= 2;

		// === is strick equality(on data type as well)
	if(!this.isDeleting && this.txt === fullTxt){
		delta = this.period;
		this.isDeleting = true;
	}else if (this.isDeleting && this.txt === ''){
		this.isDeleting = false;
		this.loopNum++;
		delta = 500;
	}

	setTimeout(function() {
		that.tick();
	}, delta);
};

window.onload = function(){
	var elements = document.getElementsByClassName('typewrite');
	for(var i=0; i < elements.length; i++){
		var toRotate = elements[i].getAttribute('data-type');
		var period = elements[i].getAttribute('data-period');
		if(toRotate){
			new txtType(elements[i], JSON.parse(toRotate), period);
		}
	}

	//Inject CSS
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = ".typewrite > .wrap {border-right: 0.08em solid #fff; color: #2c2c32}";
	document.body.appendChild(css);
};