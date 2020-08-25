<?php

  // REGISTER MENUS
  function register_my_menus() {
    register_nav_menus(
      array(
        'header-menu' => __( 'Header Menu' ),
        'footer-menu' => __( 'Footer Menu' )
      )
    );
  }
  add_action( 'init', 'register_my_menus' );



  function enqueue_basic_scripts() {
    // Enqueue Bootstrap
    wp_enqueue_style( 'store-bootstrap-css ', get_template_directory_uri() . '/css/bootstrap.css' );
    //Enqueue Animate CSS
    wp_enqueue_style( 'store-animate-css ', get_template_directory_uri() . '/css/animate.min.css' );
    // Enqueue Fonts
    wp_enqueue_style( 'store-google-fonts', 'https://fonts.googleapis.com/css?family=Play:400,700|Poppins:400,600|Righteous&display=swap');
    // custom Woocommerce styles
    wp_enqueue_style( ' store-add-woocommerce-css ', get_template_directory_uri() . '/css/custom_wc.css');
    // Custom styles
    wp_enqueue_style( ' store-add-main-css ', get_template_directory_uri() . '/style.css', array(), '2.0' );
    wp_enqueue_style( ' store-product-css ', get_template_directory_uri() . '/css/product_viewer.css', array(), '2.0' );

    // Font-awesome
    wp_enqueue_script( 'store-fontawesome', get_template_directory_uri() . '/js/lib/all.js', array(), false, true);
    //Enqueue JS
    wp_enqueue_script( 'store-js', get_template_directory_uri() . '/js/store.js', array( 'jquery' ), false, true);
  }
  add_action( 'wp_enqueue_scripts', 'enqueue_basic_scripts' );



  // Product Scripts
  // Change to plugin
  function enq_three_prod_scripts() {
      wp_enqueue_script( 'three_js', get_theme_file_uri( '/js/three_js/three.min.js' ), null, null, true );
      wp_enqueue_script( 'orbit_controls', get_theme_file_uri( '/js/three_js/OrbitControls.js' ), null, null, true );
      wp_enqueue_script( 'gltf_loader', get_theme_file_uri( '/js/three_js/GLTFLoader.js' ), null, null, true );
      wp_enqueue_script( 'svg_loader', get_theme_file_uri( '/js/three_js/SVGLoader.js' ), null, null, true );

      wp_enqueue_script( '_canvas', get_theme_file_uri( '/js/img_canvas.js' ), null, null, true );
      wp_enqueue_script( '_world', get_theme_file_uri( '/js/world.js' ), null, null, true );
      wp_enqueue_script( '_three_prod', get_theme_file_uri( '/js/3d_prod.js' ), null, null, true );
  }

  function enq_canvas_prod_scripts() {
      wp_enqueue_script( '_canvas', get_theme_file_uri( '/js/img_canvas.js' ), null, null, true );
      wp_enqueue_script( '_two_prod', get_theme_file_uri( '/js/2d_prod.js' ), null, null, true );
  }

  // Product quantity counter - Run on single prod page
  function ts_quantity_plus_minus() {
     if ( ! is_product() ) return;
     wp_enqueue_script( 'store-prod-woo-custom', get_template_directory_uri() .'/js/prod_woo_custom.js');
  }
  add_action( 'wp_footer', 'ts_quantity_plus_minus' );



  // Hook Js variables in the header
  function hook_js_variables() {

    $wpVar = array('themeUrl' => get_template_directory_uri());

    if ( have_posts() ) {
        while ( have_posts() ) {
            the_post();
            if (is_product() && ( has_term('3d', 'product_cat') || has_term('tees', 'product_cat') )) {
                global $product;
                $prodId = $product->get_id();
                $prodDes = $product->get_short_description();

                if (has_term('tees', 'product_cat')) {
                    $prodCategory = 'tees';
                }
              }
            }
            $prod = array(
                'id' => $prodId,
                'name' => $prodDes,
                'category' => $prodCategory
            );
          }

    ?>
      <script type="text/javascript">
        let glbWp = <?php echo json_encode($wpVar, JSON_UNESCAPED_SLASHES); ?>;
        let glbProduct = <?php echo json_encode($prod); ?>;
      </script> <?php
  }
  add_action ( 'wp_head', 'hook_js_variables' );
  // https://wordpress.stackexchange.com/questions/119573/is-it-possible-to-use-wp-localize-script-to-create-global-js-variables-without-a




 /* WOOCOMMERCE FILTERS */

  // Remove product additional information and image
  function remove_prod_det() {
      remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_excerpt', 20 );
      remove_action( 'woocommerce_before_single_product_summary', 'woocommerce_show_product_images', 20 );
  }

  function ts_quantity_plus_sign() {
     echo '<button type="button" class="plus" >+</button>';
  }
  add_action( 'woocommerce_after_add_to_cart_quantity', 'ts_quantity_plus_sign' );

  function ts_quantity_minus_sign() {
     echo '<button type="button" class="minus" >-</button>';
  }
  add_action( 'woocommerce_before_add_to_cart_quantity', 'ts_quantity_minus_sign' );



  // Remove product information filter - NOT USED
  function woo_remove_product_tabs( $tabs ) {
      //unset( $tabs['description'] );      	// Remove the description tab
      unset( $tabs['reviews'] ); 			// Remove the reviews tab
      unset( $tabs['additional_information'] );  	// Remove the additional information tab
      return $tabs;
  }
  //add_filter( 'woocommerce_product_tabs', 'woo_remove_product_tabs', 98 );

?>
