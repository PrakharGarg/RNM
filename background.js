window.onload = function() {
  var startPos;
  var geoOptions = {
    enableHighAccuracy: false
  }

  var geoSuccess = function(position) {
    startPos = position;
    // document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    // document.getElementById('startLon').innerHTML = startPos.coords.longitude;
    fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + startPos.coords.latitude + ',' + startPos.coords.longitude + '&radius=1500&type=restaurant&keyword=cafe&key=AIzaSyCYAYnOOBhka5cjoRiMYY_f-gzwbKy1eu4')
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      var randomNumber = Math.floor(Math.random() * (myJson.results.length))
      var photoId = myJson.results[randomNumber].photos[0].photo_reference;

      fetch('https://maps.googleapis.com/maps/api/place/photo?maxwidth=1080&photoreference=' + photoId + '&key=AIzaSyCYAYnOOBhka5cjoRiMYY_f-gzwbKy1eu4')
      .then(response => response.blob())
      .then(images => {
        var outside =  URL.createObjectURL(images);
        document.getElementById("image").src=outside;
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