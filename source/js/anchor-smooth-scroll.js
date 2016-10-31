(function($) {
	'use strict';

	var link = $('[data-anchor-link]');

	link.each(function() {
		$(this).click(function(e){
			e.preventDefault();
		    $('html, body').animate({
		        scrollTop: $( $.attr(this, 'href') ).offset().top
		    }, 500);
		    return false;
		});
	});
})(jQuery);
