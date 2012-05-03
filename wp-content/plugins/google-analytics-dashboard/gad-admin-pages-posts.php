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

require_once(dirname(__FILE__) . '/ga-lib.php');
require_once(dirname(__FILE__) . '/gauth-lib.php');

require_once(dirname(__FILE__) . '/gad-admin-pages-posts-ui.php');

class GADAdminPagesPosts
{
  function GADAdminPagesPosts()
  {
    $this->__construct();
  }

  function __construct()
  {
  }

  function register_for_actions_and_filters()
  {
    add_filter('manage_posts_columns', array(&$this, 'posts_pages_columns'));
    add_filter('manage_pages_columns', array(&$this, 'posts_pages_columns'));
    add_action('manage_pages_custom_column', array(&$this, 'posts_pages_custom_column'), 10, 2);
    add_action('manage_posts_custom_column', array(&$this, 'posts_pages_custom_column'), 10, 2);
    add_action('wp_ajax_gad_fill_ppp', array(&$this, 'fill_posts_pages_placeholder'));
  }

  function posts_pages_columns($defaults) 
  {
    $defaults['analytics'] = __('Analytics');
    return $defaults;
  }

  function fill_posts_pages_placeholder()
  {
    global $wpdb;

    if(($value = $this->security_check()) !== true)
    {
      die($value);
    }

    $post_id =  $_REQUEST['pid'];
    $count =  $_REQUEST['count'];

    // This is done to reduce the number of requests made at the same time
    if($count % 2 == 0) usleep(500000);
    if($count % 4 == 0) usleep(500000);

    if(get_option('gad_auth_token') == 'gad_see_oauth')
    {
      $ga = new GALib('oauth', NULL, get_option('gad_oauth_token'), get_option('gad_oauth_secret'), get_option('gad_account_id'), get_option('gad_cache_timeout') !== false ? get_option('gad_cache_timeout') : 60);
    }
    else
    {
      $ga = new GALib('client', get_option('gad_auth_token'), NULL, NULL, get_option('gad_account_id'), get_option('gad_cache_timeout') !== false ? get_option('gad_cache_timeout') : 60);
    }

    $link_value = get_permalink($post_id);
    $url_data = parse_url($link_value);
    $link_uri = substr($url_data['path'] . (isset($url_data['query']) ? ('?' . $url_data['query']) : ''), -20);

    $is_draft = $wpdb->get_var("SELECT count(1) FROM $wpdb->posts WHERE post_status = 'draft' AND ID = $post_id");
    if($link_uri == '' || (isset($is_draft) && $is_draft > 0))
    {
      echo "";
    }
    else
    {
      $start_date = date('Y-m-d', time() - (60 * 60 * 24 * 30));
      $end_date = date('Y-m-d');
    
      $data = $ga->summary_by_partial_uri_for_date_period($link_uri, $start_date, $end_date);
      $error_type = gad_request_error_type($ga);
      if($error_type == 'perm') die("Could not load data");
      else if($error_type == 'retry') $data = $ga->summary_by_partial_uri_for_date_period($link_uri, $start_date, $end_date);

      $minvalue = 999999999;
      $maxvalue = 0;
      $pageviews = 0;
      $exits = 0;
      $uniques = 0;
      $count = 0;
      foreach($data as $date => $value)
      {
        if($minvalue > $value['ga:pageviews'])
        {
          $minvalue = $value['ga:pageviews'];
        }
        if($maxvalue < $value['ga:pageviews'])
        {
          $maxvalue = $value['ga:pageviews'];
        }
        $cvals .= $value['ga:pageviews'] . ($count < sizeof($data)-1 ? "," : "");
        $count++;

        $pageviews += $value['ga:pageviews'];
        $exits += $value['ga:exits'];
        $uniques += $value['ga:uniquePageviews'];
      }

      $ui = new GADAdminPagesPostsUI();
      $ui->display_posts_pages_custom_column($cvals, $minvalue, $maxvalue, $pageviews, $exits, $uniques);
    }

    die("");
  }

  function security_check()
  {
    if(get_option('gad_auth_token') === false || get_option('gad_account_id') === false)
    {
      if (current_user_can( 'manage_options' ) )
      {
        return 'You need to log in and select an account in the <a href="options-general.php?page=google-analytics-dashboard/gad-admin-options.php">options panel</a>.';
      }
      else
      {
        return 'The administrator needs to log in and select a Google Analytics account.';
      }
    }

    return true;
  }

  function posts_pages_custom_column($column_name, $post_id)
  {
    if(($value = $this->security_check()) !== true)
    {
      echo $value;
    }
    else
    {
      if( $column_name == 'analytics' ) 
      {
        echo '<div id="gad_ppp_' . $post_id . '" class="gad_ppp_loading"><p class="widget-loading hide-if-no-js">Loading&#8230;</p><p class="describe hide-if-js">This widget requires JavaScript.</p></div>';
      }
    }
  }
}
?>
