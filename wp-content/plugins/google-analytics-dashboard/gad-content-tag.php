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

require_once(dirname(__FILE__) . '/gad-widget-data.php');

class GADContentTag
{
  function GADContentTag()
  {
    $this->__construct();
  }

  function __construct()
  {
  }

  function register_for_actions_and_filters()
  {
    add_filter('the_content', array(&$this, 'content_tag_filter'), 7);
  }

  function content_tag_filter( $content ) 
  {
    return preg_replace_callback('/\[\s*(pageviews)(:(.*))?\s*\]/iU', array(&$this, 'content_tag_filter_replace'), $content);
  }

  function content_tag_filter_replace($matches)
  {
    $link_uri = substr($_SERVER["REQUEST_URI"], -20);

    switch(strtolower($matches[1]))
    {
      case 'pageviews':
        $data = new GADWidgetData(get_option('gad_auth_token'), get_option('gad_account_id'));

        if(isset($matches[3]) && trim($matches[3]) != '')
        {
          return $data->gad_pageviews_sparkline($link_uri);
        }
        else
        {
          return $data->gad_pageviews_text($link_uri);
        }
        break;
      default:
        return '';
    }
  }
}
?>
