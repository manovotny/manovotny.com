<?php



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