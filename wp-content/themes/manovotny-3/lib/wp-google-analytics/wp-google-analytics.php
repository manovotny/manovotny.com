<?php
/**
 * Add Google Analytics to WordPress sites.
 *
 * @package WP_Google_Analytics
 * @author Michael Novotny <manovotny@gmail.com>
 * @license GPL-3.0+
 * @link https://github.com/manovotny/wp-google-analytics
 * @copyright 2014 Michael Novotny
 *
 * @wordpress-plugin
 * Plugin Name: WP Google Analytics
 * Plugin URI: https://github.com/manovotny/wp-google-analytics
 * Description: Add Google Analytics to WordPress sites.
 * Version: 3.0.0
 * Author: Michael Novotny
 * Author URI: AUTHOR_URL
 * License: GPL-3.0+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
 * Domain Path: /lang
 * Text Domain: wp-google-analytics
 * GitHub Plugin URI: https://github.com/manovotny/wp-google-analytics
 */

/* Access
---------------------------------------------------------------------------------- */

if ( ! defined( 'WPINC' ) ) {

    die;

}

/* Libraries
---------------------------------------------------------------------------------- */

require_once __DIR__ . '/lib/wp-enqueue-util/wp-enqueue-util.php';

/* Classes
---------------------------------------------------------------------------------- */

if ( ! class_exists( 'WP_Google_Analytics' ) ) {

    require_once __DIR__ . '/classes/class-wp-google-analytics.php';

    WP_Google_Analytics::get_instance();

}