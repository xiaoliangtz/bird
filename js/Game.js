class Game {
	constructor () {
		this.sky = new Sky();
		this.land = new Land(-100);
		this.bird = new Bird();
		this.pipeProducer = new PipePareProducer(-100);
		this.timer = null;
		this.tick = 16;
		this.gameOver = false;
	}

	start () {
		if(this.timer) {
			return;
		}
		if(this.gameOver) {
			// 重新开始游戏
			window.location.reload();
		}
		// 生成水管
		this.pipeProducer.startProduce();
		// 翅膀开始煽动
		this.bird.startSwing();
		this.timer = setInterval( () => {
			// console.log(this.isGameOver());
			const duration = this.tick / 1000;

			this.sky.move(duration);
			this.land.move(duration);
			this.bird.move(duration);
			this.pipeProducer.pairs.forEach( pair => {
				pair.move(duration);
			});

			if(this.isGameOver()) {
				this.stop();
				this.gameOver = true;
			}
		}, this.tick);
	}

	isHit (res1, res2) {
		const centerX1 = res1.left + res1.width / 2;
		const centerY1 = res1.top + res1.height / 2;
		const centerX2 = res2.left + res2.width / 2;
		const centerY2 = res2.top + res2.height / 2;

		const disX = Math.abs(centerX1 - centerX2);
		const disY = Math.abs(centerY1 - centerY2);

		if(disX < (res1.width + res2.width) / 2 && disY < (res1.height + res2.height) / 2) {
			return true;
		}
		return false;
	}

	isGameOver () {
		if(this.bird.top === this.bird.maxY) {
			return true;
			// console.log('bird');
		}

		for(let i = 0; i < this.pipeProducer.pairs.length; i++) {
			var pair = this.pipeProducer.pairs[i];
			console.log(this.isHit(this.bird, pair.upPipe));
			if(this.isHit(this.bird, pair.upPipe) || this.isHit(this.bird, pair.downPipe)) {
				return true;
			}
		}
		return false;
	}

	stop () {
		clearInterval(this.timer);
		this.timer = null;
		this.bird.stopSwing();
		this.pipeProducer.stopProduce();
	}

	// 绑定键盘事件

	regEvent () {
		window.onkeydown = (e) => {
			// console.log('down');
			if(e.key === 'Enter') {
				if(this.timer) {
					this.stop();
				}else {
					this.start();
				}
			}else if (e.key === ' ') {
				this.bird.jump();
			}
		}
	}
}

const g = new Game();
g.regEvent();