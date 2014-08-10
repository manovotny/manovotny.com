<?php

add_action( 'wp_head', 'wp_google_analytics_add_tracking_code' );

/**
 * Adds Google Analytics tracking code to the head of site.
 */
function wp_google_analytics_add_tracking_code() {

    $tracking_id = WP_Google_Analytics::get_instance()->get_tracking_id();

    if ( ! empty( $tracking_id ) ) {

        ?>
        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

            ga('create', '<?php echo $tracking_id ?>', 'auto');
            ga('send', 'pageview');

        </script>
        <?php

    }

}