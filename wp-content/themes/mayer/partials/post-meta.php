<?php
/**
 * The partial used to render post meta data.
 *
 * @package    Mayer
 * @version    1.0.0
 * @since      1.0.0
 */
?>

<p class="post-meta">

	<a href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>" class="post-author" rel="author">
		<?php the_author_meta( 'display_name' ); ?>
	</a>
	&middot;
	<a href="<?php the_permalink(); ?>" class="updated"><?php the_time( get_option( 'date_format' ) ); ?></a>

	<?php if ( ! is_attachment() ) { ?>
		&middot;
		<?php the_category( ', ', 'single' ); ?>
		<?php if ( '' != get_the_tags() ) { ?>
			&middot;
			<?php the_tags( '' ); ?>
		<?php } // end if ?>

		&middot;
		<a href="<?php comments_link(); ?>">
			<?php comments_number( 'No Comments', 'One Comment', '%  Comments' ); ?>
		</a>
	<?php } // end if ?>

</p><!-- .post-meta -->