<?php

class Manovotny_Google_Analytics {

    /* Properties
    ---------------------------------------------------------------------------------- */

    /**
     * Instance of the class.
     *
     * @var Manovotny_Google_Analytics
     */
    protected static $instance = null;

    /* Constructor
    ---------------------------------------------------------------------------------- */

    /**
     * Initialize class.
     */
    public function __construct() {

        add_filter( 'wp_google_analytics_tracking_id', array( $this, '__filter_tracking_id' ) );

    }

    /* Public
    ---------------------------------------------------------------------------------- */

    /**
     * Gets instance of class.
     *
     * @return Manovotny_Google_Analytics Instance of the class.
     */
    public static function get_instance() {

        if ( null == self::$instance ) {

            self::$instance = new self;

        }

        return self::$instance;

    }

    /* Private
    ---------------------------------------------------------------------------------- */


    /**
     * Filters Google Analytics tracking id.
     *
     * @return string Google Analytics tracking id.
     */
    public function __filter_tracking_id() {

        return 'UA-27106984-1';

    }

}
