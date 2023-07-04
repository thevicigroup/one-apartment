// https://traveltime.com/blog/how-far-you-can-travel-isochrone-map-api-travel-time-map

// The name of the starting location. We will have to geocode this to coordinates.
var startingLocation = "The White House, DC";
// The departure time in an ISO format.
var departureTime = "2019-01-04T09:00:00-0500";
// Travel time in seconds. We want 1 hour travel time so it is 60 minutes x 60 seconds.
var travelTime = 60 * 60;
// These secret variables are needed to authenticate the request. Get them from http://docs.traveltimeplatform.com/overview/getting-keys/ and replace 
var APPLICATION_ID = "place your app id here";
var API_KEY = "place your api key here";
// Map focus point when code sample is loaded
var mymap = L.map('mapid').setView([38.8, -77.0365], 9);

var mymap = L.map('mapid').setView([38.8, -77.0365], 9);


// SEND REQUEST
function sendGeocodingRequest(location) {
    // The request for the geocoder. Reference: http://docs.traveltimeplatform.com/reference/geocoding-search/
    var request = {
      query: location
    };
    document.getElementById("error").style.display = "none";
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("GET", "https://api.traveltimeapp.com/v4/geocoding/search?query=" + location)
    xhr.setRequestHeader("X-Application-Id", APPLICATION_ID);
    xhr.setRequestHeader("X-Api-Key", API_KEY);
    xhr.onreadystatechange = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        if (xhr.readyState === 4) {
          sendTimeMapRequest(xhr.response)
        }
      } else {
        if (APPLICATION_ID === "place your app id here" || API_KEY === "place your api key here") {
          document.getElementById("error").style.display = "block";
        }
      }
    };
xhr.send();
};





function sendTimeMapRequest(geocodingResponse) {

    // The request for Time Map. Reference: http://docs.traveltimeplatform.com/reference/time-map/
    var coords = geocodingResponse.features[0].geometry.coordinates;
    var latLng = { lat: coords[1], lng: coords[0] };
    
    var request = {
        departure_searches: [{
        id: "first_location",
        coords: latLng,
        transportation: {
            type: "public_transport"
        },
    
        departure_time: departureTime,
        travel_time: travelTime
        }],
    
        arrival_searches: []
    };
    
    var xhr = new XMLHttpRequest()
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
        drawTimeMap(mymap, this.response);
        }
    });
    xhr.open("POST", "https://api.traveltimeapp.com/v4/time-map")
    xhr.setRequestHeader("X-Application-Id", APPLICATION_ID);
    xhr.setRequestHeader("X-Api-Key", API_KEY);
    xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    xhr.responseType = "json";
    xhr.send(JSON.stringify(request));
    }

var mymap = L.map('mapid').setView([38.8, -77.0365], 9);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
maxZoom: 18,
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
id: 'mapbox.streets'
}).addTo(mymap);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 18,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox.streets'
}).addTo(mymap);


function drawTimeMap(map, response) {

    // Reference for the response: http://docs.traveltimeplatform.com/reference/time-map/#response-body-json-attributes
    var shapesCoords = response.results[0].shapes.map(function (polygon) {
      var shell = ringCoordsHashToArray(polygon.shell);
      var holes = polygon.holes.map(ringCoordsHashToArray);
      return [shell].concat(holes);
    });
    var polygon = L.polygon(shapesCoords, { color: 'red' });
    polygon.addTo(map);
    map.fitBounds(polygon.getBounds());
  
  };