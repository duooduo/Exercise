/**
 * dust 漂浮物
 */
var dustObj = function(){
	this.x = [];
	this.y = [];
	this.amp = [];
	this.no = [];
	this.alpha;
};
dustObj.prototype.num = 30;
dustObj.prototype.init = function(){
	for(var i=0; i<this.num; i++){
		this.x[i] = Math.random() * canWidth;
		this.y[i] = Math.random() * canHeight;
		this.amp[i] = 20 + Math.random() * 10;
		this.no[i] = Math.floor(Math.random() * 7); // [0,7) 随机漂浮物的img
	}
	this.alpha = 0;
};
dustObj.prototype.draw = function(){
	this.alpha += deltaTime * 0.0008;
	var l = Math.sin(this.alpha); // [-1,1]
	for(var i=0; i<this.num; i++){
		ctx2.drawImage(dustPic[this.no[i]], this.x[i] + l * this.amp[i], this.y[i]);
	}
};
