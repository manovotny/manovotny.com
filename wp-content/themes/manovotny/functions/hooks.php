<?php



/**
 * Enqueueing scripts.
 */

function man_enqueue_scripts()
{	
	// jquery
	wp_enqueue_script( 'jquery' );
	
	// tipsy
	wp_register_script( 'tipsy-script', get_template_directory_uri() . '/lib/tipsy/jquery.tipsy.js', false, false, true );
	wp_enqueue_script( 'tipsy-script' );
	
	// theme
	wp_register_script( 'ige-script', get_template_directory_uri() . '/js/theme.js', false, false, true );
	wp_enqueue_script( 'ige-script' );
}

add_action( 'wp_enqueue_scripts', 'man_enqueue_scripts' );



/**
 * Loads header items (ie. favicon, meta tags, link tags, etc.).
 */
 
function man_head()
{
	_e( '<link rel="shortcut icon" href="' . man_get_image( 'favicon.png', true ) . '" />' . "\n" );
}

add_action( 'wp_head', 'man_head' );



/**
 * Enqueueing styles.
 */
 
function man_print_styles() 
{
	// tipsy
	wp_register_style( 'tipsy-styles', get_template_directory_uri() . '/lib/tipsy/tipsy.css' );
	wp_enqueue_style( 'tipsy-styles' );
	
	// theme
	wp_register_style( 'man-styles', get_template_directory_uri() . '/css/theme.css' );
	wp_enqueue_style( 'man-styles' );		
}

add_action( 'wp_print_styles', 'man_print_styles' );



?>