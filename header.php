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
    <link rel="stylesheet" href="<?php bloginfo('stylesheet_url') ?>">
    
    <?php wp_head(); ?>
</head>

<body <?php if(function_exists("body_class") && !is_404()){body_class();} else echo 'class="default_page"'?>> 
    <div class="wrapper">
    <!-- Header -->
        <header class="site-header" id="main-header">
        <!-- Nav-bar -->
            <div class="menu-toggle" id="toggle">
                <i class="fas fa-bars"></i>
            </div>
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
            <nav class="my-navbar">
                <h1 class="brand"><a href="index.html">Ad Store</a></h1>
                <?php
                wp_nav_menu( array(
                                'theme_location'  => 'header-menu',
                                'menu'            => '',
                                'container'       => false
                            ) );
                ?>
            </nav>

            <div class="head-txt">
<!--                <h1 class= 'animated zoomIn delay-1s'>My Store |  </h1>-->     <h2 class="head-title animated fadeIn delay-1s">
                <span class="txt-type" data-wait="3000" data-words='["led signs", "t-shirts", "car decoration"]'></span>
            </h2>
                <div class="header-but animated fadeIn delay-1s">
                    <a class="button1" href="index.php/shop">BUY</a>
                </div>
            </div> 
            
        </header>