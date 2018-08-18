window.model = {};

window.onload = () => {
  setTimeout();
};

/* Loader */
setTimeout(() => {
  loader.classList.remove('show');
  loader.classList.add('disappear');
  mainPage.classList.remove('disappear');
  mainPage.classList.add('show');
}, 2000);

/* Map Init */
let map, infoWindow, pos, marker, service, userInput;

function initMap() {
  map = new google.maps.Map(document.getElementById('map-container'), {
    center: {
      lat: -33.419150,
      lng: -70.641983
    },
    zoom: 13
  });

  /* Initializing InfoWindow */
  infoWindow = new google.maps.InfoWindow();

  /* Initializing Places */
  service = new google.maps.places.PlacesService(map);

  /* Fetching user input */
  userInput = document.getElementById('userSearch').value;
  console.log(userInput);
  userSearch.value = '';

  /* User's Geolocation */
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      // Marker creation
      marker = new google.maps.Marker({
        position: pos,
        map: map
      });
      map.setCenter(pos);
      // Places Nearby creation
      service.nearbySearch({
        location: pos,
        radius: 50,
        type: [userInput]
      }, callback);

    }, function () {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }

  // Places
  function callback(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
        console.log(results[i]);
      }
    }
  }

  function createMarker(place) {
    let placeLoc = place.geometry.location;
    let marker = new google.maps.Marker({
      map: map,
      position: placeLoc
    });

    google.maps.event.addListener(marker, 'click', function () {
      infoWindow.setContent(place.name);
      infoWindow.open(map, this);
    });
  }

}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: El servicio de Geolocalización falló.' :
    'Error: Tu navegador no soporta Geolocalización.');
  infoWindow.open(map);
}