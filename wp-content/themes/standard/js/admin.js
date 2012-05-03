(function($) {
	$(function() {
		
		/* Arrange the header image and text to be 1:1 with the client-side */
		if($('#header-bottom').length === 1 && $('#header-top').length === 1) {
			
			// Apply styles to the header image so that it properly represents what's on the homepage
			$('#header-top').css({
				marginBottom: '-100%',
				padding: '90px 0 0 40px',
				minWidth: '940px',
				width: '940px',
				maxWidth: '940px',
				minHeight: '250px'
			});
			
			$('#header-top h1').css('width', '940px');
			
			$("#headimg img").css({
				maxHeight: '250px',
				minHeight: '250px',
				minWidth: '940px',
				maxWidth: '940px'
			});
			
		} // end if
		
		/* Make sure the description color matches the color of the header, if custom colors are being used. */
		if($('#header-top').length === 1) {
			
			$(document).mouseup(function() {
				updateDescriptionTextColor($);
			});
			
			$('#text-color').keyup(function() {
				updateDescriptionTextColor($);
			});
			
			// Check if the 'Reset Header Text' button is visible...
			if($('#resettext').is(':visible')) {
			
				// If so, then provide the custom color.
				updateDescriptionTextColor($);
					
			} // end if 
			
		} // end if
	
	});
	
})(jQuery);

function togglePostBodyContent($) {

	if($('#page_template').children(':selected').text().toLowerCase() === 'sitemap') {
					
		$('#post-body-content').children(':not(#titlediv)')
			.css('visibility', 'hidden');
			
	} else {
	
		$('#post-body-content').children(':not(#titlediv)')
		.css('visibility', 'visible');
		
	} // end if/else

} // end togglePostBodyContent

function updateDescriptionTextColor($) {

	if($('#text-color').val().length === 4 || $('#text-color').val().length === 7) {
		$('#desc').removeAttr('style')
				.css('color', $('#text-color').val().toString() + ' !important');
	} // end if 
	
} // updateDescriptionTextColor