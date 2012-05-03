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

class GADDataModel
{
  var $fatal_error;

  var $start_date;
  var $end_date;
  var $summary_data;
  var $daily_pageviews;
  var $pages;
  var $keywords;
  var $sources;
  var $goal_data;
  var $total_pageviews;

  var $x_axis_labels;
  var $y_axis_labels;
  var $chart_values;
  var $minvalue;
  var $maxvalue; 
  var $total_count;
  var $first_monday_index;

  function GADDataModel()
  {
    $this->__construct();
  }

  function populate_start_end_time($start_date_ts)
  {
    $this->start_date = date('Y-m-d', $start_date_ts);
    $this->end_date = date('Y-m-d');
  }

  function populate_summary_data($ga)
  {
    $this->summary_data = $ga->summary_for_date_period($this->start_date, $this->end_date);
    $error_type = gad_request_error_type($ga);
    if($error_type == 'perm') $this->fatal_error = true;
    else if($error_type == 'retry') $this->summary_data = $ga->summary_for_date_period($this->start_date, $this->end_date);
  }

  function populate_daily_pageviews($ga)
  {
    $this->daily_pageviews = $ga->daily_pageviews_for_date_period($this->start_date, $this->end_date);
    $error_type = gad_request_error_type($ga);
    if($error_type == 'perm') $this->fatal_error = true;
    else if($error_type == 'retry') $this->daily_pageviews = $ga->daily_pageviews_for_date_period($this->start_date, $this->end_date);
  }

  function populate_pages($ga)
  {
    $this->pages = $ga->pages_for_date_period($this->start_date, $this->end_date);
    $error_type = gad_request_error_type($ga);
    if($error_type == 'perm') $this->fatal_error = true;
    else if($error_type == 'retry') $this->pages = $ga->pages_for_date_period($this->start_date, $this->end_date);
  }

  function populate_keywords($ga)
  {
    $this->keywords = $ga->keywords_for_date_period($this->start_date, $this->end_date);
    $error_type = gad_request_error_type($ga);
    if($error_type == 'perm') $this->fatal_error = true;
    else if($error_type == 'retry') $this->keywords = $ga->keywords_for_date_period($this->start_date, $this->end_date);
  }

  function populate_sources($ga)
  {
    $this->sources = $ga->sources_for_date_period($this->start_date, $this->end_date);
    $error_type = gad_request_error_type($ga);
    if($error_type == 'perm') $this->fatal_error = true;
    else if($error_type == 'retry') $this->sources = $ga->sources_for_date_period($this->start_date, $this->end_date);
  }

  function populate_goal_data($ga)
  {
    $goal_data_tmp = $ga->goals_for_date_period($this->start_date, $this->end_date, array(get_option('gad_goal_one') !== false, get_option('gad_goal_two') !== false, get_option('gad_goal_three') !== false, get_option('gad_goal_four') !== false));
    $error_type = gad_request_error_type($ga);
    if($error_type == 'perm') $this->fatal_error = true;
    else if($error_type == 'retry') $goal_data_tmp = $ga->goals_for_date_period($this->start_date, $this->end_date, array(get_option('gad_goal_one') !== false, get_option('gad_goal_two') !== false, get_option('gad_goal_three') !== false, get_option('gad_goal_four') !== false));

    $this->goal_data = array();
    foreach($goal_data_tmp as $gd)
    {
      if(gad_is_assoc($gd))
      {
        foreach($gd as $gk => $gv)
        {
          $this->goal_data[$gk] += $gv;
        }
      }
    }
  }

  function __construct()
  {
    $this->fatal_error = false;

    $start_date_ts = time() - (60 * 60 * 24 * 30); // 30 days in the past

    $this->populate_start_end_time($start_date_ts);

    if(get_option('gad_auth_token') == 'gad_see_oauth')
    {
      $ga = new GALib('oauth', NULL, get_option('gad_oauth_token'), get_option('gad_oauth_secret'), get_option('gad_account_id'), get_option('gad_cache_timeout') !== false ? get_option('gad_cache_timeout') : 60);
    }
    else
    {
      $ga = new GALib('client', get_option('gad_auth_token'), NULL, NULL, get_option('gad_account_id'), get_option('gad_cache_timeout') !== false ? get_option('gad_cache_timeout') : 60);
    }

    $this->populate_summary_data($ga);
    $this->populate_daily_pageviews($ga);
    $this->populate_pages($ga);
    $this->populate_keywords($ga);
    $this->populate_sources($ga);

    if( get_option('gad_goal_one') !== false || get_option('gad_goal_two') !== false ||
        get_option('gad_goal_three') !== false || get_option('gad_goal_four') !== false ) 
    {
      $this->populate_goal_data($ga);
    }

    if($this->fatal_error) return;

    $this->x_axis_labels = '';
    $this->y_axis_labels = '';
    $this->chart_values = '';
    $this->minvalue = 999999999;
    $this->maxvalue = 0;
    $this->total_count = sizeof($this->daily_pageviews);
    $this->total_pageviews = 0;
    $this->first_monday_index = -1;
    $count = 0;

    foreach($this->daily_pageviews as $pageview)
    {
      $current_date = $start_date_ts + (60 * 60 * 24 * $count);
      $day = date('w', $current_date); // 0 = sun 6 = sat

      if( $day == 1 ) // monday
      {
        if( $this->first_monday_index == -1 )
        {
          $this->first_monday_index = $count;
        }
        $this->x_axis_labels .= '|' . urlencode(date('D m/d', $current_date));
        $this->y_axis_labels .= round($count/($this->total_count-1)*100, 2) . ',';
      }

      if($this->minvalue > $pageview) $this->minvalue = $pageview;
      if($this->maxvalue < $pageview) $this->maxvalue = $pageview;

      $this->chart_values .= $pageview . ($count < $this->total_count-1 ? "," : "");
      $count++;
      $this->total_pageviews += $pageview;
    }

    $this->y_axis_labels = substr($this->y_axis_labels, 0, strlen($this->y_axis_labels)-1); // strip off the last ,
  }

  function create_google_chart_url($width, $height)
  {
    return "http://chart.apis.google.com/chart?chs=" . $width . "x" . $height . "&chf=bg,s,FFFFFF00&cht=lc&chco=0077CC&chd=t:" . $this->chart_values . "&chds=" . ($this->minvalue - 20). "," . ($this->maxvalue + 20) . "&chxt=x,y&chxl=0:" . $this->x_axis_labels . "&chxr=1," . $this->minvalue . "," . $this->maxvalue . "&chxp=0," . $this->y_axis_labels . "&chm=V,707070,0," . $this->first_monday_index . ":" . $this->total_count . ":7,1|o,0077CC,0,-1.0,6";
  }
}
?>
