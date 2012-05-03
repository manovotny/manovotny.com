<?php
/**
 * The template for displaying link post formats.
 * 
 * @package Standard
 * @since 3.0
 */
?>
<?php /* Main Loop */ ?>

<div id="post-<?php the_ID(); ?>" <?php post_class( 'post format-link clearfix' ); ?>>

	<div class="post-header clearfix">
			<div id="content-<?php the_ID(); ?>"  class="entry-content clearfix">	
			
				<?php

					// Read the attribute of the anchor from the post format
					$title = standard_get_link_post_format_attribute( 'title' );
					$href = standard_get_link_post_format_attribute( 'href' );
					$target = strlen( standard_get_link_post_format_attribute( 'target' ) ) > 0 ? standard_get_link_post_format_attribute( 'target' ) : '_blank';
					
					$post_title = strip_tags( stripslashes( get_the_title() ) );
					$content = strip_tags( get_the_content() );
					
				?>

				<?php if( is_single() && '' !== get_the_title() ) { ?>
					<h1 class="post-title">
						<a href="<?php echo $href; ?>" title="<?php echo strlen( trim( $title ) ) > 0 ? $title : $post_title; ?>" target="<?php echo $target; ?>" rel="bookmark">
							<?php if( strlen( trim($post_title) ) > 0 ) { ?>
								<?php echo $post_title; ?>
							<?php } elseif( strlen( trim($title) ) > 0 ) { ?>
								<?php echo $title; ?>
							<?php } else { ?>
								<?php echo $content; ?>
							<?php } // end if ?>
						</a>
					</h1>
				<?php } else { ?>
					<h2 class="post-title">
						<a href="<?php echo $href; ?>" title="<?php echo strlen( trim( $title ) ) > 0 ? $title : $post_title; ?>" target="<?php echo $target; ?>" rel="bookmark">
							<?php if( strlen( trim($post_title) ) > 0 ) { ?>
								<?php echo $post_title; ?>
							<?php } elseif( strlen( trim($title) ) > 0 ) { ?>
								<?php echo $post_title; ?>
							<?php } else { ?>
								<?php echo $content; ?>
							<?php } // end if ?>
						</a>
					</h2>
				<?php } // end if ?>
				
			</div><!-- /.entry-content -->
	</div> <!-- /.post-header -->
			
	<div class="post-meta">
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