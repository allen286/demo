/*实现一个可拖拽交互的界面
左右两侧各有一个容器，里面的选项可以通过拖拽来左右移动
被选择拖拽的容器在拖拽过程后，在原容器中消失，跟随鼠标移动
注意拖拽释放后，要添加到准确的位置
拖拽到什么位置认为是可以添加到新容器的规则自己定
注意交互中良好的用户体验和使用引导*/

var boxWrap = document.getElementById('box-wrap');
var bars = boxWrap.children;

init(); //初始化

function init() {
    //将每列里的move-box定位，并利用事件代理给每列中的move-box添加拖拽事件
    for (var i = 0; i < bars.length; i++) {
        initPosition(bars[i]);
        $.delegate(bars[i], "div", "mousedown", drag);
    }
}

/**
 * 初始化方块位置
 * @param  {element} element 容器元素
 * @param {number} dragAreaTop 容器top
 * @param {String} leftOrRight 左边或右边
 */
function initPosition(block) {
    for (var i = 0; i < block.children.length; i++) {
        block.children[i].style.left = 0;
        block.children[i].style.top = 60 * i + "px";
    }
}

/**
 * 拖拽方法
 */
function drag(e) {
    var ev = e || window.event;
    var target = ev.target || ev.srcElement;
    if (target.className.toLowerCase() != "move-box") {
        return;
    }

    // 记录初始点击时鼠标位置
    var disX = ev.clientX;
    var disY = ev.clientY;

    // 当前方块的位置，当前方块left值都为0，只记录top值
    var divTop = target.parentNode.offsetTop + target.offsetTop;
    var parentLeft = target.parentNode.offsetLeft;

    // 给活动方块增加样式
    addClass(target, 'active-box')

    var parent = target.parentNode;
    var firstMove = true;

    //鼠标移动
    document.onmousemove = function(e) {
        if (firstMove) {
            parent.removeChild(target);
            boxWrap.appendChild(target);
        }
        firstMove = false;
        var ev = e || window.event;

        // 判断是否移出屏幕
        if (outOfSreen(ev.clientX, ev.clientY, ev)) {
            boxWrap.removeChild(target);
            parent.appendChild(target);

            initPosition(parent);
            document.onmousemove = null;
        } else {
            //move
            target.style.top = divTop + ev.clientY - disY + "px";
            target.style.left = parentLeft + ev.clientX - disX + "px";

            initPosition(parent);
        }



    };
    //鼠标抬起
    document.onmouseup = function(e) {

        //每次鼠标抬起后清除之前的onmousemove事件
        document.onmousemove = null;
        document.onmouseup = null;

        target.parentNode.removeChild(target);
        removeClass(target, "active-box");

        var ev = e || window.event;

        // 判断鼠标抬起时光标位置在哪一个bar内，将box放入其中
        for (var i = 0; i < bars.length; i++) {
            if (judgeInBlock(ev.clientX, ev.clientY, bars[i])) {
                bars[i].appendChild(target);
                initPosition(bars[i]);
                return;
            }
        }

        // 如果鼠标没有进入任何一个bar内，将box放回原位
        parent.appendChild(target);
        initPosition(parent);

    };

    return false;
}

/**
 * 判断是否移出屏幕
 * @param  {number} x 坐标
 * @param  {number} y 坐标
 * @return {boolean}   是否在屏幕外
 */
function outOfSreen(x, y, e) {
    var maxW = document.documentElement.clientWidth;
    var maxH = document.documentElement.clientHeight;
    return e.clientX <= 0 || e.clientX >= maxW || e.clientY <= 0 || e.clientY >= maxH;
}

/**
 * 判断是否在区域内
 * @param  {Number} x     当前鼠标位置
 * @param  {Number} y     当前鼠标位置
 * @param  {Element} block 容器元素
 * @return {boolean}       是否在容器内
 */
function judgeInBlock(x, y, block) {
    var x0 = getPosition(block).x;
    var x1 = getPosition(block).x + block.offsetWidth;
    var y0 = getPosition(block).y;
    var y1 = getPosition(block).y + block.offsetHeight;
    return x > x0 && x < x1 && y > y0 && y < y1;
}