<?php
/**
 * The template for displaying a single post and its related content as well as author boxes. Uses
 * get_post_format to render the appropriate template based on the post's format.
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
				
				<?php if ( have_posts() ) { 
						while ( have_posts() ) {
							the_post(); 
							get_template_part( 'loop', get_post_format() );
				?>
							<?php get_template_part( 'pagination '); ?>
							<?php $general_options = get_option( 'standard_theme_general_options' ); ?>
							<?php $social_options = get_option( 'standard_theme_social_options' ); ?>
							<?php if( 'on' == $general_options['display_author_box'] ) { ?>
								<div id="author-box" class="well clearfix">
									<div class="author-box-image">
										<?php echo get_avatar( get_the_author_meta( 'user_email', $post->post_author, '80' ) ); ?>
									</div><!-- /.author-box-image -->
									<h4 class="author-box-name"><?php the_author_meta( 'display_name' ); ?></h4>
									<p>
									<?php if( strlen( trim( get_the_author_meta( 'user_url' ) ) ) > 0 ) { ?>
										<small class="author-box-url"> <a href="<?php the_author_meta( 'user_url' ); ?>" target="_blank" rel="author"><?php _e( 'Website', 'standard' ); ?></a></small></h4>
									<?php } // end if ?>
									<small class="author-box-url"><a href="<?php echo get_author_posts_url( get_the_author_meta( 'ID' ) ); ?>" rel="author"><?php _e( 'Author\'s Posts', 'standard' ); ?></a></small></h4>
									</p>
									<?php if( strlen( trim( the_author_meta( 'description' ) ) > 0 ) ) { ?>
										<div class="author-box-description">
											<p><?php the_author_meta( 'description' ); ?></p>
										</div><!-- /.author-box-description -->
									<?php } // end if ?>

								</div><!-- /.author-box -->						
							<?php
							} // end if
							comments_template( '', true );		
					 	} // end while; 
					 ?>
					<?php get_template_part( 'pagination' ); ?>
				<?php } // end if ?>
			</div><!-- /#main -->
			
			<?php if ( 'right_sidebar_layout' == $options['layout'] ) { ?>
				<?php get_sidebar(); ?>
			<?php } // end if ?>
				
		</div> <!-- /row -->
	</div><!-- /container -->
</div> <!-- /#wrapper -->
<?php get_footer(); ?>