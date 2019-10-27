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
    <link rel="stylesheet" href="<?php bloginfo('template_url')?>/css/bootstrap.css">
    
    <?php wp_head(); ?>
</head>

<body <?php if(function_exists("body_class") && !is_404()){body_class();} else echo 'class="default_page"'?>> 
    <div class="wrapper">
    <!-- Header -->
        <header class="site-header" id="main-header">
    <!--
            <nav class="my-navbar">
                <h2 class="brand"><a href="index.html">My Store</a></h2>
                <ul id="menu">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="products.html">Products</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>    
    -->
            <div class="site-navbar-top">
                <div class="container">
                    <div class="row align-items-center">
                        <div class="col-12 col-md-6">
                            <div class="site-logo">
                                <h1><a href="<?php echo home_url(); ?>" class="site-logo ">AdStore</a></h1>
                            </div>
                        </div>
                        <div class="col-12 col-md-6">
                            <div class="d-flex flex-row align-items-center justify-content-end">
                                <div class="site-top-icons" id='top-nav'>
                                    <ul class='cont-flex top-nav-ul '>
                                        <li><a href="<?php echo home_url(); ?>/index.php/my-account"><i class="fas fa-user"></i></a></li>
                                        <li>
                                            <a href="<?php echo home_url(); ?>/index.php/cart" class="site-cart"><i class="fas fa-cart-arrow-down"></i>
                                            </a>
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
            
            <nav class="my-navbar">
                <div class="cont">
                    <?php
                    wp_nav_menu( array(
                                    'theme_location'  => 'header-menu',
                                    'menu'            => '',
                                    'container'       => false
                                ) );
                    ?>
                </div>
            </nav>
            
            <div class="cont">
<!--
                <div class="head-txt">
                <h2 class="head-title animated fadeIn delay-1s">Custom
                        <span class="txt-type" data-wait="3000" data-words='["led sign", "t-shirt", "car decoration"]'></span>
                    </h2>
                    <div class="header-but animated fadeIn delay-1s">
                        <a class="button1" href="index.php/shop">Shop Now</a>
                    </div>
            
                </div>
-->
            </div> 
        </header>