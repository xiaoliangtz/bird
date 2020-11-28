const gameWidth = gameDom.clientWidth;

class Pipe extends Rectangle {
	constructor (height, top, speed, dom) {
		super (52, height, gameWidth, top, speed, 0, dom);
	}

	onMove () {
		if(this.left < -this.width) {
			this.dom.remove();
		}
	}
}

function getRandom (min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}
// 生产水管模板类
class PipePare {
	constructor (speed) {
		this.spaceHeight = 150;
		this.minHeight = 80;
		this.maxHeight = landTop - this.spaceHeight - this.minHeight;

		const upHeight = getRandom(this.minHeight, this.maxHeight);
		const downHeight = landTop - upHeight - this.spaceHeight;


		const upDom = document.createElement('div');
		const downDom = document.createElement('div');

		upDom.className = 'pipe up';
		downDom.className = 'pipe down';

		const downTop = landTop - downHeight;
		console.log(downTop);

		this.upPipe = new Pipe(upHeight, 0, speed, upDom);
		this.downPipe = new Pipe(downHeight, downTop, speed, downDom);

		gameDom.appendChild(upDom);
		gameDom.appendChild(downDom);

	}
	get useLess () {
		return this.upPipe.left < -this.upPipe.width;
	}

	move (duration) {
		this.upPipe.move(duration);
		this.downPipe.move(duration);
	}
}

/**
 * 产生水管
 */
class PipePareProducer {
	constructor (speed) {
		this.speed = speed;
		this.pairs = [];
		this.timer = null;
		this.tick = 1500;
	}

	startProduce () {
		if(this.timer) {
			return;
		}
		this.timer = setInterval( () => {
			this.pairs.push(new PipePare(this.speed));
			for(let i = 0; i < this.pairs.length; i++ ) {
				var pair = this.pairs[i];
				if(pair.useLess) {
					this.pairs.splice(i, 1);
					i--;
				}
			}
		}, this.tick);
	}

	stopProduce () {
		clearInterval(this.timer);
		this.timer = null;
	}

}