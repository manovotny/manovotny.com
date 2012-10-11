/*
/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\ CONTENTS /\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\/\

	1. Initialization
	2. Functions

/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\/\/\/\/\/\/\
*/


/* Initialization
---------------------------------------------------------------------------------- */
		
( function( $ ) {

	$( function() {
		
		// check browser size on load, ready, and resize
		$( window ).load( function() { 
		
			checkBrowserSize( $ );
			
		} )
		.ready( function() {
		
			checkBrowserSize( $ );
			
		} )
		.resize( function() {
		
			checkBrowserSize( $ );
			
		} );
		
	} );
	
} ( jQuery ) );


/* Functions
---------------------------------------------------------------------------------- */

/**
 * Checks the size of the browser window.
 *
 * @since 1.0
 */
function checkBrowserSize( $ ) {
	
	// get elements
	var $browser = $( window );
	var $footer = $( '#footer' );
	var $wrapper = $( '#wrapper' );
	
	/**
	 * We expect a "wrapper" when the website is "online". Otherwise, we expect to
	 * have an "offline-wrapper" when the websites is "offline".
	 */
	
	// check for wrapper
	if ( $wrapper.length === 0 ) {
		
		// we do not have a wrapper, so perhaps the webstite is offline, so try and get offline wrapper instead
		$wrapper = $( '#offline-wrapper' );
		
	} // end if
	
	// check for all the necessary elements
	if ( $browser.length === 0 || $footer.length === 0 || $wrapper.length === 0 ) {
		
		// we do not have the necessary items to determine footer stickiness, so bail
		return;
		
	} // end if
	
	// check if the content, including padding and margins, is not enough to fill the browser window
	if ( $browser.height() > ( $wrapper.offset().top + $wrapper.outerHeight( true ) + $footer.height() ) ) {
		
		// not enough content to fill browser, stick footer
		$footer.addClass( 'stick' );
		
	} else {
		
		// enough content to fill browser, "unstick" footer
		$footer.removeClass( 'stick' );
		
	} // end if
	
} // end check browser size