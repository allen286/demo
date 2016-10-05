/*实现一个轮播图的功能。

图片数量及URL均在HTML中写好
可以配置轮播的顺序（正序、逆序）、是否循环、间隔时长
图片切换的动画要流畅
在轮播图下方自动生成对应图片的小点，点击小点，轮播图自动动画切换到对应的图片*/

var wrap = document.getElementById('slide-wrap');
var list = document.getElementById('list');
var dots = document.getElementById('dots').getElementsByTagName('li');
var prev = document.getElementById('prev');
var next = document.getElementById('next');
var btns = document.getElementById('control').getElementsByTagName('button');
var index = 1;
var animated = false;
var timer;

function animate(offset) {
    animated = true;
    var newleft = parseInt(list.style.left) + offset;
    var time = 400; //位移总时间
    var interval = 10; //位移间隔时间
    var speed = offset / (time / interval); //每次位移量

    function go() {
        if ((speed < 0 && parseInt(list.style.left) > newleft) || (speed > 0 && parseInt(list.style.left) < newleft)) {
            list.style.left = parseInt(list.style.left) + speed + 'px';
            setTimeout(go, interval);
        } else {
            if (newleft < -4000) {
                newleft = -800;
            }
            if (newleft > -800) {
                newleft = -4000;
            }
            list.style.left = newleft + "px";
            animated = false;
        }
    }
    go();
}

function showDot() {
    for (var i = 0; i < dots.length; i++) {
        if (dots[i].className === 'dot-on') {
            dots[i].className = '';
            break;
        }
    }
    dots[index - 1].className = 'dot-on';
}

next.onclick = function() {
    if (!animated) {
        if (index === 5) {
            index = 1;
        } else {
            index++;
        }
        showDot();
        animate(-800);
    }
}

prev.onclick = function() {
    if (!animated) {
        if (index === 1) {
            index = 5;
        } else {
            index--;
        }
        showDot();
        animate(800);
    }
}

for (var i = 0; i < dots.length; i++) {
    dots[i].onclick = function() {
        if (this.className === 'dot-on') {
            return;
        }
        var myIndex = parseInt(this.getAttribute('index'));
        var offset = -800 * (myIndex - index);
        if (!animated) {
            animate(offset);
        }
        index = myIndex;
        showDot();
    }
}

function playASC() {
    if (timer) {
    stop();
    }
    timer = setInterval(function() {
        next.onclick();
    }, 2000);
}

function playDESC(){
    if (timer) {
    stop();
    }
    timer = setInterval(function() {
        prev.onclick();
    }, 2000)

}

function stop(){
    clearInterval(timer);
}

btns[0].onclick = playASC;
btns[1].onclick = playDESC;
btns[2].onclick = stop;
wrap.onmouseover = stop;
wrap.onmouseout = playASC;
playASC();