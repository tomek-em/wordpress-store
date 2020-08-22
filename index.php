<?php
/* Post and Product File
*/

  get_header();
?>

  <div class="wrap">
    <?php
        if ( have_posts() ) :
            while ( have_posts() ) : the_post(); ?>
                <h2><?php the_title() ?></h2>
            <?php
            // remove prod picture if 3d or tees
            if (is_product() && has_term('3d', 'product_cat')) {
                enq_three_prod_scripts();
                remove_prod_de();
                the_content();

            } elseif (is_product() && has_term('tees', 'product_cat')) {
                enq_canvas_prod_scripts();
                remove_prod_de();
                the_content();
            }
             else {
                the_content();
            }
            endwhile;
        else :
            echo '<p>There are no posts!</p>';
        endif;
    ?>
    </div> <!-- wrap -->


<?php get_footer(); ?>
