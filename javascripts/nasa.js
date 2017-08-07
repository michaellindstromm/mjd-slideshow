console.log("hello");
var url = "https://epic.gsfc.nasa.gov/api/natural";


$.ajax({
  url:url,
  data: {
    api_key:nasaapiKey
  }
}).done(slideShow)
  .fail(function(xhr, status, error){
    console.log(xhr, status, error);
  })

function slideShow (apod) {
  console.log(apod);
  for (var i = 0; i < apod.length; i++) {
    let thisImage = apod[i].date;
    let newImage = thisImage.replace(/-/g,"/")
    let spaceIndex = newImage.indexOf(" ");
    let newerImage = newImage.slice(0, spaceIndex);
    let time = newImage.slice((spaceIndex+1),newImage.length)
    if (i===0) {
      $(`<div class="carousel-item hidden active">
        <img class="d-block img-fluid" id="image${i}" src="" alt="First slide">
        <div class="carousel-caption d-md-block">
        <h5>Taken: ${newerImage} at ${time}</h5>
        <h6>${apod[i].caption}</h6>
        </div>
      </div>`).insertBefore("a.carousel-control-prev");
    } else {
      $(`<div class="carousel-item hidden">
        <img class="d-block img-fluid" id="image${i}" src="">
        <div class="carousel-caption d-md-block">
        <h5>Taken: ${newerImage} at ${time}</h5>
        <h6>${apod[i].caption}</h6>
        </div>
      </div>`).insertBefore("a.carousel-control-prev");
    }
    $(`#image${i}`).attr("src", `https://api.nasa.gov/EPIC/archive/natural/${newerImage}/png/${apod[i].image}.png?api_key=${nasaapiKey}`)
  }
}
// $('#carouselExampleControls').on("slide.bs.carousel", function(){
//
// })

// $('.carousel').carousel({
//   interval: 4000
// })

// let previous = $('.carousel').carousel("prev");
// let next = $('.carousel').carousel("next");
//
// $(previous).fadeOut(500);
// $(next).fadeIn(500);

let activeImg = $('.carousel-inner').children('.carousel-item');
console.log(activeImg);
$(activeImg).on('change', function () {
  if ($('.carousel-item').hasClass("active")) {
    console.log(this);
    $(this).removeClass("hidden")
    $(this).addClass("visible")
  } else {
    $(this).removeClass("visible")
    $(this).addClass("hidden")
  }
})
