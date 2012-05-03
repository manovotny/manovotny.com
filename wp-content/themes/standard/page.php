<?php
/**
 * The template for displaying single pages.
 *
 * @package Standard
 * @since 3.0
 */
?>
<?php get_header(); ?>
<?php $options = get_option( 'standard_theme_layout_options' ); ?>

<div id="wrapper">
	<div class="container">
		<div class="row">

				<?php if ( 'left_sidebar_layout' == $options['layout'] ) { ?>
					<?php get_sidebar(); ?>
				<?php } // end if ?>
							
				<div id="main" class="<?php echo 'full_width_layout' == $options['layout'] ? 'span12 fullwidth' : 'span8'; ?> clearfix" role="main">
				
					<?php get_template_part( 'breadcrumbs' ); ?>
				
					<?php if ( have_posts() ) { ?>
						<?php while ( have_posts() ) {
							 the_post(); ?>
							<div id="post-<?php the_ID(); ?> format-standard" <?php post_class( 'post' ); ?>>
								<div class="post-header clearfix">
									<h1 class="post-title"><?php the_title(); ?></h1>	
								</div> <!-- /.post-header -->						
								<div id="content-<?php the_ID(); ?>" class="entry-content clearfix">
									<div class="content">
										<?php the_content(); ?>
									</div><!-- /.entry-content -->
								</div><!-- /.entry-content -->
							</div> <!-- /#post- -->
						<?php } // end while ?>
					<?php } // end if ?>
					<?php comments_template( '', true ); ?>
				</div><!-- /#main -->
			
				<?php if ( 'right_sidebar_layout' == $options['layout'] ) {  ?>
					<?php get_sidebar(); ?>
				<?php } // end if ?>
				
		</div><!--/ row -->
	</div><!--/container -->
</div> <!-- /#wrapper -->
<?php get_footer(); ?>