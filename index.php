<?php 
get_header(); 

?>

    <div class="wrap">
    <?php   
        if ( have_posts() ) :
            while ( have_posts() ) : the_post(); ?>
                <h2><?php the_title() ?></h2>
            <?php 
            if (is_product() && has_term('3d', 'product_cat')) {
                three_enq();
                remove_prod_de();
                the_content(); 
                
            } else {
                the_content(); 
            } 
                   
            ?>
            
            <?php endwhile;

        else :
            echo '<p>There are no posts!</p>';
        endif;
    ?>
    </div> <!-- wrap -->
 


<?php get_footer(); ?>