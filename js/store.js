jQuery(function($){
    var i = 0;
    
    // Toggle menu ------------
    
    function showMenu() {
        $('.menu').slideToggle(300);
    }

    $('#toggle').click(showMenu);
    
    $('.menu-item').click(function() {
        t = $(this);
        if (( t.find('.sub-menu')) && (i == 0) ){
            i = 1;
            s = t.children('.sub-menu');
            s.css('display','flex');
            s.addClass('drop-menu');
            $('.sub-menu li').addClass('drop-item');
    
        }   
        else  {
            i = 0;
            s = t.children('.sub-menu');
            s.css('display','none');
            s.removeClass('drop-menu');
            $('.sub-menu li').removeClass('drop-item');
        }
        
    });

    window.onresize = function(e) {
       $('.menu').css('display', 'flex');
    }

    $(window).bind('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('.my-navbar').addClass('fixed');
            $('.my-navbar').addClass('black-bg');
            $('.site-navbar-top').addClass('fixed');
            $('.site-navbar-top').addClass('black-bg');
            $('.site-navbar-top').addClass('cont');
            $('.sub-menu').css('display','none');
            i = 0;
        } else {
            $('.my-navbar').removeClass('fixed');
            $('.my-navbar').removeClass('black-bg');
            $('.site-navbar-top').removeClass('fixed');
            $('.site-navbar-top').removeClass('black-bg');
            $('.site-navbar-top').removeClass('cont');
        }
    });
});



// Typing Effect -----------------------------
//contructor function with method type()
const TypeWriter = function(txtElement, words, wait = 2500) {
    this.txtELement = txtElement;
    this.words = words;
    this.txt = ' ';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;    
}

TypeWriter.prototype.type = function() {
    
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];
    if(this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    //console.log(this.txt);
    this.txtELement.innerHTML = '<span class="txt">'+ this.txt + '</span>';
    
    let typeSpeed = 200;
    if (this.isDeleting) {
        typeSpeed /= 2;
    }
    
    if(!this.isDeleting && this.txt === fullTxt){
        typeSpeed = this.wait;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.wordIndex ++;
        typeSpeed = 900;
    }
    
    setTimeout(() => this.type(), typeSpeed);
}

//Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    //init TypeWriter
    
    new TypeWriter(txtElement, words, wait);
}

function starter() {
    setTimeout(init, 2400);
}

// Type Method
document.addEventListener('DOMContentLoaded', starter);
