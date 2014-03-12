<?php
/**
 * The main template file.
 *
 * @package    Mayer
 * @version    1.0.0
 * @since      1.0.0
 */
?>
<?php get_header(); ?>

	<div id="primary-wrapper">
		<div id="primary" class="container">

			<?php if ( is_rtl() ) { ?>
				<?php get_sidebar(); ?>
			<?php } // end if ?>

			<main id="main" class="site-main col-lg-8 col-md-8" role="main">
			<?php if ( have_posts() ) {

				while ( have_posts() ) {

					the_post();
					get_template_part( 'content' );

				} // end while

				// If this is a page, then we won't show the pager.
				if ( ! is_page() ) {
					get_template_part( 'partials/pagination' );
				} // end if

			} else {

				get_template_part( 'partials/no-content' );

			} // end if

			?>
			</main><!-- #main -->

			<?php if ( ! is_rtl() ) { ?>
				<?php get_sidebar(); ?>
			<?php } // end if ?>

		</div><!-- #primary -->

	</div><!-- /#primary-wrapper -->

<?php get_footer(); ?>