/**
 * If the sidebar is in the large desktop view, set it's background color.
 *
 * @param      $        A reference to the jQuery function
 * @package    Mayer
 * @subpackage js
 * @version    1.0.0
 * @since      1.0.0
 */
function setSidebar( $ ) {
	"use strict";

	if ( ( window.location !== window.parent.location ) || ( 992 < $('#primary-wrapper').width() && $( '#sidebar').height() <= $( '#main' ).height() ) ) {

		$( '#sidebar' )
			.height( $( '#main' ).height() );

	} else if ( $('#sidebar').height() > $( '#main' ).height() ) {

		$( '#sidebar' )
			.height( 'auto' );

	} else {

		$( '#sidebar' )
			.height( 'auto' );

	} // end if

} // end setSidebar

/**
 * Applies the necessary elements and class names to elements whenever the
 * page loads.
 *
 * @package    Mayer
 * @subpackage js
 * @version    1.0.0
 * @since      1.0.0
 */
(function($) {
	"use strict";

	var $stickyWrapper, $stickyBanner;

	/**
	 * If a sticky post exists, then this applies a ribbon to the sticky post
	 */
	$(function() {

		if ( 'rtl' === $( 'html' ).attr( 'dir' ) ) {
			return;
		} // end if

		if ( 0 < $( '.sticky' ).length ) {

			$stickyWrapper = $( '<div />' ).addClass( 'sticky-wrapper sticky-wrapper' );
			$stickyBanner = $( '<div />' ).addClass( 'sticky-ribbon' ).text( 'Sticky' );
			$stickyWrapper.append( $stickyBanner );

			$('.sticky').append( $stickyWrapper );

		} // end if

		$( 'body' ).fitVids();

		// This sets the sidebar's height equal to that of the main container's.
		// Note that the scroll implementation is a @TODO until something more
		// elegant comes along. The main reason for this is because oEmbed's
		// cause a calculation to be wrong until they've loaded.
		$( window ).resize(function() {

			if ( ( window.location === window.parent.location ) ) {
				setSidebar( $ );
			} // end if

		}).scroll(function() {

			if ( ( window.location === window.parent.location ) ) {
				setSidebar( $ );
			} // end if

		}).load(function() {
			if ( ( window.location === window.parent.location ) ) {
				setSidebar( $ );
			} // end if
		});

	});

}(jQuery));