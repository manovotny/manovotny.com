/*----------------------------------------------------------------------------*
 * Social Networks
 *----------------------------------------------------------------------------*/

/**
 * Manages the visibility of the social icons in the Theme Customizer.
 *
 * @param         object    $             A reference to the jQuery object
 * @param         string    sId           The ID of the element to toggle
 * @param         string    sControlId    The name of Theme Customizer control
 * @package       mayer
 * @subpackage    js
 * @version       1.1.0
 * @since         1.0.0
 */
function toggleSocialIconVisibility( $, sId, sControlId ) {
	"use strict";
	/*global wp*/

	// Hide all of the initial social networks unless they have an anchor value
	$('#social-networks:lt(4)').each(function() {
		if ( '' === $(this).children('a').attr('href') ) {
			$(this).addClass('hidden');
		} // end if
	});

	// Toggle the visibility based on the string value of element
	wp.customize( sControlId, function( value ) {
		value.bind( function( to ) {

			if ( 0 < $.trim( to ).length ) {
				$( sId ).removeClass('hidden');
			} else {
				$( sId ).addClass('hidden');
			} // end if

		});
	});

} // end toggleSocialIconVisibility

/*----------------------------------------------------------------------------*
 * Page Load Functionality
 *----------------------------------------------------------------------------*/

(function($) {
	"use strict";

	$(function() {

		toggleSocialIconVisibility( $, '#email', 'mayer_email_address' );
		toggleSocialIconVisibility( $, '#twitter', 'mayer_twitter_username' );
		toggleSocialIconVisibility( $, '#facebook', 'mayer_facebook_url' );
		toggleSocialIconVisibility( $, '#pinterest', 'mayer_pinterest_url' );
		toggleSocialIconVisibility( $, '#google-plus', 'mayer_googleplus_url' );

	});

}(jQuery));