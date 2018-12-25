window.onload = function() {
  var startPos;
  var geoOptions = {
    enableHighAccuracy: false
  }

  var geoSuccess = function(position) {
    startPos = position;
    // document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    // document.getElementById('startLon').innerHTML = startPos.coords.longitude;
    fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + startPos.coords.latitude + ',' + startPos.coords.longitude + '&radius=1500&type=restaurant&fields=photos,formatted_address&key=AIzaSyCYAYnOOBhka5cjoRiMYY_f-gzwbKy1eu4')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      var randomNumber = Math.floor(Math.random() * (myJson.results.length))
      var place = myJson.results[randomNumber];
      var photoId = place.photos[0].photo_reference;
      document.getElementById("label").innerHTML = place.name;
      document.getElementById("sublabel").innerHTML = place.vicinity;
      fetch('https://maps.googleapis.com/maps/api/place/photo?maxwidth=1800&photoreference=' + photoId + '&key=AIzaSyCYAYnOOBhka5cjoRiMYY_f-gzwbKy1eu4')
      .then(response => response.blob())
      .then(images => {
        var outside =  URL.createObjectURL(images);
        document.getElementById("image").src=outside;
        document.getElementById("image").style.opacity = "1";
      })

    });
  };
  var geoError = function(error) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };


  function foodPics(){
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        var photos = JSON.parse(this.responseText).photos;
        var randomNumber = Math.floor(Math.random() * (40))
        var photoUrl = photos[randomNumber].src.large2x;
        document.getElementById("image").src=photoUrl;
        document.getElementById("image").style.opacity = "1";
      }
    });

    xhr.open("GET", "https://api.pexels.com/v1/search?query=food+query&per_page=40&page=1");
    xhr.setRequestHeader("Authorization", "563492ad6f91700001000001c20b062eee2e459f912a73a485e59b66");
    xhr.setRequestHeader("Cache-Control", "no-cache");
    xhr.setRequestHeader("Postman-Token", "40fb47e0-1bce-48e6-9d3e-e68b1be37bfb");

    xhr.send(data);
  }
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
  // foodPics();
};