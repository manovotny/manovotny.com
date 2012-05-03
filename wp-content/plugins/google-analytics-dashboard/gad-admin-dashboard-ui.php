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

require_once(dirname(__FILE__) . '/gad-data-model.php');

class GADAdminDashboardUI
{
  var $ga_data;

  function GADAdminDashboardUI()
  {
    $this->__construct();
  }

  function __construct()
  {
  }

  function display_all($bs_toggle_option, $gs_toggle_option, $es_toggle_option)
  {
?>

  <!--[if IE]><style>
  .ie_layout {
    height: 0;
    he\ight: auto;
    zoom: 1;
  }
  </style><![endif]-->

    <div style="text-align: center;">

      <?php $this->display_chart(); ?>

      <?php $this->display_base_stats($bs_toggle_option); ?>

      <?php
        if( get_option('gad_goal_one') !== false || get_option('gad_goal_two') !== false ||
            get_option('gad_goal_three') !== false || get_option('gad_goal_four') !== false ) 
        {
          $this->display_goals($gs_toggle_option);
        }
      ?>

      <?php $this->display_extended_stats($es_toggle_option); ?>

    </div>

<?php
  }

  function display_chart()
  {
?>

    <div style="padding-bottom: 5px;">
      <?php echo $this->ga_data->start_date ?> to <?php echo $this->ga_data->end_date ?> <br/>
      <img width="450" height="200" src="<?php echo $this->ga_data->create_google_chart_url(450, 200); ?>"/>
    </div>

<?php
  }

  function display_base_stats($bs_toggle_option)
  {
?>

    <div style="position: relative; padding-top: 5px;" class="ie_layout">
      <h4 style="position: absolute; top: 6px; left: 10px; background-color: #fff; padding-left: 5px; padding-right: 5px;">Base Stats <a id="toggle-base-stats" href="#">(<?php echo $bs_toggle_option; ?>)</a></h4>
      <hr style="border: solid #eee 1px"/><br/>
    </div>

    <div>
      <div id="base-stats" <?php if($bs_toggle_option == 'show') echo 'style="display: none"'; ?>>
      <div style="text-align: left;">
        <div style="width: 50%; float: left;">
          <table>
            <tr><td align="right"><?php echo number_format($this->ga_data->summary_data['value']['ga:visits']); ?></td><td></td><td>Visits</td></tr>
            <tr><td align="right"><?php echo number_format($this->ga_data->total_pageviews); ?></td><td></td><td>Pageviews</td></tr>
            <tr><td align="right"><?php echo (isset($this->ga_data->summary_data['value']['ga:visits']) && $this->ga_data->summary_data['value']['ga:visits'] > 0) ? round($this->ga_data->total_pageviews / $this->ga_data->summary_data['value']['ga:visits'], 2) : '0'; ?></td><td></td><td>Pages/Visit</td></tr>
          </table>
        </div>
        <div style="width: 50%; float: right;">
          <table>
            <tr><td align="right"><?php echo (isset($this->ga_data->summary_data['value']['ga:entrances']) && $this->ga_data->summary_data['value']['ga:entrances'] > 0) ? round($this->ga_data->summary_data['value']['ga:bounces'] / $this->ga_data->summary_data['value']['ga:entrances'] * 100, 2) : '0'; ?>%</td><td></td><td>Bounce Rate</td></tr>
            <tr><td align="right"><?php echo (isset($this->ga_data->summary_data['value']['ga:visits']) && $this->ga_data->summary_data['value']['ga:visits']) ? $this->convert_seconds_to_time($this->ga_data->summary_data['value']['ga:timeOnSite'] / $this->ga_data->summary_data['value']['ga:visits']) : '00:00:00'; ?></td><td></td><td>Avg. Time on Site</td></tr>
            <tr><td align="right"><?php echo (isset($this->ga_data->summary_data['value']['ga:visits']) && $this->ga_data->summary_data['value']['ga:visits'] > 0) ? round($this->ga_data->summary_data['value']['ga:newVisits'] / $this->ga_data->summary_data['value']['ga:visits'] * 100, 2) : '0'; ?>%</td><td></td><td>% New Visits</td></tr>
          </table>
        </div>
        <br style="clear: both"/>
      </div>
      </div>

    </div>

<?php
  }

  function display_goals($gs_toggle_option)
  {
?>
    <div style="position: relative; padding-top: 5px;" class="ie_layout">
      <h4 style="position: absolute; top: 6px; left: 10px; background-color: #fff; padding-left: 5px; padding-right: 5px;">Goals <a id="toggle-goal-stats" href="#">(<?php echo $gs_toggle_option; ?>)</a></h4>
      <hr style="border: solid #eee 1px"/><br/>
    </div>

    <div>
      <div id="goal-stats" <?php if($gs_toggle_option == 'show') echo 'style="display: none"'; ?>>
      <div style="text-align: left;">
        <div style="width: 50%; float: left;">
          <table>
            <?php
              if( get_option('gad_goal_one') )
              {
                echo '<tr><td>' . get_option('gad_goal_one') . '</td><td width="20px">&nbsp;</td><td>' . $this->ga_data->goal_data['ga:goal1Completions'] . ' (' . round($this->ga_data->goal_data['ga:goal1Completions'] / $this->ga_data->summary_data['value']['ga:visits'] * 100, 2) . '%)</td></tr>';
              }
              if( get_option('gad_goal_two') !== false )
              {
                echo '<tr><td>' . get_option('gad_goal_two') . '</td><td width="20px">&nbsp;</td><td>' . $this->ga_data->goal_data['ga:goal2Completions'] . ' (' . round($this->ga_data->goal_data['ga:goal2Completions'] / $this->ga_data->summary_data['value']['ga:visits'] * 100, 2) . '%)</td></tr>';
              }
            ?>
          </table>
        </div>
        <div style="width: 50%; float: right;">
          <table>
            <?php
              if( get_option('gad_goal_three') !== false )
              {
                echo '<tr><td>' . get_option('gad_goal_three') . '</td><td width="20px">&nbsp;</td><td>' . $this->ga_data->goal_data['ga:goal3Completions'] . ' (' .  round($this->ga_data->goal_data['ga:goal3Completions'] / $this->ga_data->summary_data['value']['ga:visits'] * 100, 2) . '%)</td></tr>';
              }
              if( get_option('gad_goal_four') !== false ) 
              {
                echo '<tr><td>' . get_option('gad_goal_four') . '</td><td width="20px">&nbsp;</td><td>' . $this->ga_data->goal_data['ga:goal4Completions'] . ' (' .  round($this->ga_data->goal_data['ga:goal4Completions'] / $this->ga_data->summary_data['value']['ga:visits'] * 100, 2) . '%)</td></tr>';
              }
            ?>
          </table>
        </div>
        <br style="clear: both"/>
      </div>
      </div>
    </div>
<?php
  }

  function display_extended_stats($es_toggle_option)
  {
?>

    <div style="position: relative; padding-top: 5px;" class="ie_layout">
      <h4 style="position: absolute; top: 6px; left: 10px; background-color: #fff; padding-left: 5px; padding-right: 5px;">Extended Stats <a id="toggle-extended-stats" href="#">(<?php echo $es_toggle_option; ?>)</a></h4>
      <hr style="border: solid #eee 1px"/><br/>
    </div>

    <div>
      <div id="extended-stats" <?php if($es_toggle_option == 'show') echo 'style="display: none"'; ?>>
        <div style="text-align: left; font-size: 90%;">
          <div style="width: 50%; float: left;">

            <h4 class="heading"><?php echo __( 'Top Posts' ); ?></h4>

            <div style="padding-top: 5px;">
              <?php
                  $z = 0;
                  foreach($this->ga_data->pages as $page)
                  {
                    $url = $page['value'];
                    $title = $page['children']['value'];
                    $page_views = $page['children']['children']['ga:pageviews'];
                    echo '<a href="' . $url . '">' . $title . '</a><br/> <div style="color: #666; padding-left: 5px; padding-bottom: 5px; padding-top: 2px;">' . $page_views . ' views</div>';
                    $z++;
                    if($z > 10) break;
                  }
              ?>
            </div>
          </div>

          <div style="width: 50%; float: right;">
            <h4 class="heading"><?php echo __( 'Top Searches' ); ?></h4>

            <div style="padding-top: 5px; padding-bottom: 15px;">
              <table width="100%">
                <?php
                    $z = 0;
                    foreach($this->ga_data->keywords as $keyword => $count)
                    {
                      if($keyword != "(not set)")
                      {
                        echo '<tr>';
                        echo '<td>' . $count . '</td><td>&nbsp;</td><td> ' . $keyword . '</td>';
                        echo '</tr>';
                        $z++;
                      }
                      if($z > 10) break;
                    }
                ?>
              </table>
            </div>

            <h4 class="heading"><?php echo __( 'Top Referers' ); ?></h4>

            <div style="padding-top: 5px;">
              <table width="100%">
                <?php
                    $z = 0;
                    foreach($this->ga_data->sources as $source => $count)
                    {
                      echo '<tr>';
                      echo '<td>' . $count . '</td><td>&nbsp;</td><td> ' . $source . '</td>';
                      echo '</tr>';
                      $z++;
                      if($z > 10) break;
                    }
                ?>
              </table>
            </div>
          </div>
          <br style="clear: both"/>
        </div>
      </div>

    </div>

<?php
  }

  /**
   * Takes a time in seconds and turns it into a string with the format
   * of hours:minutes:seconds
   *
   * @return string in the format hours:minutes:seconds
   */
  function convert_seconds_to_time($time_in_seconds)
  {
    $hours = floor($time_in_seconds / (60 * 60));
    $minutes = floor(($time_in_seconds - ($hours * 60 * 60)) / 60);
    $seconds = $time_in_seconds - ($minutes * 60) - ($hours * 60 * 60);

    return sprintf('%02d:%02d:%02d', $hours, $minutes, $seconds);
  }
}
?>
