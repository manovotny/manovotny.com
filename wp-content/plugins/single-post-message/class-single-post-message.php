<?php
/**
 * Single Post Message
 *
 * @package   Single_Post_Message
 * @author    Tom McFarlin <tom@tommcfarlin.com>
 * @license   GPL-2.0+
 * @link      http://tommcfarlin.com/category-sticky-post/
 * @copyright 2012 - 2015 Tom McFarlin
 */
class Single_Post_Message {

	/*--------------------------------------------*
	 * Attributes
	 *--------------------------------------------*/

	/**
	 * We write these out inline so that it is also styled in RSS readers
	 *
	 * @since    1.0.0
	 *
	 * @var      string
	 */
	private $styles = 'background-color:#fcf8e3;border:1px solid #fbeed5;border-radius:4px;-moz-border-radius:4px;-webkit-border-radius:4px;margin-bottom:18px;margin:8px 0 8px 0;color:#c09853;padding:12px;text-shadow:0 1px 0 rgba(255, 255, 255, 0.5);font-family:Arial,Sans-serif;font-size:12px;';

	/**
	 * Instance of this class.
	 *
	 * @since    1.2.0
	 *
	 * @var      object
	 */
	protected static $instance = null;

	/*--------------------------------------------*
	 * Constructor
	 *--------------------------------------------*/

	/**
	 * Return an instance of this class.
	 *
	 * @since     2.0.0
	 *
	 * @return    object    A single instance of this class.
	 */
	public static function get_instance() {

		// If the single instance hasn't been set, set it now.
		if ( null == self::$instance ) {
			self::$instance = new self;
		} // end if

		return self::$instance;

	} // end get_instance

	/**
	 * Initializes the plugin by setting localization, admin styles, and content filters.
	 */
	private function __construct() {

		// Load plugin textdomain
		add_action( 'init', array( $this, 'plugin_textdomain' ) );

		// Include admin styles
		add_action( 'admin_print_styles', array( $this, 'add_admin_styles' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'add_admin_scripts' ) );

		// Add the post meta box to the post editor
		add_action( 'add_meta_boxes', array( $this, 'add_notice_metabox' ) );
		add_action( 'save_post', array( $this, 'save_notice' ) );

		// Append the notice before the content in both the blog and in the feed.
	    add_filter( 'the_content', array( $this, 'prepend_single_post_message' ) );

	} // end constructor

	/*--------------------------------------------*
	 * Core Functions
	 *---------------------------------------------*/

	 /**
	  * Loads the plugin textdomain.
	  */
	 function plugin_textdomain() {
		 load_plugin_textdomain( 'single-post-message', false, dirname( plugin_basename( __FILE__ ) ) . '/lang' );
	 } // end plugin_textdomain

	/**
 	 * Introduces the admin styles
 	 */
 	 function add_admin_styles() {
	 	 wp_enqueue_style( 'single-post-message', plugins_url() . '/single-post-message/css/admin.css' );
 	 } // end add_admin_styles

	/**
 	 * Introduces the admin scripts
 	 */
 	 function add_admin_scripts() {
	 	 wp_enqueue_script( 'single-post-message', plugins_url() . '/single-post-message/js/admin.min.js' );
 	 } // end add_admin_styles

	/**
	 * Adds the meta box below the post content editor on the post edit dashboard.
	 */
	 function add_notice_metabox() {

		add_meta_box(
			'single_post_message',
			__( 'Post Message', 'single-post-message' ),
			array( $this, 'single_post_message_display' ),
			'post',
			'normal',
			'high'
		);

	} // end add_notice_metabox

	/**
	 * Renders the nonce and the textarea for the notice.
	 */
	function single_post_message_display( $post ) {

		wp_nonce_field( plugin_basename( __FILE__ ), 'single_post_message_nonce' );

		// The textfield and preview area
		$html = '<textarea id="single-post-message" name="single_post_message" placeholder="' . __( 'Enter your post message here. HTML accepted.', 'single-post-message' ) . '">' . get_post_meta( $post->ID, 'single_post_message', true ) . '</textarea>';

		$html .= '<p id="single-post-message-preview">';

			if( '' == ( $post_message = get_post_meta( get_the_ID(), 'single_post_message', true ) ) ) {
				$html .= '<span id="single-post-message-default">' . __( 'Your post message preview will appear here.', 'single-post-message' ) . '</span>';
			} else {
				$html .= $post_message;
			} // end if/else

		$html .= '</p><!-- /#single-post-message-preview -->';

		// The position element
		$post_message_position = get_post_meta( $post->ID, 'single_post_message_position', true );

		$html .= __( 'Display this message ', 'single-post-message' );
		$html .= '<select id="single_post_message_position" name="single_post_message_position">';
			$html .= '<option value="above"' . selected( 'above', $post_message_position, false ) . '>' . __( 'above the post content.', 'single-post-message' ) . '</option>';
			$html .= '<option value="below"' . selected( 'below', $post_message_position, false ) . '>' . __( 'below the post content.', 'single-post-message' ) . '</option>';
		$html .= '</select>';

		echo $html;

	} // end standard_notice_display

	/**
	 * Saves the notice for the given post.
	 *
	 * @params	$post_id	The ID of the post that we're serializing
	 */
	function save_notice( $post_id ) {

		if( isset( $_POST['single_post_message_nonce'] ) && isset( $_POST['post_type'] ) ) {

			// Don't save if the user hasn't submitted the changes
			if( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
				return;
			} // end if

			// Verify that the input is coming from the proper form
			if( ! wp_verify_nonce( $_POST['single_post_message_nonce'], plugin_basename( __FILE__ ) ) ) {
				return;
			} // end if

			// Make sure the user has permissions to post
			if( 'post' == $_POST['post_type']) {
				if( ! current_user_can( 'edit_post', $post_id ) ) {
					return;
				} // end if
			} // end if/else

			// Read the post message and its position
			$post_message = isset( $_POST['single_post_message'] ) ? $_POST['single_post_message'] : '';
			$post_message_position = isset( $_POST['single_post_message_position'] ) ? $_POST['single_post_message_position'] : 'above';

			// If the value for the post message exists, delete it first. I don't want to write extra rows into the table.
			if ( 0 == count( get_post_meta( $post_id, 'single_post_message' ) ) ) {
				delete_post_meta( $post_id, 'single_post_message' );
			} // end if

			// Update it for this post.
			update_post_meta( $post_id, 'single_post_message', $post_message );
			update_post_meta( $post_id, 'single_post_message_position', $post_message_position );

		} // end if

	} // end save_notice

	/**
 	 * Prepends the content with the notice, if specified.
 	 *
 	 * @params	$content	The post content.
 	 * @returns				The post content with the prepended notice (if specified).
	 */
	function prepend_single_post_message( $content ) {

    	// If there is a notice, prepend it to the content
    	if( '' != get_post_meta( get_the_ID(), 'single_post_message', true ) ) {

	    	$post_message = '<p style="' . $this->styles . '" class="single-post-message">';
	    		$post_message .= get_post_meta( get_the_ID(), 'single_post_message', true );
	    	$post_message .= '</p><!-- /.single-post-message -->';

	    	if( 'below' == get_post_meta( get_the_ID(), 'single_post_message_position', true ) ) {

	    		if( is_single() ) {
				    $content = $content . $post_message;
				} // end if

			} else {
				$content = $post_message . $content;
			} // end if/else

    	} // end if

    	return $content;

	} // end prepend_post_message

} // end class