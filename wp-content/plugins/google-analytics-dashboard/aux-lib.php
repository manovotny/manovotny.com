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

if ( !function_exists('sys_get_temp_dir')) 
{
  function sys_get_temp_dir() 
  {
    if (!empty($_ENV['TMP'])) { return realpath($_ENV['TMP']); }
    if (!empty($_ENV['TMPDIR'])) { return realpath( $_ENV['TMPDIR']); }
    if (!empty($_ENV['TEMP'])) { return realpath( $_ENV['TEMP']); }
    $tempfile = tempnam(uniqid(rand(),TRUE),'');
    if (file_exists($tempfile)) 
    {
      @unlink($tempfile);
      return realpath(dirname($tempfile));
    }
  }
}

function gad_get_admin_url($path = '')
{
  global $wp_version;
  if (version_compare($wp_version, '3.0', '>='))
  {
    return get_admin_url(null, $path);
  }
  else
  {
    return get_bloginfo( 'wpurl' ) . '/wp-admin' . $path;
  }
}

function gad_is_assoc($array) 
{
  return (is_array($array) && 0 !== count(array_diff_key($array, array_keys(array_keys($array)))));
}

function gad_request_error_type($ga)
{
  if($ga->isError())
  {
    if($ga->isAuthError())
    {
      if(get_option('gad_auth_token') == 'gad_see_oauth')
      {
        if (current_user_can( 'manage_options' ) )
        {
          echo 'You need to log in and select an account in the <a href="options-general.php?page=google-analytics-dashboard/gad-admin-options.php">options panel</a>.';
        }
        else
        {
          echo 'The administrator needs to log in and select a Google Analytics account.';
        }
        return 'perm';
      }

      if(get_option('gad_login_pass') === false || get_option('gad_login_email') === false)
      {
        if (current_user_can( 'manage_options' ) )
        {
          echo 'You need to log in and select an account in the <a href="options-general.php?page=google-analytics-dashboard/gad-admin-options.php">options panel</a>.';
        }
        else
        {
          echo 'The administrator needs to log in and select a Google Analytics account.';
        }
        return 'perm';
      }
      else
      {
        $gauth = new GAuthLib('wpga-display-1.0');
        $gauth->authenticate(get_option('gad_login_email'), get_option('gad_login_pass'), get_option('gad_services'));

        if($gauth->isError())
        {
          $error_message = $gauth->getErrorMessage();
          if (current_user_can( 'manage_options' ) )
          {
            echo 'You need to log in and select an account in the <a href="options-general.php?page=google-analytics-dashboard/gad-admin-options.php">options panel</a>.';
          }
          else
          {
            echo 'The administrator needs to log in and select a Google Analytics account.';
          }
          return 'perm';
        }
        else
        {
          delete_option('gad_auth_token');
          add_option('gad_auth_token', $gauth->getAuthToken());
          $ga->setAuth($gauth->getAuthToken());
          return 'retry';
        }
      }
    }
    else
    {
      echo 'Error gathering analytics data from Google: ' . strip_tags($ga->getErrorMessage());
      return 'perm';
    }
  }
  else
  {
    return 'none';
  }
}

?>
