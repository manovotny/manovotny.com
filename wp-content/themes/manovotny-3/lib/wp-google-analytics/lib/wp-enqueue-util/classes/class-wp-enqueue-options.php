<?php
/**
 * @package WP_Enqueue_Util
 */

class WP_Enqueue_Options {

    /* Properties
    ---------------------------------------------------------------------------------- */

    /* Data
    ---------------------------------------------- */

    /**
     * The data to pass to JavaScript.
     *
     * This is accessable via the `$localization_name` in the global JavaScript namespace.
     *
     * @var mixed
     */
    private $data;

    /**
     * Get accessor method for data property.
     *
     * @return mixed
     */
    public function get_data() {

        return $this->data;

    }

    /**
     * Set accessor method for data property.
     *
     * @param mixed $value
     */
    public function set_data( $value ) {

        $this->data = $value;

    }

    /* Dependencies
    ---------------------------------------------- */

    /**
     * Scripts that need to be loaded before the script being enqueued.
     *
     * @var array
     */
    private $dependencies;

    /**
     * Get accessor method for dependencies property.
     *
     * @return array
     */
    public function get_dependencies() {

        return $this->dependencies;

    }

    /**
     * Set accessor method for dependencies property.
     *
     * @param array $value
     */
    public function set_dependencies( $value ) {

        $this->dependencies = $value;

    }

    /* Filename
    ---------------------------------------------- */

    /**
     * Filename of the file to enqueue.
     *
     * @var string
     */
    private $filename;

    /**
     * Get accessor method for filename property.
     *
     * @return string
     */
    public function get_filename() {

        return $this->filename;

    }

    /**
     * Set accessor method for filename property.
     *
     * @param string $value
     */
    public function set_filename( $value ) {

        $this->filename = $value;

    }

    /* Filename Debug
    ---------------------------------------------- */

    /**
     * Filename of the file to enqueue when debugging.
     *
     * @var string
     */
    private $filename_debug;

    /**
     * Get accessor method for filename debug property.
     *
     * @return string
     */
    public function get_filename_debug() {

        return $this->filename_debug;

    }

    /**
     * Set accessor method for filename property.
     *
     * @param string $value
     */
    public function set_filename_debug( $value ) {

        $this->filename_debug = $value;

    }

    /* Handle
    ---------------------------------------------- */

    /**
     * The handle the file should be enqueued with.
     *
     * @var string
     */
    private $handle;

    /**
     * Get accessor method for handle property.
     *
     * @return string
     */
    public function get_handle() {

        return $this->handle;

    }

    /**
     * Set accessor method for handle property.
     *
     * @param string $value
     */
    public function set_handle( $value ) {

        $this->handle = $value;

    }

    /* Localization
    ---------------------------------------------- */

    /**
     * Convenience accessor for setting all localization properties.
     *
     * @param string $localization_name The global localization name to use in JavaScript.
     * @param mixed $data The data to pass to JavaScript.
     */
    public function set_localization( $localization_name, $data ) {

        $this->localization_name = $localization_name;
        $this->data = $data;

    }

    /* Localization Name
    ---------------------------------------------- */

    /**
     * The global localization name to use in JavaScript.
     *
     * @var string
     */
    private $localization_name;

    /**
     * Get accessor method for localization name property.
     *
     * @return string
     */
    public function get_localization_name() {

        return $this->localization_name;

    }

    /**
     * Set accessor method for handle property.
     *
     * @param string $value
     */
    public function set_localization_name( $value ) {

        $this->localization_name = $value;

    }

    /* Relative Path
    ---------------------------------------------- */

    /**
     * The relative path from `$directory_path` to `$filename`.
     *
     * @var string
     */
    private $relative_path;

    /**
     * Get accessor method for relative path property.
     *
     * @return string
     */
    public function get_relative_path() {

        return $this->relative_path;

    }

    /**
     * Set accessor method for relative path property.
     *
     * @param string $value
     */
    public function set_relative_path( $value ) {

        $this->relative_path = $value;

    }

    /* Version
    ---------------------------------------------- */

    /**
     * Version of the script to load, for cache busting.
     *
     * @var string
     */
    private $version;

    /**
     * Get accessor method for version property.
     *
     * @return string
     */
    public function get_version() {

        return $this->version;

    }

    /**
     * Set accessor method for version property.
     *
     * @param string $value
     */
    public function set_version( $value ) {

        $this->version = $value;

    }

    /* Constructor
    ---------------------------------------------------------------------------------- */

    /**
     * Initialize class.
     */
    function __construct( $handle, $relative_path, $filename, $filename_debug, $dependencies = array(), $version = '' ) {

        $this->handle = $handle;
        $this->relative_path = $relative_path;
        $this->filename = $filename;
        $this->filename_debug = $filename_debug;
        $this->dependencies = $dependencies;
        $this->version = $version;

    }

    /* Helpers
    ---------------------------------------------------------------------------------- */

    /**
     * Determines if the enqueued options have required properties.
     *
     * @return boolean If the enqueued options have required properties.
     */
    public function have_required_properties() {

        return (
            ! empty( $this->handle )
            && ! empty( $this->relative_path )
            && ! empty( $this->filename )
        );

    }
}