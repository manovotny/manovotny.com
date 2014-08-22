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

    /* Localization Handle
    ---------------------------------------------- */

    /**
     * Getter method for localization handle.
     *
     * @return string Localization handle.
     */
    private function get_localization_handle() {

        return str_replace( '-', '_', $this->slug );

    }

    /* Slug
    ---------------------------------------------- */

    /**
     * Google analytics slug.
     *
     * @var string
     */
    protected $slug = 'wp-google-analytics';

    /* Version
    ---------------------------------------------- */

    /**
     * Version, used for cache-busting of style and script file references.
     *
     * @var string
     */
    protected $version = '3.0.0';

    /* Constructor
    ---------------------------------------------------------------------------------- */

    /**
     * Initialize class.
     */
    public function __construct() {

        add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );

    }

    /* Methods
    ---------------------------------------------------------------------------------- */

    /**
     * Enqueues scripts.
     */
    public function enqueue_scripts() {

        $wp_enqueue_util = WP_Enqueue_Util::get_instance();

        $handle = $this->slug . '-script';
        $relative_path = __DIR__ . '/../js/';
        $filename = 'bundle.min.js';
        $filename_debug = 'bundle.concat.js';
        $dependencies = array();

        $trackingId = '';

        if ( defined( 'WP_GOOGLE_ANALYTICS_TRACKING_ID' ) ) {

            $trackingId = WP_GOOGLE_ANALYTICS_TRACKING_ID;

        }

        // Check for tracking id.
        if ( empty( $trackingId ) ) {

            // No tracking id, no need to enqueue scripts.
            return;

        }

        $data = array(
            'options' => array(
                'trackingId' => $trackingId
            )
        );

        $options = new WP_Enqueue_Options(
            $handle,
            $relative_path,
            $filename,
            $filename_debug,
            $dependencies,
            $this->version
        );

        $options->set_localization( $this->get_localization_handle(),  $data );

        $wp_enqueue_util->enqueue_script( $options );

    }

}