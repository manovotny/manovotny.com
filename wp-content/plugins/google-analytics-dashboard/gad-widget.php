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

global $wp_version;
if (version_compare($wp_version, '2.8', '>=')) 
{

  class GADWidget extends WP_Widget 
  {
    function GADWidget() 
    {
      parent::WP_Widget(false, $name = 'Google Analytics Dashboard');
    }

    function widget($args, $instance) 
    {
      extract($args);
      echo $before_widget;

      $link_uri = substr($_SERVER["REQUEST_URI"], -20);

      echo '<div>';

      switch($instance['data_type'])
      {
        case 'pageviews-sparkline':
            $data = new GADWidgetData();
            echo $data->gad_pageviews_sparkline($link_uri);
          break;
        case 'pageviews-text':
            $data = new GADWidgetData();
            echo $data->gad_pageviews_text($link_uri);
          break;
      }

      echo '</div>';

      echo $after_widget;
    }

    function update($new_instance, $old_instance) 
    {
      $old_instance['data_type'] = strip_tags($new_instance['data_type']);
      return $old_instance;
    }

    function form($instance) 
    {
      $field_id = $this->get_field_id('data_type');
      $field_name = $this->get_field_name('data_type');

      $widget_types = array('pageviews-sparkline' => 'Pageviews - Sparkline',
                            'pageviews-text' => 'Pageviews - Text');

?>
      <p>
        <label for="'. $field_id .'">
          Data Type: 
          <select id="<?php echo $field_id; ?>" name="<?php echo $field_name; ?>">
<?php
      foreach($widget_types as $key => $value)
      {
        $selected_value = esc_attr($instance['data_type']) == $key ? 'selected' : '';
        echo "<option value='$key' $selected_value>$value</option>";
      }
?>
          </select>

        </label>
      </p>
<?php
    }
  }

}

?>
