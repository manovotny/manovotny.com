<?php
/**
 * The template for displaying quote post formats.
 * 
 * @package Standard
 * @since 3.0
 */
?>
<?php /* Main Loop */ ?>

<div id="post-<?php the_ID(); ?>" <?php post_class( 'post format-quote clearfix' ); ?>>
		
	<div class="post-header clearfix">
			<div class="entry-content clearfix">
				<?php the_content( __( 'Continue Reading...', 'standard' ) ); ?>
			</div>
	</div> <!-- /.post-header -->

	<div id="content-<?php the_ID(); ?>" class="entry-content clearfix">	
		
		<?php if( '' !== get_the_title() ) { ?>
			<?php if( is_single() ) { ?>
				<h1 class="post-title"><?php the_title(); ?></h1>	
			<?php } else { ?>
				<h2 class="post-title">
					<a href="<?php the_permalink(); ?>" rel="bookmark" title="<?php printf( esc_attr__( '%s', 'standard' ), the_title_attribute( 'echo=0' ) ); ?>"><?php the_title(); ?></a>
				</h2>
			<?php } // end if ?>
		<?php } // end if ?>
		
		<?php 
			wp_link_pages( 
				array( 
					'before' => '<div class="page-link"><span>' . __( 'Pages:', 'standard' ) . '</span>', 
					'after' => '</div>' 
				) 
			); 
		?>
		
	</div><!-- /.entry-content -->
	
	<div class="post-meta clearfix">
		<div class="row-fluid">
			<div class="meta-date-cat-tags span9">
			
				<?php printf( '<span class="the-time">' . __( 'Posted on %1$s', 'standard' ) . '</span>', get_the_time( get_option( 'date_format' ) ) ); ?>
				
				<?php $category_list = get_the_category_list( __( ', ', 'standard' ) ); ?>
				<?php if( $category_list ) { ?>
					<?php printf( '<span class="the-category">' . __( 'In %1$s', 'standard' ) . '</span>', $category_list ); ?>
				<?php } // end if ?>
				
				
				<?php $tag_list = get_the_tag_list( '', __( ', ', 'standard' ) ); ?>
				<?php if( $tag_list ) { ?>
					<?php printf( '<span class="the-tags">' . __( '%1$s', 'standard' ) . '</span>', $tag_list ); ?>
				<?php } // end if ?>
				
			</div><!-- /meta-date-cat-tags -->
			<div class="meta-comment-link span3">
				<a class="fademe pull-right post-link" href="<?php the_permalink(); ?>" title="<?php esc_attr_e( 'permalink ', 'standard' ); ?>"><img src="<?php echo esc_url( get_template_directory_uri() . '/images/icn-permalink.png' ); ?>" alt="<?php esc_attr_e( 'permalink ', 'standard' ); ?>" /></a>
				<span class="the-comment-link"><?php comments_popup_link( __( 'Leave a comment', 'standard' ), __( '1 Comment', 'standard' ), __( '% Comments', 'standard' ), '', ''); ?></span>
				<span class="the-edit-post"><?php edit_post_link(); ?></span>
			</div><!-- /meta-comment-link -->
		</div><!--/row-fluid -->
	</div><!-- /.post-meta -->

</div> <!-- /#post- -->