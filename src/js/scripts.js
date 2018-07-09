$(document).ready(function() {
  $(".navigation__icon").click(function() {
    $(this).toggleClass("navigation__open");
  });
  $(".navigation__icon").click(function() {
    $(".navigation__items").slideToggle("slow");
  });
  if ($(window).width() <= 768) {
    $(".navigation__item").click(function() {
      $(".navigation__icon").toggleClass("navigation__open");
      $(".navigation__items").slideToggle("slow");
    });
  }
});
