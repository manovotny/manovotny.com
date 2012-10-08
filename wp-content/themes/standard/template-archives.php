<?php
/**
 * Template Name: Archives
 *
 * The template for display all categories and all posts in ascending order.
 *
 * @package Standard
 * @since 3.0
 */
?>
<?php get_header(); ?>
<?php $presentation_options = get_option( 'standard_theme_presentation_options' ); ?>

<div id="wrapper">
	<div class="container">
		<div class="row">

				<?php if ( 'left_sidebar_layout' == $presentation_options['layout'] ) { ?>
					<?php get_sidebar(); ?>
				<?php } // end if ?>
							
				<div id="main" class="<?php echo 'full_width_layout' == $presentation_options['layout'] ? 'span12 fullwidth' : 'span8'; ?> clearfix" role="main">
				
					<?php get_template_part( 'breadcrumbs' ); ?>
				
					<?php if ( have_posts() ) { ?>
						<?php while ( have_posts() ) {
							 the_post(); ?>
							<div id="post-<?php the_ID(); ?> format-standard" <?php post_class( 'post' ); ?>>
								<div class="post-header clearfix">
									<h1 class="post-title entry-title"><?php the_title(); ?></h1>	
								</div> <!-- /.post-header -->						
								<div id="content-<?php the_ID(); ?>" class="entry-content clearfix">
									<div class="content">
										<?php the_content(); ?>
										
										<h2><?php _e( 'All Categories', 'standard'); ?></h2>
										<?php $categories = get_categories( 'hide_empty=1' ); ?>
										<?php if( count( $categories) > 0 ) { ?>
											<p>
												<ul>
													<?php foreach( $categories as $category ) { ?>
														<li><a href="<?php echo get_category_link( $category->cat_ID ); ?>"><?php echo $category->cat_name; ?></a></li>
													<?php } // end foreach ?>
												</ul>
											</p>
										<?php } else { ?>
											<p><?php _e( 'You have no categories.', 'standard'); ?></p>
										<?php } // end if/else ?>
										
										<h2><?php _e( 'All Posts', 'standard'); ?></h2>
										<?php $posts = get_posts( 'orderby=post_date&order=desc&numberposts=-1' ); ?>
										<?php if( count( $posts) > 0 ) { ?>
											<p>
												<ul>
													<?php foreach( $posts as $post ) { ?>
														<?php $title = '' == get_the_title( $post->ID ) ? get_the_time( get_option( 'date_format' ), $post->ID ) : get_the_title( $post->ID ); ?>
														<li><span class="the_date"><?php echo get_the_time( get_option( 'date_format' ), $post->ID ); ?></span>&nbsp;&mdash;&nbsp;<span class="the_title"><a href="<?php echo get_permalink( $post->ID ); ?>"><?php echo $title; ?></a></span></li>
													<?php } // end foreach ?>
												</ul>
											</p>
										<?php } else { ?>
											<p><?php _e( 'You have no posts.', 'standard'); ?></p>
										<?php } // end if/else ?>
										
									</div><!-- /.entry-content -->
								</div><!-- /.entry-content -->
							</div> <!-- /#post- -->
						<?php } // end while ?>
					<?php } // end if ?>
				</div><!-- /#main -->
			
				<?php if ( 'right_sidebar_layout' == $presentation_options['layout'] ) {  ?>
					<?php get_sidebar(); ?>
				<?php } // end if ?>
				
		</div><!--/ row -->
	</div><!--/container -->
</div> <!-- /#wrapper -->
<?php get_footer(); ?>