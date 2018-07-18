/*
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */
var EasingFunctions = {
  // no easing, no acceleration
  linear: function (t) { return t },
  // accelerating from zero velocity
  easeInQuad: function (t) { return t*t },
  // decelerating to zero velocity
  easeOutQuad: function (t) { return t*(2-t) },
  // acceleration until halfway, then deceleration
  easeInOutQuad: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
  // accelerating from zero velocity
  easeInCubic: function (t) { return t*t*t },
  // decelerating to zero velocity
  easeOutCubic: function (t) { return (--t)*t*t+1 },
  // acceleration until halfway, then deceleration
  easeInOutCubic: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
  // accelerating from zero velocity
  easeInQuart: function (t) { return t*t*t*t },
  // decelerating to zero velocity
  easeOutQuart: function (t) { return 1-(--t)*t*t*t },
  // acceleration until halfway, then deceleration
  easeInOutQuart: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
  // accelerating from zero velocity
  easeInQuint: function (t) { return t*t*t*t*t },
  // decelerating to zero velocity
  easeOutQuint: function (t) { return 1+(--t)*t*t*t*t },
  // acceleration until halfway, then deceleration
  easeInOutQuint: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t },
	// [0..1] -> [0->1->0]
	sin: function(t) { return Math.sin(t * Math.PI); }
}

var canvas, ctx, cw, ch, newW;
var imagePosInitial = {
	x: 800,
	y: 500
}

// var imageCurrentPos = {
// 	x: imagePosInitial.x,
// 	y: imagePosInitial.y
// }
//
var imagePosFinal = {
	x: 200,
	y: 500
}

var image = new Image();
image.src = "images/excavator.png";

canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");
cw = canvas.width;
ch = canvas.height;

// car starts entering at 100px scroll, arrives at center at 300px scroll
const carStartOffset = 100;
const carStopOffset = 300;

function carPositionAtScrollOffset(scrollOffset) {
	if (scrollOffset < carStartOffset) {
		return imagePosInitial;
	} else
	if (scrollOffset > carStopOffset) {
		return imagePosFinal;
	} else {
		let f = (scrollOffset - carStartOffset) / (carStopOffset - carStartOffset); // f = 0..1
		let fx = EasingFunctions.easeInOutCubic(f);
		let fy = EasingFunctions.sin(f);
		return {
			x: imagePosInitial.x + fx * (imagePosFinal.x - imagePosInitial.x),
			// y: imagePosInitial.y + fy * (imagePosFinal.y - imagePosInitial.y),
			y: imagePosInitial.y + fy * 200,
		}
	}
}

function draw(time) {
	const scrollOffset = document.body.scrollTop || document.documentElement.scrollTop;

	let carPosition = carPositionAtScrollOffset(scrollOffset);

	ctx.clearRect(0, 0, cw, ch);
	ctx.drawImage(image, carPosition.x, carPosition.y);

  window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);



// window.onscroll = function() {myFunction()};

//
// function myFunction() {
//   if (document.body.scrollTop > 350 || document.documentElement.scrollTop > 350) {
//     TweenLite.to(imageCurrentPos, 3, {
// 			x: imagePosFinal.x,
// 			y: imagePosFinal.y,
// 			onUpdate: drawTruck
// 		});
// 	} else if (document.body.scrollTop < 200 || document.documentElement.scrollTop < 200) {
    // TweenLite.to(imageCurrentPos, 3, {
		// 	x: imagePosInitial.x,
		// 	y: imagePosInitial.y,
		// 	onUpdate: drawTruck
		// });
// 	}
// }
