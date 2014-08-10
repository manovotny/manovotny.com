<?php
/**
 * @package WP_Google_Analytics
 */

class WP_Google_Analytics {

    /* Properties
    ---------------------------------------------------------------------------------- */

    /* Instance
    ---------------------------------------------- */

    /**
     * Instance of the class.
     *
     * @var WP_Google_Analytics
     */
    protected static $instance = null;

    /**
     * Get accessor method for instance property.
     *
     * @return WP_Google_Analytics Instance of the class.
     */
    public static function get_instance() {

        if ( null == self::$instance ) {

            self::$instance = new self;

        }

        return self::$instance;

    }

    /* Tracking Id
    ---------------------------------------------- */

    /**
     * Google Analytics tracking id for site.
     *
     * @var string
     */
    protected $tracking_id = '';

    /**
     * Getter method for tracking id.
     *
     * @return string Google Analytics tracking id.
     */
    public function get_tracking_id() {

        return $this->tracking_id;

    }

    /**
     * Setter method for tracking id.
     *
     * @param string $tracking_id Google Analytics tracking id.
     */
    public function set_tracking_id( $tracking_id ) {

        $this->tracking_id = $tracking_id;

    }

    /* Version
    ---------------------------------------------- */

    /**
     * Version, used for cache-busting of style and script file references.
     *
     * @var string
     */
    protected $version = '2.0.1';

    /**
     * Getter method for version.
     *
     * @return string Plugin version.
     */
    public function get_version() {

        return $this->version;

    }
}