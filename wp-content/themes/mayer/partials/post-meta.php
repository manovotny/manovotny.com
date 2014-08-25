<?php
/**
 * The partial used to render post meta data.
 *
 * @package    Mayer
 * @since      1.0.0
 */
?>

<p class="post-meta">

	<span class="post-author-meta">
		<a href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>" class="post-author" rel="author">
			<?php the_author_meta( 'display_name' ); ?>
		</a>
		&middot;
	</span><!-- .post-author-meta -->

	<span class="post-updated-meta">
		<a href="<?php the_permalink(); ?>" class="updated"><?php the_time( get_option( 'date_format' ) ); ?></a>
		&middot;
	</span><!-- .updated-meta -->

	<?php if ( ! is_attachment() ) { ?>

		<span class="post-category-meta">
			<?php the_category( ', ', 'single' ); ?>
			&middot;
		</span><!-- .category-meta -->

		<?php if ( '' != get_the_tags() ) { ?>
			<span class="post-tag-meta">
				<?php the_tags( '' ); ?>
				&middot;
			</span><!-- tag-meta -->
		<?php } ?>

		<span class="post-comment-link-meta">
			<a href="<?php comments_link(); ?>">
				<?php comments_number( 'No Comments', 'One Comment', '%  Comments' ); ?>
			</a>
		</span><!-- .comment-link-meta -->
	<?php }  ?>

</p><!-- .post-meta -->