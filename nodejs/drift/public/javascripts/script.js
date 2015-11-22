'use strict';

function showMsg(data) {
    if(typeof data.msg === 'object'){
        return false;
    }
    var dataClass = data.code === 0?'danger': 'success';
    var box = $('<div class="alert alert-'+ dataClass + '"role="alert"> </div>');

    box.text(data.msg);
    $('.show-msg').html(box);
    
    setTimeout(function () {
        $('.show-msg').html('');
    }, 5000);
}


//捞瓶子
$('.pick').on('click', function (e) {
    var modal = $('#pick-modal');
    modal.modal('show');
    
    $('.btn-primary', modal).off('click').on('click', function(){
        var user = $('form', modal).serialize();
        $.getJSON('/pick',
            user,
            function (data) {
                if(typeof data.msg === 'object'){
                    $('.bottle-user span').text(data.msg.owner);
                    $('.bottle-content span').text(data.msg.content);
                }else{
                    showMsg(data);
                }
                modal.modal('hide');
            }
        );
    });
});


//扔瓶子
$('.throw').on('click', function() {
    var modal = $('#throw-modal');
    
    modal.modal('show');
    $('.btn-primary', modal).off('click').on('click', function () {
        var bottle = $('form', modal).serialize();
        
        $.post('/throw', bottle, function(data){
           showMsg(data);
           modal.modal('hide');
        });
    });
});