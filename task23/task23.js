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
function changeColor(node, save) {
    if (!save) {
        node.style.backgroundColor = '#4a98a2';
        setTimeout(function() {
            node.style.backgroundColor = '#fff';
        }, speed);
    } else {
        node.style.backgroundColor = '#b25353';
    }

}

// 遍历二叉树，并利用定时器添加动画效果
// @parameter i为Number类型，0为深度遍历，1为广度遍历；search为Boolean类型，true时打开搜索功能，false时关闭
function travelAnimation(i, search) {
    var func,
        divList = [],
        rootDiv = $('#tree')[0];
    switch (i) {
        case 0:
            // 深度优先遍历DFS
            func = function DFSSearch(root) {
                if (!root) {
                    return;
                }
                divList.push(root);
                if (root.children.length > 0) {
                    for (var i = 0; i < root.children.length; i++) {
                        DFSSearch(root.children[i]);
                    }
                }
            };
            break;
        case 1:
            // 广度优先遍历BFS
            func = function BFSSearch(root) {
                if (!root) {
                    return;
                }
                var queue = [];
                queue.push(root);
                while (queue.length > 0) {
                    var node = queue.shift();
                    divList.push(node);
                    if (node.children.length > 0) {
                        queue = queue.concat([].slice.apply(node.children));
                    }
                }
            };
            break;
    }
    return function() {
        if (timer) {
            return;
        }
        func(rootDiv);
        if (search) {
            // 遍历同时进行内容匹配搜索
            // 首先重置之前留下的搜索结果，即重置所有节点的背景
            for (var i = 0; i < divList.length; i++) {
                divList[i].style.backgroundColor = '#fff';
            }
            var searchInput = $('input')[0].value.trim();
            if (searchInput.length === 0) {
                return;
            }
            timer = setInterval(function() {
                var node = divList.shift();
                if (node.firstChild.nodeValue.indexOf(searchInput) !== -1) {
                    changeColor(node, true);
                } else {
                    changeColor(node);
                }
                if (divList.length === 0) {
                    clearInterval(timer);
                    timer = null;
                    return;
                }

            }, speed);
        } else {
            // 不需要搜索单纯只进行遍历时的定时器设置
            timer = setInterval(function() {
                var node = divList.shift();
                changeColor(node);
                if (divList.length === 0) {
                    clearInterval(timer);
                    timer = null;
                    return;
                }
            }, speed);
        }
    };
}

addEvent($('button')[0], 'click', travelAnimation(0, false));
addEvent($('button')[1], 'click', travelAnimation(1, false));
addEvent($('button')[2], 'click', travelAnimation(0, true));
addEvent($('button')[3], 'click', travelAnimation(1, true));