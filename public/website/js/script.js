
$(document).ready(function(){
  $(window).scroll(function(){
  	var scroll = $(window).scrollTop();
	  if (scroll > 10) {
	    $(".navbar").addClass("bg-light");
	  }

	  else{
		  $(".navbar").removeClass("bg-light");
	  }
  })
})

// Loader Animation
window.addEventListener("load", function () {
  const loader = document.querySelector(".loader");
  loader.className += " hidden"; // class "loader hidden"
});