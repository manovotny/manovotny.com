<?php
/**
 * The template for displaying search results. It's based on index.php. If the user has the Google Custom Search Widget enabled, then Standard
 * will display that template rather than the default search results page.
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
				
				<?php if( standard_google_custom_search_is_active() ) { ?>
				
					<div id="search-page-title" class="alert alert-success"> 
	                    <h3><?php _e( 'Search Results For ', 'standard' ); echo get_query_var( 'q' ); ?></h3> 
	                </div> 
				
					<div id="cse-search-results"></div>
					<script type="text/javascript">
					  var googleSearchIframeName = "cse-search-results";
					  var googleSearchFormName = "cse-search-box";
					  var googleSearchFrameWidth = 600;
					  var googleSearchDomain = "www.google.com";
					  var googleSearchPath = "/cse";
					</script>
					<script type="text/javascript" src="http://www.google.com/afsonline/show_afs_search.js"></script>
				
				<?php } else { ?>
				
					<div id="search-page-title" class="alert alert-success"> 
	                    <h3><?php _e( 'Search Results For ', 'standard' ); echo get_query_var( 's' ); ?></h3> 
	                </div> 
				
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
			
			<?php } // end if ?>
	
		</div><!-- /row -->
	</div><!-- /container -->
</div> <!-- /#wrapper -->

<?php get_footer(); ?>