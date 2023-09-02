/**
 * Functionality specific to invess.
 *
 * Provides helper functions to enhance the theme experience.
 */
"use strict";

/*------------------------------------------------------------------------------*/
/* Back to top
/*------------------------------------------------------------------------------*/

// ===== Scroll to Top ==== 
jQuery('#totop').hide();
jQuery(window).scroll(function() {
    if (jQuery(this).scrollTop() >= 100) {        // If page is scrolled more than 50px
        jQuery('#totop').fadeIn(200);    // Fade in the arrow
        jQuery('#totop').addClass('top-visible');
    } else {
        jQuery('#totop').fadeOut(200);   // Else fade out the arrow
        jQuery('#totop').removeClass('top-visible');
    }
});
jQuery('#totop').on('click', function() {    // When arrow is clicked
    jQuery('body,html').animate({
        scrollTop : 0                       // Scroll to top of body
    }, 500);
    return false;
});

/*------------------------------------------------------------------------------*/
/* Search Form
/*------------------------------------------------------------------------------*/
	
	jQuery( ".tm-header-search-link a" ).addClass('sclose');	
	jQuery( ".tm-header-search-link a" ).on('click', function(){
		jQuery(".field.searchform-s").focus();	
		
		if (jQuery('.tm-header-search-link a').hasClass('sclose')) {	
			jQuery( ".tm-header-search-link a i" ).removeClass('tm-invess-icon-search ').addClass('tm-invess-icon-close');
			jQuery(this).removeClass('sclose').addClass('open');	
			jQuery(".tm-search-overlay").addClass('st-show');					
		} else {
			jQuery(this).removeClass('open').addClass('sclose');
			jQuery( ".tm-header-search-link a i" ).removeClass('tm-invess-icon-close').addClass('tm-invess-icon-search ');	
			jQuery(".tm-search-overlay").removeClass('st-show');	
		}	
	});
	
/*------------------------------------------------------------------------------*/
/* Enables menu toggle for small screens.
/*------------------------------------------------------------------------------*/ 
	 ( function() {
		var nav = jQuery( '#site-navigation' ), button, menu;
		if ( ! nav )
			return;

		button = nav.find( '.menu-toggle' );
		if ( ! button )
			return;

		// Hide button if menu is missing or empty.
		menu = nav.find( '.nav-menu' );
		if ( ! menu || ! menu.children().length ) {
			button.hide();
			return;
		}

		jQuery( '.menu-toggle' ).on( 'click.invess', function() {
			nav.toggleClass( 'toggled-on' );
		} );
	} )();
	
/*------------------------------------------------------------------------------*/
/* Add plus icon in menu
/*------------------------------------------------------------------------------*/ 

	jQuery('#site-header-menu #site-navigation div.nav-menu > ul > li:has(ul), .tm-mmmenu-override-yes #site-header-menu #site-navigation .mega-menu-wrap > ul > li:has(ul)').append("<span class='righticon'><i class='tm-invess-icon-angle-down'></i></span>");	
		
/*------------------------------------------------------------------------------*/
/* Responsive Menu
/*------------------------------------------------------------------------------*/
	jQuery('.righticon').on('click', function() {
		if(jQuery(this).siblings('.sub-menu, .children, .mega-sub-menu').hasClass('open')){
			jQuery(this).siblings('.sub-menu, .children, .mega-sub-menu').removeClass('open');
			jQuery( 'i', jQuery(this) ).removeClass('tm-invess-icon-angle-up').addClass('tm-invess-icon-angle-down');
		} else {
			jQuery(this).siblings('.sub-menu, .children, .mega-sub-menu').addClass('open');			
			jQuery( 'i', jQuery(this) ).removeClass('tm-invess-icon-angle-down').addClass('tm-invess-icon-angle-up');
		}
		return false;
 	});
	
	
/* ====================================== */
/* Circle Progress bar
/* ====================================== */
	jQuery('.tm-circle-box').each(function(){

		var this_circle = jQuery(this);

		// Circle settings
		var emptyFill_val = "rgba(0, 0, 0, 0)";
		var thickness_val = 10;
		var fill_val      = this_circle.data('fill');

		if( typeof this_circle.data('emptyfill') !== 'undefined' && this_circle.data('emptyfill')!='' ){
			emptyFill_val = this_circle.data('emptyfill');
		}
		if( typeof this_circle.data('thickness') !== 'undefined' && this_circle.data('thickness')!='' ){
			thickness_val = this_circle.data('thickness');
		}
		if( typeof this_circle.data('filltype') !== 'undefined' && this_circle.data('filltype')=='gradient' ){
			fill_val = {gradient: [ this_circle.data('gradient1') , this_circle.data('gradient2') ], gradientAngle: Math.PI / 4 };
		}

		if( typeof jQuery.fn.circleProgress == "function" ){
			var digit   = this_circle.data('digit');
			var before  = this_circle.data('before');
			var after   = this_circle.data('after');
			var c_width  = this_circle.data('id');
			var digit       = Number( digit );
			var short_digit = ( digit/100 ); 

			jQuery('.tm-circle', this_circle ).circleProgress({
				value		: 0,
				size		: c_width,
				startAngle	: -Math.PI / 4 * 2,
				thickness	: thickness_val,
				emptyFill	: emptyFill_val,
				fill		: fill_val
			}).on('circle-animation-progress', function(event, progress, stepValue) { // Rotate number when animating
				this_circle.find('.tm-fid-number').html( before + Math.round( stepValue*100 ) + after );
			});
		}

		this_circle.waypoint(function(direction) {
			if( !this_circle.hasClass('completed') ){
				// Re draw when view
				if( typeof jQuery.fn.circleProgress == "function" ){
					jQuery('.tm-circle', this_circle ).circleProgress( { value: short_digit } );
				};
				this_circle.addClass('completed');
			}
		}, { offset:'90%' });

	});
	

	/* ***************** */
	/*  Carousel effect  */
	/* ***************** */
var themetechmount_carousel = function() {
	jQuery('.themetechmount-boxes-view-carousel').each(function(){
		
		var thisElement = jQuery(this);

		// Column
		var tm_column         = 3;
		var tm_slidestoscroll = 3;
		
		var tm_slidestoscroll_1200 = 3;
		var tm_slidestoscroll_992  = 3;
		var tm_slidestoscroll_768  = 2;
		var tm_slidestoscroll_479  = 1;
		var tm_slidestoscroll_0    = 1;
		if( jQuery(this).data('tm-slidestoscroll')=='1' ){  // slides to scroll
			var tm_slidestoscroll      = 1;
			var tm_slidestoscroll_1200 = 1;
			var tm_slidestoscroll_992  = 1;
			var tm_slidestoscroll_768  = 1;
			var tm_slidestoscroll_479  = 1;
			var tm_slidestoscroll_0    = 1;
		}		
		
		// responsive
		var tm_responsive = [
			{ breakpoint: 1200, settings: {
				slidesToShow  : 3,
				slidesToScroll: tm_slidestoscroll_1200
			} },
			{ breakpoint: 768, settings: {
				slidesToShow  : 2,
				slidesToScroll: tm_slidestoscroll_768
			} },
			{ breakpoint: 574, settings: {
				slidesToShow  : 1,
				slidesToScroll: tm_slidestoscroll_479
			} },
			{ breakpoint: 0, settings: {
				slidesToShow  : 1,
				slidesToScroll: tm_slidestoscroll_0
			} }
		];
								
		if( jQuery(this).hasClass('themetechmount-boxes-col-three') ){
			tm_column         = 3;
			tm_slidestoscroll = 3;
			
			var tm_slidestoscroll_1200 = 3;
			var tm_slidestoscroll_992  = 2;
			var tm_slidestoscroll_768  = 2;
			var tm_slidestoscroll_479  = 1;
			var tm_slidestoscroll_0    = 1;
			if( jQuery(this).data('tm-slidestoscroll')=='1' ){  // slides to scroll
				var tm_slidestoscroll      = 1;
				var tm_slidestoscroll_1200 = 1;
				var tm_slidestoscroll_992  = 1;
				var tm_slidestoscroll_768  = 1;
				var tm_slidestoscroll_479  = 1;
				var tm_slidestoscroll_0    = 1;
			}
			
			tm_responsive     = [
				{ breakpoint: 1200, settings: {
					slidesToShow  : 3,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_1200,
				} },
				{ breakpoint: 992, settings: {
					slidesToShow  : 2,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_992
				} },
				{ breakpoint: 768, settings: {
					slidesToShow  : 2,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_768
				} },
				{ breakpoint: 574, settings: {
					slidesToShow  : 1,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_479
				} },
				{ breakpoint: 0, settings: {
					slidesToShow  : 1,
					slidesToScroll: tm_slidestoscroll_0
				} }
			];
		
		} else if( jQuery(this).hasClass('themetechmount-boxes-col-one') ){
		
			tm_column         = 1;
			tm_slidestoscroll = 1;
			
			tm_responsive     = [
				{ breakpoint: 1200, settings: {
					slidesToShow  : 1,
					slidesToScroll: 1,
					centerMode: false,
					centerPadding: '0px',
					arrows: false
				} },
				{ breakpoint: 768, settings: {
					slidesToShow  : 1,
					slidesToScroll: 1,
					centerMode: false,
					centerPadding: '0px',
					arrows: false
				} },
				{ breakpoint: 574, settings: {
					slidesToShow  : 1,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: 1
				} },
				{ breakpoint: 0, settings: {
					slidesToShow  : 1,
					slidesToScroll: 1
				} }
			];
			
		} else if( jQuery(this).hasClass('themetechmount-boxes-col-two') ){
			tm_column         = 2;
			tm_slidestoscroll = 2;
			
			var tm_slidestoscroll_1200 = 2;
			var tm_slidestoscroll_768  = 2;
			var tm_slidestoscroll_479  = 1;
			var tm_slidestoscroll_0    = 1;
			if( jQuery(this).data('tm-slidestoscroll')=='1' ){  // slides to scroll
				var tm_slidestoscroll      = 1;
				var tm_slidestoscroll_1200 = 1;
				var tm_slidestoscroll_768  = 1;
				var tm_slidestoscroll_479  = 1;
				var tm_slidestoscroll_0    = 1;
			}
			
			tm_responsive     = [
				{ breakpoint: 1200, settings: {
					slidesToShow  : 2,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_1200
				} },
				{ breakpoint: 768, settings: {
					slidesToShow  : 2,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_768
				} },
				{ breakpoint: 574, settings: {
					slidesToShow  : 1,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_479
				} },
				{ breakpoint: 0, settings: {
					slidesToShow  : 1,
					slidesToScroll: tm_slidestoscroll_0
				} }
			];
		
		} else if( jQuery(this).hasClass('themetechmount-boxes-col-four') ){
			tm_column         = 4;
			tm_slidestoscroll = 4;
			
			var tm_slidestoscroll_1200 = 4;
			var tm_slidestoscroll_992  = 2;
			var tm_slidestoscroll_768  = 2;
			var tm_slidestoscroll_479  = 1;
			var tm_slidestoscroll_0    = 1;
			if( jQuery(this).data('tm-slidestoscroll')=='1' ){  // slides to scroll
				var tm_slidestoscroll      = 1;
				var tm_slidestoscroll_1200 = 1;
				var tm_slidestoscroll_992  = 1;
				var tm_slidestoscroll_768  = 1;
				var tm_slidestoscroll_479  = 1;
				var tm_slidestoscroll_0    = 1;
			}
			
			tm_responsive     = [
				{ breakpoint: 1200, settings: {
					slidesToShow  : 4,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_1200
				} },
				{ breakpoint: 992, settings: {
					slidesToShow  : 2,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_992
				} },
				{ breakpoint: 768, settings: {
					slidesToShow  : 2,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_768
				} },
				{ breakpoint: 574, settings: {
					slidesToShow  : 1,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_479
				} },
				{ breakpoint: 0, settings: {
					slidesToShow  : 1,
					slidesToScroll: tm_slidestoscroll_0
				} }
			];			
			
		} else if( jQuery(this).hasClass('themetechmount-boxes-col-five') ){
			tm_column         = 5;
			tm_slidestoscroll = 5;
			
			var tm_slidestoscroll_1200 = 5;
			var tm_slidestoscroll_992  = 3;
			var tm_slidestoscroll_768  = 3;
			var tm_slidestoscroll_479  = 1;
			var tm_slidestoscroll_0    = 1;
			if( jQuery(this).data('tm-slidestoscroll')=='1' ){  // slides to scroll
				var tm_slidestoscroll      = 1;
				var tm_slidestoscroll_1200 = 1;
				var tm_slidestoscroll_992  = 1;
				var tm_slidestoscroll_768  = 1;
				var tm_slidestoscroll_479  = 1;
				var tm_slidestoscroll_0    = 1;
			}
			
			tm_responsive     = [
				{ breakpoint: 1200, settings: {
					slidesToShow  : 5,
					slidesToScroll: tm_slidestoscroll_1200,
					centerMode: false,
					centerPadding: '0px'
				} },
				{ breakpoint: 992, settings: {
					slidesToShow  : 3,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_992
				} },
				{ breakpoint: 768, settings: {
					slidesToShow  : 3,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_768
				} },
				{ breakpoint: 574, settings: {
					slidesToShow  : 1,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_479
				} },
				{ breakpoint: 0, settings: {
					slidesToShow  : 1,
					slidesToScroll: tm_slidestoscroll_0
				} }
			];
			
		} else if( jQuery(this).hasClass('themetechmount-boxes-col-six') ){
			tm_column         = 6;
			tm_slidestoscroll = 6;
			
			var tm_slidestoscroll_1200 = 6;
			var tm_slidestoscroll_992  = 3;
			var tm_slidestoscroll_768  = 3;
			var tm_slidestoscroll_479  = 1;
			var tm_slidestoscroll_0    = 1;
			if( jQuery(this).data('tm-slidestoscroll')=='1' ){  // slides to scroll
				var tm_slidestoscroll      = 1;
				var tm_slidestoscroll_1200 = 1;
				var tm_slidestoscroll_992  = 1;
				var tm_slidestoscroll_768  = 1;
				var tm_slidestoscroll_479  = 1;
				var tm_slidestoscroll_0    = 1;
			}
			
			tm_responsive     = [
				{ breakpoint: 1200, settings: {
					slidesToShow  : 6,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_1200
				} },
				{ breakpoint: 992, settings: {
					slidesToShow  : 3,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_992
				} },
				{ breakpoint: 768, settings: {
					slidesToShow  : 3,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_768
				} },
				{ breakpoint: 574, settings: {
					slidesToShow  : 1,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_479
				} },
				{ breakpoint: 0, settings: {
					slidesToShow  : 1,
					slidesToScroll: tm_slidestoscroll_0
				} }
			];
		}		
		if( jQuery(this).hasClass('tm_1200slidestoshow_2') ){
			tm_column         = 3;
			tm_slidestoscroll = 3;
			
			var tm_slidestoscroll_1200 = 3;
			var tm_slidestoscroll_768  = 2;
			var tm_slidestoscroll_479  = 1;
			var tm_slidestoscroll_0    = 1;
			if( jQuery(this).data('tm-slidestoscroll')=='1' ){  // slides to scroll
				var tm_slidestoscroll      = 1;
				var tm_slidestoscroll_1200 = 1;
				var tm_slidestoscroll_768  = 1;
				var tm_slidestoscroll_479  = 1;
				var tm_slidestoscroll_0    = 1;
			}
			tm_responsive     = [
				{ breakpoint: 1400, settings: {
					slidesToShow  : 2,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_1200,
				} },
				{ breakpoint: 768, settings: {
					slidesToShow  : 2,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_768
				} },
				{ breakpoint: 574, settings: {
					slidesToShow  : 1,
					centerMode: false,
					centerPadding: '0px',
					slidesToScroll: tm_slidestoscroll_479
				} },
				{ breakpoint: 0, settings: {
					slidesToShow  : 1,
					slidesToScroll: tm_slidestoscroll_0
				} }
			];	
		
		}	
		// Fade effect
		var tm_fade = false;
		if( jQuery(this).data('tm-effecttype')=='fade' ){
			tm_fade = true;
		}
		

		// Transaction Speed
		var tm_speed = 800;
		if( jQuery.trim( jQuery(this).data('tm-speed') ) != '' ){
			tm_speed = jQuery.trim( jQuery(this).data('tm-speed') );
		}
		
		// Autoplay
		var tm_autoplay = false;
		if( jQuery(this).data('tm-autoplay')=='1' ){
			tm_autoplay = true;
		}
		
		// Autoplay Speed
		var tm_autoplayspeed = 2000;
		if( jQuery.trim( jQuery(this).data('tm-autoplayspeed') ) != '' ){
			tm_autoplayspeed = jQuery.trim( jQuery(this).data('tm-autoplayspeed') );
		}
		
		// Loop
		var tm_loop = false;
		if( jQuery.trim( jQuery(this).data('tm-loop') ) == '1' ){
			tm_loop = true;
		}
		
		// Dots
		var tm_dots = false;
		if( jQuery.trim( jQuery(this).data('tm-dots') ) == '1' ){
			tm_dots = true;
		}
		
		// Next / Prev navigation
		var tm_nav = false;
		if( jQuery.trim( jQuery(this).data('tm-nav') ) == '1' || jQuery.trim( jQuery(this).data('tm-nav') ) == 'above' || jQuery.trim( jQuery(this).data('tm-nav') ) == 'below' ){
			tm_nav = true;
		}
		
		// Center mode
		var tm_centermode = false;
		if( jQuery.trim( jQuery(this).data('tm-centermode') ) == '1' ){
			tm_centermode = true;
		}
		
		// Center padding
		var tm_centerpadding = 800;
		if( jQuery.trim( jQuery(this).data('tm-centerpadding') ) != '' ){
			var tm_centerpadding = jQuery.trim( jQuery(this).data('tm-centerpadding') );
		}
		
		// Pause on Focus
		var tm_pauseonfocus = false;
		if( jQuery.trim( jQuery(this).data('tm-pauseonfocus') ) == '1' ){
			tm_pauseonfocus = true;
		}
		
		// Pause on Hover
		var tm_pauseonhover = false;
		if( jQuery.trim( jQuery(this).data('tm-pauseonhover') ) == '1' ){
			tm_pauseonhover = true;
		}
		
		
		// RTL
		var tm_rtl = false;
		if( jQuery('body').hasClass('rtl') ){
			tm_rtl = true;
		}
		
		jQuery('.themetechmount-boxes-row-wrapper > div', this).removeClass (function (index, css) {
			return (css.match (/(^|\s)col-\S+/g) || []).join(' ');
		});
	
		jQuery('.themetechmount-boxes-row-wrapper', this).not('.slick-initialized').slick({
			fade             : tm_fade,
			speed            : tm_speed,
			centerMode       : tm_centermode,
			centerPadding    : tm_centerpadding+'px',
			pauseOnFocus     : tm_pauseonfocus,
			pauseOnHover     : tm_pauseonhover,
			slidesToShow     : tm_column,
			slidesToScroll   : tm_slidestoscroll,
			autoplay         : tm_autoplay,
			autoplaySpeed    : tm_autoplayspeed,
			rtl              : tm_rtl,
			dots             : tm_dots,
			pauseOnDotsHover : false,
			arrows           : tm_nav,
			adaptiveHeight   : false,
			infinite         : tm_loop,
			responsive       : tm_responsive
  
		});
	});
		
	// On resize.. it will re-arrange the Flexslider
	jQuery('.themetechmount-boxes-row-wrapper', this).on('setPosition', function(event, slick){
		jQuery( this ).find( ".tm-flexslider" ).each(function(){
			jQuery(this).resize();
		});
	});
	
	// Next button in heading area
	jQuery(".tm-slick-arrow.tm-slick-next", this ).on('click', function(){
		jQuery('.themetechmount-boxes-row-wrapper', jQuery(this).closest('.themetechmount-boxes-view-carousel') ).slick('slickNext');
	});
	
	// Pre button in heading area
	jQuery(".tm-slick-arrow.tm-slick-prev", this).on('click', function(){
		jQuery('.themetechmount-boxes-row-wrapper', jQuery(this).closest('.themetechmount-boxes-view-carousel') ).slick('slickPrev');
	});	
	
	
	
	// Testimonials Slick view
	jQuery('.themetechmount-boxes-view-slickview').each(function(){

		// Fade effect
		var tm_fade = false;
		if( jQuery(this).data('tm-effecttype')=='fade' ){
			tm_fade = true;
		}
		
		// Transaction Speed
		var tm_speed = 800;
		if( jQuery.trim( jQuery(this).data('tm-speed') ) != '' ){
			tm_speed = jQuery.trim( jQuery(this).data('tm-speed') );
		}
		
		// Autoplay
		var tm_autoplay = false;
		if( jQuery(this).data('tm-autoplay')=='1' ){
			tm_autoplay = true;
		}
		
		// Autoplay Speed
		var tm_autoplayspeed = 2000;
		if( jQuery.trim( jQuery(this).data('tm-autoplayspeed') ) != '' ){
			tm_autoplayspeed = jQuery.trim( jQuery(this).data('tm-autoplayspeed') );
		}
		
		// Loop
		var tm_loop = false;
		if( jQuery.trim( jQuery(this).data('tm-loop') ) == '1' ){
			tm_loop = true;
		}
		
		// Dots
		var tm_dots = false;
		if( jQuery.trim( jQuery(this).data('tm-dots') ) == '1' ){
			tm_dots = true;
		}
		
		// Next / Prev navigation
		var tm_nav = false;
		if( jQuery.trim( jQuery(this).data('tm-nav') ) == '1' ){
			tm_nav = true;
		}
		
	
		var testinav 	= jQuery('.testimonials-nav', this);
		var testiinfo 	= jQuery('.testimonials-info', this);
		
		/* Options for "Owl Carousel 2"
		 * http://owlcarousel.owlgraphic.com/index.html
		 */
		var rtloption = false;
		if( jQuery('body').hasClass('rtl') ){
			rtloption = true;
		}
		
		// Info
		jQuery('.testimonials-info', this).not('.slick-initialized').slick({
			fade			: tm_fade,
			//arrows			: tm_nav,
			arrows			: false,
			asNavFor		: testinav,
			adaptiveHeight	: true,
			speed			: tm_speed,
			autoplay		: tm_autoplay,
			autoplaySpeed	: tm_autoplayspeed,
			infinite		: tm_loop,
			rtl             : rtloption
		});
		// Navigation
	   jQuery('.testimonials-nav', this).not('.slick-initialized').slick({
		    slidesToShow: 3,
			vertical: true,
			verticalScrolling: true,
			asNavFor		: testiinfo,
			centerMode		: true,
			centerPadding	: 0,
			focusOnSelect	: true,
			autoplay		: tm_autoplay,
			autoplaySpeed	: tm_autoplayspeed,
			speed			: tm_speed,
			arrows			: false,
			dots			: tm_dots,
			infinite		: tm_loop,
			rtl             : rtloption
		});
	});
};	
	
	

function themetechmount_sticky(){
	
	if( typeof jQuery.fn.stick_in_parent == "function" ){
		
		// Admin bar
		var offset_px = 0;
		if( jQuery('body').hasClass('admin-bar') ){
			offset_px = jQuery('#wpadminbar').height();
		}		

		// Returns width of browser viewport
		var pageWidth = jQuery( window ).width();	
		// setting height for spacer
		
		if( parseInt(pageWidth) > parseInt(tm_breakpoint) ){
			jQuery('.tm-stickable-header').stick_in_parent({'parent':'body', 'spacer':false, 'offset_top':offset_px });
		} else {
			jQuery('.tm-stickable-header').trigger("sticky_kit:detach");
		}
	
	}
}

function themetechmount_setCookie(c_name,value,exdays){
	var now  = new Date();
	var time = now.getTime();
	time    += (3600 * 1000) * 24;
	now.setTime(time);

	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+now.toGMTString() );
	document.cookie=c_name + "=" + c_value;
} // END function themetechmount_setCookie

/*------------------------------------------------------------------------------*/
/* Function to set dynamic height of Testimonial columns
/*------------------------------------------------------------------------------*/
function setHeight(column) {
    var maxHeight = 0;
    //Get all the element with class = col
    column = jQuery(column);
    column.css('height', 'auto');
	
	// Responsive condition: Work only in tablet, desktop and other bigger devices.
	if( jQuery( window ).width() > 479 ){
		
		//Loop all the column
		column.each(function() {       
			//Store the highest value
			if(jQuery(this).height() > maxHeight) {
				maxHeight = jQuery(this).height();
			}
		});
		//Set the height
		column.height(maxHeight);
		
	} // if( jQuery( window ).width() > 479 )
} // END function setHeight
/**************************************************************************/

/*------------------------------------------------------------------------------*/
/* Search form on search results page
/*------------------------------------------------------------------------------*/
if( jQuery('.tm-sresult-form-wrapper').length>0 ){

	jQuery('.tm-sresult-form-wrapper .tm-sresults-settings-btn').on('click', function(){
		jQuery('.tm-sresult-form-wrapper .tm-sresult-form-bottom').slideToggle('400',function(){
			if( jQuery('.tm-sresult-form-wrapper .tm-sresult-form-bottom').is(":hidden") ){
				jQuery('.tm-sresult-form-wrapper .tm-sresults-settings-btn').removeClass('tm-sresult-btn-active');
			} else {
				jQuery('.tm-sresult-form-wrapper .tm-sresults-settings-btn').addClass('tm-sresult-btn-active');
			}
		});
		return false;
	});

	// Check if post_type input is available or not
	if(jQuery('.tm-sresult-form-wrapper form.search-form').length > 0 ){
		if( jQuery(".tm-sresult-form-wrapper form.search-form input[name='post_type']").length==0 ){
		
			jQuery('<input>').attr({
				type : 'hidden',
				name : 'post_type'
			}).appendTo('.tm-sresult-form-wrapper form.search-form');
		}
	}

	// On change of the CPT dropdown
	jQuery(".tm-sresult-form-wrapper .tm-sresult-cpt-select").change(function(){
		jQuery(".tm-sresult-form-wrapper form.search-form input[name='post_type']").val( jQuery(this).val() );
	});

	// Submit the form
	jQuery(".tm-sresult-form-wrapper .tm-sresult-form-sbtbtn").on('click', function(){
		jQuery(".tm-sresult-form-wrapper form.search-form").submit();
	});

}

/*------------------------------------------------------------------------------*/
/* Function to Set Blog Masonry view
/*------------------------------------------------------------------------------*/
function themetechmount_blogmasonry(){
	if( jQuery().isotope ){
			if( jQuery('.themetechmount-boxes.themetechmount-boxes-view-default .themetechmount-boxes-row-wrapper').length > 0 ){
			
			jQuery('.themetechmount-boxes.themetechmount-boxes-view-default .themetechmount-boxes-row-wrapper.tm-box-masnory').each(function(){
				var thisBoxes   = jQuery(this).closest('.themetechmount-boxes');
				var thisWrapper = jQuery(this);
				if( !thisBoxes.hasClass('themetechmount-boxes-col-metro') ){
					thisWrapper.isotope({
						itemSelector: '.tm-box-col-wrapper',
						masonry: {
								
						},
						sortBy : 'original-order'
					});
				}
			});
			
		}
	}
}



	function themetechmount_progressbar() {
		
		jQuery( '.tm-progress-bar-inner' ).each( function( index ) {
			var element_position  = jQuery( this ).offset().top;
			

				if ( ! jQuery( this ).parent( '.tm-progress-bar' ).hasClass( 'bar-is-animated' ) ) {
					jQuery( this ).parent( '.tm-progress-bar' ).addClass( 'bar-is-animated' );
					
					var $this = this;
					var max_value = jQuery( this ).attr( 'data-bar-value' );

					var width = 1;
					var id = setInterval( frame, 14 );

					function frame() {
					
						if ( width >= 100 ) {
							clearInterval( id );
						} else {
							if ( max_value >= width ) {
								
								width++;
							jQuery( $this ).css( 'width', width + "%" );		
							}
						}
					}
				}
			
		});
	}
	
/*------------------------------------------------------------------------------*/
/* Function to set margin bottom for sticky footer
/*------------------------------------------------------------------------------*/
function themetechmount_stickyFooter(){
	if( jQuery('body').hasClass('themetechmount-sticky-footer')){
		jQuery('div#content-wrapper').css( 'marginBottom', jQuery('footer#colophon').height() );
	}
}

/*------------------------------------------------------------------------------*/
/* Function to add class to select box if default option selected
/*------------------------------------------------------------------------------*/
function setEmptySelectBox(element){
	if(jQuery(element).val() == ""){
		jQuery(element).addClass("empty");
	} else {
		jQuery(element).removeClass("empty");
	}
}

function themetechmount_hide_togle_link(){
	if( jQuery('#navbar div.mega-menu-wrap ul.mega-menu').length > 0 ){
		jQuery('h3.menu-toggle').css('display','none');
	}
}

/*------------------------------------------------------------------------------*/
/* Google Map in Header area
/*------------------------------------------------------------------------------*/
function themetechmount_reset_gmap(){
	jQuery('.themetechmount-fbar-box-w > div > aside').each(function(){
		var mainthis = jQuery(this);
		jQuery( 'iframe[src^="https://www.google.com/maps/"], iframe[src^="http://www.google.com/maps/"]',mainthis ).each(function(){
			if( !jQuery(this).hasClass('themetechmount-set-gmap') ){
				jQuery(this).attr('src',jQuery(this).attr('src')+'');
				jQuery(this).load(function(){
					jQuery(this).addClass('themetechmount-set-gmap').animate({opacity: 1 }, 1000 );
				});	

			}
		})
	});
}

function themetechmount_hide_gmap(){
	jQuery('.themetechmount-fbar-box-w > div > aside').each(function(){
		var mainthis = jQuery(this);
		jQuery( 'iframe[src^="https://www.google.com/maps/"], iframe[src^="http://www.google.com/maps/"]',mainthis ).each(function(){
			if( !jQuery(this).hasClass('themetechmount-set-gmap') ){
				jQuery(this).css({opacity: 0});				
				jQuery(this).css('display', 'block');
			}
		})
	});
}	
	
function themetechmount_isotope() {
	jQuery('.themetechmount-sortable-yes').each(function(){	
		var gallery_item = jQuery('.themetechmount-boxes-row-wrapper', this );
		var filterLinks  = jQuery('.tm-sortable-wrapper a', this );			
		gallery_item.isotope({
			animationEngine : 'best-available'
		})
		filterLinks.on('click', function(e){
			var selector = jQuery(this).attr('data-filter');
			gallery_item.isotope({
				filter : selector,
				itemSelector : '.isotope-item'
			});

			filterLinks.removeClass('selected');
			jQuery('#filter-by li').removeClass('current-cat');
			jQuery(this).addClass('selected');
			e.preventDefault();
		});
		
	});
};	


/* ====================================== */
/* Animate on scroll : Number rotator
/* ====================================== */
var tm_number_rotate = function() {
	jQuery(".tm-number-rotate").each(function() {
		var self      = jQuery(this);
		var delay     = (self.data("appear-animation-delay") ? self.data("appear-animation-delay") : 0);
		var animation = self.data("appear-animation");

		if( jQuery(window).width() > 959 ) {
			self.html('0');
			self.waypoint(function(direction) {
				if( !self.hasClass('completed') ){
					var from     = self.data('from');
					var to       = self.data('to');
					var interval = self.data('interval');
					self.numinate({
						format: '%counter%',
						from: from,
						to: to,
						runningInterval: 2000,
						stepUnit: interval,
						onComplete: function(elem) {
							self.addClass('completed');
						}
					});
				}
			}, { offset:'85%' });
		} else {
			if( animation == 'animateWidth' ) {
				self.css('width', self.data("width"));
			}
		}
	});
};




/* ============================================== */
/* BG Image yes class in each Section and Column
/* ============================================== */
var tm_bgimage_class = function() {
	jQuery('.elementor-section').each(function() {
		if( jQuery(this).css('background-image')!='' && jQuery(this).css('background-image')!='none' ){
			jQuery(this).addClass('tm-bgimage-yes' ).removeClass('tm-bgimage-no' );
		} else {
			jQuery(this).addClass('tm-bgimage-no' ).removeClass('tm-bgimage-yes' );
		}
	});
	jQuery('.elementor-column').each(function() {
		if( jQuery(this).children('.elementor-widget-wrap').children('.tm-stretched-div').length ){
			if( jQuery(this).children('.elementor-widget-wrap').children('.tm-stretched-div').css('background-image')!='' && jQuery(this).children('.elementor-widget-wrap').children('.tm-stretched-div').css('background-image')!='none' ){
				jQuery(this).addClass('tm-bgimage-yes' ).removeClass('tm-bgimage-no' );
			} else {
				jQuery(this).addClass('tm-bgimage-no' ).removeClass('tm-bgimage-yes' );
			}
		} else {
			if( jQuery(this).children('.elementor-widget-wrap').css('background-image')!='' && jQuery(this).children('.elementor-widget-wrap').css('background-image')!='none' ){
				jQuery(this).addClass('tm-bgimage-yes' ).removeClass('tm-bgimage-no' );
			} else {
				jQuery(this).addClass('tm-bgimage-no' ).removeClass('tm-bgimage-yes' );
			}
		}
	});
};

/* ============================================== */
/* BG Color yes class in each Section and Column
/* ============================================== */
var tm_bgcolor_class = function() {
	jQuery('.elementor-section').each(function() {
		if( jQuery(this).css('background-color')!='' && jQuery(this).css('background-color')!='transparent' ){
			jQuery(this).addClass('tm-bgcolor-yes');
		}
	});
	jQuery('.elementor-column').each(function() {
		if( jQuery(this).children('.tm-stretched-div').length ){
			if( jQuery(this).children('.tm-stretched-div').css('background-color')!='' && jQuery(this).children('.tm-stretched-div').css('background-color')!='transparent' ){
				jQuery(this).addClass('tm-bgcolor-yes' ).removeClass('tm-bgcolor-no' );
			} else {
				jQuery(this).addClass('tm-bgcolor-no' ).removeClass('tm-bgcolor-yes' );
			}
		} else {
			if( jQuery(this).children('.elementor-widget-wrap').css('background-color')!='' && jQuery(this).children('.elementor-widget-wrap').css('background-color')!='transparent' ){
				jQuery(this).addClass('tm-bgcolor-yes' ).removeClass('tm-bgcolor-no' );
			} else {
				jQuery(this).addClass('tm-bgcolor-no' ).removeClass('tm-bgcolor-yes' );
			}
		}
	});
};

/* ====================================== */
/* Reset and rearrange Stretched Column
/* ====================================== */
var tm_rearrange_stretched_col = function( model_id ) {
	if( jQuery('body').hasClass('elementor-editor-active') ){
		jQuery( '*[data-id="'+model_id+'"]' ).each(function(){
			jQuery('.tm-stretched-div', this).remove();
			jQuery('.elementor-widget-wrap', this).removeAttr('style');
			setTimeout(function(){ tm_stretched_col(); }, 50);
		});	
	}
}

/* ====================================== */
/* Stretched Column
/* ====================================== */
var tm_stretched_col = function() {

	jQuery('.elementor-section-wrap > .elementor-section').each(function(){
		if( jQuery(this).hasClass('tm-col-stretched-left') || jQuery(this).hasClass('tm-col-stretched-right') || jQuery(this).hasClass('tm-col-stretched-both') ){
			jQuery(this).addClass('tm-col-stretched-yes').removeClass('tm-col-stretched-no');
		} else {
			jQuery(this).addClass('tm-col-stretched-no').removeClass('tm-col-stretched-yes');
		}
	});

	// remove all stretched related changes in each column
	jQuery('.elementor-section-wrap > .elementor-section').each(function(){
		var ThisSection = jQuery(this);
		var ThisColumn	= '';
		jQuery( '.elementor-column:not(.elementor-inner-column)', ThisSection ).each(function(){
			ThisColumn	= jQuery(this);
			jQuery( '.tm-stretched-div', ThisColumn ).remove();
			ThisColumn.removeClass('tm-col-stretched-yes tm-col-stretched-left tm-col-stretched-right tm-col-stretched-content-yes');
		});
	});

	jQuery('.elementor-section-wrap > .elementor-section.tm-col-stretched-yes').each(function(){

		var ThisSection		= jQuery(this);
		var ThisColumn		= '';
		var ColWrapper		= '';
		var StretchedEle	= '';

		if( ThisSection.hasClass('tm-col-stretched-left') || ThisSection.hasClass('tm-col-stretched-both') ){
			ThisColumn = jQuery( '.elementor-column:not(.elementor-inner-column):first-child', ThisSection );
			
			if( jQuery('.tm-stretched-div', ThisColumn).length==0 ){
				ColWrapper = ThisColumn.children('.elementor-widget-wrap');
				ColWrapper.prepend( '<div class="tm-stretched-div"></div>' );

				// Stretched Element
				StretchedEle = ColWrapper.children('.tm-stretched-div');

				StretchedEle.addClass( 'tm-stretched-left' );
				ThisColumn.addClass('tm-col-stretched-yes tm-col-stretched-left');

				if( ThisSection.hasClass('tm-left-col-stretched-content-yes') ){
					ThisColumn.addClass('tm-col-stretched-content-yes');
				} else {
					ThisColumn.removeClass('tm-col-stretched-content-yes');
				}

				// background move to stretched div
				ColWrapper.css('background-image', '');
				var bgImage =  ColWrapper.css('background-image');
				if( bgImage!='none' && bgImage!='' ){
					StretchedEle.css('background-image', bgImage );
					ColWrapper.css('background-image', 'none');
				}

				// border radious
				ColWrapper.css('border-top-left-radius', '');
				ColWrapper.css('border-top-right-radius', '');
				ColWrapper.css('border-bottom-left-radius', '');
				ColWrapper.css('border-bottom-right-radius', '');
				var radius_t_left  =  ColWrapper.css('border-top-left-radius');
				var radius_t_right =  ColWrapper.css('border-top-right-radius');
				var radius_b_left  =  ColWrapper.css('border-bottom-left-radius');
				var radius_b_right =  ColWrapper.css('border-bottom-right-radius');
				if( radius_t_left!='0' && radius_t_left!='' ){
					StretchedEle.css('border-top-left-radius', radius_t_left );
					ColWrapper.css('border-top-left-radius', '0');
				}
				if( radius_t_right!='0' && radius_t_right!='' ){
					StretchedEle.css('border-top-right-radius', radius_t_right );
					ColWrapper.css('border-top-right-radius', '0');
				}
				if( radius_b_left!='0' && radius_b_left!='' ){
					StretchedEle.css('border-bottom-left-radius', radius_b_left );
					ColWrapper.css('border-bottom-left-radius', '0');
				}
				if( radius_b_right!='0' && radius_b_right!='' ){
					StretchedEle.css('border-bottom-right-radius', radius_b_right );
					ColWrapper.css('border-bottom-right-radius', '0');
				}



				// Background Color
				var bgColor = ColWrapper.css('background-color');
				if( bgColor!='' ){
					StretchedEle.css('background-color', bgColor );
					ColWrapper.css('background-color', 'transparent');
				}

				// Background Position
				var bgPosition = ColWrapper.css('background-position');
				if( bgPosition!='' ){
					StretchedEle.css('background-position', bgPosition );
				}

				// Background Repeat
				var bgRepeat = ColWrapper.css('background-repeat');
				if( bgRepeat!='' ){
					StretchedEle.css('background-repeat', bgRepeat );
				}

				// Background Size
				var bgSize = ColWrapper.css('background-size');
				if( bgSize!='' ){
					StretchedEle.css('background-size', bgSize );
				}

				tm_stretched_col_calc();

			}

		}

		if( ThisSection.hasClass('tm-col-stretched-right') || ThisSection.hasClass('tm-col-stretched-both') ){
			ThisColumn = jQuery( '.elementor-column:not(.elementor-inner-column):last-child', ThisSection );
	
			if( jQuery('.tm-stretched-div', ThisColumn).length==0 ){
				ColWrapper = ThisColumn.children('.elementor-widget-wrap');
				ColWrapper.prepend( '<div class="tm-stretched-div"></div>' );
	
				// Stretched Element
				StretchedEle = ColWrapper.children('.tm-stretched-div');

				StretchedEle.addClass( 'tm-stretched-right' );
				ThisColumn.addClass('tm-col-stretched-yes tm-col-stretched-right');

				if( ThisSection.hasClass('tm-right-col-stretched-content-yes') ){
					ThisColumn.addClass('tm-col-stretched-content-yes');
				} else {
					ThisColumn.removeClass('tm-col-stretched-content-yes');
				}

				// background move to stretched div
				ColWrapper.css('background-image', '');
				var bgImage = ColWrapper.css('background-image');
				if( bgImage!='none' && bgImage!='' ){
					StretchedEle.css('background-image', bgImage );
					ColWrapper.css('background-image', 'none');
				}

				// border radious
				ColWrapper.css('border-top-left-radius', '');
				ColWrapper.css('border-top-right-radius', '');
				ColWrapper.css('border-bottom-left-radius', '');
				ColWrapper.css('border-bottom-right-radius', '');
				var radius_t_left  =  ColWrapper.css('border-top-left-radius');
				var radius_t_right =  ColWrapper.css('border-top-right-radius');
				var radius_b_left  =  ColWrapper.css('border-bottom-left-radius');
				var radius_b_right =  ColWrapper.css('border-bottom-right-radius');
				if( radius_t_left!='0' && radius_t_left!='' ){
					StretchedEle.css('border-top-left-radius', radius_t_left );
					ColWrapper.css('border-top-left-radius', '0');
				}
				if( radius_t_right!='0' && radius_t_right!='' ){
					StretchedEle.css('border-top-right-radius', radius_t_right );
					ColWrapper.css('border-top-right-radius', '0');
				}
				if( radius_b_left!='0' && radius_b_left!='' ){
					StretchedEle.css('border-bottom-left-radius', radius_b_left );
					ColWrapper.css('border-bottom-left-radius', '0');
				}
				if( radius_b_right!='0' && radius_b_right!='' ){
					StretchedEle.css('border-bottom-right-radius', radius_b_right );
					ColWrapper.css('border-bottom-right-radius', '0');
				}

				// Background Color
				var bgColor = ColWrapper.css('background-color');
				if( bgColor!='' ){
					StretchedEle.css('background-color', bgColor );
					ColWrapper.css('background-color', 'transparent');
				}

				// Background Position
				var bgPosition = ColWrapper.css('background-position');
				if( bgPosition!='' ){
					StretchedEle.css('background-position', bgPosition );
				}

				// Background Repeat
				var bgRepeat = ColWrapper.css('background-repeat');
				if( bgRepeat!='' ){
					StretchedEle.css('background-repeat', bgRepeat );
				}

				// Background Size
				var bgSize = ColWrapper.css('background-size');
				if( bgSize!='' ){
					StretchedEle.css('background-size', bgSize );
				}

				tm_stretched_col_calc();

			}
		}

	});

};

var tm_stretched_col_calc = function() {

	// padding left or right
	if( jQuery('.elementor-section-wrap > .elementor-section > .elementor-container > .elementor-column.tm-col-stretched-yes').length>0 ){

		// Returns width of browser viewport
		var window_width = jQuery( window ).width();

		// Returns width of HTML document
		var document_width = jQuery( document ).width();

		jQuery('.elementor-section-wrap > .elementor-section > .elementor-container > .elementor-column.tm-col-stretched-yes').each(function(){
	
			var this_ele    = jQuery(this);
			var curr_width  = jQuery(this).closest('.elementor-section').width();
			var extra_width = ((window_width - curr_width)/2);
			var parent_width = '';

			var position = 'left';
			if( jQuery(this).hasClass('tm-col-stretched-right') ){
				position = 'right';
			}

			// set width to 100% if parent is 100%
			parent_width = jQuery('.elementor-widget-wrap', jQuery(this)).parent().width();
			//console.log(parent_width);
			if( parent_width == '100%' ){
				jQuery('.elementor-widget-wrap', jQuery(this)).css('width','100%');
			} else {
				jQuery('.elementor-widget-wrap', jQuery(this)).css('width','');
			}

			jQuery('.tm-stretched-div', jQuery(this)).css( 'margin-'+position,'-'+extra_width+'px' );

			// stretched column content too
			if( jQuery(this).hasClass('tm-col-stretched-content-yes') ){
				
				var stretched_width = jQuery('.tm-stretched-div', jQuery(this) ).width();
				jQuery(this).children('.elementor-widget-wrap').css( 'margin-'+position,'-'+extra_width+'px' );
				jQuery(this).children('.elementor-widget-wrap').css( 'width', stretched_width+'px' );
			} else {
				jQuery(this).children('.elementor-widget-wrap').css( 'margin-'+position,'' );
				jQuery(this).children('.elementor-widget-wrap').css( 'width', '' );
			}
		});
	}

}

jQuery(window).resize(function() {
		
	/*------------------------------------------------------------------------------*/
	/*  Timeline view
	/*------------------------------------------------------------------------------*/	
	
	setTimeout(function() {
		tm_stretched_col_calc();
	}, 100);
	
	/*------------------------------------------------------------------------------*/
	/* onResize: Set height of boxes inside row-column view of Blog and Portfolio
	/*------------------------------------------------------------------------------*/
	if( jQuery('.themetechmount-testimonial-box' ).length > 0 ){
		setHeight('.themetechmount-testimonial-box.col-lg-4.col-sm-6.col-md-4');
		setHeight('.themetechmount-testimonial-box.col-lg-6.col-sm-6.col-md-6');
		setHeight('.themetechmount-testimonial-box.col-lg-3.col-sm-6.col-md-3');
	}
	
	/*------------------------------------------------------------------------------*/
	/* Call header sticky function
	/*------------------------------------------------------------------------------*/
	themetechmount_sticky();
	
		
	
});  // END of window.resize


jQuery( document ).ready(function($) {
	
	"use strict";
	tm_stretched_col();
	tm_stretched_col_calc();
	tm_bgimage_class();
	tm_bgcolor_class();
	tm_number_rotate();
	/*------------------------------------------------------------------------------*/
	/* Floating Bar code
	/*------------------------------------------------------------------------------*/

	themetechmount_hide_gmap();
	
		
// Top btn click event
	jQuery(".themetechmount-fbar-btn > a.themetechmount-fbar-btn-link").on('click', function(){		
		if( jQuery(this).closest('.themetechmount-fbar-main-w').hasClass('themetechmount-fbar-position-default') ){
			// Fbar top position
			if( jQuery('.themetechmount-fbar-box-w').css('display')=='none' ){
				jQuery('.tm-fbar-open-icon', this).fadeOut();
				jQuery('.tm-fbar-close-icon', this).fadeIn();
				
				jQuery('.themetechmount-fbar-box-w').slideDown();
			} else {
				jQuery('.tm-fbar-open-icon', this).fadeIn();
				jQuery('.tm-fbar-close-icon', this).fadeOut();
				
				jQuery('.themetechmount-fbar-box-w').slideUp();
			}
		} else {
			// Fbar right position
		}		
		
		return false;
	});	
		
	// Right btn click event
	jQuery('.tm-fbar-close, .themetechmount-fbar-btn > a.themetechmount-fbar-btn-link, .tm-float-overlay').on('click', function(){
		jQuery('.themetechmount-fbar-box-w').toggleClass('animated');
		jQuery('.tm-float-overlay').toggleClass('animated');
		jQuery('.themetechmount-fbar-btn').toggleClass('animated');		
	});
	
	/*------------------------------------------------------------------------------*/
	/* Masonry View settings
	/*------------------------------------------------------------------------------*/
	themetechmount_blogmasonry();
	
	themetechmount_progressbar();	
	
	jQuery('.tm-mmmenu-override-yes #site-navigation .mega-menu-wrap > ul > li.menu-item-language ul').addClass("mega-sub-menu");		
	jQuery('.tm-mmmenu-override-yes #navbar #site-navigation .mega-menu-wrap .mega-menu.mega-menu-horizontal > li.menu-item-language > a').show();
	jQuery('.tm-mmmenu-override-yes #site-navigation .mega-menu-wrap > ul > li.menu-item-language').hover(
         function () {			 		 
		   jQuery('.tm-mmmenu-override-yes #navbar #site-navigation .mega-menu-wrap .mega-menu.mega-menu-horizontal .mega-menu-flyout .mega-sub-menu').css("display", "none");	
           jQuery(this).find('ul').show();		   
         }, 
         function () {
           jQuery(this).find('ul').hide();
         }
     );
	
	
	jQuery('.menu li.current-menu-item').parents('li.mega-menu-megamenu').addClass('mega-current-menu-ancestor');	
	if (!jQuery('body').hasClass("tm-header-invert")) {	
		
		jQuery( ".tm-headerstyle-classic-highlight div.nav-menu ul:not(.children,.sub-menu)>li:eq(-4)" ).addClass( "lastfourth" );
		jQuery( ".tm-headerstyle-classic-highlight div.nav-menu ul:not(.children,.sub-menu)>li:eq(-3)" ).addClass( "lastthird" );
		
		jQuery( ".nav-menu ul:not(.children,.sub-menu) > li:eq(-2), #site-header-menu #site-navigation div.mega-menu-wrap ul.mega-menu.mega-menu-horizontal > li:eq(-2)" ).addClass( "lastsecond" );
		jQuery( ".nav-menu ul:not(.children,.sub-menu) > li:eq(-1), #site-header-menu #site-navigation div.mega-menu-wrap ul.mega-menu.mega-menu-horizontal > li:eq(-1)" ).addClass( "last" );	
	}	
		
	jQuery( ".widget_nav_menu li a" ).each(function() {
			if(!jQuery(this).attr('href')) {
				jQuery(this).closest("li").addClass("empty_link");
			}
		});
	
	/*------------------------------------------------------------------------------*/
	/* adding prettyPhoto in Gallery
	/*------------------------------------------------------------------------------*/
	jQuery("a[data-gal^='prettyPhoto']").prettyPhoto({hook: 'data-gal'});
		
	/*------------------------------------------------------------------------------*/
	/* Revolution Slider - Removing extra margin for no slider message
	/*------------------------------------------------------------------------------*/
	jQuery( ".themetechmount-slider-wrapper > div > div > div:contains('Revolution Slider Error')" ).css( "margin-top", "0" );
		
	
	/*------------------------------------------------------------------------------*/
	/* Select2 library for all SELECT element
	/*------------------------------------------------------------------------------*/
	jQuery('select').select2();
		
			 	
	 /*------------------------------------------------------------------------------*/
	 /* Applying prettyPhoto to all images
	 /*------------------------------------------------------------------------------*/
	if( typeof jQuery.fn.prettyPhoto == "function" ){
				
		// Gallery
		jQuery('div.gallery a[href*=".jpg"], div.gallery a[href*=".jpeg"], div.gallery a[href*=".png"], div.gallery a[href*=".gif"]').each(function(){
			if( jQuery(this).attr('target')!='_blank' ){
				jQuery(this).attr('rel','prettyPhoto[wp-gallery]');
			}
		});
		
		// WordPress Gallery
		jQuery('.gallery-item a[href*=".jpg"], .gallery-item a[href*=".jpeg"], .gallery-item a[href*=".png"], .gallery-item a[href*=".gif"]').each(function(){
			if( jQuery(this).attr('target')!='_blank' ){
				jQuery(this).attr('rel','prettyPhoto[coregallery]');
			}
		});
		
		// Normal link
		jQuery('a[href*=".jpg"], a[href*=".jpeg"], a[href*=".png"], a[href*=".gif"]').each(function(){
			if( jQuery(this).attr('target')!='_blank' && !jQuery(this).hasClass('prettyphoto') ){
				var attr = $(this).attr('rel');
				if (typeof attr !== typeof undefined && attr !== false && attr!='prettyPhoto' ) {
					jQuery(this).attr('data-rel','prettyPhoto');
				}
			}
		});		

		jQuery('a[data-rel^="prettyPhoto"]').prettyPhoto();
		jQuery('a.tm_prettyphoto, div.tm_prettyphoto a').prettyPhoto();
		jQuery('a[rel^="prettyPhoto"]').prettyPhoto();

		
		/*------------------------------------------------------------------------------*/
		/* Settting for lightbox content in Portfolio slider
		/*------------------------------------------------------------------------------*/
		jQuery("a.themetechmount-open-gallery").on('click', function(){
			var id   = jQuery(this).data('id');
			var currid = window[ 'api_images_' + id ];
			jQuery.prettyPhoto.open( window[ 'api_images_' + id ] , window[ 'api_titles_' + id ] , window[ 'api_desc_' + id ] );
		});
		
	}

	/*------------------------------------------------------------------------------*/
	/* Set height of boxes inside row-column view of Blog and Portfolio
	/*------------------------------------------------------------------------------*/
	if( jQuery('.themetechmount-testimonial-box' ).length > 0 ){
		setHeight('.themetechmount-testimonial-box.col-lg-6.col-sm-6.col-md-6');
		setHeight('.themetechmount-testimonial-box.col-lg-4.col-sm-6.col-md-4');
		setHeight('.themetechmount-testimonial-box.col-lg-3.col-sm-6.col-md-3');
	}
	
	/*------------------------------------------------------------------------------*/
	/* Sticky
	/*------------------------------------------------------------------------------*/
	if( jQuery('.tm-stickable-header').length > 0 ){		

		themetechmount_sticky();
	}	

	/*------------------------------------------------------------------------------*/
	/* Return Fasle when # Url
	/*------------------------------------------------------------------------------*/
	$('#site-navigation a[href="#"]').on('click', function(){return false;});
	
	
	/*------------------------------------------------------------------------------*/
	/* Welcome bar close button
	/*------------------------------------------------------------------------------*/
	$(".themetechmount-close-icon").on('click', function(){
		$("#page").css('padding-top', (parseInt($("#page").css('padding-top')) - parseInt($(".themetechmount-wbar").height()) ) + 'px' );
		$(".themetechmount-wbar").slideUp();
		themetechmount_setCookie('kw_hidewbar','1',1);
	});

	/*------------------------------------------------------------------------------*/
	/* Removing BR tag added by shortcode generator
	/*------------------------------------------------------------------------------*/
	var galleryHTML = jQuery(".gallery-size-full br").each(function(){
		jQuery(this).remove();
	});	

	/*------------------------------------------------------------------------------*/
	/* Settting for lightbox content in Blog
	/*------------------------------------------------------------------------------*/
	jQuery("a.themetechmount-open-gallery").on('click', function(){
		var href   = jQuery(this).attr('href');
		var id     = href.replace("#themetechmount-embed-code-", "");
		var currid = window[ 'api_images_' + id ];
		jQuery.prettyPhoto.open( window[ 'api_images_' + id ] , window[ 'api_titles_' + id ] , window[ 'api_desc_' + id ] );
	});
			
	/*-----------------------------------------------------------------------------------*/
	/*	Isotope
	/*-----------------------------------------------------------------------------------*/
	if( jQuery().isotope ){
		jQuery(window).load(function () {
			"use strict";
			themetechmount_isotope();		
		});
		jQuery(window).resize(function(){
			themetechmount_isotope();
		});
	}
	
	
	
	/*------------------------------------------------------------------------------*/
	/* Sticky Footer
	/*------------------------------------------------------------------------------*/
	jQuery('footer#colophon').resize(function(){
		themetechmount_stickyFooter();
	});
	themetechmount_stickyFooter();	
	themetechmount_hide_togle_link();
	
	jQuery( "#tm-header-slider > div > div:contains('Revolution Slider Error')" ).css( "margin", "auto" );
	
	
	
	/*------------------------------------------------------------------------------*/
	/* One Page setting
	/*------------------------------------------------------------------------------*/	
	if( jQuery('body').hasClass('themetechmount-one-page-site') ){
		var sections = jQuery('.elementor-section, #tm-header-slider'),
		nav          = jQuery('.mega-menu-wrap, div.nav-menu'),
		nav_height   = jQuery('#site-navigation').data('sticky-height')-1;
		
		jQuery(window).on('scroll', function () {
			
			// active first menu
			if( jQuery('body').scrollTop() < 5 ){
				nav.find('a').parent().removeClass('mega-current-menu-item mega-current_page_item current-menu-ancestor current-menu-item current_page_item');						
				nav.find('a[href="#tm-home"]').parent().addClass('mega-current-menu-item mega-current_page_item current-menu-ancestor current-menu-item current_page_item');
			}			
				
				var cur_pos = jQuery(this).scrollTop(); 
				sections.each(function() {
					
					var top = jQuery(this).offset().top - (nav_height+2),
					bottom = top + jQuery(this).outerHeight(); 
		
					if (cur_pos >= top && cur_pos <= bottom) {

						if( typeof jQuery(this) != 'undefined' && typeof jQuery(this).attr('id')!='undefined' && jQuery(this).attr('id')!='' ){
							
							var mainThis = jQuery(this);							
							nav.find('a').removeClass('mega-current-menu-item mega-current_page_item current-menu-ancestor current-menu-item current_page_item');						
							jQuery(this).addClass('mega-current-menu-item mega-current_page_item current-menu-ancestor current-menu-item current_page_item');
							var arr = mainThis.attr('id');							
							
							// Applying active class
							nav.find('a').parent().removeClass('mega-current-menu-item mega-current_page_item current-menu-ancestor current-menu-item current_page_item');
							nav.find('a').each(function(){
								var menuAttr = jQuery(this).attr('href').split('#')[1];						
								if( menuAttr == arr ){
									jQuery(this).parent().addClass('mega-current-menu-item mega-current_page_item current-menu-ancestor current-menu-item current_page_item');
								}
							})
						
						}
					}
				});
			//}
		});
		
		nav.find('a').on('click', function () {
			var $el = jQuery(this), 
			id = $el.attr('href');
			var arr=id.split('#')[1];	  
			jQuery('html, body').animate({
				scrollTop: jQuery('#'+ arr).offset().top - nav_height
			}, 500);  
			return false;
		});
		
	}
	
} ); // END of  document.ready



jQuery(window).load(function(){

	"use strict";
	
	/*------------------------------------------------------------------------------*/
	/* Masonry View settings
	/*------------------------------------------------------------------------------*/
	themetechmount_blogmasonry();
	
	themetechmount_progressbar();
	
	/*------------------------------------------------------------------------------*/
	/* Hide pre-loader
	/*------------------------------------------------------------------------------*/
	function themetechmount_preloader_fade_out(){ jQuery( '.tm-page-loader-wrapper' ).fadeOut( 1000 ); }
	if ( jQuery( '.tm-page-loader-wrapper' ).length > 0 ) {
		setTimeout(themetechmount_preloader_fade_out, 100);
	}
				
	/*------------------------------------------------------------------------------*/
	/* Hide page-loader on load.
	/*------------------------------------------------------------------------------*/
	jQuery('#pageoverlay').fadeOut(500);
	
	/*------------------------------------------------------------------------------*/
	/* IsoTope
	/*------------------------------------------------------------------------------*/
	var $container = jQuery('.portfolio-wrapper');
	$container.isotope({
		filter: '*',
		animationOptions: {
			duration: 750,
			easing: 'linear',
			queue: false,
		}
	});
	jQuery('nav.portfolio-sortable-list ul li a').on('click', function(){
		var selector = jQuery(this).attr('data-filter');
		$container.isotope({
			filter: selector,
			animationOptions: {
				duration: 750,
				easing: 'linear',
				queue: false,
			}
		});
		// Selected class
		jQuery('nav.portfolio-sortable-list').find('a.selected').removeClass('selected');
		jQuery(this).addClass('selected'); 
		return false;
	});
	
	/*------------------------------------------------------------------------------*/
	/* Nivo Slider
	/*------------------------------------------------------------------------------*/
	if( jQuery('.themetechmount-slider-wrapper .nivoSlider').length>0 ){
		jQuery('.themetechmount-slider-wrapper .nivoSlider').nivoSlider();
	}
	
	
	
	/*------------------------------------------------------------------------------*/
	/* Responsive Menu : Open by clicking on the menu text too
	/*------------------------------------------------------------------------------*/
	jQuery('.righticon').each(function() {
		var mainele = this;
		if( jQuery( mainele ).prev().prev().length > 0 ){
			if( jQuery( mainele ).prev().prev().attr('href')=='#' ){
				jQuery( mainele ).prev().prev().on('click', function(){
					jQuery( mainele ).trigger( "click" );
				});
			}
		}
	});
	
	
	/*------------------------------------------------------------------------------*/
	/* Blog masonry view for 2, 3 and 4 columns
	/*------------------------------------------------------------------------------*/
	themetechmount_blogmasonry();	

		jQuery(".themetechmount-fbar-content-wrapper").perfectScrollbar({
			suppressScrollX:true,
			includePadding:true
		});
		
		jQuery(".tm-header-style-classic-vertical .tm-header-block").perfectScrollbar({
			suppressScrollX:true,
			includePadding:true
		});
	

}); // END of window.load


 jQuery(document).ready(function() {

		setTimeout(function(){
			themetechmount_carousel();
		}, 100);
 });
 
