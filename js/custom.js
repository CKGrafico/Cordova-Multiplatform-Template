/******************************************************************
*******************************************************************

Template Name: Treviso
Theme URI: http://themeforest.ninetofive.me/treviso/
Description: Responsive HTML5 Template
Author: ninetofive
Author URI: http://www.ninetofive.me
Version: 1.0
							
Designed & Handcrafted by Zan from ninetofive.me
									
*******************************************************************
******************************************************************/

$(document).ready(function() { 

	//Animated scrolling		   
	$('ul.mainmenu a').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var $target = $(this.hash);
			$target = $target.length && $target || $('[id=' + this.hash.slice(1) +']');
			if ($target.length) {
				$('ul.mainmenu li').removeClass('active');
				$(this).parent('li').addClass('active');
				var targetOffset = $target.offset().top-200;
				$('html,body').animate({scrollTop: targetOffset}, 1000);
				return false;
			}
		}
	});

	// Scroll Down Link
	$('.scrolldown').click(function() {
		var targetOffset = $('div.blockquote').offset().top-80;
		$('html,body').animate({scrollTop: targetOffset}, 1000);
	});

	// Menu Scroll Hide
	var nav = $('.menubar');
	var scroll = $('.menubar').attr('data-scroll');
	$(function(){
		$('.menubar').data('size','big');
		if (scroll == 'false') {
			nav.css({
				marginTop:'0px'
			});
		};
	});
	$(window).scroll(function(){
		if ($('body').scrollTop() > 0 && scroll == 'true') {
			if (nav.data('size') == 'big') {
				nav.data('size','small').stop().animate({
					marginTop:'0px'
				}, 300);
			}
		} else {
			if (nav.data('size') == 'small' && scroll == 'true') {
				nav.data('size','big').stop().animate({
					marginTop:'-80px'
				}, 300);
			}
			
		}
	});

	// Text Rotator
	$('.rotate').each(function(){
		var el = $(this);
		var text = $(this).html().split(",");
		el.html(text[0]);
		setInterval(function() {
			el.animate({
              textShadowBlur:20,
              opacity: 0
            }, 500 , function() {
              index = $.inArray(el.html(), text)
              if((index + 1) == text.length) index = -1
              el.text(text[index + 1]).animate({
                textShadowBlur:0,
                opacity: 1
              }, 500 );
            });
		}, 2000);
	});

	// Start Carousel
	$('#carousellatest').jcarousel();
	$('#carouselblog').jcarousel();

	// Carousel Hover
	$('div.section.block').hover(
		function () {
			$(this).children('div.hover').fadeIn('slow');
			$(this).children('div.content').fadeOut('slow');
		},
		function () {
			$(this).children('div.hover').fadeOut('slow');
			$(this).children('div.content').fadeIn('slow');
		}
	);

	// Services Icon Hover
	var original_text = $('p#services').text();
	var services_p = $('p#services');
	$('div.servicesitem').hover(
		function () {
			var text = $(this).children('.front').children('p').text();
			$(services_p).fadeOut(200,function(){ $(services_p).text(text).fadeIn(200); });
		},
		function () {
			$(services_p).fadeOut(200,function(){ $(services_p).text(original_text).fadeIn(200); });
		}
	);

	// Testimonials Icon Hover
	var original_t_text = $('p#testimonials').text();
	var testimonials_p = $('p#testimonials');
	$('div.logos img').hover(
		function () {
			var text = $(this).attr('data-text');
			$(testimonials_p).fadeOut(200,function(){ $(testimonials_p).text(text).fadeIn(200); });
		},
		function () {
			$(testimonials_p).fadeOut(200,function(){ $(testimonials_p).text(original_text).fadeIn(200); });
		}
	);

	// About Us Quote Hover
	$('div.quotefade').hover(
		function () {
			$(this).children('div.quotehover').fadeIn('slow');
		},
		function () {
			$(this).children('div.quotehover').fadeOut('slow');
		}
	);

	// Portfolio
	$(function(){
		$('ul.portfolio').mixitup({
			targetSelector: '.item',
			filterSelector: '.filter',
			easing: 'smooth',
			effects: ['fade'],
			layoutMode: 'grid',
			targetDisplayGrid: 'inline-block'
		});
	});

	// Blog Post Open
	$('a.openpost').click(function(){
		var id = $(this).attr('data-id');
		$('#snippets').hide();
		$('article.full[data-id="'+id+'"]').show();
		$('#postsfull').fadeIn();
	});
	$('a.backtoblog').click(function(){
		$('#postsfull').hide();
		$('article.full').hide();
		$('#snippets').fadeIn();
	});



});