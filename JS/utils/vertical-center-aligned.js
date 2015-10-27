//在html中 '.smaller' 被包裹在一个div中，但small中的文字高度不定，由此代码来垂直居中对齐
<script>
	$(function() {
	    var t;
	    $('.smaller').map(function(i, v) {
	        t = $(v);
	        t.css({
	            'top': (t.parent().height() - t.height()) / 2
	        });
	    });
	});
</script>