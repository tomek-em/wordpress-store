<?php 
 

get_header(); 

if( get_option( 'show_on_front' ) != 'posts' ):
?>
    <div id="primary" >
    <div class="custom-homepage-container"> 
 
              <!--banner section start -->
        <section class="main-banner">
            <div class="cont shop-banner">
                <div class="banner-item" id="led">
                    <div class="top">
                    </div>
                    <div class="cover">
                        <p>Led Signs</p>
                    </div>
                    <a href="index.php/shop" class="stretched-link"></a>
                </div>
                <div class="banner-item" id="t-shirt">
                    <div class="top">
                    </div>
                    <div class="cover">
                        <p>T-shirts</p>
                    </div>
                    <a href="index.php/shop" class="stretched-link"></a>
                </div>
                <div class="banner-item" id="car-decor">
                    <div class="top">
                    </div>
                    <div class="cover">
                        <p>Car decoration</p>
                    </div>
                    <a href="index.php/shop" class="stretched-link"></a>
                </div>
            </div>
        </section>
    <!-- banner section end -->
        
    <!-- Main container -->
    <section class="main-section">
        <div class="cont">
            <p>Ad Store it's a online store which sells printed products, led signs and t-shirts (message tees). Just choose your product, design it and order. It is so easy! </p>
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