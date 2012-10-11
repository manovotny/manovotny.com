<?php


/* WordPress Hooks
---------------------------------------------------------------------------------- */

/**
 * Enqueueing scripts and styles.
 */
 
function man_enqueue_scripts() {
	
	// Standard.
	wp_register_style( 'standard-style', get_template_directory_uri() . '/style.css' );
	wp_enqueue_style( 'standard-style' );
	
	// Theme.
	wp_register_style( 'theme-style', get_stylesheet_directory_uri() . '/css/theme.css');
	wp_enqueue_style( 'theme-style' );

} // end man_enqueue_scripts

add_action( 'wp_enqueue_scripts', 'man_enqueue_scripts', 10000 );


?>