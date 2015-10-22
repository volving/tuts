$(function() {
    $('#registerForm').bootstrapValidator({
            message: '此值无效！',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                name: {
                    message: '姓名无效！',
                    validators: {
                        notEmpty: {
                            message: '请输入姓名！'
                        },
                        regexp: {
                            regexp: /^[a-zA-Z0-9_\.]+$/,
                            message: '用户名只能包含字母，数字和下划线！'
                        }
                    }
                },
                email: {
                    validators: {
                        notEmpty: {
                            message: '请输入邮箱！'
                        },
                        emailAddress: {
                            message: '请输入正确的邮箱地址！'
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: '请输入密码！'
                        },
                        callback: {
                            callback: function(value, validator) {
                                if (value.length < 6) {
                                    return {
                                        valid: false,
                                        message: '密码长度小于6！'
                                    }
                                }
                                return true;
                            }
                        }
                    }
                },
                confirmPassword: {
                    validators: {
                        notEmpty: {
                            message: '请输入确认密码！'
                        },
                        identical: {
                            field: 'password',
                            message: '密码和确认密码是不一致！'
                        }
                    }
                },
                verify: {
                    validators: {
                        notEmpty: {
                            message: '请输入验证码！'
                        },
                        callback: {
                            callback: function(value, validator) {
                                if (value.length != 4) {
                                    return {
                                        valid: false,
                                        message: '请输入正确的验证码！'
                                    }
                                }
                                $.ajax({
                                    async: false,
                                    url: '/captcha/register/' + value,
                                    type: 'Get',
                                    success: function(d, status) {
                                        value = d;
                                    },
                                    error: function(res, e) {
                                        value = e;
                                    }
                                });
                                if (value == "error") {
                                    return {
                                        valid: false,
                                        message: '请输入正确的验证码！'
                                    }
                                }
                                return true;
                            }
                        }
                    }
                }
            }
        })
        .on('success.form.bv', function(e) {
            e.preventDefault();
            var data = $(this).serializeJSON();
            $.ajax({
                url: '/api/register',
                type: 'Post',
                data: $(this).serialize(),
                success: function(res) {
                    heap.identify({
                        type: 'new',
                        email: res.email
                    });
                    BootstrapDialog.alert('注册成功！', function() {
                        var params = HZ.getParams();
                        if (params.callback) {
                            location.href = params.callback + '?ticket=' + res.ticket;
                        } else {
                            var url = '/login/' + res.ticket + '?new=1';
                            if (document.referrer && document.referrer != document.location.origin + '/') {
                                url += '&ref=' + document.referrer;
                            }
                            location.href = url;
                        }
                    });
                },
                error: function(res) {
                    var $email = $('#email'),
                        msg = res.status == 500 ? '服务器繁忙，请稍后再试！' : res.responseText;

                    BootstrapDialog.alert(msg, function() {
                        $('#captcha').trigger('click');
                        $('#registerForm').data('bootstrapValidator').resetForm(true);
                        $email.val(data.email);
                        setTimeout(function() {
                            $email.focus()
                        });
                    });
                }
            });
        });
    $('#loginForm').bootstrapValidator({
            message: '此值无效！',
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                email: {
                    validators: {
                        notEmpty: {
                            message: '请输入邮箱！'
                        },
                        emailAddress: {
                            message: '请输入正确的邮箱地址！'
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: '请输入密码！'
                        }
                    }
                },
                verify: {
                    validators: {
                        notEmpty: {
                            message: '请输入验证码！'
                        },
                        callback: {
                            callback: function(value, validator) {
                                if (value.length != 4) {
                                    return {
                                        valid: false,
                                        message: '请输入正确的验证码！'
                                    }
                                }
                                $.ajax({
                                    async: false,
                                    url: '/captcha/login/' + value,
                                    type: 'Get',
                                    success: function(d, status) {
                                        value = d;
                                    },
                                    error: function(res, e) {
                                        value = e;
                                    }
                                });
                                if (value == "error") {
                                    return {
                                        valid: false,
                                        message: '请输入正确的验证码！'
                                    }
                                }
                                return true;
                            }
                        }
                    }
                }
            }
        })
        .on('success.form.bv', function(e) {
            e.preventDefault();
            $.ajax({
                url: '/api/login',
                type: 'Post',
                data: $(this).serialize(),
                success: function(res) {
                    heap.identify({
                        type: 'new',
                        email: res.email
                    });
                    var params = HZ.getParams(),
                        url;
                    if (params.callback) {
                        location.href = params.callback + '?ticket=' + res.ticket;
                    } else {
                        var query = {
                            remember: $('input[name="remember"]').prop('checked')
                        };
                        url = '/login/' + res.ticket + '?';
                        if (document.referrer && document.referrer != document.location.origin + '/') {
                            query.ref = document.referrer;
                        }
                        url += $.param(query);
                        location.href = url;
                    }
                },
                error: function(res) {
                    if (res.status == 500) {
                        BootstrapDialog.alert('服务器繁忙，请稍后再试！');
                    } else {
                        BootstrapDialog.alert(res.responseText);
                    }
                    $('#email').focus();
                    $(':password').val('');
                    $('#captcha').trigger('click');
                }
            });
        });
    //第三方登录
    $('button', '#oAuth').click(function() {
        var type = $(this).attr('data-type'),
            url, params;
        switch (type) {
            case 'qq':
                url = 'https://graph.qq.com/oauth2.0/authorize?';
                params = [
                    'response_type=code',
                    'client_id=101161717',
                    'redirect_uri=http://test.hubwiz.com/oAuth/qq'
                ];
                break;
            case 'sina':
                url = 'https://api.weibo.com/oauth2/authorize?';
                params = [
                    'client_id=1064902839',
                    'scope=all',
                    'redirect_uri=http://test.hubwiz.com/oAuth/sina',
                    'state=' + Date.now()
                ];
                break;
            case 'github':
                url = 'https://github.com/login/oauth/authorize?';
                params = [
                    'client_id=843129131eab9a3287a8',
                    'redirect_uri=http://test.hubwiz.com/oAuth/github',
                    'state=' + Date.now()
                ];
                break;
        }
        if (url && params) {
            location.href = url + params.join('&');
        }
    });
    //验证码刷新
    $('.captcha').click(function() {
        var src = $(this).attr('src').replace(/\?.*/, '');
        $(this).attr('src', src + '?' + Math.random());
        $('input[name="verify"]').val('').focus();
        $('form').bootstrapValidator('resetField', 'verify');
        $(':submit').attr('disabled', true);
    });
});
