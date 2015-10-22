(function(w, factory) {

    "use strict";

    // CommonJS module is defined
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory(require('jquery'));
    } else {
        // planted over the root!
        window.HZ = factory(w.jQuery, w.BootstrapDialog, w.toastr);
    }

})(this, function($, Dialog, toastr) {
    if (Dialog && Dialog.DEFAULT_TEXTS) {
        Dialog.DEFAULT_TEXTS[Dialog.TYPE_DEFAULT] = '提示信息';
        Dialog.DEFAULT_TEXTS[Dialog.TYPE_INFO] = '提示信息';
        Dialog.DEFAULT_TEXTS[Dialog.TYPE_PRIMARY] = '提示信息';
        Dialog.DEFAULT_TEXTS[Dialog.TYPE_SUCCESS] = 'Success';
        Dialog.DEFAULT_TEXTS[Dialog.TYPE_WARNING] = 'Warning';
        Dialog.DEFAULT_TEXTS[Dialog.TYPE_DANGER] = 'Danger';
        Dialog.DEFAULT_TEXTS['OK'] = '确定';
        Dialog.DEFAULT_TEXTS['CANCEL'] = '取消';
    }
    $.notifyDefaults({
        placement: {
            align: 'center'
        }
    });
    $.fn.serializeJSON = function() {
        var json = {};
        $.map($(this).serializeArray(), function(n, i) {
            json[n['name']] = n['value'];
        });
        return json;
    };
    String.prototype.toJSON = function() {
        var json = {},
            sArr = this.split('&');
        for (var s = 0; s < sArr.length; s++) {
            var cache = sArr[s].split('=');
            if (cache.length == 2) {
                json[cache[0]] = cache[1].trim();
            }
        }
        return json;
    };
    var HZ = {};
    HZ.CDN = 'http://7xk7h3.com2.z0.glb.qiniucdn.com';
    HZ.HOST = document.domain;
    HZ.API = location.origin + ':9000';
    HZ.LAB = 'http://lab.hubwiz.com:8081';
    HZ.cookie = function(name, value, options) {
        if (typeof value != 'undefined') { // name and value given, set cookie
            options = options || {};
            if (value === null) {
                value = '';
                options.expires = -1;
            }
            var expires = '';
            if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
                var date;
                if (typeof options.expires == 'number') {
                    date = new Date();
                    //过期时间，分钟
                    date.setTime(date.getTime() + (options.expires * 60 * 1000));
                    //过期时间，天
                    //date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                } else {
                    date = options.expires;
                }
                expires = '; expires=' + date.toUTCString();
                // use expires attribute, max-age is not supported by IE
            }
            var path = options.path ? '; path=' + options.path : '; path=/';
            var domain = options.domain ? '; domain=' + options.domain : '';
            var secure = options.secure ? '; secure' : '';
            document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
        } else { // only name given, get cookie
            var cookieValue = null;
            if (document.cookie && document.cookie != '') {
                var cookies = document.cookie.split(';');
                for (var i = 0; i < cookies.length; i++) {
                    var cookie = $.trim(cookies[i]);
                    // Does this cookie string begin with the name we want?
                    if (cookie.substring(0, name.length + 1) == (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }
    };
    HZ.toJson = function(str) {
        var json = {};
        var sArr = str.split('&');
        for (var s in sArr) {
            var cache = sArr[s].split('=');
            json[cache[0]] = cache[1].trim();
        }
        return json;
    };
    HZ.getParams = function() {
        var data = location.search.substring(1).split('&'),
            params = {};
        for (var i = 0; i < data.length; i++) {
            var cache = data[i].split('=');
            if (cache.length == 2) {
                params[cache[0]] = decodeURI(cache[1]);
            }
        }
        return params;
    };
    HZ.ajax = function(options) {
        var defaults = {
            type: 'GET',
            beforeSend: function(XMLHttpRequest) {
                XMLHttpRequest.setRequestHeader('ajax', 'true');
            }
        };
        defaults = $.extend(defaults, options, true);
        $.ajax(defaults);
    };
    HZ.Comments = function() {
        var dig = '<div id="messageBoard" class="modal fade">' +
            '  <div class="modal-dialog">' +
            '    <div class="modal-content">' +
            '        <div class="modal-header">' +
            '            <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
            '            <h4 class="modal-title">' +
            '                <span class="glyphicon glyphicon-question-sign"></span> 留言板' +
            '            </h4>' +
            '        </div>' +
            '        <div class="modal-body">' +
            '            <div class="form-group">' +
            '            <label for="mContact">联系方式</label>' +
            '            <input id="mContact" type="text" class="form-control">' +
            '            </div>' +
            '            <div class="form-group">' +
            '            <label for="leaveMsg">留言内容</label>' +
            '                <textarea class="form-control" id="mContent" rows="8"></textarea>' +
            '            </div>' +
            '            <button style="margin-top:10px;" id="sendLeaveMsg" type="button" class="btn btn-primary btn-block">' +
            '<i class="glyphicon glyphicon-send"></i> 发送留言</button>' +
            '        </div>' +
            '    </div>' +
            '  </div>' +
            '</div>';
        $('body').append(dig);
        var $dialog = $('#messageBoard'),
            $contact = $('#mContact'),
            $content = $('#mContent'),
            email = HZ.cookie('email');
        if (email) {
            $contact.val(email);
        }
        $dialog.modal({
            show: true
        });
        $dialog
            .on('shown.bs.modal', function(e) {
                $contact.focus();
            })
            .on('hidden.bs.modal', function(e) {
                $dialog.remove();
            });
        $contact.keyup(function() {
            if ($(this).val().trim().length > 0) {
                $(this).popover('hide');
            } else {
                $(this).popover('show');
            }
        });
        $content.keyup(function() {
            if ($(this).val().trim().length > 0) {
                $(this).popover('hide');
            } else {
                $(this).popover('show');
            }
        });
        $('#sendLeaveMsg').click(function() {
            var content = $content.val().trim(),
                contact = $contact.val().trim();
            if (contact.length == 0) {
                $contact.popover({
                    title: '提示信息',
                    content: '请输入联系方式！',
                    placement: 'left',
                    trigger: 'manual'
                }).popover('show').focus();
            } else if (content.length == 0) {
                $content.popover({
                    title: '提示信息',
                    content: '请输入留言内容！',
                    placement: 'left',
                    trigger: 'manual'
                }).popover('show').focus();
            } else {
                $.ajax({
                    url: 'http://xu.demo.com/feedback',
                    dataType: 'jsonp',
                    jsonp: 'callback',
                    data: {
                        contact: contact,
                        content: content
                    },
                    success: function(data, state) {
                        console.log(arguments);
                        $dialog.modal('hide');
                        bootbox.alert('发送成功，谢谢支持！');
                    },
                    error: function(res, err) {
                        console.log(arguments);
                        $dialog.modal('hide');
                        bootbox.alert('服务器繁忙，请稍后再试！');
                    }
                });
            }
        });
        this.show = function() {
            $dialog.modal('show');
        };
        this.hide = function() {
            $dialog.modal('hide');
        };
    };
    HZ.getMessage = function() {
        var target = $('a:first', '#userInfo');
        $.getJSON('/api/message/unread', function(data) {
            if (data.count > 0) {
                //target
                //    .append($('<span>')
                //        .css('font-size','1.5em')
                //        .addClass('fa fa-envelope pull-right'))
                //    .append($('<span>').addClass('navbar-unread').text(data.count));
                var $a = $('<a>').attr('href', '/message');

                $('<span>')
                    .css({
                        'color': '#fff',
                        'font-size': '1.5em'
                    })
                    .addClass('fa fa-envelope pull-right').appendTo($a);
                $('<span>').addClass('navbar-unread').text(data.count).appendTo($a);

                target.append($a);
            }
        });
    };

    HZ.notice = function() {
        var notice = HZ.cookie('notice');
        if (notice) {
            HZ.cookie('notice', null);
            try {
                notice = JSON.parse(notice);
            } catch (e) {
                console.log(e);
                return;
            }

            if (notice instanceof Array) {
                var st = setInterval(function() {
                    if (notice.length > 0) {
                        try {
                            $.notify({
                                //title:'提示信息',
                                message: notice.pop(),
                                icon: 'glyphicon glyphicon-info-sign'
                            }, {
                                placement: {
                                    from: 'top',
                                    align: 'center'
                                },
                                type: 'info',
                                offset: {
                                    y: 100
                                },
                                delay: 10,
                                timer: 2000,
                                mouse_over: 'pause'
                            })
                        } catch (e) {
                            clearInterval(st);
                        }
                    } else {
                        clearInterval(st);
                    }
                }, 300);
            }
        }
    };
    HZ.showMessage = function() {
        if (!document.scripts) return;
        var script = document.scripts['COMMON'];
        if (!script) return;
        var text = script.getAttribute('data-message');
        if (text && text !== 'null') {
            script.setAttribute('data-message', null);
            BootstrapDialog.alert(decodeURIComponent(text));
        }
    };

    return HZ;
});
$(function() {
    if (!/^\/(class)|(book)/.test(location.pathname)) {
        var $top = $('<div>').attr('id', 'fixedTools')
            .addClass('hidden-xs hidden-sm')
            .append($('<i>').addClass('glyphicon glyphicon-circle-arrow-up'))
            .appendTo('body');
        $(window).scroll(function() {
            if ($(this).scrollTop() != 0) {
                $top.fadeIn();
            } else {
                $top.fadeOut();
            }
        });
        $top.click(function() {
            $('html, body').animate({
                scrollTop: 0
            }, 300);
            return false;
        });
    }
    $('a[href="' + document.location.pathname + '"]', '#hb-nav>ul:first').parent().addClass('active');
    if (document.getElementById('userInfo')) {
        $('#userInfo').hover(function() {
            $("#userMenu").stop().slideDown('fast');
        }, function() {
            $('#userMenu').slideUp('fast');
        });
        HZ.getMessage();
    }
    $('#leaveMsg').click(function() {
        new HZ.Comments();
    });
    HZ.notice();
    HZ.showMessage();
});
