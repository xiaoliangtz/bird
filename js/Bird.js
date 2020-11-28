const birdDom = document.querySelector('.bird');
const birdStyles = getComputedStyle(birdDom);
const birdWidth = parseFloat(birdStyles.width);
const birdHeight = parseFloat(birdStyles.height);
const birdTop = parseFloat(birdStyles.top);
const birdLeft = parseFloat(birdStyles.left);
const gameDom = document.querySelector('.game');
const gameHeight = gameDom.clientHeight;

class Bird extends Rectangle {
	constructor () {
		super (birdWidth, birdHeight, birdLeft, birdTop, 0, 0, birdDom);
		// 加速度
		this.g = 1500;
		// 翅膀扇动计时器
		this.timer = null;
		// 小鸟翅膀状态
		this.swingStatus = 1;
		this.maxY = gameHeight - landHeight - birdWidth;
		this.render();
	}

	startSwing () {
		this.timer = setInterval( () => {
			this.swingStatus++;
			if(this.swingStatus === 4) {
				this.swingStatus = 1;
			}
			this.render();
		}, 200)
	}

	render () {
		super.render();
		birdDom.className = `bird swing${this.swingStatus}`;
	}

	stopSwing () {
		clearInterval(this.timer);
		this.timer = null;
	}

	move (duration) {
		super.move(duration);
		this.speedY += this.g * duration;
	}

	onMove () {
		if(this.top < 0) {
			this.top = 0;
		}else if (this.top > this.maxY) {
			this.top = this.maxY;
		}
	}

	jump () {
		this.speedY = -450;
	}

}