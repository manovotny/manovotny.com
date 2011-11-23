<?php


/**
 * Fixes search pagination.
 * 
 * http://codex.wordpress.org/Creating_a_Search_Page#Preserving_Search_Page_Results_and_Pagination
 */
 
function fix_search_pagination()
{
	global $query_string;

	$query_args = explode( '&', $query_string );
	$search_query = array();

	foreach( $query_args as $key => $string )
	{
		$query_split = explode( '=', $string );
		$search_query[ $query_split[ 0 ] ] = urldecode( $query_split[ 1 ] );
	}

	$search = new WP_Query( $search_query );
}


/**
 * Gets WordPress Menu.
 */
 
function get_wordpress_menu( $class, $depth, $location ) 
{
	wp_nav_menu(
		array(
			'menu_class' => $class,
			//'walker' => $standard_walker,
			'depth' => $depth,
			'theme_location' => $location,
			'fallback_cb' => false
		)
	);
}


/**
 * Gets the first image in a post.
 */
 
function ige_post_image()
{
	// set image options
	$image_options = array(
		'default_image' => ige_get_image( 'pinterest_default.png', true )
	,	'format' => 'array'
	,	'image_scan' => true
	);
	
	$image_attributes = get_the_image( $image_options );
	
	return $image_attributes[ 'src' ];
}


/**
 * Renders pagination.
 */

function pagination() 
{
	global $wp_query, $wp_rewrite;
	
	$wp_query->query_vars[ 'paged' ] > 1 ? $current = $wp_query->query_vars[ 'paged' ] : $current = 1;
	
	$total = $wp_query->max_num_pages;
	
	// set pagination options
	$pagination_options = array(
		'base' => @add_query_arg( 'page','%#%' )
	,	'total' => $total
	,	'current' => $current
	,	'end_size' => 3
	,	'mid_size' => 1
	,	'type' => 'array'
	,	'next_text' => 'Next'
	,	'prev_text' => 'Prev'
	);
 
	if ( $wp_rewrite->using_permalinks() )
	{
		$pagination_options[ 'base' ] = user_trailingslashit( trailingslashit( remove_query_arg( 's', get_pagenum_link( 1 ) ) ) . 'page/%#%/', 'paged' );
	}
 
	if ( !empty( $wp_query->query_vars[ 's' ] ) )
	{
		$pagination_options[ 'add_args' ] = array( 's' => urlencode( get_query_var( 's' ) ) );
	}
 	
 	// get pagination array from WordPress
 	$pagination_array = paginate_links( $pagination_options );
 	
 	// check for pagination
 	if ( empty( $pagination_array ) || count( $pagination_array ) == 0 )
 	{
 		// no pagination
 		return;
 	}
 	
 	// check that we're not on the frist page
 	if ( $current != 1 )
 	{
 		// check for arguments
		if ( !empty( $pagination_options[ 'add_args' ] ) )
		{
			// add arguments
			$first = add_query_arg( $pagination_options[ 'add_args' ], home_url() );
		}
 	
 		// add link to first page
 		$pagination_first = '<a class="page-numbers first" href="' . $first . '" alt="First">First</a>';
 		array_unshift( &$pagination_array, &$pagination_first );
 	}
 	
 	// add pagination label
 	$pagination_label = '<span class="page-numbers label">Page ' . $current . ' of ' . $total . '</span>';
 	array_unshift( &$pagination_array, &$pagination_label );
 	
 	// check that we're not on the last page
 	if ( $current != $total )
 	{
 		// construct last page link
 		$last = str_replace( '%_%', 2 == $current ? '' : $pagination_options[ 'format' ], $pagination_options[ 'base' ] );
		$last = str_replace( '%#%', $total, $last );
		
		// check for arguments
		if ( !empty( $pagination_options[ 'add_args' ] ) )
		{
			// add arguments
			$last = add_query_arg( $pagination_options[ 'add_args' ], $last );
		}
		
		// add link to last page
		$pagination_last = '<a class="page-numbers last" href="' . $last . '" alt="Last">Last</a>';
 		array_push( &$pagination_array, &$pagination_last );
 	}
 	
 	// create unordered list of pagination items
	$pagination = "<ul class='page-numbers'>\n\t<li>";
	$pagination .= join( "</li>\n\t<li>", &$pagination_array );
	$pagination .= "</li>\n</ul>\n";
	
	// display pagination
	_e( $pagination );
}


/**
 * Renders previous / next posts links.
 */
 
function previous_next_post_links( $character_limit = 50 )
{ ?>
    <div class="prev-next-nav">
        <div class="left">
            <?php
                $previous_post = get_previous_post();
                $previous_post_title = get_the_title( $previous_post->ID );
                $previous_post_link_text_before = '&laquo; Prev: ';
                $previous_post_link_text_after = '';
                $previous_post_link_text = $previous_post_link_text_before . truncate_text( $previous_post_title, $character_limit ) . $previous_post_link_text_after;
                previous_post_link( '%link', $previous_post_link_text );
            ?>
        </div>
        <div class="right">
            <?php
                $next_post = get_next_post();
                $next_post_title = get_the_title( $next_post->ID ); 
                $next_post_link_text_before = 'Next: ';
                $next_post_link_text_after = ' &raquo;';
                $next_post_link_text = $next_post_link_text_before . truncate_text( $next_post_title, $character_limit ) . $next_post_link_text_after;
                next_post_link( '%link', $next_post_link_text );
            ?>
        </div>
        <div class="clear"></div>
    </div>
<?php }


/**
 * Get the user's gravatar, and if they do not have one, displays a default one.
 *
 * @$target_blank	Determines if link opens in a new window / tab or not.
 */
 
function the_commenter_avatar( $size, $default_image = null )
{
	$avatar = null;
							
	if ( get_comment_author_email() == get_the_author_meta( 'user_email', $user_ID ) )
	{
		$avatar = get_the_author_meta( 'user_email', $user_ID );
	}
	else
	{
		$avatar = get_comment_author_email();
	}
	
	_e( get_avatar( $avatar, $size, $default_image ) );
}


/**
 * Formats the commenter's link before writing it out to the page.
 *
 * @$target_blank	Determines if link opens in a new window / tab or not.
 */
 
function the_commenter_link( $target_blank )
{
	$commenter = get_comment_author_link();
	
	if ( ereg( ']* class=[^>]+>', $commenter ) )
	{
		$commenter = preg_replace( '/(]* class=[\'"]?)/', '\\1url ' , $commenter );
	}
	else
	{
		$commenter = preg_replace( '/(<a )/', '\\1class="url "/' , $commenter );
	}
	
	if ( $target_blank )
	{
		$commenter = preg_replace( '/(<a [^>]*)>/i', '$1 target="_blank">', $commenter );
	}
	
	_e( $commenter );
}


?>