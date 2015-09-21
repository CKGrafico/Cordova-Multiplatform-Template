(function(g, $){
	'use strict';
	
	var classes = {
		item: 'platforms-item--selected',
		image: 'platforms-image--selected'
	};
	
	// Items hover
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
	
	// Preload images
	var images = ['actions', 'back', 'home', 'slide'];
	var platforms = ['android', 'ios', 'windows'];
	var l = images.length;
	var m = platforms.length;
	var iterations = l * m;
	var doneIterations = 0;
	
	for(var i = 0; i < l; i++) {
		for(var j = 0; j < m; j++) {
			$('<img/>').attr('src', 'images/samples/' + images[i] + '_' + platforms[j] + '.png').on('load', function() {
				doneIterations++;
				if(doneIterations === iterations) {
					$('.loading').removeClass('loading--active');
				}
				$(this).remove(); 
			});
		}
	}
	
})(this, jQuery);