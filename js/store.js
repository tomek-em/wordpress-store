/*
This is main store theme js files
* file content:
 * page resize events,
 * scroll events and
 *frontpage cards events
*/

jQuery(function($){

    // Toggle menu ------------
    function showMenu() {
        $('.menu').slideToggle(300);  //slideToggle -> toggle between slideUp/slideDown
    }
    $('#toggle').click(showMenu);


    // check scrollTop position
    function checkScrollPos() {
      if (($(window).scrollTop() > 50)&&($(window).width() > 882)) {
          $('.my-navbar').addClass('fixed');
          $('.my-navbar').addClass('black-bg');
          $('.sub-menu').addClass('black-bg');
          $('.cont').addClass('d-none');
          i = 0;
      } else if (($(window).width() > 882)&&($(window).scrollTop() < 50)) {
          $('.my-navbar').removeClass('fixed');
          $('.my-navbar').removeClass('black-bg');
          $('#top-nav a').removeClass('black-bg');
          $('.sub-menu').removeClass('black-bg');
          $('.cont').removeClass('d-none');
          $('.menu').css('display', 'flex');
      }
    }


    // Scroll event
    // change main menu style on scroll (desktop size only)
    $(window).bind('scroll', function() {
        checkScrollPos();
    });


    function mobSize() {
        $('.my-navbar').addClass('black-bg');
        $('.my-navbar').addClass('fixed');
        $('.cont').removeClass('d-none');
    }


    window.onresize = function(e) {
        e.preventDefault();
        if ($(window).width() < 882) {
            mobSize();
        }
        else if ($(window).width() > 882) {
            checkScrollPos();
        }
    };




    //  Main menu functions

    $('.menu-item-has-children').mouseover(function() {
        t = $(this);
        if  (($(window).width() > 882)) {
            s = t.children('.sub-menu');
            s.css('display','flex');
            s.addClass('drop-menu');
            $('.sub-menu li').addClass('drop-item');
        }
    });

    $('.my-navbar').mouseleave(function() {
        if (($(window).width() > 882)) {
            s = $('.sub-menu');
            s.css('display','none');
            s.removeClass('drop-menu');
            $('.sub-menu li').removeClass('drop-item');
        }
    });

    // for mobile
    $('.menu-item').mousedown(function() {
        t = $(this);
        if (( t.find('.sub-menu')) && ($(window).width() < 882) ) {
            s = t.children('.sub-menu');
            s.css('display','flex');
            s.addClass('drop-menu');
            $('.sub-menu li').addClass('drop-item');
        }
        else if(( t.find('.sub-menu')) && ($(window).width() < 882) ) {
            s = t.children('.sub-menu');
            s.css('display','none');
            s.removeClass('drop-menu');
            $('.sub-menu li').removeClass('drop-item');
        }
    });



    // Front page Product cards onMouse events
    $('#led').on({
          mouseenter: function() {
            $('#led-img').hide();
          },
          mouseleave: function () {
            $('#led-img').show();
          }
    });

    $('#t-shirt').on({
          mouseenter: function() {
            $('#shirt-img').hide();
          },
          mouseleave: function () {
            $('#shirt-img').show();
          }
    });

    $('#car').on({
          mouseenter: function() {
            $('#car-img').hide();
          },
          mouseleave: function () {
            $('#car-img').show();
          }
    });

  // shirt product designer
  $('#woo_designer_add_to_cart_form button').html('Buy');
  

if ($(window).width() < 882) mobSize();

});
