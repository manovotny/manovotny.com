<?php

/*------------------------------------------------------------------*
 * Constants
/*------------------------------------------------------------------*/

/**
 * Track the version of the theme for use throughout the code.
 * Especially for cache-busting JavaScripts and stylesheets.
 *
 * @package    Mayer
 * @version    1.2.0
 * @since      1.0.0
 */
if ( ! defined('MAYER_VERSION' ) ) {
	define( 'MAYER_VERSION', '1.2.0' );
} // end if

/*------------------------------------------------------------------*
 * Dependencies
/*------------------------------------------------------------------*/

require_once( get_template_directory() . '/inc/theme-customizer.php' );
require_once( get_template_directory() . '/inc/mayer-nav-walker.class.php' );
require_once( get_template_directory() . '/inc/helpers.php' );

/*------------------------------------------------------------------*
 * Core Theme Features
/*------------------------------------------------------------------*/

/**
 * Set, in pixels, the content width based on the theme's design
 * and stylesheet
 *
 * @package    Mayer
 * @version    1.0.0
 * @since      1.0.0
 */
if ( ! isset( $content_width ) ) {
	$content_width = 740;
} // end if

/**
 * Loads the editor style so that what the user writes in TinyMCE is as what
 * will appear on the front end.
 *
 * @package    Mayer
 * @version    1.0.0
 * @since      1.0.0
 */
function mayer_load_editor_style() {
	add_editor_style( get_template_directory_uri() . '/css/editor-style.css' );
} // end mayer_load_editor_style
add_action( 'after_setup_theme', 'mayer_load_editor_style' );

/**
 * Prepares certain core features of the theme such as thumbnails and menus.
 *
 * @package    Mayer
 * @version    1.0.0
 * @since      1.0.0
 */
function mayer_setup() {

	// Define the theme's textdomain
	load_theme_textdomain( 'mayer', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	// Register the main menu
	register_nav_menu(
		'main',
	    __( 'Main Menu', 'mayer' )
	);

} // end mayer_setup
add_action( 'after_setup_theme', 'mayer_setup' );

/**
 * Registers the sidebar areas with the theme.
 *
 * @package    Mayer
 * @version    1.0.0
 * @since      1.0.0
 */
function mayer_widgets_init() {

	register_sidebar(
		array(
			'name'          => __( 'Sidebar', 'mayer' ),
			'id'            => 'sidebar-0',
			'description'   => __( 'The primary sidebar for the theme.', 'mayer' ),
			'before_widget' => '<div id="%1$s" class="widget %2$s">',
			'after_widget'  => '</div><!-- .widget -->',
			'before_title'  => '<h4 class="widget-title">',
			'after_title'   => '</h4>',
		)
	);

} // end mayer_widgets_init
add_action( 'widgets_init', 'mayer_widgets_init' );

/*------------------------------------------------------------------*
 * Core Theme Functions
/*------------------------------------------------------------------*/

/**
 * Enqueues all of the stylesheets required for the theme.
 *
 * @package    Mayer
 * @version    1.0.0
 * @since      1.0.0
 */
function mayer_import_styles() {

	// Include the libraries
	wp_enqueue_style( 'mayer-bootstrap', get_template_directory_uri() . '/css/lib/bootstrap.min.css', array(), MAYER_VERSION );
	wp_enqueue_style( 'mayer-font-awesome', get_template_directory_uri() . '/css/lib/font-awesome.min.css', array( 'mayer-bootstrap' ), MAYER_VERSION );

	// Include the Google Fonts in a custom font-compatible way
	$font_url = mayer_font_url( 'nunito' );
	if ( ! empty( $font_url ) ) {
		wp_enqueue_style( 'mayer-nunito', esc_url_raw( $font_url ), array(), MAYER_VERSION );
	} // end if

	$font_url = mayer_font_url( 'muli' );
	if ( ! empty( $font_url ) ) {
		wp_enqueue_style( 'mayer-muli', esc_url_raw( $font_url ), array(), MAYER_VERSION );
	} // end if

	$font_url = mayer_font_url( 'source-sans-pro' );
	if ( ! empty( $font_url ) ) {
		wp_enqueue_style( 'mayer-source-sans-pro', esc_url_raw( $font_url ), array(), MAYER_VERSION );
	} // end if

	// Include the main style sheet
	wp_enqueue_style( 'mayer', get_stylesheet_directory_uri() . '/style.css' );

} // end mayer_import_styles
add_action( 'wp_enqueue_scripts', 'mayer_import_styles' );

/**
 * Enqueues all of the JavaScript files required for the theme.
 *
 * @package    Mayer
 * @version    1.0.0
 * @since      1.0.0
 */
function mayer_import_scripts() {

	wp_enqueue_script( 'jquery' );
	wp_enqueue_script( 'mayer-bootstrap', get_template_directory_uri() . '/js/lib/bootstrap.min.js', array( 'jquery' ), MAYER_VERSION );
	wp_enqueue_script( 'mayer-fitvids', get_template_directory_uri() . '/js/lib/fitvids.min.js', array( 'mayer-bootstrap', 'jquery' ), MAYER_VERSION );
	wp_enqueue_script( 'mayer', get_template_directory_uri() . '/js/theme.min.js', array( 'jquery', 'mayer-bootstrap', 'mayer-fitvids' ), rand() );

	// If we're on a single post page with threaded comments nad open comments, add the comment-reply script
	if ( is_singular() && comments_open() && ( '1' === get_option('thread_comments') ) ) {
		wp_enqueue_script( 'comment-reply' );
	} // end if

} // end mayer_import_styles
add_action( 'wp_enqueue_scripts', 'mayer_import_scripts' );

/**
 * Registers the theme customizer with the theme so that it can be used to
 * customize the theme.
 *
 * @package    Mayer
 * @version    1.0.0
 * @since      1.0.0
 */
function mayer_customize_live_preview() {

	wp_enqueue_script(
	    'mayer-theme-customizer',
	    get_template_directory_uri() . '/js/theme-customizer.min.js',
	    array( 'jquery', 'customize-preview' ),
	    MAYER_VERSION,
	    true
	);

} // end mayer_import_admin_scripts
add_action( 'customize_preview_init', 'mayer_customize_live_preview' );

/**
 * Defines the custom comment template for the theme.
 *
 * @package    Mayer
 * @version    1.0.0
 * @since      1.0.0
 */
function mayer_comment( $comment, $args, $depth ) {

	$GLOBALS['comment'] = $comment;
	extract( $args, EXTR_SKIP );
	?>

	<div <?php comment_class( empty( $args['has_children'] ) ? '' : 'parent' ) ?> id="comment-<?php comment_ID(); ?>">
		<div class="response-body" id="div-comment-<?php comment_ID(); ?>">

			<div class="response-author vcard">

				<span class="avatar">
					<?php echo get_avatar( $comment, $args['avatar_size'] ); ?>
				</span><!-- .avatar -->

				<div class="response-meta-wrapper">
					<span class="response-meta">
						<?php printf( '<cite class="fn">%s</cite>', get_comment_author_link() ); ?>
						<a href="<?php echo htmlspecialchars( get_comment_link( $comment->comment_ID ) ) ?>">
							<?php printf( __( '%1$s at %2$s', 'mayer' ), get_comment_date(), get_comment_time() ); ?>
						</a>
						<?php edit_comment_link( __( 'Edit', 'mayer' ), '<div class="comment-edit-link-wrapper">', '</div>' ); ?>
					</span><!-- .response-meta -->
				</div><!-- .response-meta-wrapper -->

			</div><!-- .response-author -->

			<div class="response-text">
				<?php if ( '0' === $comment->comment_approved ) { ?>
					<div class="response-moderation-notice">
						<em class="response-awaiting-moderation">
							<?php _e( 'Your comment is awaiting moderation.', 'mayer' ); ?>
						</em><!-- .comment-awaiting-moderation -->
					</div><!-- .comment-moderation-notice -->
				<?php } // end if ?>
				<?php comment_text(); ?>
			</div><!-- .comment-text -->

			<div class="reply">
				<?php
					comment_reply_link(
						array_merge(
							$args,
							array(
								'add_below'    => 'comment',
								'depth'        => $depth,
								'max_depth'    => $args['max_depth']
							)
						)
					);
				?>
			</div><!-- .reply -->

		</div><!-- .comment-body -->
	</div><!-- #div-comment-<?php comment_ID(); ?>-->

	<?php
} // end mayer_comment

/**
 * Defines the custom pingback (that is, pings and trackbacks) template for the theme.
 *
 * @package    Mayer
 * @version    1.0.0
 * @since      1.0.0
 */
function mayer_pings( $comment, $args, $depth ) {

	$GLOBALS['comment'] = $comment;
	extract( $args, EXTR_SKIP );
	?>

	<div <?php comment_class( empty( $args['has_children'] ) ? '' : 'parent' ) ?> id="response-<?php comment_ID(); ?>">
		<div class="response-body" id="div-response-<?php comment_ID(); ?>">

			<div class="response-author">
				<div class="response-meta-wrapper">
					<span class="response-meta">
						<?php
							printf( '<cite class="fn">%s</cite>', get_comment_author_link() );
							printf( __( '%1$s at %2$s', 'mayer' ), get_comment_date(),  get_comment_time() );
						?>
					</span><!-- .response-meta -->
				</div><!-- .response-meta-wrapper -->
			</div><!-- .response-author -->

			<div class="response-text">
				<?php comment_text(); ?>
			</div><!-- .response-text -->

		</div><!-- .response-body -->
	</div><!-- #div-response-<?php comment_ID(); ?>-->

	<?php
} // end mayer_pings

/**
 * Defines the comment form template for both leaving a comment and leaving a reply.
 *
 * @package    Mayer
 * @version    1.0.0
 * @since      1.0.0
 */
function mayer_comment_form() {

	// Get the current commenter
	$commenter = wp_get_current_commenter();

	// Define the author, email, and url form fields
	$author = '<p>';
		$author .= '<input id="author" name="author" type="text" class="form-control" placeholder="' . __( 'Name', 'mayer' ) . '" value="' . esc_attr( $commenter['comment_author'] ) . '" size="30" aria-required="true" ' . '/>';
	$author .= '</p>';

	$email = '<p>';
		$email .= '<input id="email" name="email" type="text" class="form-control" placeholder="' . __( 'Email Address', 'mayer' ) . '" value="' . esc_attr( $commenter['comment_author_email'] ) . '" size="30" aria-required="true" ' . '/>';
	$email .= '</p>';

	$url = '<p>';
		$url .= '<input id="url" name="url" type="text" class="form-control" placeholder="' . __( 'Website', 'mayer' ) . '" value="' . esc_attr( $commenter['comment_author_url'] ) . '" size="30" />';
	$url .= '</p>';

	// Store them into an array
	$fields = array(
		'author' => $author,
		'email'  => $email,
		'url'    => $url
	);

	// Now, define the comment field
	$comment_field = '<textarea id="comment" name="comment" cols="45" rows="8" aria-required="true" class="form-control" placeholder="' . __( 'Comment', 'mayer' ) . '"></textarea>';

	// Next, define the 'Must Login' warning
	$must_login = '<p class="must-log-in">';
		$must_login .= sprintf(
							__( 'You must be <a href="%s">logged in</a> to post a comment.', 'mayer' ),
							wp_login_url( apply_filters( 'the_permalink', get_permalink() ) )
						);
	$must_login .= '</p>';

	// Logged in as...
	$logged_in_as = '<p class="logged-in-as">';
		$logged_in_as .= sprintf(
							__( 'Logged in as ', 'mayer' ) . '<a href="%1$s">%2$s</a>. <a href="%3$s" title="Log out of this account">' . __( 'Log out?', 'mayer' ) . '</a>',
							esc_url( admin_url( 'profile.php' ) ),
							wp_get_current_user()->user_nicename,
							esc_url( wp_logout_url( apply_filters( 'the_permalink', get_permalink( ) ) ) )
						);
	$logged_in_as .= '</p>';

	// Allowed Tags
	$comment_notes_after = '<p class="form-allowed-tags">';
		$comment_notes_after .= __( 'You may use these', 'mayer' ) . '&nbsp;<abbr title="HyperText Markup Language">' . __( 'HTML', 'mayer' ) . '</abbr>&nbsp;' . __( 'tags and attributes:', 'mayer' );
		$comment_notes_after .= '<pre>' . allowed_tags() . '</pre>';
	$comment_notes_after .= '</p><!-- .form-allowed-tags -->';

	$comment_notes_before = '<p class="form-required-fields">';
		$comment_notes_before .= __( 'Name and email address are required. Your email address will not be published.', 'mayer' );
	$comment_notes_before .= '</p><!-- .form-requiered-fields -->';

	// Finally, define the arguments for the form.
	$args = array(
		'fields'               =>  $fields,
		'comment_field'        =>  $comment_field,
		'must_log_in'          =>  $must_login,
		'logged_in_as'         =>  $logged_in_as,
		'comment_notes_before' =>  $comment_notes_before,
		'comment_notes_after'  =>  $comment_notes_after
	);

	// And define the comment form
	comment_form( $args, get_the_ID() );

} // end mayer_comment_form

/**
 * Returns the Google font stylesheet URL, if available.
 *
 * The use of Nunito by default is localized. For languages that use characters
 * not supported by the font, the font can be disabled.
 *
 * @param      string                   The name of the Google Font to import.
 * @return     string     $fonts_url    The URL to the font.
 * @package    Mayer
 * @version    1.0.0
 * @since      1.0.0
 */
function mayer_font_url( $font_name ) {

	$fonts_url = '';

	switch( strtolower( $font_name ) ) {

		case 'nunito':

			/* Translators: If there are characters in your language that are not
			 * supported by Nunito, translate this to 'off'. Do not translate into your
			 * own language.
			 */
			if ( 'off' !== _x( 'on', 'Nunito: on or off', 'mayer' ) ) {
				$fonts_url = add_query_arg( array(
					'family' => 'Nunito:100,300,400,700,400italic,700italic,900',
					'subset' => 'latin,latin-ext',
				), '//fonts.googleapis.com/css' );
			} // end if

			break;

		case 'muli':

			/* Translators: If there are characters in your language that are not
			 * supported by Muli, translate this to 'off'. Do not translate into your
			 * own language.
			 */
			if ( 'off' !== _x( 'on', 'Muli: on or off', 'mayer' ) ) {
				$fonts_url = add_query_arg( array(
					'family' => 'Muli:300,400',
					'subset' => 'latin,latin-ext',
				), '//fonts.googleapis.com/css' );
			} // end if

			break;

		case 'source-sans-pro':

			/* Translators: If there are characters in your language that are not
			 * supported by Muli, translate this to 'off'. Do not translate into your
			 * own language.
			 */
			if ( 'off' !== _x( 'on', 'Source+Sans+Pro: on or off', 'mayer' ) ) {
				$fonts_url = add_query_arg( array(
					'family' => 'Source+Sans+Pro:400,600,700,900',
					'subset' => 'latin,latin-ext',
				), '//fonts.googleapis.com/css' );
			} // end if

			break;

	} // end switch/case

	return $fonts_url;

} // end mayer_font_url