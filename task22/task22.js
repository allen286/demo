// 封装querySelectorAll函数
function $(ele) {
    return document.querySelectorAll(ele);
}

// 兼容的事件添加函数
function addEvent(ele, event, handler) {
    if (ele.addEventListener) {
        ele.addEventListener(event, handler, false);
    } else if (ele.attachEvent) {
        ele.atachEvent('on' + event, handler);
    } else {
        ele['on' + event] = handler;
    }
}

// 为了避免动画冲突，设置timer为全局定时器
var timer = null,
    speed = 600;

// 改变节点背景颜色
function changeColor(node) {
    node.style.backgroundColor = '#4a98a2';
    setTimeout(function() {
        node.style.backgroundColor = '#fff';
    }, speed);
}

// 遍历二叉树，并利用定时器添加动画效果
function travelAnimation(i) {
    var func,
        divList = [],
        rootDiv = $('#tree')[0];
    switch (i) {
        case 0:
            // 前序遍历
            func = function preOrder(node) {
                if (node) {
                    divList.push(node);
                    preOrder(node.firstElementChild);
                    preOrder(node.lastElementChild);
                }
            };
            break;
        case 1:
            // 中序遍历
            func = function inOrder(node) {
                if (node) {
                    inOrder(node.firstElementChild);
                    divList.push(node);
                    inOrder(node.lastElementChild);
                }
            };
            break;
        case 2:
            // 后序遍历
            func = function postOrder(node) {
                if (node) {
                    postOrder(node.firstElementChild);
                    postOrder(node.lastElementChild);
                    divList.push(node);
                }
            };
            break;
    }
    return function() {
        if (timer) {
            return;
        }
        func(rootDiv);
        timer = setInterval(function() {
            changeColor(divList.shift());
            if (divList.length === 0) {
                clearInterval(timer);
                timer = null;
                return;
            }
        }, speed);
    };
}

for (var i = 0; i < $('button').length; i++) {
    addEvent($('button')[i], 'click', travelAnimation(i));
}