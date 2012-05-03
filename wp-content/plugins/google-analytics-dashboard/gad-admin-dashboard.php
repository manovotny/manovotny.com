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

require_once(dirname(__FILE__) . '/gad-admin-dashboard-ui.php');
require_once(dirname(__FILE__) . '/gad-data-model.php');

class GADAdminDashboard
{
  function GADAdminDashboard()
  {
    $this->__construct();
  }

  function __construct()
  {
  }

  function register_for_actions_and_filters()
  {
    add_action('wp_ajax_gad_set_preference', array(&$this, 'ajax_set_preference'));
    add_action('wp_ajax_gad_fill_dp', array(&$this, 'fill_dashboard_placeholder'));
    add_action('wp_dashboard_setup', array(&$this, 'register_dashboard_widget')); 
    add_filter('wp_dashboard_widgets', array(&$this, 'add_dashboard_widget'));
  }

  function ajax_set_preference()
  {
    $current_user = $this->check_user_access();
    
    if($current_user != null)
    {
      switch($_POST['pi'])
      {
        case 'base-stats':
          update_usermeta($current_user->ID, 'gad_bs_toggle', $_POST['pv']);
        break;
        case 'goal-stats':
          update_usermeta($current_user->ID, 'gad_gs_toggle', $_POST['pv']);
        break;
        case 'extended-stats':
          update_usermeta($current_user->ID, 'gad_es_toggle', $_POST['pv']);
        break;
        default:
          die("alert('Unknown option.')");
      }
    }

    die(""); // needed to end the process of returning the ajax data
  }

  function register_dashboard_widget() 
  {
    wp_register_sidebar_widget('dashboard_gad', __('Google Analytics Dashboard Widget', 'gad'), array(&$this, 'create_dashboard_placeholder'), array('width' => 'full', 'height' => 'single'));
  }

  function add_dashboard_widget($widgets) 
  {
    global $wp_registered_widgets;
    $dashboard_display_level = get_option('gad_display_level');
    if (!isset($wp_registered_widgets['dashboard_gad']) || !current_user_can( $dashboard_display_level !== false ? $dashboard_display_level : 'manage_options' ) )
    {
      return $widgets;
    }
    array_splice($widgets, sizeof($widgets)-1, 0, 'dashboard_gad');
    return $widgets;
  }

  function create_dashboard_placeholder()
  {
    if( $this->check_user_access() != null )
    {
      echo '<div id="gad_dashboard_placeholder"><p class="hide-if-no-js">Loading&#8230;</p><p class="describe hide-if-js">This widget requires JavaScript.</p></div>';
    }
  }

  function fill_dashboard_placeholder()
  {
    $current_user = $this->check_user_access();
    
    if($current_user != null)
    {
      $ui = new GADAdminDashboardUI();
      $ui->ga_data = new GADDataModel();
      if($ui->ga_data->fatal_error)
      {
        echo 'Could not gather Google Analytics data.';
      }
      else
      {
        $bs_toggle_usermeta = get_usermeta($current_user->ID, 'gad_bs_toggle');
        $bs_toggle_option = !isset($bs_toggle_usermeta) || $bs_toggle_usermeta == '' ? get_option('gad_bs_toggle') : $bs_toggle_usermeta;
        $bs_toggle_option = !isset($bs_toggle_option) || $bs_toggle_option == '' ? 'hide' : $bs_toggle_option;

        $gs_toggle_usermeta = get_usermeta($current_user->ID, 'gad_gs_toggle');
        $gs_toggle_option = !isset($gs_toggle_usermeta) || $gs_toggle_usermeta == '' ? get_option('gad_gs_toggle') : $gs_toggle_usermeta;
        $gs_toggle_option = !isset($gs_toggle_option) || $gs_toggle_option == '' ? 'hide' : $gs_toggle_option;

        $es_toggle_usermeta = get_usermeta($current_user->ID, 'gad_es_toggle');
        $es_toggle_option = !isset($es_toggle_usermeta) || $es_toggle_usermeta == '' ? get_option('gad_es_toggle') : $es_toggle_usermeta;
        $es_toggle_option = !isset($es_toggle_option) || $es_toggle_option == '' ? 'hide' : $es_toggle_option;

        $ui->display_all($bs_toggle_option, $gs_toggle_option, $es_toggle_option);
      }
    }

    die(""); // needed to end the process of returning the ajax data
  }

  function check_user_access()
  {
    global $current_user;
    get_currentuserinfo();

    if(get_option('gad_auth_token') === false || get_option('gad_account_id') === false)
    {
      if (current_user_can( 'manage_options' ) )
      {
        echo 'You need to log in and select an account in the <a href="options-general.php?page=google-analytics-dashboard/gad-admin-options.php">options panel</a>.';
      }
      else
      {
        echo 'The administrator needs to log in and select a Google Analytics account.';
      }
      return null;
    }

    return $current_user;
  }
}
?>
