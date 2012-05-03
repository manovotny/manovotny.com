<?php
/**
 * The template for displaying image post formats.
 * 
 * @package Standard
 * @since 3.0
 */
?>
<?php /* Image Loop */ ?>

<div id="post-<?php the_ID(); ?>" <?php post_class( 'post format-image' ); ?>>

	<?php if ( '' != get_the_post_thumbnail() ) { ?>
		<div class="post-format-image clearfix">
			<a class="thumbnail-link fademe" href="<?php the_permalink(); ?>" title="<?php printf( esc_attr__( '%s', 'standard' ), the_title_attribute( 'echo=0' ) ); ?>"><?php the_post_thumbnail( 'post-format-image' );	?></a>
		</div> <!-- /.thumbnail -->
	<?php }  // end if ?> 

	<div id="content-<?php the_ID(); ?>" class="entry-content clearfix">
		<?php the_content( __( 'Continue Reading...', 'standard') ); ?>
		<?php 
			wp_link_pages( 
				array( 
					'before' 	=> '<div class="page-link"><span>' . __( 'Pages:', 'standard' ) . '</span>', 
					'after' 	=> '</div>' 
				) 
			); 
		?>
	</div><!-- /.entry-content -->
	
	<div class="post-meta clearfix">
		<div class="row-fluid">
		
			<div class="meta-date-cat-tags span9">

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
				<a class="fademe pull-right post-link" href="<?php the_permalink(); ?>" title="<?php esc_attr_e( 'permalink ', 'standard' ); ?>"><img src="<?php echo esc_url( get_template_directory_uri() . '/images/icn-permalink.png' ); ?>" alt="<?php esc_attr( 'permalink ', 'standard' ); ?>" /></a>
				<span class="the-comment-link"><?php comments_popup_link( __( 'Leave a comment', 'standard' ), __( '1 Comment', 'standard' ), __( '% Comments', 'standard' ), '', ''); ?></span>
				<span class="the-edit-post"><?php edit_post_link(); ?></span>
			</div><!-- /meta-comment-link -->
		</div><!--/row-fluid -->
	</div><!-- /.post-meta -->
	
</div> <!-- /#post- -->