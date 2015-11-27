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

var babyTail = [];
var babyEye = [];
var babyBody = [];
var momTail = [];
var momEye = [];
var momBodyOrange = [];
var momBodyBlue = [];

var data;
var wave;
var halo;

var dust;
var dustPic = [];

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

	// 小鱼尾巴
	for(var i=0; i<8; i++){
		babyTail[i] = new Image();
		babyTail[i].src = "./src/babyTail" + i + ".png";
	}
	// 小鱼眼睛
	for(var i=0; i<2; i++){
		babyEye[i] = new Image();
		babyEye[i].src = "./src/babyEye" + i + ".png";
	}
	// 小鱼身体、变色
	for(var i=0; i<20; i++){
		babyBody[i] = new Image();
		babyBody[i].src = "./src/babyFade" + i + ".png";
	}
	// 大鱼尾巴
	for(var i=0; i<8; i++){
		momTail[i] = new Image();
		momTail[i].src = "./src/bigTail" + i + ".png";
	}
	// 大鱼眼睛
	for(var i=0; i<2; i++){
		momEye[i] = new Image();
		momEye[i].src = "./src/bigEye" + i + ".png";
	}
	data = new dataObj();
	for(var i=0; i<8; i++){
		momBodyOrange[i] = new Image();
		momBodyBlue[i] = new Image();
		momBodyOrange[i].src = "./src/bigSwim" + i + ".png";
		momBodyBlue[i].src = "./src/bigSwimBlue" + i + ".png";
	}

	ctx1.font = "30px Verdana";
	ctx1.textAlign = "center";

	wave = new waveObj();
	wave.init();

	halo = new haloObj();
	halo.init();

	for(var i=0; i<7; i++){
		dustPic[i] = new Image();
		dustPic[i].src = "./src/dust" + i + ".png";
	}
	dust = new dustObj();
	dust.init();

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

	// 检测果实是否被吃
	momFruitsCollision();
	// 大鱼对小鱼的碰撞
	momBabyCollision();

	data.draw();
	wave.draw();
	halo.draw();
	dust.draw();
}

function onMouseMOve(e){
	if(!data.gameOver){
		if(e.offsetX || e.layerX){
			mx = e.offsetX == undefined ? e.layerX : e.offsetX;
			my = e.offsetY == undefined ? e.layerY : e.offsetY;
		}
	}
}