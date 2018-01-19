// Resize header when scrolling down
$(document).on("scroll", function(){
    if // Close to top of window
  ($(document).scrollTop() < 150 ){
        $("header").removeClass("shrink");
    }
    if // Scroll down distance from top of window
  ($(document).scrollTop() > 150){
      $("header").addClass("shrink");
    }
    else
    {
        $("header").removeClass("shrink");
    }
});

// Chocolat
$(document).ready(function(){
    $('.chocolat-parent').Chocolat();
});