/* eslint-disable no-mixed-spaces-and-tabs */
import { getLatLng } from "./main.js";

// Create and show the map
function initMap() {
  const myLatlng = { lat: -14.2504, lng: -60.12367 }; // default lt/ln 
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: myLatlng,
  });
  // Create the initial InfoWindow.
  let infoWindow = new google.maps.InfoWindow({
    content: "¡Dale click en tu ciudad de nacimiento!",
    position: myLatlng,
  });

  infoWindow.open(map);
  // Configurar el click
  map.addListener("click", (mapsMouseEvent) => {
    // Close the current InfoWindow.
    infoWindow.close();
    // Create a new InfoWindow.
    infoWindow = new google.maps.InfoWindow({
      position: mapsMouseEvent.latLng,
    });
    getLatLng(mapsMouseEvent.latLng);
    infoWindow.setContent(
      JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
    );
    infoWindow.open(map);
  });
}

window.initMap = initMap;
