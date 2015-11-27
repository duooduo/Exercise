/**
 * 果实类
 * 	长大->成熟  两个状态  上飘，飘出屏幕释放
 *	果实允许范围 = 15个
 *  规则	：保持屏幕上有15个果实
 */

var fruitObj = function(){
	this.alive = []; // bool,是否活着
	this.x = [];
	this.y = [];
	this.aneNo = [];
	this.l = [];
	this.spd = []; // 成长速度，上飘速度
	this.fruitType = []; // 果实类型
	this.orange = new Image();
	this.blue = new Image();
};
fruitObj.prototype.num = 30; // 果实数量要小于海葵数
fruitObj.prototype.init = function(){
	for(var i=0; i<this.num; i++){
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.aneNo[i] = 0;
		this.spd[i] = Math.random() * 0.005 + 0.005; // 速度[0.005, 0.01)
		this.fruitType[i] = '';
	}
	this.orange.src = "./src/fruit.png";
	this.blue.src = "./src/blue.png";
};
fruitObj.prototype.draw = function(){
	for(var i=0; i<this.num; i++){
		// draw: find an ane, grow, fly up
		if(this.alive[i]){
			if(this.fruitType[i] == "blue"){
				var pic = this.blue;
			} else {
				var pic = this.orange;
			}
			if(this.l[i] <= 14){ // 果实长大
				var no = this.aneNo[i];
				this.x[i] = ane.headx[no];
				this.y[i] = ane.heady[no];
				this.l[i] += this.spd[i] * deltaTime;
			} else {
				this.y[i] -= this.spd[i] * 7 * deltaTime;
			}
			ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);

			if(this.y[i] < 10){ // 上飘到顶就死亡
				this.alive[i] = false;
			}
		}
	}
};

fruitObj.prototype.born = function(i){
	// 需要找到海葵的位置，长在顶点
	//var aneID = Math.floor(Math.random() * ane.num);
	this.aneNo[i] = Math.floor(Math.random() * ane.num);
	//this.x[i] = ane.headx[aneID];
	//this.y[i] = ane.heady[aneID];
	this.l[i] = 0;
	this.alive[i] = true;
	var ran = Math.random();
	if(ran < 0.2){
		this.fruitType[i] = "blue"; // orange, blue
	} else {
		this.fruitType[i] = "orange"; // orange, blue
	}

};

fruitObj.prototype.dead = function(i){
	this.alive[i] = false;
};

function fruitMonitor(){
	var num = 0;
	for(var i=0; i<fruit.num; i++){
		if(fruit.alive[i]) num++;
	}
	if(num < 15){
		sendFruit();
		return true;
	}
}
function sendFruit(){
	for(var i=0; i<fruit.num; i++){
		if(!fruit.alive[i]){
			fruit.born(i);
			return;
		}
	}
}
