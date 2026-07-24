---
date: "2013-02-28"
description: "Fix missing CSS styles in the WordPress admin with a quick workaround. Change one line of code to restore your dashboard styles instantly."
slug: "fix-wordpress-admin-styles-not-loading"
title: "How to fix WordPress admin styles not loading"
---

<!-- SPIKE-TODO: <script> imports (FormattedDate, Image, createMetadata) removed for spike; restored in Task 8 -->

# {title}

<!-- SPIKE-TODO: <FormattedDate date={date} /> restored in Task 8 -->

If your WordPress admin loads with no CSS, a one-line change can bring it back. File this one away — it won't mean much right now, but you'll be glad you have it when it does.

<!-- SPIKE-TODO: <Image> usage restored in Task 8
<Image
  alt="WordPress admin styles not loading"
  height={513}
  src="https://ty3rozserpuox2as.public.blob.vercel-storage.com/fix-wordpress-admin-styles-not-loading/wordpress-admin-missing-styles-F5grUw0JHvEfq6It4dLBHzRIXklRoy.jpg"
  width={768}
/>
-->

Every admin style was gone. I couldn't tell what was wrong. I reinstalled WordPress a couple of times with no luck, then started searching. Well over an hour of articles and suggested hacks later, nothing had worked. The fix finally turned up buried in a sketchy-looking site — I didn't think to save the URL, so I can't credit the author. But it worked.

One caveat first: I don't encourage hacking WordPress core. In the moment, I wanted my admin back.

In `wp-admin/load-styles.php`, find this line:

```php
error_reporting(0);
```

Change it to this:

```php
error_reporting( E_ALL | E_STRICT );
```

Then refresh the admin screen a few times, and the styles come back.

The change doesn't need to stay. Once the styles return, revert the line and everything keeps working.

A reader let me know that adding this to `wp-config.php`, above any `require_once` calls, also works — no core file involved:

```php
define( 'CONCATENATE_SCRIPTS', false );
define( 'SCRIPT_DEBUG', true );
```

I won't claim this fixes every case of missing admin styles, but it fixed mine. Hopefully it saves you the hour I lost.
