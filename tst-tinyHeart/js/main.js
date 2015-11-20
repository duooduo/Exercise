/**
 * main
 */
// -- canvas
var can1,ctx1,can2,ctx2;
var canWidth,canHeight;
// -- time
var lastTime,deltaTime;
// -- img
var bgPic = new Image();
// -- obj
var ane,fruit,mom,baby;
var mx,my;

document.body.onload = game;
function game(){
	init();
	lastTime = Date.now();
	deltaTime = 0;
	gameloop(); // 循环帧
}

function init(){
	// can1：小鱼、成绩、浮尘、UI界面、圆圈
	// can2：背景、海葵、果实
	can1 = document.getElementById('canvas1');
	ctx1 = can1.getContext('2d');
	can2 = document.getElementById('canvas2');
	ctx2 = can2.getContext('2d');

	can1.addEventListener('mousemove', onMouseMOve, false);

	bgPic.src = "./src/background.jpg";
	canWidth = can1.width;
	canHeight = can1.height;
	// -- 海葵对象
	ane = new aneObj;
	ane.init();
	// -- 果实对象
	fruit = new fruitObj;
	fruit.init();

	mom = new momObj();
	mom.init();

	baby = new  babyObj();
	baby.init();

	mx = canWidth * 0.5;
	my = canHeight * 0.5;
}

function gameloop(){
	// requestAnimFrame当前绘制完成之后，根据机器性能来绘制下一帧，时间间隔不固定
	window.requestAnimFrame(gameloop); // fps 动态时间间隔

	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	if(deltaTime > 40) deltaTime = 40;

	//ctx2.clearRect(0,0,canWidth, canHeight); // 因为每次从新画了背景图盖住了原来的图案，所以不用clear
	drawBackground();
	ane.draw();
	fruitMonitor();
	fruit.draw();

	ctx1.clearRect(0,0,canWidth, canHeight);
	mom.draw();
	baby.draw();
	momFruitsCollision();
}

function onMouseMOve(e){
	if(e.offsetX || e.layerX){
		mx = e.offsetX == undefined ? e.layerX : e.offsetX;
		my = e.offsetY == undefined ? e.layerY : e.offsetY;
	}
}