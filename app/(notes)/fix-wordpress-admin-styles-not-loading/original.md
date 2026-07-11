# How To Fix WordPress Admin Styles Not Loading

This is one of those articles you tuck away in Evernote or your favorite “read it later” app because it will most likely not mean anything to you right this moment, but when it does happen, you will be glad you saved this.

When I got my new computer, I took the opportunity to clean up my local development environment. That meant a fresh installation of MAMP Pro and some new databases.

I got everything setup and I was settling in for a good, long second shift when I saw this in my WordPress admin.

<Image
  alt="WordPress admin styles not loading"
  height={513}
  src="https://ty3rozserpuox2as.public.blob.vercel-storage.com/fix-wordpress-admin-styles-not-loading/wordpress-admin-missing-styles-F5grUw0JHvEfq6It4dLBHzRIXklRoy.jpg"
  width={768}
/>

All the WordPress admin styles were not loading.

This was not what I had planned for my evening… _sigh_

I wasn’t sure what was going on… Could it be something wonky with my new computer? Was it due to updating to the shiny new WordPress 3.5? I tried to reinstall WordPress a couple of times to no avail, so intense Google searching ensued.

I cannot remember how many articles I read or how many suggested hacks I attempted. I do know it took well over an hour and none of them worked. Then I found something buried deep in some sketchy looking site, but it worked!

I am not trying to hold out on giving credit to the person who suggested it. I simply did not think to save the URL at the time. But this is what the article suggested.

And let me be clear… I do not encourage WordPress core hacks, but in the moment, I just wanted to fix it and move on with my small window of time I had to work on my hotfix.

In the wp-admin/load-styles.php file, find this line of code…

```php
error_reporting(0);
```

…and change it to this…

```php
error_reporting( E_ALL | E_STRICT );
```

…and then simply refresh your WordPress admin screen a few times. You should see the WordPress admin CSS styles come back to normal.

That’s it! And you do not even have to leave this WordPress core modification in place. Once the admin styles come back, you can revert the line of code back to what it was and you should still have smooth sailing after that.

Bizarre…

Dan in the comments also said that simply adding the code below to your wp-config.php file will also do the same trick. It certainly feels better than modifying the WordPress core, even if it is just temporarily.

So if you ever run across this, perhaps it can save you some time and get you back on track. I am not saying this will work in all cases of the WordPress admin not loading the styles, but this is what worked for me.

I have no idea why this works, so if you have a more technical or detailed explanation of why, then I would love to hear so in the comments.

I have never had this happen again, otherwise, I will dig in much deeper next time to see if I can identify a root cause.
