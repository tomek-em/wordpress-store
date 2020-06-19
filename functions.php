<?php
    //Know-How:
    //The autoloading of functions.php means that its functions are available to you in any of your theme’s PHP files. 


    // The proper way to add styles & scripts is to enqueue them in this file
    // ------
    //jQuery
    //można dodać: wp_enqueue_script("jquery") w header.php albpo lepiej functions.php
    
    function register_my_menus() {
      register_nav_menus(
        array(
          'header-menu' => __( 'Header Menu' )
         )
       );
     }
     add_action( 'init', 'register_my_menus' );


//Enqueue JS 
    function load_js() {
        wp_enqueue_script( 'store', get_template_directory_uri() . '/js/store.js', array ( 'jquery' ), 1.1, false);
        
        // Create js var - wp template urls 
        wp_localize_script('store', 'wpUrl', array( 'siteurl' => get_option('siteurl'), 'theme_url' => get_template_directory_uri()));
        
        if ( have_posts() ) {
            while ( have_posts() ) {
                the_post();
                if (is_product() && has_term('3d', 'product_cat')) {
                    global $product;
                    $id = $product->get_id();
                    $n = $product->get_short_description();
                    $prod = array(
                        'id' => $id,
                        'name' => $n
                    );
                    wp_localize_script( 'store', 'wcObj', $prod );
                    
                    if (is_product() && has_term('trailer', 'product_cat')) {
                        $cat = array (
                            'cat' => 'trailer'
                        );
                    } else if (is_product() && has_term('tees', 'product_cat')) {
                        $cat = array (
                            'cat' => 'tees'
                        );
                    }
                    wp_localize_script( 'store', 'wcProd', $cat );
                }
            }
        }
        
    }

    //add_action('wp_footer', 'load_js');   // enqueue to footer
    add_action('wp_enqueue_scripts', 'load_js');





// Font-awesome 
function enqueue_fontawesome() {
    //    	wp_enqueue_script( 'typekit', 'https://kit.fontawesome.com/3680f9368b.js', array(), '1.0.0' );
    wp_enqueue_script( 'fontawesome', get_template_directory_uri() . '/js/all.js', array ( 'jquery' ), 1.1, true);
}
add_action( 'wp_enqueue_scripts', 'enqueue_fontawesome' ); 


// Enqueue Bootstrap
function add_bootstrap_css() {
        wp_enqueue_style( ' add_bootstrap_css ', get_template_directory_uri() . '/css/bootstrap.css' );
    }
    add_action( 'wp_enqueue_scripts', 'add_bootstrap_css' );


//Enqueue Animate CSS
    function add_animate_css() {
        wp_enqueue_style( ' add_animate_css ', get_template_directory_uri() . '/css/animate.min.css' );
    }
    //add_action( 'wp_enqueue_scripts', 'add_animate_css' );


//Enqueue Fonts
    function wpb_add_google_fonts() {
        wp_enqueue_style( 'wpb-google-fonts', 'https://fonts.googleapis.com/css?family=Play:400,700|Poppins:400,600|Righteous&display=swap', false );
   }
   
   add_action( 'wp_enqueue_scripts', 'wpb_add_google_fonts' );


// Menu Login - out 
    add_filter( 'wp_nav_menu_objects', 'mytheme_menufilter', 10, 2 );
    function mytheme_menufilter($items, $args) {
        // want our MAINMENU to have MAX of 7 items
        if ( $args->theme_location == 'mainmenu' ) {
            $toplinks = 0;
            foreach ( $items as $k => $v ) {
                if ( $v->menu_item_parent == 0 ) {
                    // count how many top-level links we have so far...
                    $toplinks++;
                }
                // if we've passed our max # ...
                if ( $toplinks > 7 ) {
                    unset($items[$k]);
                }
            }
        }
        return $items;
    }
 




//Woocommerce login / logout
add_filter('wp_nav_menu_items', 'add_login_logout_link', 10, 2);

function add_login_logout_link($items, $args) {
    $item = '';
      if( is_user_logged_in() ) {
        $item = '<a href="'. wp_logout_url( get_permalink( wc_get_page_id( 'myaccount' ) ) ) .'">Log Out</a>';
      }
      else{
        $item = '<a href="' . get_permalink( wc_get_page_id( 'myaccount' ) ) . '">Log In</a>';          
      }        

    $items .= '<li class="menu-item">'. $item .'</li>';
    return $items;
} 

//add_filter( 'woocommerce_enqueue_styles', '__return_false' );

//Reload woocommerce styles
    function add_customwc_css() {
        wp_enqueue_style( ' add_woocommerce_css ', get_template_directory_uri() . '/css/custom_wc.css');
    }

// Main CSS Stylesheet
    function add_main_css() {
        wp_enqueue_style( ' add_main_css ', get_template_directory_uri() . '/style.css', array(), '2.0' );
    }
    add_action( 'wp_enqueue_scripts', 'add_customwc_css');
    add_action( 'wp_enqueue_scripts', 'add_main_css');

// Create wp template urls js var
    //wp_localize_script('mylib', 'WPURLS', array( 'siteurl' => get_option('siteurl') ));
//add_action( 'wp_enqueue_scripts', 'my_custom_styles', 99);

// Three JS
    function three_enq() {
        wp_enqueue_script( 'three_js', get_theme_file_uri( '/js/three_js/three.min.js' ), array('jquery'), null, true );
        //wp_enqueue_script( 'obj_loader', get_theme_file_uri( '/js/OBJLoader.js' ), array('jquery'), null, true );
        //wp_enqueue_script( 'mtl_loader', get_theme_file_uri( '/js/MTLLoader.js' ), array('jquery'), null, true );
        wp_enqueue_script( 'orbit_controls', get_theme_file_uri( '/js/three_js/OrbitControls.js' ), array('jquery'), null, true );
        wp_enqueue_script( 'gltf_loader', get_theme_file_uri( '/js/three_js/GLTFLoader.js' ), array('jquery'), null, true );
        wp_enqueue_script( 'svg_loader', get_theme_file_uri( '/js/three_js/SVGLoader.js' ), array('jquery'), null, true );
        
        wp_enqueue_script( '_obj', get_theme_file_uri( '/js/obj.js' ), array('jquery'), null, true );
    }
        //add_action( 'wp_enqueue_scripts', 'three_enq' ); 
        // this function is called from index.php if needed


// Remove product information filter
//add_filter( 'woocommerce_product_tabs', 'woo_remove_product_tabs', 98 );
function woo_remove_product_tabs( $tabs ) {
    //unset( $tabs['description'] );      	// Remove the description tab
    unset( $tabs['reviews'] ); 			// Remove the reviews tab
    unset( $tabs['additional_information'] );  	// Remove the additional information tab
    return $tabs;
}

function remove_prod_de() {
    // Remove product additiona information and image
    remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_excerpt', 20 );

    remove_action( 'woocommerce_before_single_product_summary', 'woocommerce_show_product_images', 20 );    
}






add_action( 'woocommerce_after_add_to_cart_quantity', 'ts_quantity_plus_sign' );
 
function ts_quantity_plus_sign() {
   echo '<button type="button" class="plus" >+</button>';
}
 
add_action( 'woocommerce_before_add_to_cart_quantity', 'ts_quantity_minus_sign' );

function ts_quantity_minus_sign() {
   echo '<button type="button" class="minus" >-</button>';
}
 
add_action( 'wp_footer', 'ts_quantity_plus_minus' );
 
function ts_quantity_plus_minus() {
   // To run this on the single product page
   if ( ! is_product() ) return;
   ?>
   <script type="text/javascript">
          
      jQuery(document).ready(function($){   
          
            $('form.cart').on( 'click', 'button.plus, button.minus', function() {
 
            // Get current quantity values
            var qty = $( this ).closest( 'form.cart' ).find( '.qty' );
            var val   = parseFloat(qty.val());
            var max = parseFloat(qty.attr( 'max' ));
            var min = parseFloat(qty.attr( 'min' ));
            var step = parseFloat(qty.attr( 'step' ));
 
            // Change the value if plus or minus
            if ( $( this ).is( '.plus' ) ) {
               if ( max && ( max <= val ) ) {
                  qty.val( max );
               } 
            else {
               qty.val( val + step );
                 }
            } 
            else {
               if ( min && ( min >= val ) ) {
                  qty.val( min );
               } 
               else if ( val > 1 ) {
                  qty.val( val - step );
               }
            }
             
         });
          
      });
          
   </script>
   <?php
}


?>

