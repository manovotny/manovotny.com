<?php
/**
 * Implementation of the Mayer Theme Customizer.
 *
 * @package    Mayer
 * @version    1.1.0
 * @since      1.0.0
 */

/*------------------------------------------------------------------*
 * Public Functions
/*------------------------------------------------------------------*/

/**
 * Introduces the fields for the Twitter username, Facebook URL, Pinterest URL, and Google+ URL
 * into the Theme Customizer
 *
 * @param    object    $wp_customizer    A reference to the WordPress Theme Customizer
 * @version  1.0.0
 * @since    1.0.0
 */
function mayer_theme_customizer( $wp_customizer ) {

	// Theme options
	$wp_customizer->add_section(
		'mayer_theme_options',
		array(
			'title'     =>  __( 'Theme', 'mayer' ),
			'priority'  => 300
		)
	);

	_mayer_add_email_address( $wp_customizer );
	_mayer_add_twitter_username( $wp_customizer );
	_mayer_add_facebook_url( $wp_customizer );
	_mayer_add_pinterest_url( $wp_customizer );
	_mayer_add_googleplus_url( $wp_customizer );

} // end mayer_theme_customizer
add_action( 'customize_register', 'mayer_theme_customizer' );

/*------------------------------------------------------------------*
 * Private Functions
/*------------------------------------------------------------------*/

/**
 * Adds a setting and a control for the author's email address.
 *
 * @param    object    $wp_customizer    A reference to the WordPress Theme Customizer
 * @version  1.0.0
 * @since    1.1.0
 */
function _mayer_add_email_address( $wp_customizer ) {


	$wp_customizer->add_setting(
		'mayer_email_address',
		array(
			'default'           => '',
			'transport'         => 'postMessage',
			'sanitize_callback' => 'sanitize_email'
		)
	);

	$wp_customizer->add_control(
		'mayer_email_address',
		array(
			'section'  =>  'mayer_theme_options',
			'label'    => __( 'Email Address', 'mayer' ),
			'type'     => 'text'
		)
	);


} // end _mayer_add_email_address

/**
 * Adds a setting and a control for the Twitter username.
 *
 * @param    object    $wp_customizer    A reference to the WordPress Theme Customizer
 * @version  1.0.0
 * @since    1.0.0
 */
function _mayer_add_twitter_username( $wp_customizer ) {


	$wp_customizer->add_setting(
		'mayer_twitter_username',
		array(
			'default'           => '',
			'transport'         => 'postMessage',
			'sanitize_callback' => 'sanitize_title_with_dashes'
		)
	);

	$wp_customizer->add_control(
		'mayer_twitter_username',
		array(
			'section'  =>  'mayer_theme_options',
			'label'    => __( 'Twitter Username (without "@")', 'mayer' ),
			'type'     => 'text'
		)
	);


} // end _mayer_add_twitter_username

/**
 * Adds a setting and a control for the Facebook username.
 *
 * @param    object    $wp_customizer    A reference to the WordPress Theme Customizer
 * @version  1.0.0
 * @since    1.0.0
 */
function _mayer_add_facebook_url( $wp_customizer ) {

	$wp_customizer->add_setting(
		'mayer_facebook_url',
		array(
			'default'           => '',
			'transport'         => 'postMessage',
			'sanitize_callback' => 'esc_url_raw'
		)
	);

	$wp_customizer->add_control(
		'mayer_facebook_url',
		array(
			'section'  =>  'mayer_theme_options',
			'label'    => __( 'Facebook URL', 'mayer' ),
			'type'     => 'text'
		)
	);


} // end _mayer_add_facebook_url

/**
 * Adds a setting and a control for the Pinterest URL
 *
 * @param    object    $wp_customizer    A reference to the WordPress Theme Customizer
 * @version  1.0.0
 * @since    1.0.0
 */
function _mayer_add_pinterest_url( $wp_customizer ) {

	$wp_customizer->add_setting(
		'mayer_pinterest_url',
		array(
			'default'           => '',
			'transport'         => 'postMessage',
			'sanitize_callback' => 'esc_url_raw'
		)
	);

	$wp_customizer->add_control(
		'mayer_pinterest_url',
		array(
			'section'  =>  'mayer_theme_options',
			'label'    => __( 'Pinterest URL', 'mayer' ),
			'type'     => 'text'
		)
	);

} // end _mayer_add_pinterest_url

/**
 * Adds a setting and a control for the Google+ username.
 *
 * @param    object    $wp_customizer    A reference to the WordPress Theme Customizer
 * @version  1.0.0
 * @since    1.0.0
 */
function _mayer_add_googleplus_url( $wp_customizer ) {

	$wp_customizer->add_setting(
		'mayer_googleplus_url',
		array(
			'default'           => '',
			'transport'         => 'postMessage',
			'sanitize_callback' => 'esc_url_raw'
		)
	);

	$wp_customizer->add_control(
		'mayer_googleplus_url',
		array(
			'section'  =>  'mayer_theme_options',
			'label'    => __( 'Google+ URL', 'mayer' ),
			'type'     => 'text'
		)
	);

} // end _mayer_add_googleplus_url