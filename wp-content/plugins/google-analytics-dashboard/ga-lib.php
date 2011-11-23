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

require_once(dirname(__FILE__) . '/OAuth.php');
require_once(dirname(__FILE__) . '/simplefilecache.php');

class GALib
{
  var $auth_type;

  var $oauth_token;
  var $oauth_secret;
  var $auth;
  var $ids;

  var $base_url = 'https://www.google.com/analytics/feeds/';

  var $http_code;
  var $error_message;
  var $cache_timeout;

  function GALib($auth_type, $auth, $oauth_token, $oauth_secret, $ids = '', $cache_timeout = 60)
  {
    $this->auth_type = $auth_type;
    $this->auth = $auth;
    $this->oauth_token = $oauth_token;
    $this->oauth_secret = $oauth_secret;
    $this->ids = $ids;
    $this->cache_timeout = $cache_timeout;
  }

  function setAuth($auth)
  {
    $this->auth = $auth;
  }

  function isError()
  {
    return $this->http_code != 200;
  }

  function isAuthError()
  {
    return $this->http_code == 401;
  }

  function isProfileAccessError()
  {
    return $this->http_code == 403;
  }

  function isRequestError()
  {
    return $this->http_code == 400;
  }

  function getErrorMessage()
  {
    return $this->error_message;
  }

  function createAuthHeader($url = null, $request_type = null)
  {
    if($this->auth_type == 'client')
    {
      return "Authorization: GoogleLogin auth=" . $this->auth;
    }
    else
    {
      if($url == NULL)
      {
        error_log('No URL to sign.');
      }

      $signature_method = new GADOAuthSignatureMethod_HMAC_SHA1();

      $params = array();

      $consumer = new GADOAuthConsumer('anonymous', 'anonymous', NULL);

      $token = new GADOAuthConsumer($this->oauth_token, $this->oauth_secret);

      $oauth_req = GADOAuthRequest::from_consumer_and_token($consumer, $token, $request_type, $url, $params);

      $oauth_req->sign_request($signature_method, $consumer, $token);

      return $oauth_req->to_header();
    }
  }

  function account_query()
  {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, $this->base_url . 'accounts/default');
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array($this->createAuthHeader($this->base_url . 'accounts/default', 'GET')));

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    $return = curl_exec($ch);

    if(curl_errno($ch))
    {
      $this->error_message = curl_error($ch);
      return false;
    }

    $this->http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if($this->http_code != 200)
    {
      $this->error_message = $return;
      return false;
    }
    else
    {
      $this->error_message = '';
      $xml = new SimpleXMLElement($return);

      curl_close($ch);

      $vhash = array();
      foreach($xml->entry as $entry)
      {
        $value = (string)$entry->id;
        list($part1, $part2) = split('accounts/', $value);
        $vhash[$part2] = (string)$entry->title;
      }

      return $vhash;
    }
  }

  function simple_report_query($start_date, $end_date, $dimensions = '', $metrics = '', $sort = '', $filters = '')
  {
    $url  = $this->base_url . 'data';
    $url .= '?ids=' . $this->ids;
    $url .= $dimensions != '' ? ('&dimensions=' . $dimensions) : '';
    $url .= $metrics != '' ? ('&metrics=' . $metrics) : '';
    $url .= $sort != '' ? ('&sort=' . $sort) : '';
    $url .= $filters != '' ? ('&filters=' . urlencode($filters)) : '';
    $url .= '&start-date=' . $start_date;
    $url .= '&end-date=' . $end_date;

    if(!SimpleFileCache::isExpired($url, $this->cache_timeout))
    {
      $this->http_code = 200; // We never cache bad requests
      return SimpleFileCache::cacheGet($url);
    }
    else
    {
      $ch = curl_init();

      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
      curl_setopt($ch, CURLOPT_HTTPHEADER, array($this->createAuthHeader($url, 'GET')));
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

      $return = curl_exec($ch);

      if(curl_errno($ch))
      {
        $this->error_message = curl_error($ch);
        return false;
      }

      $this->http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

      if($this->http_code != 200)
      {
        $this->error_message = $return;
        return false;
      }
      else
      {
        $xml = simplexml_load_string($return);

        curl_close($ch);

        $return_values = array();
        foreach($xml->entry as $entry)
        {
          if($dimensions == '')
          {
            $dim_name = 'value';
          }
          else
          {
            $dimension = $entry->xpath('dxp:dimension');
            $dimension_attributes = $dimension[0]->attributes();
            $dim_name = (string)$dimension_attributes['value'];
          }

          $metric = $entry->xpath('dxp:metric');
          if(sizeof($metric) > 1)
          {
            foreach($metric as $single_metric)
            { 
              $metric_attributes = $single_metric->attributes();
              $return_values[$dim_name][(string)$metric_attributes['name']] = (string)$metric_attributes['value'];
            }
          }
          else
          {
            $metric_attributes = $metric[0]->attributes();
            $return_values[$dim_name] = (string)$metric_attributes['value'];
          }
        }

        SimpleFileCache::cachePut($url, $return_values, $this->cache_timeout);

        return $return_values;
      }
    }
  }

  function complex_report_query($start_date, $end_date, $dimensions = array(), $metrics = array(), $sort = array(), $filters = array())
  {
    $url  = $this->base_url . 'data';
    $url .= '?ids=' . $this->ids;
    $url .= sizeof($dimensions) > 0 ? ('&dimensions=' . join(array_reverse($dimensions), ',')) : '';
    $url .= sizeof($metrics) > 0 ? ('&metrics=' . join($metrics, ',')) : '';
    $url .= sizeof($sort) > 0 ? '&sort=' . join($sort, ',') : '';
    $url .= sizeof($filters) > 0 ? '&filters=' . urlencode(join($filters, ',')) : '';
    $url .= '&start-date=' . $start_date;
    $url .= '&end-date=' .$end_date;

    if(!SimpleFileCache::isExpired($url, $this->cache_timeout))
    {
      $this->http_code = 200; // We never cache bad requests
      return SimpleFileCache::cacheGet($url);
    }
    else
    {
      $ch = curl_init();

      curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
      curl_setopt($ch, CURLOPT_HTTPHEADER, array($this->createAuthHeader($url, 'GET')));
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

      $return = curl_exec($ch);

      if(curl_errno($ch))
      {
        $this->error_message = curl_error($ch);
        return false;
      }

      $this->http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

      if($this->http_code != 200)
      {
        $this->error_message = $return;
        return false;
      }
      else
      {
        $xml = simplexml_load_string($return);

        curl_close($ch);

        $return_values = array();
        foreach($xml->entry as $entry)
        {
          $metrics = array();
          foreach($entry->xpath('dxp:metric') as $metric)
          {
            $metric_attributes = $metric->attributes();
            $metrics[(string)$metric_attributes['name']] = (string)$metric_attributes['value']; 
          }

          $last_dimension_var_name = null;
          foreach($entry->xpath('dxp:dimension') as $dimension)
          {
            $dimension_attributes = $dimension->attributes();

            $dimension_var_name = 'dimensions_' . strtr((string)$dimension_attributes['name'], ':', '_');
            $$dimension_var_name = array();

            if($last_dimension_var_name == null)
            {
              $$dimension_var_name = array('name' => (string)$dimension_attributes['name'],
                                           'value' => (string)$dimension_attributes['value'],
                                           'children' => $metrics); 
            }
            else
            {
              $$dimension_var_name = array('name' => (string)$dimension_attributes['name'],
                                           'value' => (string)$dimension_attributes['value'],
                                           'children' => $$last_dimension_var_name); 
            }
            $last_dimension_var_name = $dimension_var_name;
          }
          array_push($return_values, $$last_dimension_var_name);
        }

        SimpleFileCache::cachePut($url, $return_values, $this->cache_timeout);

        return $return_values;
      }
    }
  }

  function hour_pageviews_for_date_period($start_date, $end_date)
  {
    return $this->simple_report_query($start_date, $end_date, 'ga:hour', 'ga:visits');
  }

  function daily_pageviews_for_date_period($start_date, $end_date)
  {
    return $this->simple_report_query($start_date, $end_date, 'ga:date', 'ga:pageviews');
  }

  function weekly_pageviews_for_date_period($start_date, $end_date)
  {
    return $this->simple_report_query($start_date, $end_date, 'ga:week', 'ga:pageviews');
  }

  function monthly_pageviews_for_date_period($start_date, $end_date)
  {
    return $this->simple_report_query($start_date, $end_date, 'ga:month', 'ga:pageviews');
  }

  function total_visits_for_date_period($start_date, $end_date)
  {
    return $this->simple_report_query($start_date, $end_date, '', 'ga:visits');
  }

  function daily_uri_pageviews_for_date_period($partial_uri, $start_date, $end_date)
  {
    return $this->simple_report_query($start_date, $end_date, 'ga:date', 'ga:pageviews', '', 'ga:pagePath=~' . $partial_uri . '.*');
  }

  function total_uri_pageviews_for_date_period($partial_uri, $start_date, $end_date)
  {
    return $this->simple_report_query($start_date, $end_date, '', 'ga:pageviews', '', 'ga:pagePath=~' . $partial_uri . '.*');
  }

  function total_pageviews_for_date_period($start_date, $end_date)
  {
    return $this->simple_report_query($start_date, $end_date, '', 'ga:pageviews');
  }

  function keywords_for_date_period($start_date, $end_date, $limit = 20)
  {
    return $this->simple_report_query($start_date, $end_date, 'ga:keyword', 'ga:visits', '-ga:visits', 'ga:visits>' . $limit);
  }

  function sources_for_date_period($start_date, $end_date, $limit = 20)
  {
    return $this->simple_report_query($start_date, $end_date, 'ga:source', 'ga:visits', '-ga:visits', 'ga:visits>' . $limit);
  }

  function pages_for_date_period($start_date, $end_date, $limit = 20)
  {
    return $this->complex_report_query($start_date, $end_date, array('ga:pagePath', 'ga:pageTitle'), array('ga:pageviews'), array('-ga:pageviews'), array('ga:pageviews>' . $limit));
  }

  function summary_by_partial_uri_for_date_period($partial_uri, $start_date, $end_date)
  {
    return $this->simple_report_query($start_date, $end_date, 'ga:date', join(array('ga:pageviews', 'ga:exits', 'ga:uniquePageviews'), ','), 'ga:date', 'ga:pagePath=~' . $partial_uri . '.*');
  }

  function summary_for_date_period($start_date, $end_date)
  {
    return $this->simple_report_query($start_date, $end_date, '', join(array('ga:visits', 'ga:bounces', 'ga:entrances', 'ga:timeOnSite', 'ga:newVisits'), ','));
  }

  function goals_for_date_period($start_date, $end_date, $enabled_goals)
  {
    $goals = array();

    if($enabled_goals[0]) array_push($goals, 'ga:goal1Completions');
    if($enabled_goals[1]) array_push($goals, 'ga:goal2Completions');
    if($enabled_goals[2]) array_push($goals, 'ga:goal3Completions');
    if($enabled_goals[3]) array_push($goals, 'ga:goal4Completions');

    return $this->simple_report_query($start_date, $end_date, 'ga:date', join($goals, ','));
  }
}

?>
