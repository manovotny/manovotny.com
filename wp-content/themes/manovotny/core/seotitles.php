<?php 
	/* 
	
	The following are perfectly formatted title tags for flawless SEO performance.
	In other words, you won't need any bloated or slow-loading plugin!
	
	We have captured every single type of page that you may use for your blog:
	
		* Home:				Blog Name | Blog Description
		* Search:			Search Results for { SEARCH_TERM } | { N } Results | Blog Name
		* 404:				Blog Name | 404 Nothing Found
		* Author:			Blog Name | Author Archives
		* Single:			Post Name | Category Name | Blog Name
		* Page:				Page Name | Blog Name
		* Category: 		Category Name | Blog Name
		* Archive (Month):	Blog Name | Archive | Month, Year
		* Archive (Day):	Blog Name | Archive | Month Day, Year
		* Tag:				Blog Name | Tag Archive | Tag

	*/
?>

<title>

	<?php
		
		//--------------------------------------------------------------------------------
		//  Variables
		//--------------------------------------------------------------------------------
		
		$DIVIDER = ' | ';
		
		$blog_name = get_bloginfo( 'name' );
		$blog_description = get_bloginfo( 'description' );
		
		//--------------------------------------------------------------------------------
		//  Titles
		//--------------------------------------------------------------------------------

		//----------------------------------------
		//  Home
		//----------------------------------------
		
		if ( is_home() ) { 
			_e( $blog_name . $DIVIDER . $blog_description ); 
		}
		
		//----------------------------------------
		//  Search
		//----------------------------------------
		
		if ( is_search() ) { 
			$allsearch = &new WP_Query( 's=$s&showposts=-1' ); 
			$key = wp_specialchars( $s, 1 );
			$count = $allsearch->post_count;
			_e( 'Search Results for ' . $key . $DIVIDER . $count . ' Results' . $DIVIDER . $blog_name );
			wp_reset_query();
		}
		
		//----------------------------------------
		//  404
		//----------------------------------------
		
		if ( is_404() ) { 
			_e( $blog_name . $DIVIDER . '404 Nothing Found' );
		}
		
		//----------------------------------------
		//  Author
		//----------------------------------------
		
		if ( is_author() ) { 
			_e( $blog_name . $DIVIDER . 'Author Archives' ); 
		}
		
		//----------------------------------------
		//  Single
		//----------------------------------------
		
		if ( is_single() ) { 
			_e( strip_tags( htmlspecialchars_decode( get_the_title() ) ) . $DIVIDER . $blog_name );
		}
		
		//----------------------------------------
		//  Page
		//----------------------------------------
		
		if ( is_page() ) { 
			_e( $blog_name . $DIVIDER . strip_tags( htmlspecialchars_decode( get_the_title() ) ) );
		}
		
		//----------------------------------------
		//  Category
		//----------------------------------------
		
		if ( is_category() ) {
			_e( single_cat_title( '', false ) . $DIVIDER . $blog_name );
		}
		
		//----------------------------------------
		//  Archive (Year)
		//----------------------------------------
		
		if ( is_year() ) { 
			_e( $blog_name . $DIVIDER . 'Archive' . $DIVIDER . get_the_time( 'Y' ) );
		}
		
		//----------------------------------------
		//  Archive (Month)
		//----------------------------------------
		
		if ( is_month() ) { 
			_e( $blog_name . $DIVIDER . 'Archive' . $DIVIDER . get_the_time( 'F, Y' ) );
		}
		
		//----------------------------------------
		//  Archive (Day)
		//----------------------------------------
		
		if ( is_day() ) {
			_e( $blog_name . $DIVIDER . 'Archive' . $DIVIDER . get_the_time( 'F j, Y' ) );
		}
		
		//----------------------------------------
		//  Tag
		//----------------------------------------
		
		if ( is_tag() ) { 
			_e( $blog_name . $DIVIDER . 'Tag Archive' . $DIVIDER . single_tag_title( '', false ) );
		}
	
	?>
	
</title>