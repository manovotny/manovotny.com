<?php
/**
 * The author template. Used when an author is queried.
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

				<?php if ( function_exists( 'yoast_breadcrumb' ) ) { ?>
					<?php yoast_breadcrumb( '<p id="breadcrumbs">', '</p>' ); ?>
				<?php } // end if ?>

				<div class="archive-header">
					<h4><?php printf( __( 'Posts By %s', 'mayer' ), esc_html( get_the_author_meta( 'display_name' ) ) ); ?></h4>
				</div><!-- .archive-header -->

				<?php while( have_posts() ) { ?>
					<?php the_post(); ?>
					<div <?php post_class(); ?>>

						<h2 class="post-title entry-title">
							<a href="<?php the_permalink(); ?>">
								<?php the_title(); ?>
							</a>
						</h2><!-- .post-title -->

						<?php get_template_part( 'partials/post-meta' ); ?>

						<div class="post-content">
							<?php if ( has_excerpt() ) { ?>
								<?php the_excerpt(); ?>
							<?php } else { ?>
								<?php the_content( __( 'Read More', 'mayer' ) ); ?>
							<?php } // end if/else ?>
						</div><!-- .post-content -->

						<?php if ( mayer_is_paginated_post() ) { ?>
							<?php get_template_part( 'partials/post-pagination' ); ?>
						<?php } // end if ?>

					</div><!-- div -->

				<?php } // end while ?>

				<?php get_template_part( 'partials/pagination' ); ?>

			</main><!-- #main -->

			<?php if ( ! is_rtl() ) { ?>
				<?php get_sidebar(); ?>
			<?php } // end if ?>

		</div><!-- #primary -->

	</div><!-- /#primary-wrapper -->

<?php get_footer(); ?>