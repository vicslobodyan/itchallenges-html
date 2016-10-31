(function($) {
	'use strict'

	var $faq = $('[data-faq]');

	$faq.each(function() {
		var $question = $(this),
			$trigger = $question.find('[data-faq-trigger]'),
			$answer = $question.find('[data-faq-answer]');

		if (  $question.hasClass('opened') ) {
			$trigger.html('−');
		}

		$trigger.on('click', function(e) {
			e.preventDefault();
			if ( $question.hasClass('opened') ) {
				$question.removeClass('opened');
				$answer.animate({height: 0},400);
				$(this).html('+');
			} else {
		        $question.addClass('opened');
		        $answer.animate({height: $answer.get(0).scrollHeight}, 400 );
		      	$(this).html('−');
		    }
		});
	});
})(jQuery);