# Changelog

## 3.1 (October 3rd, 2012)

### Core Theme

* Adds ability to override ```custom_comment``` function in child themes.
* Adds meta description for category / archive pages.
* Adds content / description to link post format.
* Adds dynamic sizing to link post format.
* Adds dynamic sizing to video post format.
* Adds title attribute to navigation menu items.
* Adds SEO warning message for long post titles.
* Adds auto-generation of image alt tags for SEO friendliness.
* Adds Google+ avatar to post Standard SEO search results preview.
* Adds LinkedIn, SoundCloud, and Foursquare social icons.
* Fixes PHP error in ```standard_has_logo``` function.
* Fixes RSS feeds doubling up site title.
* Fixes plugin CSS loading order.
* Fixes [Google Rich Snippets Tool](http://www.google.com/webmasters/tools/richsnippets) issues.
* Fixes responsive video issues in comments.
* Fixes breadcrumbs showing on static home pages.
* Fixes issues with admin offline message and footer site link URLs.
* Fixes footer widgets and footer menu not being visible to logged in users in offline mode.
* Fixes dark contrast author comments.
* Fixes dark contrast Jetpack comments.
* Fixes dark contrast status post format.
* Fixes dark contrast footer widgets.
* Fixes HTTPS issues with social icons.
* Fixes permalink issues with author archives.
* Fixes Bootstrap's span class rule.
* Fixes localization / translation issues for admin site icon description, post SEO instructions, and comment reply fields.
* Fixes WP-PageNavi styles.
* Fixes responsive landscape rotation issues on mobile devices.
* Fixes RTL issues with logo, navigation, lists, blockquotes, footer credit, and status post format.
* Fixes header preview issues with logo not positioning correctly.
* Fixes IE8 navigation and VideoPress issues.
* Updates language files.

### 300x250 Ad Widget

* Fixes 300x250 ads not working with "accessibility mode" enabled.

### 468x60 Ad Widget

* Fixes 468x60 ads not working with "accessibility mode" enabled.

### Activity Tabs Widget

* Fixes localization / translation issues.

### Google Custom Search Widget

* Adds support for latest version of Google Custom Search.
* Adds Google Custom Search to 404 page.

### Change Set

**Added**

* images/social/small/foursquare.png
* images/social/small/linkedin.png
* images/social/small/soundcloud.png
* js/admin.post.js

**Modified**

* 404.php
* css/admin.css
* css/admin.header.css
* css/theme.contrast-light.css
* footer.php
* functions.php
* header.php
* index.php
* image.php
* js/admin.header.js
* js/theme.js
* js/theme.videopress.js
* lang/standard.mo
* lang/standard.po
* lib/activity/views/admin.php
* lib/breadcrumbs/standard_breadcrumbs.php
* lib/google-custom-search/css/admin.css
* lib/google-custom-search/css/widget.css
* lib/google-custom-search/lib/Standard_Google_Custom_Search.template.php
* lib/google-custom-search/views/admin.php
* lib/google-custom-search/view/widget.php
* lib/seo/css/admin.css
* lib/seo/plugin.php
* lib/seotitles/standard_seotitles.php
* lib/Standard_Nav_Walker.class.php
* lib/standard-ad-125x125/plugin.php
* lib/standard-ad-300x250/js/admin.js
* lib/standard-ad-300x250/plugin.php
* lib/standard-ad-billboard/js/admin.js
* loop.php
* loop-image.php
* loop-link.php
* loop-quote.php
* loop-status.php
* loop-video.php
* page.php
* rtl.css
* social-networking.php
* style.css
* template-archives.php
* template-fullwidth.php
* template-sitemap.php

## 3.0.2 (July 19th, 2012)

### Core Theme

* Fixes fonts not scaling when browser zooms.
* Fixes header image positioning when using menu below header.
* Fixes comments in loop-quote.php.

### Social Influence Widget

* Fixes issues with counts not expiring and automatically updating.

### 125x125 Ad Widget

* Fixes issues with media uploader not firing in Mac Firefox.

### Full-Width Template

* Adds comments to template.

### Change Set

**Modified**

* lang/standard.mo
* lang/standard.po
* lib/influence/plugin.php
* lib/standard-ad-125x125/css/admin.css
* loop-quote.php
* style.css
* template-fullwidth.php

## 3.0.1 (July 9th, 2012)

### Core Theme

* Adds compatibility with Platinum SEO.
* Adds support for zooming on mobile devices.
* Adds ability to reset the social icons. Ideal for preview / beta users who now show missing images.
* Adds two "helper functions" to assist header improvements.
* Adds link to header image when no logo is present.
* Adds support for displaying image post format posts in RSS.
* Adds support to navigation walker open menu links in new tabs when set in the menu dashboard.
* Fixes an issue with "Sitemap" page template being disabled.
* Fixes VideoPress related imports for child themes.
* Fixes contrast import for child themes.
* Fixes social icon delete issues in Mac Firefox.
* Fixes an issue with the logo not working in the header.
* Fixes editor-style.css to reflect how unordered lists look on published posts.
* Fixes footer privacy policy link to adhere to permalink settings.
* Fixes footer privacy policy improperly showing a comma.
* Fixes site icon admin issue.
* Fixes theme customizer logo display issue.
* Fixes Twitter social icon to match new branding.
* Improves version detection.
* Improves core theme JavaScript functionality to support child themes that disable responsive functionality.
* Improves logo, header images, header text, and header ad 
combinations.
* Improves SEO of header elements.
* Promotes two "helper functions" to "custom filters" in functions.php.
* Removes unused images.

### Personal Image Widget

* Fixes issues with multiple instances.
* Fixes images not centering if width is less than 300px wide.
* Fixes issues with placeholder not displaying in Firefox.

### Social Influence Widget

* Improves communication between Standard and Twitter, Facebook, and FeedBurner.
* Improves caching and value serialization.
* Improves clearing out old values.

### 125x125 Ad Widget

* Fixes class names to prevent ad-blocking software from hiding advertisements.

### 300x250 Ad Widget

* Fixes directory name to prevent ad-blocking software from hiding advertisements.
* Moves misplaced styles from styles.css to widget.css.

### 468x60 Ad Widget

* Fixes directory name to prevent ad-blocking software from hiding advertisements.
* Fixes issues with placeholder not displaying in Firefox.
* Moves misplaced styles from styles.css to widget.css.

### Change Set

**Modified**

* css/admin.css
* css/editor-style.css
* functions.php
* footer.php
* header.php
* images/social/small/twitter.png
* js/admin.header.js
* js/admin.media-upload.js
* js/admin.social-options.js
* js/admin.template-sitemap.js
* js/theme.js
* lang/standard.mo
* lang/standard.po
* lib/ad-125x125 → lib/standard-ad-125x125
* lib/ad-300x250 → lib/standard-ad-300x250
* lib/ad-468x60 → lib/standard-ad-billboard
* lib/influence/plugin.php
* lib/influence/views/widget.php
* lib/personal-image/css/admin.css
* lib/personal-image/css/widget.css
* lib/personal-image/js/admin.js
* lib/Standard_Nav_Walker.class.php
* style.css

**Removed**

* images/bg-admin.png
* images/default-gravatar.jpg
* images/img-brand.png
* images/img-logo.png

## 3.0 (June 29th, 2012)

### Documentation

* [Initial release](http://docs.8bit.io/)

### Theme

* [Initial Release](http://standardtheme.com)