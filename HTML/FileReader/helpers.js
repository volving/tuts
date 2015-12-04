var fileHandler = function(e) {
    var files = e.target.files;
    if (files.length) {
        var previewer = $('#previewer');
        console.log(files.length);
        for (var i = files.length - 1; i >= 0; i--) {
            if (files[i] && files[i].type.indexOf('image/') > -1) {
                var file = files[i];
                var img = $('<img>');
                img.addClass('obj');
                img.file = file;
                previewer.append(img);
                var reader = new FileReader();
                reader.onload = (function(tmp) {
                    return function(e) {
                        console.log(e.target.result);
                        tmp.src = e.target.result;
                    };
                })(img);
                reader.readAsDataURL(file);
            } else {
                continue;
            }
        };
    }
};
