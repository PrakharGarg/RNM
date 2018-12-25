window.onload = function() {
  var startPos;
  var geoOptions = {
    enableHighAccuracy: false
  }

  var geoSuccess = function(position) {
    startPos = position;
    // document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    // document.getElementById('startLon').innerHTML = startPos.coords.longitude;
    fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + startPos.coords.latitude + ',' + startPos.coords.longitude + '&radius=1500&type=restaurant&key=AIzaSyCYAYnOOBhka5cjoRiMYY_f-gzwbKy1eu4')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      var randomNumber = Math.floor(Math.random() * (myJson.results.length))
      console.log(myJson.results.length);
      console.log(randomNumber);
      var place = myJson.results[randomNumber];
      var photoId = place.photos[0].photo_reference;
      document.getElementById("label").innerHTML = place.name;
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

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
};