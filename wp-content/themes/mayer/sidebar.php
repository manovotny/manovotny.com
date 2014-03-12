<?php
/**
 * The main template for displaying the sidebar.
 *
 * @package    Mayer
 * @version    1.0.0
 * @since      1.0.0
 */
?>

<?php if ( is_active_sidebar( 'sidebar-0' ) ) { ?>
	<div id="sidebar" class="col-lg-4 col-md-4">
		<?php dynamic_sidebar( 'sidebar-0' ); ?>
	</div><!-- #sidebar -->
<?php } // end if ?>