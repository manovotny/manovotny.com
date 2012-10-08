<?php
/**
 * 468x60 is a widget for displaying a single 468x60 ad in the widgetized
 * area in Standard header.
 *
 * version 1.0
 */
class Standard_Ad_468x60 extends WP_Widget {

	/*--------------------------------------------------------*
	 * Constructor
	 *--------------------------------------------------------*/
	 
	public function __construct() {

		$widget_opts = array(
			'classname' 	=> __( 'standard-ad-billboard', 'standard' ), 
			'description' 	=> __( 'Display a 468x60 advertisement.', 'standard' )
		);	
		$this->WP_Widget( 'standard-ad-468x60', __( '468x60 Ad', 'standard' ), $widget_opts );
		
		// We don't want to load these on the Appearance Options because we're overiding window.send_to_editor there, too.
		global $pagenow;
		if( 'themes.php' != $pagenow ) {
		
			add_action( 'admin_print_styles', array( &$this, 'register_admin_styles' ) );
			add_action( 'admin_enqueue_scripts', array( &$this, 'register_admin_scripts' ) );
			add_action( 'wp_enqueue_scripts', array( &$this, 'register_widget_styles' ) );
			
		} // end if
		
	} // end constructor

	/*--------------------------------------------------------*
	 * API Functions
	 *--------------------------------------------------------*/
	 
	/**
	 * Outputs the content of the widget.
	 *
	 * @args			The array of form elements
	 * @instance
	 */
	public function widget( $args, $instance ) {
	
		extract( $args, EXTR_SKIP );
	
		$ad_src = empty( $instance['ad_src'] ) ? '' : apply_filters( 'ad_src', $instance['ad_src'] );
		$ad_url = empty( $instance['ad_url'] ) ? '' : apply_filters( 'ad_url', $instance['ad_url'] );
		
		// Display the widget
		include( plugin_dir_path( __FILE__ ) .  'views/widget.php' );
		
	} // end widget
	
	/**
	 * Processes the widget's options to be saved.
	 *
	 * @new_instance	The previous instance of values before the update.
	 * @old_instance	The new instance of values to be generated via the update.
	 */
	public function update( $new_instance, $old_instance ) {
		
		$instance = $old_instance;

		$instance['ad_src'] = strip_tags( stripslashes( $new_instance['ad_src'] ) );
		$instance['ad_url'] = strip_tags( stripslashes( $new_instance['ad_url'] ) );
		
		return $instance;
		
	} // end widget
	
	/**
	 * Generates the administration form for the widget.
	 *
	 * @instance	The array of keys and values for the widget.
	 */
	public function form( $instance ) {

		$instance = wp_parse_args(
			(array)$instance,
			array(
				'ad_src' 	=> '',
				'ad_url'	=> ''
			)
		);
    
		$ad_src = esc_url( $instance['ad_src'] );
		$ad_url = esc_url( $instance['ad_url'] );
    
		// Display the admin form
		include( plugin_dir_path( __FILE__ ) .  'views/admin.php' );
		
	} // end form

	/*--------------------------------------------------------*
	 * Helper Functions
	 *--------------------------------------------------------*/

	/** 
	 * Registers and Enqueues the stylesheets for the Media Uploader and this widget.
	 */
	public function register_admin_styles() {
	
		wp_enqueue_style( 'thickbox' );
		
		wp_register_style( 'standard-ad-468x60', get_template_directory_uri() . '/lib/standard-ad-billboard/css/admin.css' );
		wp_enqueue_style( 'standard-ad-468x60' );
		
	} // end register_admin_styles

	/** 
	 * Registers and Enqueues the JavaScript sources for the Media Uploader and this widget.
	 */
	public function register_admin_scripts() {
	
		$screen = get_current_screen();

		if( 'widgets' == $screen->id ) {
	
			// media uploader
			wp_enqueue_script('media-upload');
			
			// thickbox for overlay
			wp_enqueue_script('thickbox');
	
			// admin
			wp_register_script( 'standard-ad-468x60', get_template_directory_uri() . '/lib/standard-ad-billboard/js/admin.js', array( 'jquery', 'media-upload','thickbox') );
			wp_enqueue_script( 'standard-ad-468x60' );
		
		} // end if
		
	} // end register_admin_scripts

	/** 
	 * Registers and Enqueues the stylesheets for the public-facing widget.
	 */
	public function register_widget_styles() {

		wp_register_style( 'standard-ad-468x60', get_template_directory_uri() . '/lib/standard-ad-billboard/css/widget.css' );
		wp_enqueue_style( 'standard-ad-468x60' );
		
	} // end register_admin_styles

} // end class
add_action( 'widgets_init', create_function( '', 'register_widget( "Standard_Ad_468x60" );' ) ); 
?>