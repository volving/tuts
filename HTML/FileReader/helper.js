var fileHandler = function(e) {
    var file = e.target.files;
    if (file) {
        var previewer = $('#previewer');
        if (file && file.type.indexOf('image/')) {
            var img = $('<img>');
            img.addClass('obj');
            img.file = file;
            console.log(file.name);
            previewer.append(img);
            var reader = new FileReader();
            reader.onload = (function(tmp) {
                return function(e) {
                	console.log('hey:ya!');
                    console.log(e.target.result);
                    tmp.src = e.target.result;
                };
            })(img);
            console.log('hey:ya!');
            reader.readAsDataURL(file);
            console.log('hey:ya!');
        }
    }
};
