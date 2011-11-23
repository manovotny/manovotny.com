=== Google Analytics Dashboard ===
Contributors: Carson McDonald
Tags: google, analytics, google analytics, dashboard, widget
Requires at least: 2.8
Tested up to: 3.1.0
Stable tag: 2.0.3

This plugin will give you access to your Google Analytics data directly inside your WordPress blog.

== Description ==

[Google Analytics Dashboard](http://www.ioncannon.net/projects/google-analytics-dashboard-wordpress-widget/) gives you the ability to view your Google Analytics data in your Wordpress dashboard. You can also alow other users to see the same dashboard information when they are logged in or embed parts of the data into posts or as part of your theme.

This plugin does not provide the tracking code for Google Analytics. For that you will need to use a plugin like [Google Analytics for Wordpress](http://wordpress.org/extend/plugins/google-analytics-for-wordpress/ "Google Analytics for Wordpress").

There is a [Google Group](http://groups.google.com/group/gad-wordpress-plugin "Google Group for Google Analytics Dashboard plugin") for this plugin that can be used for questions and feature requests.

== Installation ==

= Install =

1. Unzip the zip file.
2. Upload the the entire unziped folder to the wp-contents/plugins folder.

= Activate =

1. In your WordPress administration, go to the Plugins page.
2. Activate the plugin. You will now have a new Google Analytics Dashboard option under Settings.
3. Go to the new Google Analytics Dashboard page and log in using your Google Analytics credentials.
4. After authenticating with your Google Analytics account you will need to select one of your analytics profiles to display.

Please note that [SimpleXML](http://us3.php.net/manual/en/book.simplexml.php "SimpleXML") is needed for this plugin. It is enabled by default in PHP version 5 but some hosting environments may have it turned off. The plugin will alert you if SimpleXML is not available.

If you do not choose a level for access to the dashboard view it will only be
visible to the admin user.

If you have goals configured in your analytics account you may label them in
the dashboard so they can be viewed along with the base and extended stats.
Only goals with descriptions will display.

== Screenshots ==

1. This is an example of the main dashboard widget.
2. This is an example of sparklines and data for each post.
3. This is the screen that you see before you have logged into your Google Analytics account.
4. This is the screen you will see after you have logged into your Google Analytics account.
5. This is an example of embedding a sparkline into a post.
6. This is the Google Analytics Dashboard widget configuration.

== Frequently Asked Questions ==

= I'm getting the error "Cannot instantiate non-existent class: simplexmlelement..." =

The plugin needs SimpleXML support for PHP compiled in. This is compiled in by
default with PHP 5. There is a backport for PHP 4 found here:
http://sourceforge.net/projects/ister4framework/

== Change Log ==

= 2.0.3 =

* Changed included javascript to use ajaxurl instead of getting it from calling a php function.
* Fixed date range display.

= 2.0.2 =

* Added more error checking to curl responses
* Changed warning when options haven't been saved on the options page
* Use newer version of admin URL generator for Wordpress 3.0 and later
* Use plugins_url to locate the Javascript needed in the dashboard
* Added ability to turn off stats display on posts/pages list

= 2.0.1 =

* Fixed an issue caused when other plugins include the same OAuth library

= 2.0.0 =

* Stop unlink warnings when caching won't work
* Refactored code so that major parts are split into classes
* Refactored code to better seperate UI code
* Fixed mime type not being sent correctly for admin area javascript file
* Made the dashboard panel load asynchronously so the entire dashboard doesn't block while it is loading
* Made the ayanlytics column in posts and pages not block the loading of the page
* Use transient API support with wordpress version 2.8+
* Fix bug in wordpress version checking
* Added ability to support multiple analytics sources
* Added support for Google OAuth logins

= 1.0.6 =

* Goal % calculation needed to be * 100
* Fixed missnamed variable on retry condition
* Fix adding goal name to goal that doesn't exist
* Display error if curl isn't installed
* Applied fix to keep error reporting from corrupting javascript output
* Add option to clear out all settings
* Make any option change clear cache

= 1.0.5 =

* Added goal tracking
  http://code.google.com/apis/analytics/docs/gdata/gdataReferenceDimensionsMetrics.html#m6Goals
* Make cache timeout a configuration setting
* Add warning message to configuration panel when caching can't be done
* Fixed missing single quotes for print scripts action


== Usage ==

= Embedding =

To embed Google Analytics data into a post use the following syntax: [stattype: option, option, ...]. 

The currently available stat types are:

* pageviews - options: sparkline

Examples:

The following will be replaced by the number of pageviews for the current page or post over the past 30 days when embedded in that page or post:

[pageviews] 

The following will be replaced by a sparkline that represents the number of pageviews for the current page or post over the past 30 days when embedded in that page or post:

[pageviews: sparkline] 

There is also a widget that can embed analytics on every page, just check out the widgets section. Widgets are only supported with Wordpress 2.8 and above.

If you want to embed the analytics directly in a theme you can also call them
directly. Here is an example of what you would would use:

&lt;?php
$data = new GADWidgetData();
echo $data->gad_pageviews_sparkline(substr($_SERVER["REQUEST_URI"], -20));
?>
