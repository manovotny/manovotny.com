<?php global $wp_query; ?>
<?php $options = get_option( 'standard_theme_layout_options' ); ?>

<?php if( is_single() ) { ?>

	<div id="single-post-nav" class="row">

		<?php $pagination_width = 'full_width_layout' == $options['layout'] ? 'span6' : 'span4'; ?>
		
		<?php previous_post_link( '<span class="' . $pagination_width . ' previous-page">%link</span>', _x( '&larr; %title', 'standard' ) ); ?>
		
		<?php if( '' == get_previous_post() ) { ?>
			<?php next_post_link( '<span class="' . ( $options['layout'] == 'full_width_layout' ? 'span12' : 'span8' ) . ' no-previous-page-link next-page">%link</span>', _x( '%title &rarr;', 'standard' ) ); ?>
		<?php } else { ?>
			<?php next_post_link( '<span class="' . $pagination_width . ' next-page">%link</span>', _x( '%title &rarr;', 'standard' ) ); ?>	
		<?php } // end if/else ?>
		
	</div><!-- /#single-post-nav -->

<?php } elseif ( $wp_query->max_num_pages > 1 && ( is_home() || is_archive() || is_search() ) ) { ?>

	<div id="post-nav">
		<ul class="pager">
		
			<?php if( get_next_posts_link() ) { ?>
				<li class="previous">
					<?php next_posts_link( __( '<span class="nav-previous meta-nav">&larr; Older</span>', 'standard' ) ); ?>
				</li>			
			<?php } // end if ?>
			
			<?php if( get_previous_posts_link() ) { ?>
				<li class="next">
					<?php previous_posts_link( __( '<span class="nav-next meta-nav">Newer &rarr;</span>', 'standard' ) ); ?>
				</li>
			<?php } // end if ?>
		
		</ul><!-- /.pager -->
	</div><!-- /#post-nav -->

<?php } // end if/else ?>