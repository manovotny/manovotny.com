---
title: How To Setup and Configure PhpStorm, Xdebug, and MAMP for Debugging
description: Learn how to setup and configure PhpStorm for debugging with MAMP and Xdebug.
layout: page
---

# How To Setup and Configure PhpStorm, Xdebug, and MAMP for Debugging

{% include date.html %}

I must have read 8 - 10 articles scattered about the internet to finally get [PhpStorm](https://www.jetbrains.com/phpstorm/) setup to do debugging with [Xdebug](http://xdebug.org/) and [MAMP](http://www.mamp.info/). Each article seemed to be missing one key piece of the puzzle. After a few days mucking with everything, I was able finally able to get it figured out.

So your initial setup isn’t as frustrating as mine was, I thought I'd share how I was able to get it all wired up and hopefully save you some time.

The screenshots below are from MAMP PRO 3 and PhpStorm 8. The same process should also work for MAMP PRO 2 - 4 and for PhpStorm 7 - 2016.2. I also assume that most of this is applicable to the regular, non-pro version of MAMP, though I have not tested it.

## Xdebug

Fortunately, Xdebug is already included with MAMP, so there is nothing we need to install in addition to MAMP itself. We simply need to enable it within MAMP.

## MAMP

You can enable Xdebug within MAMP by checking the Activate Xdebug option under the PHP tab. And that should be it, at least for MAMP 3.

![Activate Xdebug in MAMP]({{site.url}}/images{{page.url}}mamp-pro-activate-xdebug.jpg)

*For most of you reading this, you can just stop here and move onto the PhpStorm section.*

However, if you are using an older verion of MAMP, or if you want to ensure that MAMP 3 is indeed configured correctly, you’ll first need to identify what version of PHP you’re using with MAMP. Simply navigate to the PHP section in MAMP and take note of what you’re default PHP version is.

![MAMP default PHP version]({{site.url}}/images{{page.url}}mamp-pro-default-php-version.jpg)

If you’re running a more advanced setup in MAMP PRO, with different PHP versions for each hosts, head to your Hosts section to see what PHP version you’re running for the particular host you’re wanting to debug.

![MAMP PHP versions per host]({{site.url}}/images{{page.url}}mamp-pro-hosts-php-version.jpg)

With the PHP version identified, you’ll want to open and edit the corresponding `php.ini` file to enable Xdebug by navigating to `File > Edit Template > PHP > PHP [VERSION] php.ini`.

With the `php.ini` file open, you'll want to find the `[xdebug]` section, which is usually at the very bottom of the file.

At the very minimum, you’ll want to have the following entered and uncommented.

```
xdebug.remote_autostart=1
xdebug.remote_enable=1
xdebug.remote_host=localhost
xdebug.remote_port=9000
```

MAMP 2 used to require a bit more configuration, specifically the definition of a `zend_extension`, so you might want to add all of the following if the minimum configuration doesn’t work for you or if you want to enable things like coverage and profiling capabilities.

*Please note that the `zend_extensions` path to the `xdebug.so` file will vary depending on the PHP version you're using, so make sure you look up the correct path on your filesystem.*

```
zend_extension="/Applications/MAMP/bin/php/php5.3.29/lib/php/extensions/no-debug-non-zts-20090626/xdebug.so"
xdebug.coverage_enable=1
xdebug.default_enable=1
xdebug.profiler_enable=1
xdebug.profiler_output_dir="/tmp"
xdebug.remote_autostart=1
xdebug.remote_enable=1
xdebug.remote_host=localhost
xdebug.remote_port=9000
```

## PhpStorm

With PhpStorm open, navigate to `Run > Edit Configurations...`.

If I were to type out everything you’d need to do, it’d be very lengthy. Instead, I created a short GIF to demonstrate what needs to happen. In short, we need to point PhpStorm to the server we want to debug.

You’ll use whatever host and port you’ve configured within MAMP. For this example, I’ve created the host `iowagirleats.dev` in MAMP PRO (which is also shown in the screenshots above) and I customized my MAMP Apache port to run on port `80`.

If you're running just MAMP (the non-pro version) or if you didn't create a custom host, or if you didn't customize the ports within MAMP, then you'd probably be using `localhost` with a port of `8888` for the configuration below.

![PhpStorm Xdebug configuration]({{site.url}}/images{{page.url}}phpstorm-php-xdebug-configuration.gif)

Once this is complete, you should see the Debug configuration you just created in the upper right part of PhpStorm.

![PhpStorm debug icon]({{site.url}}/images{{page.url}}phpstorm-debug.jpg)

And that should be it!

Set a breakpoint in PhpStorm by clicking in the margin of an open PHP file, click the “bug” next to the configuration you just created to start debugging. If everything is wired up correctly, you should hit your breakpoint.

Gone are the days of the antiquated `var_dump` as you fumble around to discover what is going on!

![PhpStorm debug breakpoint example]({{site.url}}/images{{page.url}}phpstorm-breakpoint-example.jpg)
