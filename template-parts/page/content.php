<?php
/**
 * Template part to extend page content in page.php
 */
?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	<header class="entry-header">
		<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
	</header><!-- .entry-header -->

	<div class="entry-content">
		<?php
			the_content();
			// wp_link_pages( array(
			// 	'before' => '<div class="page-links">' . __( 'Pages:', 'twentyseventeen' ),
			// 	'after'  => '</div>',
			// ) );
		?>
	</div><!-- .entry-content -->
</article><!-- #post-## -->
