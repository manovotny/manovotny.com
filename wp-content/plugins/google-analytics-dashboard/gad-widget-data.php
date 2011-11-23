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
require_once(dirname(__FILE__) . '/aux-lib.php');

class GADWidgetData
{
  var $auth_type;
  var $oauth_token;
  var $oauth_secret;
  var $auth_token;
  var $account_id;

  function GADWidgetData()
  {
    if(get_option('gad_auth_token') == 'gad_see_oauth')
    {
      $this->auth_type = 'oauth';
      $this->oauth_token = get_option('gad_oauth_token');
      $this->oauth_secret = get_option('gad_oauth_secret');
    }
    else
    {
      $this->auth_type = 'client';
      $this->auth_token = get_option('gad_auth_token');
    }

    $this->account_id = get_option('gad_account_id');
  }

  function gad_pageviews_text($link_uri)
  {
    if($this->auth_type == 'oauth')
    {
      $ga = new GALib('oauth', NULL, $this->oauth_token, $this->oauth_secret, $this->account_id);
    }
    else
    {
      $ga = new GALib('client', $this->auth_token, NULL, NULL, $this->account_id);
    }

    $start_date = date('Y-m-d', time() - (60 * 60 * 24 * 30));
    $end_date = date('Y-m-d');

    $data = $ga->total_uri_pageviews_for_date_period($link_uri, $start_date, $end_date);
    $error_type = gad_request_error_type($ga);
    if($error_type == 'perm') return '';
    else if($error_type == 'retry') $data = $ga->total_uri_pageviews_for_date_period($link_uri, $start_date, $end_date);

    return $data['value'];
  }

  function gad_pageviews_sparkline($link_uri)
  {
    if($this->auth_type == 'oauth')
    {
      $ga = new GALib('oauth', NULL, $this->oauth_token, $this->oauth_secret, $this->account_id);
    }
    else
    {
      $ga = new GALib('client', $this->auth_token, NULL, NULL, $this->account_id);
    }

    $start_date = date('Y-m-d', time() - (60 * 60 * 24 * 30));
    $end_date = date('Y-m-d');

    $data = $ga->daily_uri_pageviews_for_date_period($link_uri, $start_date, $end_date);
    $error_type = gad_request_error_type($ga);
    if($error_type == 'perm') return '';
    else if($error_type == 'retry') $data = $ga->daily_uri_pageviews_for_date_period($link_uri, $start_date, $end_date);

    $minvalue = 999999999;
    $maxvalue = 0;
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
    }

    return '<img width="90" height="30" src="http://chart.apis.google.com/chart?chs=90x30&cht=ls&chf=bg,s,FFFFFF00&chco=0077CC&chd=t:' . $cvals . '&chds=' . $minvalue . ',' . $maxvalue . '"/>';
  }
}

?>
