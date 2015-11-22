/**
 * Get/Set color of the specified element;
 * @param  [clr:<color descriptor>] # This can be any legal css color style(Hex, rgb, rgba...) or just leave it empty;
 * @return {when <clr> is undefined this is the real value of the element's color }
 */
$.fn.extend({
	'color': function(clr){
		if (clr) {
			return this.css({'color': clr});
		}else{
			return this.css('color');
		}
	}
});
