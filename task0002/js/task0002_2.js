/*实现一个倒计时功能。

界面首先有一个文本输入框，允许按照特定的格式YYYY-MM-DD输入年月日；
输入框旁有一个按钮，点击按钮后，计算当前距离输入的日期的00:00:00有多少时间差
在页面中显示，距离YYYY年MM月DD日还有XX天XX小时XX分XX秒
每一秒钟更新倒计时上显示的数
如果时差为0，则倒计时停止*/

var otext = document.getElementById('text');
var obtn1 = document.getElementById('btn1');
var obtn2 = document.getElementById('btn2');
var oerror = document.getElementById('error');
var result = document.getElementById('result');

function showTime() {
    var text = trim(otext.value);
    var timearr = text.split('-');
    if (timearr.length !== 3) {
        oerror.innerHTML = '输入格式有误，请按照指定格式输入';
        result.innerHTML = '';
        return;
    }
    
    oerror.innerHTML = '';    // 删除之前的错误提示

    var newYear = timearr[0];
    var newMonth = timearr[1];
    var newDay = timearr[2];
    var iNew = new Date(newYear, newMonth - 1, newDay, 0, 0, 0);
    var iNow = new Date();
    var diff = (iNew - iNow) / 1000;
    if (diff <= 0) {
        oerror.innerHTML = '输入日期有误，请输入未来的某日期';
        clearTimeout(timer);
        result.innerHTML = '';
        return;
    }
    var diffDay = Math.floor(diff / (3600 * 24));
    var diffHour = Math.floor(diff % (3600 * 24) / 3600);
    var diffMin = Math.floor(diff % (3600 * 24) % 3600 / 60);
    var diffSec = Math.floor(diff % 60);
    var str = '距离' + newYear + '年' + newMonth + '月' + newDay + '日还有' + diffDay + '天' + diffHour + '时' + diffMin + '分' + diffSec + '秒';
    result.innerHTML = str;

    timer = setTimeout('showTime()', 1000);
}

function clearTime() {
    clearTimeout(timer);
    result.innerHTML = '';
    otext.value = '';
    oerror.innerHTML = '';

}

btn1.addEventListener('click', showTime);
btn2.addEventListener('click', clearTime);