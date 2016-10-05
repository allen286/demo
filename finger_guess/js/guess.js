var totalNum = 0;
var winNum = 0;
var loseNum = 0;
var tieNum = 0;

function guess() {
	var comChoice = ["jiandao", "shitou", "bu"][parseInt(Math.random() * 3)];
	var myChoice = this.id;
	document.getElementById('my-result').src = this.src;
	document.getElementById('com-result').src = "images/" + comChoice + ".jpg";
	var result = '';
	if (myChoice === comChoice) {
		result = 'Tie';
		tieNum++;
	} else if (myChoice === 'shitou') {
		if (comChoice === 'jiandao') {
			result = 'Win';
			winNum++;
		} else {
			result = 'Lose';
			loseNum++;
		}
	} else if (myChoice === 'jiandao') {
		if (comChoice === 'bu') {
			result = 'Win';
			winNum++;
		} else {
			result = 'Lose';
			loseNum++;
		}
	} else if (comChoice === 'shitou') {
		result = 'Win';
		winNum++;
	} else {
		result = 'Lose';
		loseNum++;
	}
	totalNum++;
	document.getElementById('final-result').innerHTML = result;
	document.getElementById('total-num').innerHTML = totalNum;
	document.getElementById('win-num').innerHTML = winNum;
	document.getElementById('lose-num').innerHTML = loseNum;
	document.getElementById('tie-num').innerHTML = tieNum;
}

document.getElementById('jiandao').addEventListener('click', guess);
document.getElementById('shitou').addEventListener('click', guess);
document.getElementById('bu').addEventListener('click', guess);


/*var shitou = document.getElementById('shitou');
shitou.onclick = function  () {
	document.getElementById('my-result').src = "images/shitou.jpg";
	var comResult = Math.random();
	if(comResult<=0.33){
		// jiandao
		document.getElementById('com-result').src = "images/jiandao.jpg";
	} else if (comResult<0.67) {
		document.getElementById('com-result').src = "images/shitou.jpg";
	} else{
		document.getElementById('com-result').src = "images/bu.jpg";
	};
}

var bu = document.getElementById('bu');
jiandao.onclick = function  () {
	document.getElementById('my-result').src = "images/bu.jpg";
	var comResult = Math.random();
	if(comResult<=0.33){
		// jiandao
		document.getElementById('com-result').src = "images/jiandao.jpg";
	} else if (comResult<0.67) {
		document.getElementById('com-result').src = "images/shitou.jpg";
	} else{
		document.getElementById('com-result').src = "images/bu.jpg";
	};
}*/