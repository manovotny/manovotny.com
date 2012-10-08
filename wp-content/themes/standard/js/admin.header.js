(function($){

	$(function() {	
		processStandardHeader(jQuery);
	});
	
	$(window).load(function($){
		processStandardHeader(jQuery);
	});
	
})(jQuery);

/**
 * This function processes the header for background, logo, custom text, and 
 * is called on page load and window load for the fatest, most seemless experience
 * that we can manage given large images.
 *
 * @params	$	A reference to the jQuery function
 */
function processStandardHeader($) {
	 
	// If the header bottom element	$('#standard-theme-logo').hide(); is present, then there's a background image
	if($('#header-bottom').length > 0) {
		$('#header-top').addClass('has-background');
	} else {
		$('#header-top').addClass('no-background');
	} // end if
	
	// Make sure the description color matches the color of the header, if custom colors are being used.			
	updateDescriptionTextColor($);
	$(document).mouseup(function() {
		updateDescriptionTextColor($);
	});
	
	$('#text-color').keyup(function() {
		updateDescriptionTextColor($);
	});
	
	// If the 'Reset Header Text' button is visible, provide the custom color.
	if($('#resettext').is(':visible')) {
		updateDescriptionTextColor($);
	} // end if 

	// If we're editing the header and the user has uploaded a background image and a logo...
	if( $('#header-bottom').length > 0 ) {

		// Get the logo depending on if it's an image or text 
		var $logo = null;
		if( ( $logo = $('#standard-theme-logo') ).length === 0 ) {
			$logo = $('#header-top');
		} // end if
		
		// Position the logo making sure that we can get the closest margins as possible
		$background = $('#standard-theme-background');
		var iTopMargin = Math.round( $background.height() / 2 ) - Math.round( $logo.height() / 2 );
		if(0 < $.trim($('#name').text()).length) {
			iTopMargin = Math.round( $background.height() / 2 ) - Math.round( ( $('#name').height() + $('#desc').height() ) / 2 );
		} // end if
		
		$logo.css({
			marginTop: iTopMargin
		}).fadeIn('fast');
		
		// If the background image's height is smaller than the logo, then set the logo's height equal to background image's height
		if($background.height() < $logo.height()) {
			$logo.height($background.height());
		} // end if
		
	} else {
	
		$('#header-top').css('margin-bottom', '0');
		if($('#standard-theme-logo').length > 0) {
			$('#standard-theme-logo').fadeIn('fast');
		} // end if
		
	} // end if
	
	// Hide the options for the text input if we're using a logo
	if( $('#standard-theme-logo').length > 0 ) {
		$('h3').each(function() {
		
			/* Translators: This will need to be localized. */
			if($(this).text().toLowerCase() === 'header text') {
			
				$(this).hide();
				$(this).next().hide();
				
			} // end if
			
		});
	} // end if
	 
} // end processHeader

/**
 * Updates the color of the description text in the 'Header' dashboard screen
 * to match what the user will see on the frontend.
 */
function updateDescriptionTextColor($) {

	if($('#desc').is(':visible') && ($('#text-color').val().length === 4 || $('#text-color').val().length === 7)) {
		
		if($('#text-color').val() === '#000') {
			$('#desc').css('color', '#7a7a7a');
		} // end if
		
	} // end if 
	
} // updateDescriptionTextColor