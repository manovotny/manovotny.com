<?php
/**
 * @package WP_Enqueue_Util
 */

class WP_Enqueue_Util {

    /* Properties
    ---------------------------------------------------------------------------------- */

    /* Instance
    ---------------------------------------------- */

    /**
     * Instance of the class.
     *
     * @var WP_Enqueue_Util
     */
    protected static $instance = null;

    /**
     * Get accessor method for instance property.
     *
     * @return WP_Enqueue_Util Instance of the class.
     */
    public static function get_instance() {

        if ( null == self::$instance ) {

            self::$instance = new self;

        }

        return self::$instance;

    }

    /* Methods
    ---------------------------------------------------------------------------------- */

    /**
     * A convenience function for enqueuing scripts.
     *
     * Will automatically enqueue concat or minified source, depending on debug configuration.
     * Will automatically add localization if name and data are provided.
     *
     * @param WP_Enqueue_Options $options Options to enqueue script with.
     */
    public function enqueue_script( WP_Enqueue_Options $options ) {

        // Required options.
        $handle = $options->get_handle();
        $relative_path = $options->get_relative_path();
        $filename = $options->get_filename();

        // Optional options.
        $filename_debug = $options->get_filename_debug();
        $dependencies = $options->get_dependencies();
        $version = $options->get_version();

        // Localization options.
        $localization_name = $options->get_localization_name();
        $data = $options->get_data();

        if ( ! $options->have_required_properties() ) {

            trigger_error( 'Trying to enqueue script, but required properties are missing.' );

            return;

        }

        $script = $filename;

        if ( defined( 'SCRIPT_DEBUG' ) && true === SCRIPT_DEBUG && ! empty( $filename_debug ) ) {

            $script = $filename_debug;

        }

        $path = realpath( trailingslashit( $relative_path ) . $script );
        $url = WP_URL_Util::get_instance()->convert_path_to_url( $path );

        wp_register_script(
            $handle,
            $url,
            $dependencies,
            $version
        );

        if ( ! empty( $localization_name ) && ! empty( $data ) ) {

            wp_localize_script(
                $handle,
                $localization_name,
                $data
            );

        }

        wp_enqueue_script( $handle );

    }
}
