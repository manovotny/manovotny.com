<?php



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
	// theme
	wp_register_style( 'man-styles', get_template_directory_uri() . '/css/theme.css' );
	wp_enqueue_style( 'man-styles' );		
}

add_action( 'wp_print_styles', 'man_print_styles' );



?>