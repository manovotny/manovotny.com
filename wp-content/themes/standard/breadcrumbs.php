<?php 
if( function_exists( 'yoast_breadcrumb' ) ) {

	yoast_breadcrumb( '', '' );

} else {

	$options = get_option( 'standard_theme_general_options ' );
	if( 'on' == $options['display_breadcrumbs'] ) {
		if( '' !== get_the_ID() ) {
			echo Standard_Breadcrumbs::get_breadcrumb_trail( get_the_ID() );
		} // end if
	} // end if
 
} // end if
?>