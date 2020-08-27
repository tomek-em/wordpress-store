<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="descritpion" content="<?php bloginfo('description'); ?>">
    <title>
        <?php bloginfo('name'); ?> |
        <?php is_front_page() ? bloginfo('description') : wp_title(); ?>
    </title>

    <?php wp_head(); ?>
</head>

<body <?php if(function_exists("body_class") && !is_404()){body_class();} else echo 'class="default_page"'?>>

    <!-- PRE LOADER -->
    <div class="preloader">
       <div class="spinner">
          <span class="spinner-rotate"></span>
       </div>
    </div>


    <div class="wrapper">
    <!-- Header -->
        <header class="site-header" id="main-header">
            <nav class="my-navbar">

              <!-- TOP NAVBAR TOP -->
                <div class="site-navbar-top">
                    <div class="container">
                        <div class="row">
                            <div class="col-6 col-lg-6">
                                <div class="site-logo">
                                    <h1><a href="<?php echo home_url(); ?>" class="site-logo ">AdStore</a></h1>
                                </div>
                            </div>
                            <div class="col-6 col-lg-6">
                                <div class="d-flex flex-row align-items-center justify-content-end">
                                    <div class="site-top-icons" id='top-nav'>
                                        <ul class='cont-flex top-nav-ul '>
                                            <li><a href="<?php echo home_url(); ?>/index.php/my-account"><i class="fas fa-user"></i></a></li>
                                            <li>
                                                <a href="<?php echo home_url(); ?>/index.php/cart" class="site-cart"><i class="fas fa-cart-arrow-down"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                    <!-- Dropdown -->
                                    <div class="menu-toggle" id="toggle">
                                        <i class="fas fa-bars"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- TOP NAVBAR MENU -->
                <div class="cont">
                <?php
                wp_nav_menu( array(
                                'theme_location'  => 'header-menu'
                            ) );
                ?>
                </div>
            </nav>

            <!-- HERO _____ -->
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
        </header>
