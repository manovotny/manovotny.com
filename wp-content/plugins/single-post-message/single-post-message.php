<?php
/**
 * Single Post Message
 *
 * Easily add short messages and announcements above posts. Displays in the RSS feed and on the blog.
 *
 * @package   Single_Post_Message
 * @author    Tom McFarlin <tom@tommcfarlin.com>
 * @license   GPL-2.0+
 * @link      http://tommcfarlin.com
 * @copyright 2012 - 2015 Tom McFarlin
 *
 * @wordpress-plugin
 * Plugin Name: Single Post Message
 * Plugin URI: http://tommcfarlin.com/single-post-message
 * Description: Easily add short messages and announcements above posts. Displays in the RSS feed and on the blog.
 * Version: 2.3.0
 * Author: Tom McFarlin
 * Author URI: http://tommcfarlin.com
 * Author Email: tom@tommcfarlin.com
 * Text Domain: single-post-message
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
* Domain Path: /lang
*/

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
} // end if

require_once( plugin_dir_path( __FILE__ ) . 'class-single-post-message.php' );
Single_Post_Message::get_instance();