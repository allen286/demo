/*实现一个类似百度搜索框的输入提示的功能。

要求如下：
允许使用鼠标点击选中提示栏中的某个选项
允许使用键盘上下键来选中提示栏中的某个选项，回车确认选中
选中后，提示内容变更到输入框中

初级班：
不要求和后端交互，可以自己伪造一份提示数据例如：
var suggestData = ['Simon', 'Erik', 'Kener'];

中级班：
自己搭建一个后端Server，使用Ajax来获取提示数据*/

var suggestData = ['abandon', 'abdomen', 'abide', 'ability', 'able', 'abnormal', 'aboard', 'abolish', 'abound', 'about', 'above', 'fiction', 'field', 'fierce', 'fight', 'test2', 'test3'];
var userInput = document.getElementById('userInput');
var hintUl = document.getElementById('hintUl');

addInputListener();
clickLi();
keydownLi();

//给input标签添加实时监听事件。onchange事件失去焦点后才会触发，在这里使用oninput及Onpropertychange事件
function addInputListener() {
    if (userInput.addEventListener) { // all browsers except IE before version 9
        userInput.addEventListener("input", OnInput);
    }
    if (userInput.attachEvent) { // Internet Explorer and Opera
        userInput.attachEvent("onpropertychange", OnPropChanged); // Internet Explorer
    }
}
// Firefox, Google Chrome, Opera, Safari from version 5, Internet Explorer from version 9
function OnInput(event) {
    var inputValue = event.target.value;
    handleInput(inputValue);
}
// Internet Explorer
function OnPropChanged(event) {
    var inputValue = "";
    if (event.propertyName.toLowerCase() == "value") {
        inputValue = event.srcElement.value;
        handleInput(inputValue);
    }
}

// 字符串处理函数，匹配用户输入的字符串，生成提示列表
function handleInput(inputValue) {
    // console.log(inputValue);
    var liString = "";
    var pattern = new RegExp("^" + inputValue, "i"); //获取开头相同的字符串

    if (inputValue === "") {
        hintUl.style.display = "none";
    } else {
        for (var i = 0; i < suggestData.length; i++) {
            if (suggestData[i].match(pattern)) {
                // console.log(suggestData[i]);
                liString += "<li><span>" + inputValue + "</span>" + suggestData[i].substr(inputValue.length) + "</li>";
            }
        }
        hintUl.innerHTML = liString;
        hintUl.style.display = "block";
    }
}

//给提示列表里的所有li元素添加mouseover，mouseout，以及click事件
function clickLi() {
    // console.log("clickLi");
    delegateEvent(hintUl, "li", "mouseover", function() {    //调用util.js中的delegateEvent函数（事件代理）
        addClass(this, "active");
    });
    delegateEvent(hintUl, "li", "mouseout", function() {
        removeClass(this, "active");
    });
    delegateEvent(hintUl, "li", "click", function() {
        userInput.value = deleteSpan(this.innerHTML);
        hintUl.style.display = "none";
    });
}

/**
 * 删除span标签，获取字符串
 * @param  {String} string 带有span标签的字符串
 * @return {String}        去掉span标签的字符串
 */
function deleteSpan(string) {
    var pattern = /^<span>(\w+)<\/span>(\w+)$/;
    var stringArr = string.match(pattern);
    return stringArr[1] + stringArr[2];
}

// 给提示列表添加键盘事件
function keydownLi() {
    addEvent(userInput, "keydown", function(event) {    //调用util.js中的addEvent函数

        var highLightLi = document.getElementsByClassName("active")[0];
        var firstLi = hintUl.getElementsByTagName('li')[0];
        // console.log(highLightLi);

        //down
        if (event.keyCode == 40) {
            if (highLightLi) {
                var nextLi = highLightLi.nextSibling;
                if (nextLi) {
                    removeClass(highLightLi, "active");
                    addClass(nextLi, "active");
                }
            } else {
                addClass(firstLi, "active");
            }
        }
        //up
        if (event.keyCode == 38) {
            if (highLightLi) {
                var preLi = highLightLi.previousSibling;
                if (preLi) {
                    removeClass(highLightLi, "active");
                    addClass(preLi, "active");
                }
            } else {
                addClass(firstLi, "active");
            }
        }
        //enter
        if (event.keyCode == 13) {
            if (highLightLi) {
                userInput.value = deleteSpan(highLightLi.innerHTML);
                hintUl.style.display = "none";
            }
        }
    });
}