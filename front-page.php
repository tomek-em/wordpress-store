<?php


get_header();

if( get_option( 'show_on_front' ) != 'posts' ):
?>
    <div id="primary" >

    <div class="custom-homepage-container">

        <section class="store-banner">
            <div class="container">
                <div class="row mb-5 justify-content-between">
                    <div class="col-12 col-md-4 demo-store-box" id="led">
                        <div class="store-card">
                            <div class="store-card-img img_led">
                                <div id="led-img"></div>
                            </div>
                            <div class="store-card-body">
                                <p>LED Signs</p>
                            </div>
                        </div>
                        <a href="<?php echo get_term_link( 'signs','product_cat') ?>"  class="stretched-link"></a>
                    </div>

                    <div class="col-12 col-md-4 demo-store-box" id="t-shirt">
                        <div class="store-card">
                            <div class="store-card-img">
                                <div id="shirt-img"></div>
                            </div>
                            <div class="store-card-body">
                                <p>T-shirt printing</p>
                            </div>
                        </div>
                        <a href="<?php echo get_term_link( 'tees','product_cat') ?>"  class="stretched-link"></a>
                    </div>

                    <div class="col-12 col-md-4 demo-store-box" id="car">
                        <div class="store-card">
                            <div class="store-card-img">
                                <div id="car-img"></div>
                            </div>
                            <div class="store-card-body">
                                <p>Car advertising</p>
                            </div>
                        </div>
                        <a href="<?php echo get_term_link( 'car','product_cat') ?>"  class="stretched-link"></a>
                    </div>
                </div>
            </div>

        </section>


</div>
</div><!-- #primary -->


<?php
else :
    ?>
    <div class="wrap">
    <?php
    if ( have_posts() ) :
        while ( have_posts() ) : the_post(); ?>
            <h2><?php the_title() ?></h2>
            <?php the_content() ?>

        <?php endwhile;

    else :
        echo '<p>There are no posts!</p>';
    endif;
    ?>
    </div> <!-- wrap -->

<?php
    endif;
?>


<?php get_footer(); ?>
