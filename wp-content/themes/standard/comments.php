<?php
/**
 * The template for displaying comments, pings, and trackbacks on posts, pages, and attachments.
 * 
 * @package Standard
 * @since 3.0
 */
?>
<?php 
	if ( ! empty( $_SERVER['SCRIPT_FILENAME'] ) && 'comments.php' == basename( $_SERVER['SCRIPT_FILENAME'] ) ) {
		die ( 'This file cannot be loaded directly.' );
	} // end if
?>

<?php if ( post_password_required() ) { ?>
	<div id="comments">
		<h3 class="nopassword"><?php _e( 'This post is password protected. Enter the password to view comments.', 'standard' ); ?></h3>
	</div><!-- #comments -->
	<?php return; ?>
<?php } // end if	?>

<?php if ( have_comments() ) { ?>

	<?php if ( ! empty( $comments_by_type['comment'] ) ) { ?>
		<div id="comments" class="clearfix">
			<h3><?php comments_number( __( 'No responses', 'standard' ), __( 'One response', 'standard' ), __( '% responses', 'standard' ) );?> <?php _e( 'to',  'standard' ); ?> <em><?php the_title(); ?></em></h3>
			<ol class="commentlist">
				<?php wp_list_comments( 'avatar_size=50&callback=custom_comment&type=comment' ); ?>
			</ol>    
			<div class="comment-navigation">
				<div class="fl">
					<?php previous_comments_link(); ?>
				</div>
				<div class="fr">
					<?php next_comments_link(); ?>
				</div>
			</div>
			
			<?php 
				comment_form(
					array( 
						'comment_notes_after' => '<p class="form-allowed-tags">' . sprintf( __( 'Text formatting is available via select <a href="javascript:;">HTML</a>. %s', 'standard' ), ' <code>' . allowed_tags() . '</code>' ) . '</p>' 
					)
				); 
			?>
			
		</div><!-- /#comments -->
	<?php } // end if ?>

	<?php if ( ! empty( $comments_by_type['pings'] ) ) { ?>
		<div id="pings">
			<h3>
				<?php _e( 'Trackbacks and Pingbacks:', 'standard' ); ?>
			</h3>
			<ol class="pinglist">
				<?php wp_list_comments( 'type=pings&callback=list_pings' ); ?>
			</ol>
		</div><!-- /#pings -->
	<?php } // end if ?>	
	
<?php } else { ?>

	<?php if( comments_open() ) { ?>
		<div id="no-comments" class="clearfix">
			<p class="title"><?php _e( 'No Comments', 'standard' ); ?></p>
			<p><?php _e( 'Be the first to start the conversation.', 'standard' ); ?></p>
			<?php 
				comment_form(
					array( 
						'comment_notes_after' => '<p class="form-allowed-tags">' . sprintf( __( 'Text formatting is available via select <a href="javascript:;">HTML</a>. %s', 'standard' ), ' <code>' . allowed_tags() . '</code>' ) . '</p>' 
					)
				); 
			?>
		</div><!-- /#no-comments -->
	<?php } // end if ?>
	
<?php } // end if ?>