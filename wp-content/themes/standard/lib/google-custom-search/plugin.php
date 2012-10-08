<?php

/**
 * Google Custom Search is a widget that aims to make it easy to add a Google Custom Search
 * box to any widgetized area of your blog.
 *
 * version 1.0
 */
class Google_Custom_Search extends WP_Widget {

	/*--------------------------------------------------------*
	 * Constructor
	 *--------------------------------------------------------*/
	 
	function __construct() {

		$widget_opts = array(
			'classname' 	=> __( 'standard-google-custom-search', 'standard' ), 
			'description' 	=> __( 'Easily add Google Custom Search to your Standard-powered blog.', 'standard' )
		);	
		$this->WP_Widget( 'standard-google-custom-search', __( 'Google Custom Search', 'standard' ), $widget_opts );
		
		add_action( 'admin_print_styles', array( &$this, 'load_admin_stylesheets') );
		add_action( 'admin_enqueue_scripts', array( &$this, 'load_admin_scripts') );
		add_action( 'wp_enqueue_scripts', array( &$this, 'load_stylesheets' ) );
		
		// If this widget isn't active and our search results page exists, let's delete it
		if( is_active_widget( false, false, $this->id_base, true ) ) {
			$this->create_search_results_template();
		} else {
			$this->delete_search_results_template();
		} // end f
		
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
	function widget( $args, $instance ) {
	
		extract( $args, EXTR_SKIP );

		$gcse_content = empty( $instance['gcse_content'] ) ? '' : apply_filters( 'gcse_content', $instance['gcse_content'] );
    
		// Display the widget
		include( get_template_directory() . '/lib/google-custom-search/views/widget.php' );
		
	} // end widget
	
	/**
	 * Processes the widget's options to be saved.
	 *
	 * @new_instance	The previous instance of values before the update.
	 * @old_instance	The new instance of values to be generated via the update.
	 */
	function update( $new_instance, $old_instance ) {
		
		$instance = $old_instance;

		$instance['gcse_content'] = $new_instance['gcse_content'];
		
		return $instance;
		
	} // end widget
	
	/**
	 * Generates the administration form for the widget.
	 *
	 * @instance	The array of keys and values for the widget.
	 */
	function form( $instance ) {

		$instance = wp_parse_args(
			(array)$instance,
			array(
				'gcse_content' 		=> ''
			)
		);

    	$gcse_content = esc_textarea( $instance['gcse_content'] );
   
		// Display the admin form
		include( get_template_directory() . '/lib/google-custom-search/views/admin.php' );
		
	} // end form
	
	/*--------------------------------------------------------*
	 * Helper Functions
	 *--------------------------------------------------------*/
	
	/**
	 * Loads the administrative stylesheets for the dashboard.
	 */
	function load_admin_stylesheets() {
		
		wp_register_style( 'gcse-admin', get_template_directory_uri() . '/lib/google-custom-search/css/admin.css' );
		wp_enqueue_style( 'gcse-admin' );
		
	} // end load_stylesheets
	
	/**
	 * Loads the administrative JavaScripts for the dashboard.
	 */
	function load_admin_scripts() {
		
		wp_register_script( 'gcse-admin', get_template_directory_uri() . '/lib/google-custom-search/js/admin.js' );
		wp_enqueue_script( 'gcse-admin' );
		
	} // end load_stylesheets
	
	/**
	 * Loads the stylesheets for the sidebar and the page template.
	 */
	function load_stylesheets() {
		
		wp_register_style( 'gcse-widget', get_template_directory_uri() . '/lib/google-custom-search/css/widget.css' );
		wp_enqueue_style( 'gcse-widget' );
		
	} // end load_stylesheets
	
	/**
	 * Creates the search results page that will be used to render the results based on the search.
	 * If a page with the 'Search Results' slug already exists, an error will be thrown.
	 */
	private function create_search_results_template() {

		if( 0 == count( get_page_by_path( 'search-results' ) ) ) { 

			// Get the current user
			$current_user = wp_get_current_user();
			
			// Create the page
			$page_id = wp_insert_post(	
				array(
					'comment_status'	=>	'closed',
					'ping_status'		=>	'closed',
					'post_author'		=>	$current_user->ID,
					'post_name'			=>	'search-results',
					'post_title'		=>	__( 'Search Results', 'standard' ),
					'post_status'		=>	'publish',
					'post_type'			=>	'page',
					'post_content'		=>	file_get_contents( get_template_directory_uri() . '/lib/google-custom-search/lib/Standard_Google_Custom_Search.template.php' )
				)
			);
			
			// If the value exists, delete it first. I don't want to write extra rows into the table.
			if ( 0 == count( get_post_meta( $page_id, 'standard_google_custom_search' ) ) ) {
				delete_post_meta( $page_id, 'standard_google_custom_search' );
			} // end if
			
			// Mark that this post was created by Standard
			update_post_meta( $page_id, 'standard_google_custom_search', true );

		} else {
		
			add_action( 'admin_notices', array( &$this, 'existing_search_results_template' ) );
		
		} // end if
		
	} // end create_search_results_template
	
	/**
	 * Deletes the search results page when the widget is no longer active.
	 */
	public function delete_search_results_template() {

		$query = new WP_Query('post_type=page&meta_key=standard_google_custom_search');
		if( $query->have_posts() ) {
		
			$query->the_post();
			wp_delete_post( get_the_ID(), true );
			
			wp_reset_postdata();
			
		} // end
		
	} // end delete_search_results_template
	
	/**
	 * Renders a notification if the user already has an existing search results template.
	 */
	public function existing_search_results_template() {
		
		$page_id = get_page_by_path( 'search-results' )->ID;
		
		if( 'widgets' == get_current_screen()->id ) {
		
			if( 1 != get_post_meta( $page_id, 'standard_google_custom_search', true ) ) {
			
				echo '<div id="standard-gcse-template-exists-notification" class="updated"><p>' . __( 'Could not configure Google Custom Search widget because the required "search-results" permalink is already in use. Please rename <a href="post.php?post=' . $page_id . '&action=edit">the existing page\'s permalink</a>, or <a href="post.php?post=' . $page_id . '&action=edit">delete the page</a>, and try again.', 'standard') . '</p></div>';
			
			} // end if
			
		} else if( 'page' == get_current_screen()->id && 1 == get_post_meta( $page_id, 'standard_google_custom_search', true ) && $_GET['post'] == $page_id ) {
		
				echo '<div id="standard-gcse-template-notification" class="updated"><p>' . __( 'This page was generated by Standard for use with the Google Custom Search widget. <a href="widgets.php">Remove the widget</a> from all sidebar to delete this page.', 'standard') . '</p></div>';	

		} // end if		
		
	} // end existing_search_results_template

} // end class
add_action( 'widgets_init', create_function( '', 'register_widget( "Google_Custom_Search" );' ) ); 

?>