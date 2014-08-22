<?php
/**
 * A convenient enqueuing utility for WordPress.
 *
 * @package WP_Enqueue_Util
 * @author Michael Novotny <manovotny@gmail.com>
 * @license GPL-3.0+
 * @link https://github.com/manovotny/wp-enqueue-util
 * @copyright 2014 Michael Novotny
 *
 * @wordpress-plugin
 * Plugin Name: WP Enqueue Util
 * Plugin URI: https://github.com/manovotny/wp-enqueue-util
 * Description: A convenient enqueuing utility for WordPress.
 * Version: 0.2.0
 * Author: Michael Novotny
 * Author URI: http://manovotny.com
 * License: GPL-3.0+
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
 * Domain Path: /lang
 * Text Domain: wp-enqueue-util
 * GitHub Plugin URI: https://github.com/manovotny/wp-enqueue-util
 */

/* Access
---------------------------------------------------------------------------------- */

if ( ! defined( 'WPINC' ) ) {

    die;

}

/* Libraries
---------------------------------------------------------------------------------- */

require_once __DIR__ . '/lib/wp-url-util/wp-url-util.php';

/* Classes
---------------------------------------------------------------------------------- */

if ( ! class_exists( 'WP_Enqueue_Options' ) ) {

    require_once __DIR__ . '/classes/class-wp-enqueue-options.php';

}

if ( ! class_exists( 'WP_Enqueue_Util' ) ) {

    require_once __DIR__ . '/classes/class-wp-enqueue-util.php';

}