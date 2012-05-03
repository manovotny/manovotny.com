<?php
/**
 * The template for starting The Loop and rendering general content features such as the breadcrumbs, pagination, and sidebars. Uses
 * get_template_part to render the appropriate template based on the current post's format.
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
				
				<?php if ( is_search() ) { ?> 
                    <div id="search-page-title" class="alert alert-success"> 
                        <h3><?php _e( 'Search Results For ', 'standard' ); echo get_query_var( 's' ); ?></h3> 
                    </div> 
                <?php } elseif ( is_archive() ) { ?>                 
                    <div id="archive-page-title" class="alert alert-success"> 
                        <h3> 
                            <?php _e( 'Archives For ', 'standard' ); ?>
                            <?php if( standard_is_date_archive() ) { ?>
                            	<?php echo standard_get_date_archive_label(); ?>
                        	<?php } elseif ( is_author() ) { ?>
                        		<?php $author_data = get_userdata(get_query_var('author') ); ?>
                            	<?php echo $author_data->display_name; ?>
                            <?php } elseif ( '' == single_tag_title( '', false ) ) { ?> 
                                <?php echo get_cat_name( get_query_var( 'cat' ) ); ?> 
                            <?php } else { ?> 
                                <?php echo single_tag_title() ?> 
                            <?php } // end if/else ?> 
                        </h3>
						<?php if( '' != category_description() ) { ?>
	                        <p><?php echo category_description(); ?></p>
                        <?php } // end if ?> 
                    </div> 
                <?php } // end if ?> 
				
				<?php if ( have_posts() ) { ?>
				
					<?php while ( have_posts() ) { ?>
						<?php the_post(); ?>
						<?php get_template_part( 'loop', get_post_format() ); ?>
					<?php } // end while ?>
			
					<?php get_template_part( 'pagination' ); ?>
					
				<?php } else { ?>
			
					<article id="post-0" class="post no-results not-found">
						<header class="entry-header">
							<h1 class="entry-title"><?php _e( 'Page or resource not found', 'standard' ); ?></h1>
						</header><!-- .entry-header -->
						<div class="entry-content">
							<p><?php _e( 'No results were found.', 'standard' ); ?></p>
							<?php get_search_form(); ?>
						</div><!-- .entry-content -->
					</article><!-- #post-0 -->
					
				<?php } // end if/else ?>
			</div><!-- /#main -->
		
			<?php if ( 'right_sidebar_layout' == $options['layout'] ) { ?>
				<?php get_sidebar(); ?>
			<?php } // end if ?>
	
		</div><!-- /row -->
	</div><!-- /container -->
</div> <!-- /#wrapper -->

<?php get_footer(); ?>