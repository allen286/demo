//事件绑定兼容
function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener) {
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on" + event, hanlder);
    } else {
        ele["on" + event] = hanlder;
    }
}

/*
//直接利用数组自带的filter + indexOf就能去重了
arr.filter(function(e, i) {
    return arr.indexOf(e) === i;
});
//数组去重函数2，本质同上，map和filter能做到的forEach也能做到
function uinqueArr(arr) {
    var result = [];
    arr.forEach(function(element, index) {
        if (result.indexOf(element) === -1) {
            result.push(element);
        }
    });
    return result;
}
//ie9以下浏览器不支持indexOf和forEach等，考虑兼容可用哈希表去重法
function uniqueArr(arr) {
    var hash = {},
        result = [];
    for (var i = 0; i < arr.length; i++) {
        if (!hash[arr[i]]) {
            hash[arr[i]] = true;
            result.push(arr[i]);
        }
    }
    return result;
}
//还有Object.keys(obj)去重法，同样ie9以上才行
*/

function $(str) {
    return document.querySelector(str);
}

var tagInput = $('input'),
    tagList = $('#tag-list'),
    hobbyInput = $('textarea'),
    hobbyBtn = $('button'),
    hobbyList = $('#hobby-list');

var tagArr = [],
    hobbyArr = [];

// 将字符串分割成数组，并且去掉数组中为空的项目。例如''.split(/\s/)即['']，长度为1，但其实内容为空
function splitInput(str) {
    var inputArray = str.trim().split(/[\s,;，、；。]+/);
    return inputArray.filter(function(e) {
        return e.length !== 0;
    });
}

// 根据数组arr中的数据在node区域渲染绘制dom节点,并给节点绑定相关事件
function render(node, arr) {
    node.innerHTML = arr.map(function(e) {
        return '<span>' + e + '</span>';
    }).join('');
    // 使用事件代理时就不用加下面这句了，包裹node始终存在，页面初始化时添加一次监听函数就行了
    addDelEvent(node, arr);
}

function showTag() {
    if (/[\s,;，、；。]+/.test(tagInput.value) || event.keyCode == 13) {
        var newData = splitInput(tagInput.value);
        if (newData.length === 0) {
            return;
        }
        if (tagArr.indexOf(newData[0]) === -1) {
            tagArr.push(newData[0]);
            if (tagArr.length > 10) {
                tagArr.shift();
            }
        }
        render(tagList, tagArr);
        tagInput.value = "";
    }
}


function showHobby() {
    var newData = splitInput(hobbyInput.value);
    if (newData.length === 0) {
        return;
    }
    //新数组自身去重 && 过滤掉原爱好列表中已经存在的爱好
    var nonRepeatData = newData.filter(function(e, i) {
        return newData.indexOf(e) === i && hobbyArr.indexOf(e) === -1;
    });
    hobbyArr = hobbyArr.concat(nonRepeatData);
    if (hobbyArr.length > 10) {
        // hobbyArr = hobbyArr.slice(-10);
        hobbyArr.splice(0, hobbyArr.length - 10);
    }
    render(hobbyList, hobbyArr);
    hobbyInput.value = "";
}

addEventHandler(tagInput, 'keyup', showTag);
addEventHandler(hobbyBtn, 'click', showHobby);

function addDelEvent(node, arr) {
    /*   
        // 利用包裹元素事件代理 
        addEventHandler(node, 'mouseover', function(e) {
            if (e.target && e.target.nodeName == "SPAN") {
                e.target.textContent = '删除：' + e.target.textContent;
                e.target.style.backgroundColor = '#fe8787';
            }
        });
        addEventHandler(node, 'mouseout', function(e) {
            if (e.target && e.target.nodeName == "SPAN") {
                e.target.textContent = e.target.textContent.replace(/删除：/g, '');
                e.target.style.backgroundColor = '#afefeb';
            }
        });
        addEventHandler(node, 'click', function(e) {
            if (e.target && e.target.nodeName == "SPAN") {
                var temp = e.target.innerHTML.slice(3);
                arr.splice(arr.indexOf(temp), 1);
                node.removeChild(e.target);
                //或者不用removeChild，修改数组后用render全部重新渲染
            }
        });
    */
    // 事件还可以通过循环添加，利用闭包保存index值
    for (var i = 0; i < node.children.length; i++) {
        addEventHandler(node.children[i], 'click', function(cur) {
            return function() {
                arr.splice(cur, 1);
                render(node, arr);
            };
        }(i));
        addEventHandler(node.children[i], 'mouseover', function(cur) {
            return function() {
                node.children[cur].textContent = '删除：' + node.children[cur].textContent;
                node.children[cur].style.backgroundColor = '#fe8787';
            };
        }(i));
        addEventHandler(node.children[i], 'mouseout', function(cur) {
            return function() {
                node.children[cur].textContent = node.children[cur].textContent.replace(/删除：/g, '');
                node.children[cur].style.backgroundColor = '#f4e7b9';
            };
        }(i));

    }
}


// tag和爱好的输入，展示及删除都很类似，可以抽象成一个类的几个方法，创建两个实例来调用
// 这个类具有getdata，deleteIndex，render，addDelEvent等方法


// 将task20中的搜索功能也添加到这里
function fuzzySearch() {
    var searchInput = $('#search-input').value.trim();
    if (searchInput.indexOf('\\') !== -1) {
        alert("请不要输入转义符号：'\\'，也不要输入正则表达式，只能普通字符串");
        return;
    }
    if (searchInput.length > 0) {
        var tempArr = hobbyArr.map(function(e) {
            return e.replace(new RegExp(searchInput, 'g'), '<strong>' + searchInput + '</strong>');
        });
        render(hobbyList, tempArr);
    }
}
addEventHandler($('#search-btn'), 'click', fuzzySearch);
addEventHandler($('#search-input'), 'keyup', function(event) {
    if (event.keyCode == 13) {
        fuzzySearch();
    }
});