(function($){
	'use strict';
	
	var classes = {
		item: 'platforms-item--selected',
		image: 'platforms-image--selected'
	};
	
	$('.platforms-item').on('click, mouseover', function() {
		var $this = $(this);
		var $platforms = $this.closest('.platforms');
		var $platformsItem = $platforms.find('.platforms-item');
		var $platformsImage = $platforms.find('.platforms-image');
		var index = $platformsItem.index($this);
		
		$platformsItem
			.removeClass(classes.item)
			.eq(index)
				.addClass(classes.item);
				
		$platformsImage
			.removeClass(classes.image)
			.eq(index)
				.addClass(classes.image);
	});
})(jQuery);