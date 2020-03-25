"use strict";

let W, H, c, ctx;
let curves = [];

const clear = () => {
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, W, H);
};

const animate = () => {
	clear();
	curves.map(x => x.update());
	window.requestAnimationFrame(animate);
};

class Curve {
	constructor(x1, y1, x2, y2, x3, y3) {
		this.p1 = {x:x1, y:y1, d_x:1, d_y:1};
		this.p2 = {x:x2, y:y2, d_x:1, d_y:1};
		this.p3 = {x:x3, y:y3, d_x:1, d_y:1};
		this.comAngle = 0;
	}
	draw() {
		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.strokeStyle = 'aqua';
		ctx.fillStyle = 'aqua';
		ctx.moveTo(this.p1.x, this.p1.y);
		ctx.quadraticCurveTo(this.p2.x, this.p2.y, this.p3.x, this.p3.y);
		ctx.stroke();
		ctx.closePath();
		
		ctx.beginPath();
		ctx.arc(this.p1.x, this.p1.y,  4, 0, Math.PI * 2, true);
		ctx.fill();
		ctx.closePath();
		
		ctx.beginPath();
		ctx.arc(this.p3.x, this.p3.y,  4, 0, Math.PI * 2, true);
		ctx.fill();
		ctx.closePath();
		
		ctx.beginPath();
		ctx.arc(this.comX1, 4,  4, 0, Math.PI * 2, true);
		ctx.fill();
		ctx.closePath();
		
		ctx.beginPath();
		ctx.arc(this.comX2, H-4,  4, 0, Math.PI * 2, true);
		ctx.fill();
		ctx.closePath();
	
		ctx.beginPath();
		ctx.lineWidth = 0.5;
		ctx.moveTo(this.comX1, this.comY1);
		ctx.lineTo(this.p1.x, this.p1.y);
		ctx.stroke();
		ctx.closePath();
		
		ctx.beginPath();
		ctx.lineWidth = 0.5;
		ctx.moveTo(this.comX2, this.comY2);
		ctx.lineTo(this.p3.x, this.p3.y);
		ctx.stroke();
		ctx.closePath();
	}
	bounce(point, XorY){
		if (XorY === "x") {
			point.d_x *= -1;
			point.x *= -1;
			point.x > -4? point.x += 8: point.x += 2 * W - 8;
		} else {
			point.d_y *= -1;
			point.y *= -1;
			point.y > -4? point.y += 8: point.y += 2 * H - 8;
		}
	}
	update() {
		this.p1.x += 2*this.p1.d_x;
		this.p1.y += 2*this.p1.d_y;
		this.p2.x += 2*this.p2.d_x;
		this.p2.y += 2*this.p2.d_y;
		this.p3.x += 2*this.p3.d_x;
		this.p3.y += 2*this.p3.d_y;
		
		if (this.p1.x>W-4||this.p1.x<4) {this.bounce(this.p1, "x");}
		if (this.p1.y>H-4||this.p1.y<4) {this.bounce(this.p1, "y");}
		if (this.p2.x>W-4||this.p2.x<4) {this.bounce(this.p2, "x");}
		if (this.p2.y>H-4||this.p2.y<4) {this.bounce(this.p2, "y");}
		if (this.p3.x>W-4||this.p3.x<4) {this.bounce(this.p3, "x");}
		if (this.p3.y>H-4||this.p3.y<4) {this.bounce(this.p3, "y");}
		
		this.comAngle += 0.01;
		this.comX1 = W/2 + W/2 * Math.cos(this.comAngle);
		this.comY1 = H-4;
		this.comX2 = W/2 + W/2 * Math.cos(this.comAngle);
		this.comY2 = 4;
		
		this.draw();
	}
}

const init = () => {
	c = document.getElementById("canvas");
	c.width = W = window.innerWidth;
	c.height = H = window.innerHeight;
	ctx = c.getContext("2d");
	curves.push(new Curve(25, 25, 50, 50, 100, 100));
	curves.push(new Curve(150, 150, 175, 175, 225, 225));
	curves.push(new Curve(275, 275, 300, 300, 350, 350));
	
	animate();
};

window.onload = init;