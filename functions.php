<?php

  // Register menu
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

        // Create Javascript variables - wp template urls
        wp_localize_script('store', 'wpUrl', array( 'siteurl' => get_option('siteurl'), 'theme_url' => get_template_directory_uri()));

        if ( have_posts() ) {
            while ( have_posts() ) {
                the_post();
                if (is_product() && ( has_term('3d', 'product_cat') || has_term('tees', 'product_cat') )) {
                    global $product;
                    $id = $product->get_id();
                    $n = $product->get_short_description();

                    if (has_term('tees', 'product_cat')) {
                        $category = 'tees';
                    }

                    $prod = array(
                        'id' => $id,
                        'name' => $n,
                        'category' => $category
                    );

                    wp_localize_script( 'store', 'woocomObj', $prod );

                }
            }
        }
    }

    add_action('wp_enqueue_scripts', 'load_js');





// Font-awesome
function enqueue_fontawesome() {
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





// Woocommerce login / logout
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

//Reload woocommerce styles
function add_customwc_css() {
    wp_enqueue_style( ' add_woocommerce_css ', get_template_directory_uri() . '/css/custom_wc.css');
}

// Main CSS Stylesheet
function add_main_css() {
    wp_enqueue_style( ' add_main_css ', get_template_directory_uri() . '/style.css', array(), '2.0' );
    wp_enqueue_style( ' product_css ', get_template_directory_uri() . '/css/product_viewer.css', array(), '2.0' );
}
add_action( 'wp_enqueue_scripts', 'add_customwc_css');
add_action( 'wp_enqueue_scripts', 'add_main_css');


// Three JS
function three_enq() {
    wp_enqueue_script( 'three_js', get_theme_file_uri( '/js/three_js/three.min.js' ), null, null, true );
    wp_enqueue_script( 'orbit_controls', get_theme_file_uri( '/js/three_js/OrbitControls.js' ), null, null, true );
    wp_enqueue_script( 'gltf_loader', get_theme_file_uri( '/js/three_js/GLTFLoader.js' ), null, null, true );
    wp_enqueue_script( 'svg_loader', get_theme_file_uri( '/js/three_js/SVGLoader.js' ), null, null, true );
    // wp_enqueue_script( '_obj', get_theme_file_uri( '/js/obj.js' ), array('jquery'), null, true );
    wp_enqueue_script( '_world', get_theme_file_uri( '/js/world.js' ), null, null, true );
    wp_enqueue_script( '_app', get_theme_file_uri( '/js/app.js' ), null, null, true );
}

function canvas_enq() {
    wp_enqueue_script( '_canvas', get_theme_file_uri( '/js/canvas.js' ), null, null, true );
}




//
// add_action( 'woocommerce_before_add_to_cart_button', 'add_fields_before_add_to_cart' );
//
// function add_fields_before_add_to_cart( ) {

	?>
	<!-- <table>
		<tr>
			<td> -->
				<?php
        // _e( "Name:", "aoim");
        ?>
			<!-- </td>
			<td>
				<input type = "text" name = "customer_name" id = "customer_name" placeholder = "Name on Gift Card">
			</td>
		</tr>
		<tr>
			<td> -->
				<?php
        // _e( "Message:", "aoim");
        ?>
			<!-- </td>
			<td>
				<input type = "text" name = "customer_message" id = "customer_message" placeholder = "Your Message on Gift Card">
			</td>
		</tr>
	</table> -->
	<?php

// }
//
//
// /**
//  * Add data to cart item
//  */
// add_filter( 'woocommerce_add_cart_item_data', 'add_cart_item_data', 25, 2 );
//
// function add_cart_item_data( $cart_item_meta, $product_id ) {
//
// 	if ( isset( $_POST ['customer_name'] ) && isset( $_POST ['customer_message'] ) ) {
// 		$custom_data  = array() ;
// 		$custom_data [ 'customer_name' ]    = isset( $_POST ['customer_name'] ) ?  sanitize_text_field ( $_POST ['customer_name'] ) : "" ;
// 		$custom_data [ 'customer_message' ] = isset( $_POST ['customer_message'] ) ? sanitize_text_field ( $_POST ['customer_message'] ): "" ;
//
// 		$cart_item_meta ['custom_data']     = $custom_data ;
// 	}
//
// 	return $cart_item_meta;
// }
//
// /**
//  * Display the custom data on cart and checkout page
//  */
// add_filter( 'woocommerce_get_item_data', 'get_item_data' , 25, 2 );
//
// function get_item_data ( $other_data, $cart_item ) {
//
// 	if ( isset( $cart_item [ 'custom_data' ] ) ) {
// 		$custom_data  = $cart_item [ 'custom_data' ];
//
// 		$other_data[] =   array( 'name' => 'Name',
// 					 'display'  => $custom_data['customer_name'] );
// 		$other_data[] =   array( 'name' => 'Message',
// 					 'display'  => $custom_data['customer_message'] );
// 	}
//
// 	return $other_data;
// }
//
// /**
//  * Add order item meta
//  */
//
// add_action( 'woocommerce_add_order_item_meta', 'add_order_item_meta' , 10, 2);
//
// function add_order_item_meta ( $item_id, $values ) {
//
// 	if ( isset( $values [ 'custom_data' ] ) ) {
//
// 		$custom_data  = $values [ 'custom_data' ];
// 		wc_add_order_item_meta( $item_id, 'Name', $custom_data['customer_name'] );
// 		wc_add_order_item_meta( $item_id, 'Message', $custom_data['customer_message'] );
// 	}
// }
//
//









// Remove product information filter
//add_filter( 'woocommerce_product_tabs', 'woo_remove_product_tabs', 98 );
function woo_remove_product_tabs( $tabs ) {
    //unset( $tabs['description'] );      	// Remove the description tab
    unset( $tabs['reviews'] ); 			// Remove the reviews tab
    unset( $tabs['additional_information'] );  	// Remove the additional information tab
    return $tabs;
}

// Remove product additional information and image
function remove_prod_de() {
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
   // Run this on the single product page
   if ( ! is_product() ) return;
   ?>

   <script type="text/javascript">
      jQuery(document).ready(function($) {

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
                 } else {
                 qty.val( val + step );
                }
              }
              // is minus
              else {
                 if ( min && ( min >= val ) ) {
                    qty.val( min );
                 } else if ( val > 1 ) {
                    qty.val( val - step );
                 }
              }
         });

      });
   </script>
   <?php
}


?>
