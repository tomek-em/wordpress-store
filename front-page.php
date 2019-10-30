<?php 
 

get_header(); 

if( get_option( 'show_on_front' ) != 'posts' ):
?>
    <div id="primary" >
        
        <!-- Hero
    ============================================ -->
    <div class="hero-wrapper text-center">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-6">
                    <div class="hero-content">
                        <h3>AdStore: LEDsign, t-shirt, car decoration.</h3>
                        <p><span></span></p>
                        <a href="<?php echo home_url(); ?>/index.php/shop" class="t-button large color-hover">Buy now</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

        
        
    <div class="custom-homepage-container"> 
    
        <section class="store-banner">
            <div class="container">
                <div class="row mb-5 justify-content-between">
                    <div class="col-12 col-md-4 demo-store-box" id="led">
                        <div class="store-card">
                            <div class="store-card-img">
                            </div>
                            <div class="store-card-body">
                                <p>LED Signs</p>
                            </div>
                        </div>
                        <!-- Add js onmouseover for cards -->
                        <a href="<?php echo get_term_link( 'signs','product_cat') ?>"  class="stretched-link"></a>
                    </div>
                    <div class="col-12 col-md-4 demo-store-box" id="t-shirt">
                        <div class="store-card">
                            <div class="store-card-img">
                            </div>
                            <div class="store-card-body">
                                <p>T-shirts</p>
                            </div>
                        </div>
                        <a href="<?php echo get_term_link( 'tees','product_cat') ?>"  class="stretched-link"></a>
                    </div>
                    <div class="col-12 col-md-4 demo-store-box" id="#">
                        <div class="store-card">
                            <div class="store-card-img">
                            </div>
                            <div class="store-card-body">
                                <p>Car decoration</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
        </section>
        
    <!-- Main container -->
<!--
    <section class="main-section">
        <div class="cont">
            <p>Ad Store it's a online store which sells printed products, led signs and t-shirts (message tees). Just choose your product, design it and order. It is so easy! </p>
        </div>
    </section>
-->
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
<!--
        <section class="boxes">
            <div class="container">
                <div class="row">
                    <div class="col-md-4 ">  
                        <div class="card text-center">
                            <div class="box">
                                <img src="..." class="card-img-top" alt=" ">
                                <i class="far fa-address-card fa-3x mb-3"></i>
                            </div>    
                            <div class="card-body">
                                <h3>Signs</h3>
                            </div>
                            <a href="#" class="stretched-link"></a>
                        </div>   
                    </div>
                   <div class="col-md-4">  
                        <div class="card text-center">
                            <div class="box">
                                <img src="..." class="card-img-top" alt=" ">
                                <i class="far fa-address-card fa-3x mb-3"></i>
                            </div>    
                            <div class="card-body">
                                <h3>T-shirts</h3>
                            </div>
                        </div>   
                    </div>
                    <div class="col-md-4">  
                        <div class="card text-center">
                            <div class="box">
                                <img src="..." class="card-img-top" alt=" ">
                                <i class="far fa-address-card fa-3x mb-3"></i>
                            </div>    
                            <div class="card-body">
                                <h3>Vehicle Advertising</h3>
                            </div>
                        </div>   
                    </div>
                </div>
            </div>
        </section>
-->
 
<?php get_footer(); ?>