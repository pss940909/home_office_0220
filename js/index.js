setTimeout(function () {
  $(document).ready(function () {
    document.getElementById("loader").style.display = "none";
    document.getElementById("myDiv").style.display = "block";
    console.log("ok");
    // ---------------aos---------------
    AOS.init();
    $(".hamburger").click(function () {
      $(".nav_list").toggleClass("open");
    });
    // ---------------swiper-----------------
    const swiper = new Swiper(".swiper", {
      // Optional parameters
      direction: "horizontal",
      loop: true,

      // If we need pagination
      pagination: {
        el: ".swiper-pagination",
      },

      autoplay: {
        delay: 3500,
      },

      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },

      // Navigation arrows
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
    const swiper2 = new Swiper(".swiper2", {
      slidesPerView: 1,
      loop: true,
      spaceBetween: 30,
      autoplay: true,

      breakpoints: {
        620: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        820: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });
    // ---------------jQ---------------
    $(".sofa").hover(function () {
      $(".sofa span").toggleClass("none");
    });
    $(".desk").hover(function () {
      $(".desk span").toggleClass("none");
    });
    $(".chair").hover(function () {
      $(".chair span").toggleClass("none");
    });

    $(".port_meeting").hover(function () {
      $(".port_card a").toggleClass("opacity1");
    });
    // ---------------JS---------------
    // 跳轉到商品頁面
    const shopList = document.querySelectorAll(".shop_list li");
    shopList.forEach(function (item) {
      item.addEventListener("click", function (e) {
        window.location.href = "shop.html";
      });
    });
  });
}, 3500);
