(function ($) {
  "use strict";

  /*=============================================
    =    		 Preloader			      =
    =============================================*/
  // function preloader() {
  //     $('#xb-loadding').delay(0).fadeOut();
  // };

  //   $(window).on("load", function () {
  //     preloader();
  //     wowAnimation();
  //   });

  // sticky header
  // if ($(".stricky").length) {
  //   $(".stricky")
  //     .addClass("original")
  //     .clone(true)
  //     .insertAfter(".stricky")
  //     .addClass("stricked-menu")
  //     .removeClass("original");
  // }
  $(window).on("scroll", function () {
    if ($(".stricked-menu").length) {
      var headerScrollPos = 100;
      var stricky = $(".stricked-menu");
      if ($(window).scrollTop() > headerScrollPos) {
        stricky.addClass("stricky-fixed");
      } else if ($(this).scrollTop() <= headerScrollPos) {
        stricky.removeClass("stricky-fixed");
      }
    }
  });

  // mobile menu start
  $("#mobile-menu-active").metisMenu();

  $("#mobile-menu-active .dropdown > a").on("click", function (e) {
    e.preventDefault();
  });

  $(".hamburger_menu").on("click", function (e) {
    e.preventDefault();
    $(".slide-bar").toggleClass("show");
    $("body").addClass("on-side");
    $(".body-overlay").addClass("active");
    $(this).addClass("active");
  });

  $(".close-mobile-menu > a").on("click", function (e) {
    e.preventDefault();
    $(".slide-bar").removeClass("show");
    $("body").removeClass("on-side");
    $(".body-overlay").removeClass("active");
    $(".hamburger_menu").removeClass("active");
  });
  $("#mobile-menu-active li:not(.dropdown) > a.scrollspy-btn").on(
    "click",
    function (e) {
      e.preventDefault();
      $(".slide-bar").removeClass("show");
      $("body").removeClass("on-side");
      $(".body-overlay").removeClass("active");
      $(".hamburger_menu").removeClass("active");
    }
  );

  $(".body-overlay").on("click", function () {
    $(this).removeClass("active");
    $(".slide-bar").removeClass("show");
    $("body").removeClass("on-side");
    $(".hamburger-menu > a").removeClass("active");
    $(".header-search-form-wrapper").removeClass("open");
  });
  // mobile menu end

  $(".brand__marquee").marquee({
    speed: 50,
    gap: 30,
    delayBeforeStart: 0,
    direction: "left",
    duplicated: true,
    pauseOnHover: true,
    startVisible: true,
  });
  //data background
  $("[data-background]").each(function () {
    $(this).css(
      "background-image",
      "url(" + $(this).attr("data-background") + ") "
    );
  });

  // data bg color
  $("[data-bg-color]").each(function () {
    $(this).css("background-color", $(this).attr("data-bg-color"));
  });

  function wowAnimation() {
    var wow = new WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: false,
      live: true,
    });
    wow.init();
  }

  /* magnificPopup img view */
  $(".popup-image").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });

  /* magnificPopup video view */
  $(".popup-video").magnificPopup({
    type: "iframe",
    mainClass: "mfp-zoom-in",
  });

  // $(document).ready(function () {
  //   var progressPath = document.querySelector(".progress-wrap path");
  //   var pathLength = progressPath.getTotalLength();
  //   progressPath.style.transition = progressPath.style.WebkitTransition =
  //     "none";
  //   progressPath.style.strokeDasharray = pathLength + " " + pathLength;
  //   progressPath.style.strokeDashoffset = pathLength;
  //   progressPath.getBoundingClientRect();
  //   progressPath.style.transition = progressPath.style.WebkitTransition =
  //     "stroke-dashoffset 10ms linear";
  //   var updateProgress = function () {
  //     var scroll = $(window).scrollTop();
  //     var height = $(document).height() - $(window).height();
  //     var progress = pathLength - (scroll * pathLength) / height;
  //     progressPath.style.strokeDashoffset = progress;
  //   };
  //   updateProgress();
  //   $(window).scroll(updateProgress);
  //   var offset = 50;
  //   var duration = 550;
  //   jQuery(window).on("scroll", function () {
  //     if (jQuery(this).scrollTop() > offset) {
  //       jQuery(".progress-wrap").addClass("active-progress");
  //     } else {
  //       jQuery(".progress-wrap").removeClass("active-progress");
  //     }
  //   });
  //   jQuery(".progress-wrap").on("click", function (event) {
  //     event.preventDefault();
  //     jQuery("html, body").animate(
  //       {
  //         scrollTop: 0,
  //       },
  //       duration
  //     );
  //     return false;
  //   });
  // });

  //  Countdown
  $("[data-countdown]").each(function () {
    var $this = $(this),
      finalDate = $(this).data("countdown");
    if (!$this.hasClass("countdown-full-format")) {
      $this.countdown(finalDate, function (event) {
        $this.html(
          event.strftime(
            '<div class="single"><h1>%D</h1><p>Days</p></div> <div class="single"><h1>%H</h1><p>Hours</p></div> <div class="single"><h1>%M</h1><p>Minutes</p></div> <div class="single"><h1>%S</h1><p>Second</p></div>'
          )
        );
      });
    } else {
      $this.countdown(finalDate, function (event) {
        $this.html(
          event.strftime(
            '<div class="single"><h1>%Y</h1><p>Years</p></div> <div class="single"><h1>%m</h1><p>Months</p></div> <div class="single"><h1>%W</h1><p>Weeks</p></div> <div class="single"><h1>%d</h1><p>Days</p></div> <div class="single"><h1>%H</h1><p>Hours</p></div> <div class="single"><h1>%M</h1><p>Minutes</p></div> <div class="single"><h1>%S</h1><p>Second</p></div>'
          )
        );
      });
    }
  });

  // Accordion Box start
  if ($(".accordion_box").length) {
    $(".accordion_box").on("click", ".acc-btn", function () {
      var outerBox = $(this).parents(".accordion_box");
      var target = $(this).parents(".accordion");

      if ($(this).next(".acc_body").is(":visible")) {
        $(this).removeClass("active");
        $(this).next(".acc_body").slideUp(300);
        $(outerBox).children(".accordion").removeClass("active-block");
      } else {
        $(outerBox).find(".accordion .acc-btn").removeClass("active");
        $(this).addClass("active");
        $(outerBox).children(".accordion").removeClass("active-block");
        $(outerBox).find(".accordion").children(".acc_body").slideUp(300);
        target.addClass("active-block");
        $(this).next(".acc_body").slideDown(300);
      }
    });
  }
  // Accordion Box end
})(jQuery);
