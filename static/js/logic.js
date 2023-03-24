// Creating the map object centering on turkey
let myMap = L.map("map", {
  center: [38.963745, 35.243322],
  zoom: 3
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use this link to get the GeoJSON data, earthquakes past 7 days
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// // Define a markerSize() function that will give each location a different radius based on the earthquakes magnitude.
// function markerSize(mag) {
//     return Math.sqrt(mag) * 50;
//   }

// Perform a GET request to the link (URL)
d3.json(link).then(function (response) {
    // Once we get a response, send the response.features object to features.
    features= response.features;

    for (let i = 0; i < features.length; i++) {

        let location = features[i];
        if(location){
            // markers.addLayer(
            L.marker([location.geometry.coordinates[1], location.geometry.coordinates[0]])
                // ,{fillOpacity: 0.75,
                //     color: "white",
                //     fillColor: "pink",
                //     // Setting our circle's radius to equal the output of our markerSize() function:
                //     // This will make our marker's size proportionate to the earthquake magnitude.
                //     radius: markerSize(location.properties.mag)})
            .bindPopup(`<h1>Location: ${location.properties.place}</h1><hr><h2>Magnitude: ${location.properties.mag}</hr2><h3>Depth: ${location.geometry.coordinates[2]}</h3>`)
            .addTo(myMap);
        }
    }
  });



  
