

class Rectangle {
// 属性：宽， 高， X轴位移， y轴位移， X轴速度， y轴速度， dom本身
	constructor (width, height, left, top, speedX, speedY, dom) {
		this.width = width;
		this.height = height;
		this.left = left;
		this.top = top;
		this.speedX = speedX;
		this.speedY = speedY;
		this.dom = dom;
		this.render();
	}

	render () {
		this.dom.style.left = this.left + 'px';
		this.dom.style.top = this.top + 'px';
		this.dom.style.width = this.width + 'px';
		this.dom.style.height = this.height + 'px';
	}

	move (duration) {
		const disX = this.speedX * duration;
		const disY = this.speedY * duration;
		this.left = this.left + disX;
		this.top = this.top + disY;

		if(this.onMove) {
			this.onMove();
		}
 
		this.render();
	}

}