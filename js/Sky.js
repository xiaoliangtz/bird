const skyDom = document.querySelector('.sky');
const skyStyles = getComputedStyle(skyDom);
const skyLeft = skyStyles.left;
const skyTop = skyStyles.top;
const skyWidth = skyStyles.width;
const skyHeight = skyStyles.height;

class Sky extends Rectangle {
	constructor () {
		super (skyWidth,  skyHeight, skyLeft, skyTop, -50, 0,  skyDom);
	}
	onMove () {
		if(this.left <= -skyWidth / 2) {
			this.left = 0;
		}
	}
}