<?php
/*
Plugin Name: Standard Sticky Footer
Plugin URI: https://github.com/eightbit/plugins/tree/master/standard-sticky-footer
Description: Forces the footer to stick the bottom of the browser window, if there is not enough content to fill the screen.
Version: 1.0.2
Author: Michael Novotny
Author URI: http://manovotny.com
Author Email: michael@8bit.io
License: GNU General Public License v3.0 or later
License URI: http://www.gnu.org/licenses/gpl-3.0.html
*/


/*
/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\ CONTENTS /\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\/\

	1. Constructor
	2. Filters
	4. Instantiation

/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\//\/\/\/\/\/\/\/\/\/\
*/


class Standard_Sticky_Footer {
	 
	/* Constructor
	---------------------------------------------------------------------------------- */
	
	/**
	 * Initializes the plugin by setting localization, filters, and administration 
	 * functions.
	 */
	 
	function __construct() {
		
		// register scripts and styles
		add_action( 'wp_enqueue_scripts', array( &$this, 'standard_sticky_footer_enqueue_scripts' ), 11 );
		
	} // end constructor
	
	
	/* Filters
	---------------------------------------------------------------------------------- */
	
	/**
	 * Registers and enqueues plugin-specific scripts and styles.
	 */
	public function standard_sticky_footer_enqueue_scripts() {
		
		// plugin scripts
		wp_register_script( 'standard-sticky-footer-script', plugins_url( 'standard-sticky-footer/js/plugin.js' ) );
		wp_enqueue_script( 'standard-sticky-footer-script' );
		
		// plugin styles
		wp_register_style( 'standard-sticky-footer-style', plugins_url( 'standard-sticky-footer/css/plugin.css' ) );
		wp_enqueue_style( 'standard-sticky-footer-style' );
		
	} // end standard_sticky_footer_enqueue_scripts
  
  
} // end class


/* Instantiation
---------------------------------------------------------------------------------- */

new Standard_Sticky_Footer();


?>