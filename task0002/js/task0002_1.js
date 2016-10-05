/*第一阶段

在页面中，有一个单行输入框，一个按钮，输入框中用来输入用户的兴趣爱好，允许用户用半角逗号来作为不同爱好的分隔。

当点击按钮时，把用户输入的兴趣爱好，按照上面所说的分隔符分开后保存到一个数组，过滤掉空的、重复的爱好，在按钮下方创建一个段落显示处理后的爱好。

第二阶段

单行变成多行输入框，一个按钮，输入框中用来输入用户的兴趣爱好，允许用户用换行、空格（全角/半角）、逗号（全角/半角）、顿号、分号来作为不同爱好的分隔。

当点击按钮时的行为同上

第三阶段

用户输入的爱好数量不能超过10个，也不能什么都不输入。当发生异常时，在按钮上方显示一段红色的错误提示文字，并且不继续执行后面的行为；当输入正确时，提示文字消失。

同时，当点击按钮时，不再是输出到一个段落，而是每一个爱好输出成为一个checkbox，爱好内容作为checkbox的label。*/

var otext = document.getElementById('textarea');
var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
var result = document.getElementById('result');

function inputHobby() {
    result.innerHTML = '';  //每次清空之前生成的爱好项
    var text = trim(otext.value.replace(/[\s,，、;；]+/g, ' ')); // 将多项用空格分开，并trim去除首尾空格，trim函数见util.js
    var arr = uniqArray(text.split(' ')); //uniqArray()函数见util.js
    if (arr[0] === '' || arr.length > 10) {
        var oh3 = document.createElement('h3');
        oh3.innerHTML = "输入错误：输入不能为空，同时不能超过十项";
        oh3.className = "red"
        result.appendChild(oh3);
        return;
    } else {
        for (var i = 0; i < arr.length; i++) {
            var oInput = document.createElement('input');
            var oLable = document.createElement('lable');
            oInput.type = 'checkbox';
            oLable.innerHTML = arr[i];
            oLable.className = 'mylable';
            result.appendChild(oInput);
            result.appendChild(oLable);
        }
    }
}

function resetHobby() {
    result.innerHTML = '';
    otext.value = '';
}

btn1.addEventListener('click', inputHobby);
btn2.addEventListener('click', resetHobby);