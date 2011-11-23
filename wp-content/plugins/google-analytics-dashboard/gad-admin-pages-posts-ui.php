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

class GADAdminPagesPostsUI
{
  function GADAdminPagesPostsUI()
  {
    $this->__construct();
  }

  function __construct()
  {
  }

  function display_posts_pages_custom_column($cvals, $minvalue, $maxvalue, $pageviews, $exits, $uniques)
  {
?>
      <table style="padding:0">
        <tr>
          <td style="border:0">
            <img width="90" height="30" src="http://chart.apis.google.com/chart?chs=90x30&cht=ls&chf=bg,s,FFFFFF00&chco=0077CC&chd=t:<?php echo $cvals; ?>&chds=<?php echo $minvalue; ?>,<?php echo $maxvalue; ?>"/>
          </td>
          <td style="border:0; padding:0">
            <?php echo number_format($pageviews); ?> pageviews<br/>
            <?php echo number_format($exits); ?> exits<br/>
            <?php echo number_format($uniques); ?> uniques<br/>
          </td>
        </tr>
      </table>
<?php
  }
}
?>
