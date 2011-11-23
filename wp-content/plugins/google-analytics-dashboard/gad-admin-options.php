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
require_once(dirname(__FILE__) . '/aux-lib.php');
require_once(dirname(__FILE__) . '/gauth-lib.php');
require_once(dirname(__FILE__) . '/simplefilecache.php');
require_once(dirname(__FILE__) . '/OAuth.php');

require_once(dirname(__FILE__) . '/gad-admin-options-ui.php');

class GADAdminOptions
{
  function GADAdminOptions()
  {
    $this->__construct();
  }

  function __construct()
  {
  }

  function register_for_actions_and_filters()
  {
    add_action('wp_ajax_gad_set_preference', array(&$this, 'ajax_set_preference'));
    add_action('admin_menu', array(&$this, 'admin_plugin_menu'));
    add_action('admin_init', array(&$this, 'admin_handle_oauth_login_header'));
  }

  function ajax_set_preference()
  {
    global $current_user;
    get_currentuserinfo();

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

    die("");
  }
 
  function admin_plugin_menu()
  {
    add_options_page(__('Google Analytics Dashboard Options'), __('Google Analytics Dashboard'), 8, __FILE__, array(&$this, 'admin_plugin_options'));
  }

  function admin_plugin_options($info_message = '')
  {
    if(!class_exists('SimpleXMLElement'))
    {
      echo '<br/><br/><div id="message" class="updated fade"><p><strong>It appears that <a href="http://us3.php.net/manual/en/book.simplexml.php">SimpleXML</a> is not compiled into your version of PHP. It is required for this plugin to function correctly.</strong></p></div>';
    }
    else if(!function_exists('curl_init'))
    {
      echo '<br/><br/><div id="message" class="updated fade"><p><strong>It appears that <a href="http://www.php.net/manual/en/book.curl.php">CURL</a> is not compiled into your version of PHP. It is required for this plugin to function correctly.</strong></p></div>';
    }
    else
    {
      $gad_auth_token = get_option('gad_auth_token');

      if(isset($gad_auth_token) && $gad_auth_token != '')
      {
        $this->admin_handle_other_options($info_message);
      }
      else
      {
        $this->admin_handle_login_options($info_message);
      }
    }
  }

  function admin_handle_other_options($info_message = '')
  {
    if( isset($_POST['SubmitOptions']) ) 
    {
      if( function_exists('current_user_can') && !current_user_can('manage_options') )
      {
        die(__('Cheatin&#8217; uh?'));
      }

      @SimpleFileCache::clearCache(); 

      if( isset($_POST['ga_forget_pass']) )
      {
        delete_option('gad_login_pass');
      }

      if( isset($_POST['ga_forget_all']) )
      {
        delete_option('gad_oauth_token');
        delete_option('gad_oauth_secret');
        delete_option('gad_account_id');
        delete_option('gad_display_level');
        delete_option('gad_cache_timeout');
        delete_option('gad_goal_one');
        delete_option('gad_goal_two');
        delete_option('gad_goal_three');
        delete_option('gad_goal_four');
        delete_option('gad_login_email');
        delete_option('gad_login_pass');
        delete_option('gad_auth_token');
        delete_option('gad_disable_post_stats');
        $this->admin_plugin_options('Everything Reset');
        return;
      }
      
      delete_option('gad_account_id');
      add_option('gad_account_id', $_POST['ga_account_id']);

      if( isset($_POST['ga_forget_auth']) )
      {
        delete_option('gad_oauth_token');
        delete_option('gad_oauth_secret');
        delete_option('gad_auth_token');
        $this->admin_plugin_options('Auth Reset');
        return;
      }

      if( isset($_POST['ga_display_level']) )
      {
        delete_option('gad_display_level');
        if($_POST['ga_display_level'] != '')
        {
          add_option('gad_display_level', $_POST['ga_display_level']);
        }
      }

      if( isset($_POST['ga_disable_post_stats']) )
      {
        add_option('gad_disable_post_stats', 'true');
      }
      else
      {
        delete_option('gad_disable_post_stats');
      }

      if( isset($_POST['ga_cache_timeout']) )
      {
        delete_option('gad_cache_timeout');
        if($_POST['ga_cache_timeout'] != '')
        {
          add_option('gad_cache_timeout', $_POST['ga_cache_timeout']);
        }
      }

      delete_option('gad_goal_one');
      delete_option('gad_goal_two');
      delete_option('gad_goal_three');
      delete_option('gad_goal_four');

      if( isset($_POST['ga_goal_one']) )
      {
        if($_POST['ga_goal_one'] != '')
        {
          add_option('gad_goal_one', $_POST['ga_goal_one']);
        }
      }

      if( isset($_POST['ga_goal_two']) )
      {
        if($_POST['ga_goal_two'] != '')
        {
          add_option('gad_goal_two', $_POST['ga_goal_two']);
        }
      }

      if( isset($_POST['ga_goal_three']) )
      {
        if($_POST['ga_goal_three'] != '')
        {
          add_option('gad_goal_three', $_POST['ga_goal_three']);
        }
      }

      if( isset($_POST['ga_goal_four']) )
      {
        if($_POST['ga_goal_four'] != '')
        {
          add_option('gad_goal_four', $_POST['ga_goal_four']);
        }
      }

      $info_message = 'Options Saved';
    }

    if(get_option('gad_auth_token') == 'gad_see_oauth')
    {
      $ga = new GALib('oauth', NULL, get_option('gad_oauth_token'), get_option('gad_oauth_secret'), '', get_option('gad_cache_timeout') !== false ? get_option('gad_cache_timeout') : 60);
    }
    else
    {
      $ga = new GALib('client', get_option('gad_auth_token'), NULL, NULL, '', get_option('gad_cache_timeout') !== false ? get_option('gad_cache_timeout') : 60);
    }
    $account_hash = $ga->account_query();

    if($ga->isError())
    {
      if($ga->isAuthError())
      {
        delete_option('gad_auth_token'); // this is removed so login will happen again
        $this->admin_plugin_options();
        return;
      }
      else
      {
        $ui = new GADAdminOptionsUI();
        $ui->error_message = 'Error gathering analytics data from Google: ' . strip_tags($ga->getErrorMessage());
        $ui->display_admin_halting_error();
        return;
      }
    }

    $ui = new GADAdminOptionsUI();
    $ui->info_message = $info_message;
    $ui->error_message = '';
    $ui->display_admin_handle_other_options($account_hash);
  }

  function admin_handle_login_options($info_message = '')
  {
    $ui = new GADAdminOptionsUI();

    if( isset($_REQUEST['error_message']) )
    {
      $ui->error_message = strip_tags(urldecode($_REQUEST['error_message']));
    }

    if( isset($_REQUEST['info_message']) )
    {
      $ui->info_message = strip_tags(urldecode($_REQUEST['info_message']));
    }
    else
    {
      $ui->info_message = $info_message;
    }

    if( isset($_POST['SubmitLogin']) ) 
    {
      if( function_exists('current_user_can') && !current_user_can('manage_options') )
      {
        die(__('Cheatin&#8217; uh?'));
      }

      if( isset($_POST['gad_login_type']) && $_POST['gad_login_type'] == 'client' )
      {
        if( $this->admin_handle_clientlogin_login_options(&$ui, $info_message) )
        {
          return;
        }
      }
    }

    $ui->display_admin_handle_login_options($gauth);
  }

  function admin_handle_clientlogin_login_options($ui, $info_message = '')
  {
    if( !isset($_POST['ga_email']) || trim($_POST['ga_email']) == '' )
    {
      $error_message = "Email is required";
    }
    else if( !isset($_POST['ga_pass']) || $_POST['ga_pass'] == '' )
    {
      $error_message = "Password is required";
    }
    else
    {
      add_option('gad_login_email', $_POST['ga_email']);

      if(isset($_POST['ga_save_pass']))
      {
        add_option('gad_login_pass', $_POST['ga_pass']);
      }
      else
      {
        delete_option('gad_login_pass', $_POST['ga_pass']);
      }

      $gauth = new GAuthLib('wpga-display-1.0');
      if(isset($_POST['ga_captcha_token']) && isset($_POST['ga_captcha']))
      {
        $gauth->authenticate($_POST['ga_email'], $_POST['ga_pass'], get_option('gad_services'), $_POST['ga_captcha_token'], $_POST['ga_captcha']);
      }
      else
      {
        $gauth->authenticate($_POST['ga_email'], $_POST['ga_pass'], get_option('gad_services'));
      }

      if($gauth->isError())
      {
        $error_message = $gauth->getErrorMessage();
      }
      else
      {
        add_option('gad_auth_token', $gauth->getAuthToken());
        $this->admin_plugin_options('Login successful.');
        return true;
      }
    }

    $ui->info_message = $info_message;
    $ui->error_message = $error_message;
    return false;
  }

  // We have to catch the oauth login data in admin_init so http headers can be added
  function admin_handle_oauth_login_header()
  {
    if( isset($_POST['SubmitLogin']) && isset($_POST['gad_login_type']) && $_POST['gad_login_type'] == 'oauth' )
    {
      $this->admin_handle_oauth_login_options();
    }
    else if( isset($_REQUEST['oauth_return']) )
    {
      $this->admin_handle_oauth_complete();
    }
  }

  function admin_handle_oauth_login_options()
  {
    // Step one in the oauth login sequence is to grab an anonymous token

    delete_option('gad_oa_anon_token');
    delete_option('gad_oa_anon_secret');

    $signature_method = new GADOAuthSignatureMethod_HMAC_SHA1();
    $params = array();

    $params['oauth_callback'] = gad_get_admin_url('/options-general.php') . '?page=google-analytics-dashboard/gad-admin-options.php&oauth_return=true';
    $params['scope'] = 'https://www.google.com/analytics/feeds/'; // This is a space seperated list of applications we want access to
    $params['xoauth_displayname'] = 'Analytics Dashboard';

    $consumer = new GADOAuthConsumer('anonymous', 'anonymous', NULL);
    $req_req = GADOAuthRequest::from_consumer_and_token($consumer, NULL, 'GET', 'https://www.google.com/accounts/OAuthGetRequestToken', $params);
    $req_req->sign_request($signature_method, $consumer, NULL);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $req_req->to_url());
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $oa_response = curl_exec($ch);

    if(curl_errno($ch))
    {
      $error_message = curl_error($ch);
      $info_redirect = gad_get_admin_url('/options-general.php') . '?page=google-analytics-dashboard/gad-admin-options.php&error_message=' . urlencode($error_message);
      header("Location: " . $info_redirect);
      die("");
    }

    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if($http_code == 200)
    {
      $access_params = $this->split_params($oa_response);

      add_option('gad_oa_anon_token', $access_params['oauth_token']);
      add_option('gad_oa_anon_secret', $access_params['oauth_token_secret']);

      header("Location: https://www.google.com/accounts/OAuthAuthorizeToken?oauth_token=" . urlencode($access_params['oauth_token']));
    }
    else
    {
      $info_redirect = gad_get_admin_url('/options-general.php') . '?page=google-analytics-dashboard/gad-admin-options.php&error_message=' . urlencode($oa_response);
      header("Location: " . $info_redirect);
    }

    die("");
  }

  function admin_handle_oauth_complete()
  {
    // step two in oauth login process

    if( function_exists('current_user_can') && !current_user_can('manage_options') )
    {
      die(__('Cheatin&#8217; uh?'));
    }

    $signature_method = new GADOAuthSignatureMethod_HMAC_SHA1();
    $params = array();

    $params['oauth_verifier'] = $_REQUEST['oauth_verifier'];

    $consumer = new GADOAuthConsumer('anonymous', 'anonymous', NULL);

    $upgrade_token = new GADOAuthConsumer(get_option('gad_oa_anon_token'), get_option('gad_oa_anon_secret'));

    $acc_req = GADOAuthRequest::from_consumer_and_token($consumer, $upgrade_token, 'GET', 'https://www.google.com/accounts/OAuthGetAccessToken', $params);

    $acc_req->sign_request($signature_method, $consumer, $upgrade_token);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $acc_req->to_url());
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $oa_response = curl_exec($ch);

    if(curl_errno($ch))
    {
      $error_message = curl_error($ch);
      $info_redirect = gad_get_admin_url('/options-general.php') . '?page=google-analytics-dashboard/gad-admin-options.php&error_message=' . urlencode($error_message);
      header("Location: " . $info_redirect);
      die("");
    }

    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    delete_option('gad_oa_anon_token');
    delete_option('gad_oa_anon_secret');

    if($http_code == 200)
    {
      $access_params = $this->split_params($oa_response);

      update_option('gad_oauth_token', $access_params['oauth_token']);
      update_option('gad_oauth_secret', $access_params['oauth_token_secret']);
      update_option('gad_auth_token', 'gad_see_oauth');

      $info_redirect = gad_get_admin_url('/options-general.php') . '?page=google-analytics-dashboard/gad-admin-options.php&info_message=' . urlencode('Authenticated!');
      header("Location: " . $info_redirect);
    }
    else
    {
      $info_redirect = gad_get_admin_url('/options-general.php') . '?page=google-analytics-dashboard/gad-admin-options.php&error_message=' . urlencode($oa_response);
      header("Location: " . $info_redirect);
    }

    die("");
  }

  function split_params($response)
  {
    $params = array();
    $param_pairs = explode('&', $response);
    foreach($param_pairs as $param_pair)
    {
      if (trim($param_pair) == '') { continue; }
      list($key, $value) = explode('=', $param_pair);
      $params[$key] = urldecode($value);
    }
    return $params;
  }
}
?>
