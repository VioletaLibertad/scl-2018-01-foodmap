window.onload = () => {
  initMap();
};

let map;
let infoWindow;
// Inicializamos el mapa
function initMap() {
  navigator.geolocation.getCurrentPosition(function (position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    // Entregamos userPosition como parámetro del mapa
    let userPosition = new google.maps.LatLng(latitude, longitude);

    let mapOptions = {
      center: userPosition,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.MAP
    };

    map = new google.maps.Map(document.getElementById('map-container'), mapOptions);

    // Creamos infoWindow
    infoWindow = new google.maps.InfoWindow();

    //let userSearch = document.getElementById('userSearch').value;

    let request = {
      location: userPosition,
      radius: 5000,
      types: ['cafe']
    };

    // Inicialización PlaceService
    let service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, function (results, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }
    });

    function createMarker(place) {
      let marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });
      google.maps.event.addListener(marker, 'click', function () {
        infoWindow.setContent(place.name);
        infoWindow.open(map, this);
      });
    }

  });
}