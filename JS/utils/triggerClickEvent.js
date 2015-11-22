// 1、 JS
var comment = document.getElementsByTagName('a')[0];

if (document.all) {
    // For IE 

    comment.click();
}
elseif(document.createEvent) {
    在ff中要为a标签添加click事件， 并且侦听该事件

    var ev = document.createEvent('MouseEvents');
    ev.initEvent('click', false, true);
    comment.dispatchEvent(ev);
}

// 2、 JQuery
$("#aid").trigger(“click”);
