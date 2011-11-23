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

jQuery(document).ready(function() 
{
  if( jQuery('#gad_dashboard_placeholder').length > 0 )
  {
    load_dashboard_display();
  }

  var count = 0;
  jQuery('.gad_ppp_loading').each(function()
  {
    var post_id = jQuery(this).attr('id').substring('gad_ppp_'.length);
    load_post_or_page_display(post_id, count);
    count++;
  });
});

function load_post_or_page_display(post_id, count)
{
  var gadsack = new sack(ajaxurl);
  gadsack.execute = false;
  gadsack.method = 'GET';
  gadsack.setVar( "action", "gad_fill_ppp" );
  gadsack.setVar( "pid", post_id );
  gadsack.setVar( "count", count );
  gadsack.encVar( "cookie", document.cookie, false );
  gadsack.onError = function() 
  { 
    jQuery('#gad_ppp_' + post_id).hide().slideDown('normal', function()
    {
      jQuery('#gad_dashboard_placeholder').html('Could not load.');
    });
  };
  gadsack.element = 'gad_ppp_' + post_id;
  gadsack.runAJAX();
}

function load_dashboard_display()
{
  var gadsack = new sack(ajaxurl);
  gadsack.execute = false;
  gadsack.method = 'GET';
  gadsack.setVar( "action", "gad_fill_dp" );
  gadsack.encVar( "cookie", document.cookie, false );
  gadsack.onError = function() 
  { 
    jQuery('#gad_dashboard_placeholder').hide().slideDown('normal', function()
    {
      jQuery(this).css('display', '');
      jQuery('#gad_dashboard_placeholder').html('Could not load Google Analytics data.');
    });
  };
  gadsack.onCompletion = function()
  {
    jQuery('#gad_dashboard_placeholder').hide();
    jQuery('#gad_dashboard_placeholder').html(gadsack.response);
    jQuery('#gad_dashboard_placeholder').slideDown('normal', function()
    {
      jQuery(this).css('display', '');

      jQuery("#toggle-base-stats").click(function(event) 
      {
        toggle_stat_display("base-stats");
        return false; 
      });

      jQuery("#toggle-goal-stats").click(function(event) 
      {
        toggle_stat_display("goal-stats");
        return false; 
      });

      jQuery("#toggle-extended-stats").click(function(event) 
      {
        toggle_stat_display("extended-stats");
        return false; 
      });
    });
  };
  gadsack.runAJAX();
}

function toggle_stat_display(name)
{
  var link = jQuery("#" + name);

  var gadsack = new sack(ajaxurl);
  gadsack.execute = true;
  gadsack.method = 'POST';
  gadsack.setVar( "action", "gad_set_preference" );
  gadsack.setVar( "pi", name );
  gadsack.setVar( "pv", link.css('display') == 'none' ? "hide" : "show" );
  gadsack.encVar( "cookie", document.cookie, false );
  gadsack.onError = function() { alert('Could not save preference.' )};
  gadsack.runAJAX();

  if(link.css('display') == 'none')
  {
    link.show();
    jQuery("#toggle-" + name).html("(hide)");
  }
  else
  {
    link.hide();
    jQuery("#toggle-" + name).html("(show)");
  }
}
