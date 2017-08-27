window.onload = function () {
  var dragBox = document.querySelector('#dragBox');
  var wrapBox = document.querySelector('#wrapBox');
  var boxParams = {}; // 用于保存位置数据

  dragBox.addEventListener('mousedown', drag);

  function drag(event) {
    // 鼠标初始位置数据
    boxParams.initMouseX = event.clientX;
    boxParams.initMouseY = event.clientY;

    // box初始位置数据
    boxParams.left = dragBox.offsetLeft;
    boxParams.top = dragBox.offsetTop;

    document.onmousemove = throttle(function (e) {
      // 位移数据
      boxParams.moveX = e.clientX - boxParams.initMouseX;
      boxParams.moveY = e.clientY - boxParams.initMouseY;

      outBoundary(dragBox, wrapBox, boxParams);
      moveBox(dragBox, boxParams);
    }, 50)

    document.onmouseup = function (e) {
      //鼠标抬起后清空onmousemove监听
      document.onmousemove = null;
    }
  }

  // 操作DOM样式来改变box位置
  function moveBox(box, params) {
    box.style.left = params.left + params.moveX + 'px';
    box.style.top = params.top + params.moveY + 'px';
  }

  // 越界时将位移数据修正为临界值
  function outBoundary(box, wrap, params) {
    var x = params.left + params.moveX;
    var y = params.top + params.moveY;
    var maxX = wrap.offsetWidth - box.offsetWidth;
    var maxY = wrap.offsetHeight - box.offsetHeight;

    if (x < 0) {
      params.moveX = -params.left;
    }
    if (y < 0) {
      params.moveY = -params.top;
    }
    if (x > maxX) {
      params.moveX = maxX - params.left;
    }
    if (y > maxY) {
      params.moveY = maxY - params.top;
    }
  }

  // 节流，简化版
  function throttle(fn, time) {
    var start = 0;
    return function (...args) {
      var curr = new Date()
      if (curr - start > time) {
        fn.apply(this, args)
        start = curr
      }
    }
  }

}