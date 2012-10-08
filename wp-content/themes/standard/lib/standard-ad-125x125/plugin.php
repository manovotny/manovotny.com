<?php
/**
 * 125x125 is a widget for displaying a single 125x125 ad in any widgetized
 * area in Standard.
 *
 * version 1.0
 */
class Standard_Ad_125x125 extends WP_Widget {

	/*--------------------------------------------------------*
	 * Constructor
	 *--------------------------------------------------------*/
	 
	public function __construct() {

		$widget_opts = array(
			'classname' 	=> __( 'standard-ad-125x125', 'standard' ), 
			'description' 	=> __( 'Display a 125x125 advertisement.', 'standard' ),
		);	
		$this->WP_Widget( 'standard-ad-125x125', __( '125x125 Ad', 'standard' ), $widget_opts );
		
		// We don't want to load these on the Appearance Options because we're overiding window.send_to_editor there, too.
		global $pagenow;
		if( 'themes.php' != $pagenow ) {
		
			add_action( 'admin_print_styles', array( &$this, 'register_admin_styles' ) );
			add_action( 'admin_enqueue_scripts', array( &$this, 'register_admin_scripts' ) );
			
		} // end if
		
		add_action( 'wp_enqueue_scripts', array( &$this, 'register_widget_styles' ) );
		
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
		
		// advertisement 1
		$ad1_src = empty( $instance['ad1_src']) ? '' : apply_filters( 'ad1_src', $instance['ad1_src'] );
		$ad1_url = empty( $instance['ad1_url']) ? '' : apply_filters( 'ad1_url', $instance['ad1_url'] );

		// advertisement 2
		$ad2_src = empty( $instance['ad2_src']) ? '' : apply_filters( 'ad2_src', $instance['ad2_src'] );
		$ad2_url = empty( $instance['ad2_url']) ? '' : apply_filters( 'ad2_url', $instance['ad2_url'] );
		
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

		// advertisement 1
		$instance['ad1_src'] = strip_tags( stripslashes( $new_instance['ad1_src'] ) );
		$instance['ad1_url'] = strip_tags( stripslashes( $new_instance['ad1_url'] ) );

		// advertisement 2
		$instance['ad2_src'] = strip_tags( stripslashes( $new_instance['ad2_src'] ) );
		$instance['ad2_url'] = strip_tags( stripslashes( $new_instance['ad2_url'] ) );
		
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
				'ad1_src' 	=> 	'',
				'ad1_url'	=> 	'',
				'ad2_src' 	=> 	'',
				'ad2_url'	=>	''
			)
		);
    
    	// advertising 1
		$ad1_src = esc_url( $instance['ad1_src'] );
		$ad1_url = esc_url( $instance['ad1_url'] );

    	// advertising 2
		$ad2_src = esc_url( $instance['ad2_src'] );
		$ad2_url = esc_url( $instance['ad2_url'] );
    
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
		
		wp_register_style( 'standard-ad-125x125', get_template_directory_uri() . '/lib/standard-ad-125x125/css/admin.css' );
		wp_enqueue_style( 'standard-ad-125x125' );
		
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
			wp_register_script( 'standard-ad-125x125', get_template_directory_uri() . '/lib/standard-ad-125x125/js/admin.js', array( 'jquery', 'media-upload','thickbox') );
			wp_enqueue_script( 'standard-ad-125x125' );
		
		} // end if 
		
	} // end register_admin_scripts
	
	/** 
	 * Registers and Enqueues the stylesheets for this widget.
	 */
	public function register_widget_styles() {

		wp_register_style( 'standard-ad-125x125-widget', get_template_directory_uri() . '/lib/standard-ad-125x125/css/widget.css' );
		wp_enqueue_style( 'standard-ad-125x125-widget' );

	} // end register_widget_styles

} // end class
add_action( 'widgets_init', create_function( '', 'register_widget( "Standard_Ad_125x125" );' ) ); 
?>