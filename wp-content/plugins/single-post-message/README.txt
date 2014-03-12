=== Single Post Message ===
Contributors: tommcfarlin
Donate link: http://tommcfarlin.com/projects/post-message
Tags: post
Requires at least: 3.4.1
Tested up to: 3.8.0
Stable tag: 2.0.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Easily add short messages and announcements above posts. Displays in the RSS feed and on the blog.

== Description ==

Single Post Message is a plugin that allows you to add custom messages, announcements, and notices to individual posts. It's
styled to grab the reader's attention and will render in both the browser *and* in RSS readers.

Single Post Message...

* Supports the use of HTML tags in the message content
* Provides a live preview for what your announcement will look like
* Is available directly under the post content editor
* Is fully localized and ready for translation

For more information or to follow the project, check out the [project page](http://tommcfarlin.com/single-post-message).

== Installation ==

= Using The WordPress Dashboard =

1. Navigate to the 'Add New' Plugin Dashboard
1. Select `single-post-message.zip` from your computer
1. Upload
1. Activate the plugin on the WordPress Plugin Dashboard

= Using FTP =

1. Extract `single-post-message.zip` to your computer
1. Upload the `single-post-messsage` directory to your `wp-content/plugins` directory
1. Activate the plugin on the WordPress Plugins dashboard

== Screenshots ==

1. The Single Post Message editor and preview located below the content editor on the 'Add New Post' and 'Edit Post' screen
2. The Single Post Message rendered between the title and the post content

== Changelog ==

= 2.0.0 =
* Implementing the singleton pattern
* Adding a file responsible for invoking an instance of the plugin
* Adding Portuguese translations (props Celso Azevedo)
* WordPress 3.8 compatibility

= 1.2.2 =
* Fixing a minor problem displaying text above the post message textarea

= 1.2.1 =
* Minor update to make sure that the post message only displays below the content in the single view
* Update the localization files

= 1.2 =
* Adding the option to place the notice at the top or the bottom of the post content
* Updating features to be compliant with newer versions of PHP
* Updating localization calls

= 1.1 =
* Updating the donate link
* Updating the project page URL

= 1.0 =
* Initial release

== Development Information ==

Single Post Message was built using...

* [WordPress Coding Standards](http://codex.wordpress.org/WordPress_Coding_Standards)
* Native WordPress API's (specifically the [Plugin API](http://codex.wordpress.org/Plugin_API))
* [CodeKit](http://incident57.com/codekit/) using [LESS](http://lesscss.org/), [JSLint](http://www.jslint.com/lint.html), and [jQuery](http://jquery.com/)
* Respect for WordPress bloggers everywhere :)