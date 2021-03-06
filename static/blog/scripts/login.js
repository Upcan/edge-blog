$(function() {
    $.backstretch([
        static_url("/admin/pages/media/bg/1.jpg"),
        static_url("/admin/pages/media/bg/2.jpg"),
        static_url("/admin/pages/media/bg/3.jpg"),
        static_url("/admin/pages/media/bg/4.jpg")
        ], {
          fade: 1000,
          duration: 8000
    });
    
    $('.login-form').validate({
        errorElement: 'span',
        errorClass: 'help-block',
        focusInvalid: false,
        rules: {
            username: {
                required: true
            },
            password: {
                required: true
            },
        },
        messages: {
            username: {
                required: "请输入用户名或邮箱"
            },
            password: {
                required: "请输入密码"
            }
        },
        invalidHandler: function (event, validator) {
        },
        highlight: function (element) {
            $(element)
                .closest('.form-group').addClass('has-error');
        },
        success: function (label) {
            label.closest('.form-group').removeClass('has-error');
            label.remove();
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element.closest('.input-icon'));
        },
        submitHandler: function (form) {
            //form.submit();
        }
    });
    
    $('#login-confirm').click(function() {
        login();
    });

    $('.login-form input').keypress(function (e) {
        if (e.which == 13) {
            login();
            return false;
        }
    });
    
    $('#forget-password').click(function () {
        $('.login-form').hide();
        $('.forget-form').show();
    });
    
    $('#back-btn').click(function () {
        $('.login-form').show();
        $('.forget-form').hide();
    });
});

function login() {
    if ($('.login-form').valid()) {
        $.ajax({
            type: "POST",
            data: $('.login-form').serialize(),
            success: function on_success(responseJson) {
                if (responseJson.success) {
                    $(location).attr('href', responseJson.redirect);
                } else {
                    toastr.error(responseJson.error, '');
                }
            },
            error: function on_error(request, msg, e) {
                toastr.error('未知错误, 请稍后重试！', '');
            }
        });
    }
}