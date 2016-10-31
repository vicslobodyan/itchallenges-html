(function($) {
	'use strict'

	var $menu = $('[data-menu]');

	$menu.each(function() {
		var $trigger = $(this).find('[data-trigger-menu]'),
			$list = $(this).find('[data-menu-list]');

		$trigger.on('click', function(e) {
			e.preventDefault();

			$list.toggleClass('opened');
		});
	});
})(jQuery);