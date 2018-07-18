var canvas, ctx, cw, ch, newW;
var myImage = {
	x: 500,
	y: 0,
	image: new Image()
}

myImage.image.src = "images/excavator.png";

canvas = document.getElementById("myCanvas");
ctx = canvas.getContext("2d");
cw = canvas.width;
ch = canvas.height;

TweenLite.to(myImage, 5, {x: 200, y:500, onUpdate: drawTruck})

function drawTruck() {
	ctx.clearRect(0, 0, cw, ch);
	ctx.drawImage(myImage.image, myImage.x, myImage.y);
}
