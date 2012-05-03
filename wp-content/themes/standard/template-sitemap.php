<?php /* Template Name: Sitemap */ ?>
<?php
/**
 * The template for rendering an SEO-friendly site map.
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

										<h2 id="authors"><?php _e( 'Authors', 'standard' ); ?></h2>
				
										<ul id="sitemap-authors">
											<?php
												wp_list_authors(
													array(
														'exclude_admin' => false,
													)
												);
											?>
										</ul>
										
										<h2 id="pages"><?php _e( 'Pages', 'standard' ); ?></h2>
										<ul id="sitemap-pages">
											<?php
												wp_list_pages(
													array(
														'exclude'	=> get_the_ID(),
														'title_li' 	=> '',
													)
												);
											?>
										</ul>
										
										<h2 id="posts"><?php _e( 'Posts', 'standard' ); ?></h2>
										<ul id="sitemap-posts">
											<?php
												$category_list = '';
												foreach ( get_categories() as $category ) {
																										
													$category_list .= '<li><h3>' . $category->cat_name . '</h3></li>';
													$category_list .= '<ul>';
													
													$category_query = new WP_Query( 'posts_per_page=-1&cat=' . $category->cat_ID ); 
													if( $category_query->have_posts() ) {
													
														while( $category_query->have_posts() ) {
														
															$category_query->the_post();
															$cat = get_the_category();
															if ( '' != get_the_title() ) {
															  $category_list .= '<li><a href="' . get_permalink() . '">' . get_the_title() . '</a></li>';
															} // end if
															
														} // end while

														$category_list .= '</ul>';
														$category_list .= '</li>';
														
													} // end if
																								  
												} // end foreach
												wp_reset_postdata();
												
												echo $category_list;
											?>
										</ul>

								</div><!-- /.entry-content -->
							</div> <!-- /#post- -->
						<?php } // end while ?>
					<?php } // end if ?>
				</div><!-- /#main -->
			
				<?php if ( 'right_sidebar_layout' == $options['layout'] ) {  ?>
					<?php get_sidebar(); ?>
				<?php } // end if ?>
				
		</div><!--/ row -->
	</div><!--/container -->
</div> <!-- /#wrapper -->
<?php get_footer(); ?>