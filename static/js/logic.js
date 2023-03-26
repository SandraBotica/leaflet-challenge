// Creating the map object centering on ghana
let myMap = L.map("map", {
  center: [7.9465, 1.0232],
  zoom: 3
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// // Use this link to get the GeoJSON data, significant earthquakes past 7 days
// let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";

// Use this link to get the GeoJSON data, all earthquakes past 7 days
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// // Use this link to get the GeoJSON data, M1.0+ earthquakes past 7 days
// let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_week.geojson";

// // Use this link to get the GeoJSON data, M2.5+ earthquakes past 7 days
// let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojson";

// // Use this link to get the GeoJSON data, M4.5+ earthquakes past 7 days
// let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";


// // Use this link to get the GeoJSON data, significant earthquakes past 30 days
// let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";

// // Use this link to get the GeoJSON data, all earthquakes past 30 days
// let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// // Use this link to get the GeoJSON data, M1.0+ earthquakes past 30 days
// let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/1.0_month.geojson";

// // Use this link to get the GeoJSON data, M2.5+ earthquakes past 30 days
// let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson";

// // Use this link to get the GeoJSON data, M4.5+ earthquakes past 30 days
// let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";

// // Define a markerSize() function that will give each location a different radius based on the earthquakes magnitude.
function markerSize(mag) {
    return Math.sqrt(mag) * 10;
  }


// Perform a GET request to the link (URL)
d3.json(link).then(function (response) {
    // Once we get a response, send the response.features object to features.
    features= response.features;
    // Loop through the features array
    for (let i = 0; i < features.length; i++) {
        // Conditionals for depth of earhquake that will determine color of marker, darker=greater depth.
        let color = "";
        if (features[i].geometry.coordinates[2] > 90) {
        color = "rgb(21, 80, 132)";
        }
        else if (features[i].geometry.coordinates[2] > 70) {
        color = "rgb(120, 80, 132)";
        }
        else if (features[i].geometry.coordinates[2] > 50) {
        color = "rgb(193, 80, 0)";
        }
        else if (features[i].geometry.coordinates[2] > 30) {
        color = "rgb(255, 80, 0)";
        }
        else if (features[i].geometry.coordinates[2] > 10) {
        color = "rgb(255, 129, 0)";
        }
        else {
        color = "rgb(250, 195, 107)";}
        
        let location = features[i];
        if(location)
            // Create one marker on the map for each features (earhquake) location.
            L.circleMarker([location.geometry.coordinates[1], location.geometry.coordinates[0]],
                {fillOpacity: 0.75,
                    color: "black",
                    fillColor: color,
                    // Setting our circle's radius to equal the output of our markerSize() function:
                    // This will make our marker's size proportionate to the earthquake magnitude.
                    // Bigger radius for greater magnitude.
                    radius: markerSize(location.properties.mag)
                // Giving each feature a popup with information that's relevant to it
                }).bindPopup(`<h1>Location: ${location.properties.place}</h1><hr>
                <h2>Magnitude: ${location.properties.mag}</hr2>
                <h3>Depth: ${location.geometry.coordinates[2]}</h3>`).addTo(myMap)
            // }).bindPopup(`<h1>Location: ${location.properties.place}</h1><hr>
            // <br /><br />Magnitude: ${location.properties.mag}<br /><br />
            // Depth: ${location.geometry.coordinates[2]}`).addTo(myMap)
            };

 // Set up the legend.
 let legend = L.control({ position: "bottomright" });
 legend.onAdd = function(myMap) {
//    let div = L.DomUtil.create("div", "info legend");
//    let limits = features.options.limits;
//    let colors = features.options.colors;
//    let labels = [];
   let limits = features.location.geometry.coordinates[2].options.limits;
   let colors = features.location.geometry.coordinates[2].options.colors;
   let labels = [];
//    let limits = features.location.geometry.coordinates[2].options.limits;
//    let color = color;
//    let labels = ["-10-10", "10-30","30-50","50-70","70-90","90+"];

   // Add the minimum and maximum.
   let legendInfo = "<h1>Depth of the earthquake</h1>" +
     "<div class=\"labels\">" +
       "<div class=\"min\">" + limits[0] + "</div>" +
       "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
     "</div>";

   div.innerHTML = legendInfo;

   limits.forEach(function(limits, index) {
     labels.push("<li style=\"background-color: " + color[index] + "\"></li>");
   });

   div.innerHTML += "<ul>" + labels.join("") + "</ul>";
   return div;
 };

 // Adding the legend to the map
 legend.addTo(myMap);

});
       

               
