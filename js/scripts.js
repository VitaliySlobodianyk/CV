/*
   
    Template Name : WebRes - Personal Resume Template
    Author : UiPasta Team
    Website : http://www.uipasta.com/
    Support : http://www.uipasta.com/support/
	
	
*/



/*
   
   Table Of Content
   
   1. Preloader
   2. Smooth Scroll
   3. Scroll Naviagation Background Change with Sticky Navigation
   4. Mobile Navigation Hide or Collapse on Click
   5. Scroll To Top
   6. Tooltip
   7. Ajaxchimp for Subscribe Form
   8. Portfolio Filtering
   9. Magnific Popup
  10. Testimonial Carousel/Slider
  11. Statistics Counter
 

*/
const formspree = 'https://formspree.io/mleeorqk'

const SERVICE = `https://cors-anywhere.herokuapp.com/${formspree}`;


(function($) {
    'use strict';

    jQuery(document).ready(function() {


        /* Preloader */

        $(window).load(function() {
            $('.preloader').delay(1600).fadeOut('slow');
        });



        /* Smooth Scroll */

        $('a.smoth-scroll').on("click", function(e) {
            var anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $(anchor.attr('href')).offset().top - 50
            }, 1000);
            e.preventDefault();
        });




        /* Scroll Naviagation Background Change with Sticky Navigation */

        $(window).on('scroll', function() {
            if ($(window).scrollTop() > 100) {
                $('.header-top-area').addClass('navigation-background');
            } else {
                $('.header-top-area').removeClass('navigation-background');
            }
        });




        /* Mobile Navigation Hide or Collapse on Click */

        $(document).on('click', '.navbar-collapse.in', function(e) {
            if ($(e.target).is('a') && $(e.target).attr('class') != 'dropdown-toggle') {
                $(this).collapse('hide');
            }
        });
        $('body').scrollspy({
            target: '.navbar-collapse',
            offset: 195

        });




        /* Scroll To Top */

        $(window).scroll(function() {
            if ($(this).scrollTop() >= 500) {
                $('.scroll-to-top').fadeIn();
            } else {
                $('.scroll-to-top').fadeOut();
            }
        });


        $('.scroll-to-top').click(function() {
            $('html, body').animate({ scrollTop: 0 }, 800);
            return false;
        });



        /* Tooltip */

        $(function() {
            $('[data-toggle="tooltip"]').tooltip()
        })



        $("#mc-form").submit((e) => {
            e.preventDefault();
            let xhr = new XMLHttpRequest();
            xhr.open('POST', SERVICE, true);
            const data = {
                target: 'Subscription',
                email: $("#mc-email").val()
            };
            xhr.send(JSON.stringify(data));
            $(`label[for="mc-email"]`).text("Subscribed Succesfully");
            setTimeout(() => {
                $("#subscribeclose").click();
            }, 2000);
        });





        /* Portfolio Filtering */

        $('.portfolio-inner').mixItUp();



        /* Magnific Popup */

        $('.portfolio-popup').magnificPopup({
            type: 'image',

            gallery: { enabled: true },
            zoom: {
                enabled: true,
                duration: 500

            },


            image: {
                markup: '<div class="mfp-figure portfolio-pop-up">' +
                    '<div class="mfp-close"></div>' +
                    '<div class="mfp-img"></div>' +
                    '<div class="mfp-bottom-bar portfolio_title">' +
                    '<div class="mfp-title"></div>' +
                    '<div class="mfp-counter"></div>' +
                    '</div>' +
                    '</div>',

                titleSrc: function(item) {
                    return item.el.attr('title');
                }
            }


        });


        /* Testimonial Carousel/Slider */

        $(".testimonial-carousel-list").owlCarousel({
            items: 1,
            autoPlay: true,
            stopOnHover: false,
            navigation: true,
            navigationText: ["<i class='fa fa-long-arrow-left fa-2x owl-navi'></i>", "<i class='fa fa-long-arrow-right fa-2x owl-navi'></i>"],
            itemsDesktop: [1199, 1],
            itemsDesktopSmall: [980, 1],
            itemsTablet: [768, 1],
            itemsTabletSmall: false,
            itemsMobile: [479, 1],
            autoHeight: true,
            pagination: false,
            transitionStyle: "fadeUp"
        });




        /* Statistics Counter */

        $('.statistics').appear(function() {
            var counter = $(this).find('.statistics-count');
            var toCount = counter.data('count');

            $(counter).countTo({
                from: 0,
                to: toCount,
                speed: 5000,
                refreshInterval: 50
            })
        });


    });

})(jQuery);


let form = {
    formId: document.getElementById("contact-form"),
    action: "https://formspree.io/mleeorqk",
    data: {
        name: document.getElementById("name"),
        email: document.getElementById("email"),
        subject: document.getElementById("subject"),
        message: document.getElementById("message")
    },
    send: (e) => {
        e.preventDefault();
        const xhr = new XMLHttpRequest();
        xhr.open("POST", SERVICE, true);
        let info = {
            name: form.data.name.value,
            email: form.data.email.value,
            subject: form.data.subject.options[form.data.subject.selectedIndex].value,
            message: form.data.message.value
        }
        xhr.send(JSON.stringify(info));
        xhr.response = null;
        if (xhr.status != 200) {
            console.log(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
        }
        alert("Your message sent succesfully!");
    },
};

form.formId.addEventListener("submit", form.send);