<?php



//--------------------------------------------------------------------------------
//  CORE FUNCTIONS
//--------------------------------------------------------------------------------

//require_once( get_template_directory() . '/core/analytics.php' );
//require_once( get_template_directory() . '/core/css_browser_selector.php' );
//require_once( get_template_directory() . '/core/core.php' );
//require_once( get_template_directory() . '/core/get_the_image.php' );
//require_once( get_template_directory() . '/core/wordpress.php' );



//--------------------------------------------------------------------------------
//  WORDPRESS HOOKS
//--------------------------------------------------------------------------------


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
	wp_register_script( 'theme-script', get_template_directory_uri() . '/js/theme.js', false, false, true );
	wp_enqueue_script( 'theme-script' );
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
	// wordpress
	wp_register_style( 'wordpress-styles', get_template_directory_uri() . 'style.css' );
	wp_enqueue_style( 'wordpress-styles' );
	
	// theme
	wp_register_style( 'theme-styles', get_template_directory_uri() . '/css/theme.css' );
	wp_enqueue_style( 'theme-styles' );
	
	// tipsy
	wp_register_style( 'tipsy-styles', get_template_directory_uri() . '/lib/tipsy/tipsy.css' );
	wp_enqueue_style( 'tipsy-styles' );
}

add_action( 'wp_print_styles', 'man_print_styles' );



//--------------------------------------------------------------------------------
//  THEME FUNCTIONS
//--------------------------------------------------------------------------------


/**
 * Convenience function to get theme images.
 */

function man_get_image( $image, $return = false, $sub_dirs = '' ) 
{
	// set image url
	$image_url = get_template_directory_uri() . '/images/' . $sub_dirs . $image;
	
	// check return
	if ( $return )
	{
		// return image url
		return $image_url;
	}

	// echo image url
	_e( $image_url );
}



/**
 * Renders copyright.
 */
 
function man_copyright()
{
	_e( 'Copyright &copy;' . ' ' . date( 'Y' ) . ' ' . get_bloginfo() . '. All rights reserved.' );
}



?>