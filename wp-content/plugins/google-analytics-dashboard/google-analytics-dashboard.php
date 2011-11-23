<?php
/*  Copyright 2009  Carson McDonald  (carson@ioncannon.net)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

require_once(dirname(__FILE__) . '/gad-widget.php');
require_once(dirname(__FILE__) . '/gad-admin-dashboard.php');
require_once(dirname(__FILE__) . '/gad-admin-options.php');
require_once(dirname(__FILE__) . '/gad-admin-pages-posts.php');
require_once(dirname(__FILE__) . '/gad-content-tag.php');

/*

Plugin Name: Google Analytics Dashboard
Plugin URI: http://www.ioncannon.net/projects/google-analytics-dashboard-wordpress-widget/
Description: Google Analytics graph integration.
Version: 2.0.3
Author: Carson McDonald
Author URI: http://www.ioncannon.net/

*/

add_action( 'admin_init', 'gad_initialize' );
function gad_initialize() 
{
  add_option('gad_trans_id', 0);
  add_option('gad_services', 'analytics');
}

// =====================================================================
// Register the GAD widget class
// =====================================================================
global $wp_version;
if (version_compare($wp_version, '2.8', '>=')) 
{
  add_action('widgets_init', create_function('', 'return register_widget("GADWidget");'));
}

add_action('admin_print_scripts', 'gad_admin_print_scripts');
function gad_admin_print_scripts()
{
  wp_enqueue_script('gad_script', plugins_url('/js/gad_main.js', __FILE__), array('jquery', 'sack'), '3.0');
}

// =====================================================================
// Set up other parts of the system
// =====================================================================
$gad_admin_options = new GADAdminOptions();
$gad_admin_options->register_for_actions_and_filters();

$gad_content_tag = new GADContentTag();
$gad_content_tag->register_for_actions_and_filters();

if(get_option('gad_disable_post_stats') != 'true')
{
  $gad_admin_pages_posts = new GADAdminPagesPosts();
  $gad_admin_pages_posts->register_for_actions_and_filters();
}

$gad_admin_dashboard = new GADAdminDashboard();
$gad_admin_dashboard->register_for_actions_and_filters();

?>
