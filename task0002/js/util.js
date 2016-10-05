// 1.1 创建第一个页面交互
/*
function add(num1, num2) {
    return num1 + num2;
}

function renderResult(result) {
    document.getElementById("result").innerHTML = result;
}

function addEventHandle() {
    var num1 = parseFloat(document.getElementById("number1").value);
    var num2 = parseFloat(document.getElementById("number2").value);
    var result = add(num1, num2);
    renderResult(result);
}

function initEvent() {
    document.getElementById("addbtn").addEventListener("click", addEventHandle, false);
}
initEvent();
*/

// 2.1 JavaScript数据类型及语言基础
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    // return arr instanceof Array;
    // return arr.constructor===Array;
    return Object.prototype.toString.call(arr) === '[object Array]';
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    // return typeof fn;
    // return fn instanceof Function;
    return Object.prototype.toString.call(fn) === '[object Function]';
}

// 测试用例：
/*console.log(isFunction(isArray));
console.log(isArray([]));
console.log(isArray.prototype.toString());//输出['object Object']，为什么不是function?
console.log(Object.prototype.toString.call(toString));//输出['object Function']*/


// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
function cloneObject(obj) {
    var result,oClass=isClass(obj);
        //确定result的类型
    if(oClass==="Object"){
        result={};
    }else if(oClass==="Array"){
        result=[];
    }else{
        return obj;
    }
    for(key in obj){
        var copy=obj[key];
        if(isClass(copy)=="Object"||"Array"){
            result[key]=arguments.callee(copy);//递归调用
        }else{
            result[key]=obj[key];
        }
    }
    return result;
}
//返回传递给他的任意对象的类型
function isClass(o){
    if(o===null) return "Null";
    if(o===undefined) return "Undefined";
    return Object.prototype.toString.call(o).slice(8,-1);
}
// 测试用例：
/*var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);    // 2
console.log(abObj.b.b1[0]);    //"Hello"

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello" */


// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var result=[];
    for(var i=0;i<arr.length;i++){
        var item=arr[i];
        if(result.indexOf(item)===-1){   //IE9以下不支持数组的indexOf方法
            result.push(item);
        }
    }
    return result;
}
// hash 速度最快
function uniqArray1(arr) {
    var hash = {};
    var result = [];
    for (var i = 0, len = arr.length; i < len; i++) {
        var key = arr[i];
        if (!hash[key]) {
            result.push(key);
            hash[key] = true;
        }
    }
    return result;
}
function uniqArray2(arr) {
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        obj[arr[i]] = true;
    }
    return Object.keys(obj);   //IE9以下不支持Object.keys()方法
}
// 使用示例
/*var a = [1, 3, 5, 7, 5, 3];
var aa = ["a","b","c","b","c","e"]
console.log(uniqArray2(a)); // [1, 3, 5, 7]
console.log(uniqArray2(aa));*/

// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符。假定空白字符只有半角空格、Tab
function simpleTrim(str) {
    function isEmpty(c) {
        return /\s/.test(c);
    }
    var len = str.length;
    for (var i = 0; i < len && isEmpty(str.charAt(i)); i++);
    if (i === len) {
        return '';
    }
    for (var j = len; j && isEmpty(str.charAt(j - 1)); j--);
    return str.substring(i, j);
}
// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}
// 使用示例
/*var str = '   hi!  ';
str = trim(str);
console.log(str); // 'hi!'*/


// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for(var i=0;i<arr.length;i++){
        fn(arr[i],i);
    }
}
// 使用示例
/*var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
each(arr, output);  // 0:java, 1:c, 2:php, 3:html*/


// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    var count=0;
    for(var item in obj){
        if(obj.hasOwnProperty(item)) count++;
    }
    return count;
}
// 使用示例
/*var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3*/

// 判断是否为邮箱地址
function isEmail(emailStr) {
    // return (/^[a-z0-9]([-_\.]?[a-z0-9]+)*@([-_]?[a-z0-9]+)+[\.][a-z]{2,7}([\.][a-z]{2})?$/i).test(emsilStr);
    return emailStr.search(/^[a-z0-9]([-_\.]?[a-z0-9]+)*@([-_]?[a-z0-9]+)+[\.][a-z]{2,7}([\.][a-z]{2})?$/i) !== -1;
}

// 判断是否为手机号
function isMobilePhone(phone) {
    phone = phone + '';
    // return (/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/).test(phone);
    return phone.search(/^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/) !== -1;
}


// task 3.1
function hasClass(element, className) {
    var name = element.className.match(/\S+/g) || [];
    if (name.indexOf(className) !== -1) {
        return true;
    }
    return false;
}
// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if (!hasClass(element, newClassName)) {
        element.className = trim(element.className + ' ' + newClassName);
    }
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    if (hasClass(element, oldClassName)) {
        element.className = trim(element.className.replace(oldClassName, ''));
    }
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode === siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var x = 0;
    var y = 0;
    while (element !== null) {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    }
    var scrollLeft = document.body.scrollLeft + document.documentElement.scrollLeft;
    var scrollTop = document.body.scrollTop + document.documentElement.scrollTop;
    // element.getBoundingClientRect()
    x -= scrollLeft;
    y -= scrollTop;  //相对于可视区域的位置
    return {
        x: x,
        y: y
    }
}

/*//利用getBoundingClientRect()
function getPosition(element) {
    var pos = {};
    pos.x = element.getBoundingClientRect().left + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
    pos.y = element.getBoundingClientRect().top + Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    return pos;
}*/

/*//实例测试
var pos=document.getElementById('pos');
console.log(getPosition(pos));*/


// task 3.2
// 实现一个简单的Query
function $(selector) {

}

// 可以通过id获取DOM对象，通过#标示，例如
$("#adom"); // 返回id为adom的DOM对象

// 可以通过tagName获取DOM对象，例如
$("a"); // 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如
$(".classa"); // 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如
$("[data-log]"); // 返回第一个包含属性data-log的对象

$("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如
$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象


// task 4.1
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if(element.addEventListener){
        element.addEventListener(event,listener,false); 
    }else{
        element.attachEvent('on'+ event,function(){
            listener.call(element); //why??
        })
    }
}
// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if(element.removeEventListener){
        element.removeEventListener(event,listener,false);  
    }else if(element.detachEvent){
        element.detachEvent('on'+ event,function(){
            listener.call(element);
        })
    }else{
        element["on" + event] = null;
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element,'click',listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    addEvent(element,"keydown",function (e) {
        if(e.keyCode===13){
            listener.call(element,e);
        }
    });
}


// task 4.2

// 对一个列表里所有的<li>增加点击事件的监听

function clickListener(event) {
    console.log(event);
}
/*
$.click($("#item1"), clickListener);
$.click($("#item2"), clickListener);
$.click($("#item3"), clickListener);
*/

//取到id为list这个ul里面的所有li，然后通过遍历给他们绑定事件。这样我们就不需要一个一个去绑定了
function renderList() {
    $("#list").innerHTML = '<li>new item</li>';
}

function init() {
    each($("#list").getElementsByTagName('li'), function(item) {
        $.click(item, clickListener);
    });

    $.click($("#btn"), renderList);
}
// init();

// 我们增加了一个按钮，当点击按钮时，改变list里面的项目，这个时候你再点击一下li，绑定事件不再生效了
// 那是不是我们每次改变了DOM结构或者内容后，都需要重新绑定事件呢？
//当然不会这么笨，接下来学习一下事件代理，然后实现下面新的方法。
//事件代理
function delegateEvent(element, tag, eventName, listener) {
    addEvent(element, eventName, function (e) {
        var event = e || window.event;
        var target = event.target || event.srcElement;

        if (target && target.tagName === tag.toUpperCase()) {
            listener.call(target, event);
        }
    });
}
$.delegate = delegateEvent;

// 时间代理使用示例，利用父元素
// 还是上面那段HTML，实现对list这个ul里面所有li的click事件进行响应
// $.delegate($("#list"), "li", "click", clickListener);

// task 5.1
// 判断是否为IE浏览器，返回-1或者版本号
//'msie'无法识别ie11,改用'trident'
// "Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; rv:11.0) like Gecko"
function isIE(){
    var ua=window.navigator.userAgent;
    // if(ua.toLowerCase().indexOf('msie') === -1){    
    if(ua.toLowerCase().indexOf('trident') === -1){  
        return -1;
    }else{
        return ua;
    }
}
// console.log(isIE());

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays){
    var oDate = new Date();
    oDate.setDate(oDate.getDate()+expiredays);
    document.cookie = cookieName + '=' + cookieValue + ';expires=' + oDate.toGMTString();
}

// 获取cookie值
function getCookie(cookieName){
    var arr1 = document.cookie.split(';');
    for(var i=0;i<arr1.length;i++){
        var arr2 = arr1[i].split('=');
        if(arr2[0] == cookieName){
            return decodeURI(arr2[1]);
        }
    }
}


// task 6.1
// 学习Ajax，并尝试自己封装一个Ajax方法
function ajax(url, options) {
    // 创建对象
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    else {        //兼容 IE5 IE6
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }

    // 处理data
    if (options.data) {
        var dataarr = [];
        for (var item in options.data) {
            dataarr.push(item + '=' + encodeURI(options.data[item]));
        }
        var data = dataarr.join('&');
    }

    // 处理type
    if (!options.type) {
        options.type = 'GET';
    }
    options.type = options.type.toUpperCase();

    // 发送请求
    if (options.type === 'GET') {
        var myURL = '';
        if (options.data) {
            myURL = url + '?' + data;
        }
        else {
            myURL = url;
        }
        xmlhttp.open('GET', myURL, true);
        xmlhttp.send();
    }
    else if (options.type === 'POST') {
        xmlhttp.open('POST', url, true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlhttp.send(data);
    }

    // readyState
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4) {
            if (xmlhttp.status === 200) {
                if (options.onsuccess) {
                    options.onsuccess(xmlhttp.responseText, xmlhttp.responseXML);
                }
            }
            else {
                if (options.onfail) {
                    options.onfail();
                }
            }
        }
    }
}

// 使用示例：
/*ajax(
    'prompt.php',
    {
        data: {
            q: 'a'
        },
        onsuccess: function (responseText, xhr) {
            console.log(responseText);
        },
        onfail : function () {
            console.log('fail');
        }
    }
);
*/
