/* ---------------------------------------------------------------- *
 * Post-page load functionality
 * ---------------------------------------------------------------- */

(function($) {
	$(function() {
	
		// If the header image is present, we also need to fade the text.
		if($('#header-image').length > 0) { 
			$('#logo').hover(function() {
				$('#header-image').fadeTo('fast', 0.5);
			}, function() {
				$('#header-image').fadeTo('fast', 1.0);
			});
		} // end if
			
		// Search
		if($('#s').length > 0) {
			
			var sQuery = $('#s').val();
			$('#s').focus(function() {
				if($('#s').val() === 'Search...') {
					$('#s').val('');
				} // end if
			}).blur(function() {
				if($('#s').val() === 'Search...' || $('#s').val().length === 0) {
					$('#s').val(sQuery);
				} // end if
			});
			
		} // end if
		
		// Bootstrap Multi-Level Menus
		$('.submenu').hover(function() {
			
			// Display the submenu on hover
			$(this).children('ul')
				.removeClass('submenu-hide')
				.addClass('submenu-show');
				
		}, function() {
		
			// Hide the submenu when not on hover
			$(this).children('ul')
				.removeClass('.submenu-show')
				.addClass('submenu-hide');
			
		}).click(function() {
		
			// If the submenu item is clicked, navigate to its anchor
			window.location = $(this).children('a').attr('href');
			
		});
		
		// If the Activity Widget is present, activate the first tab
		if($('.tabbed-widget').length > 0) { 
			
			$('.nav-tabs').children('li:first')
				.addClass('active');
				
			$('.tab-content').children('.tab-pane:first')
				.addClass('active');
			
		} // end if
		
		// Navigate to the menu item's anchor
		$('.dropdown a').click(function() {
			window.location = $(this).attr('href');
		});
		
		// Force menus to collapse if resizing from mobile to full
		$(window).resize(function() {
			if($(this).width() >= 979) {
				$('.btn-navbar').trigger('click');
			} // end if
		});
		
		// Move sidebar below content on left sidebar layout
		if($('#sidebar').length > 0 && $('#wrapper > .container > .row').children(':first').attr('id') == 'sidebar') {
		
			moveSidebarInLeftSidebarLayout($);
			$(window).resize(function() {
				moveSidebarInLeftSidebarLayout($);
			});
		
		} // end if
		
		// Reveal available commenting options
		if($('.form-allowed-tags').length > 0) {

			$('.form-allowed-tags').children('a')
				.click(function(evt) {
					evt.preventDefault();
					$(this).siblings('code')
						.fadeToggle('fast');
				});
				
		} // end if
		
		// FitVid
		$('.entry-content').fitVids();
		
	});
})(jQuery);

function moveSidebarInLeftSidebarLayout($) {

	if($('#wrapper').width() < 768) {
		$('#sidebar').insertAfter('#main');
	} else {
		$('#sidebar').insertBefore('#main');
	} // end if

} // end moveSidebarInLeftSidebarLayout