// Creating the map object centering on ghana
let myMap = L.map("map", {
  center: [7.9465, 1.0232],
  zoom: 3
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Use this link to get the GeoJSON data, all earthquakes past 7 days
let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// // Define a markerSize() function that will give each location a different radius based on the earthquakes magnitude.
function markerSize(mag) {
  return Math.sqrt(mag) * 10;
}

// Perform a GET request to the link (URL)
d3.json(link).then(function (response) {
  // Once we get a response, send the response.features object to features.
  features = response.features;
  // Loop through the features array
  for (let i = 0; i < features.length; i++) {
    // Conditionals for depth of earhquake that will determine color of marker, darker=greater depth.
    let color = "";
    if (features[i].geometry.coordinates[2] > 90) {
      color = "#155084";
    }
    else if (features[i].geometry.coordinates[2] > 70) {
      color = "#785084";
    }
    else if (features[i].geometry.coordinates[2] > 50) {
      color = "#C15000";
    }
    else if (features[i].geometry.coordinates[2] > 30) {
      color = "#FF5000";
    }
    else if (features[i].geometry.coordinates[2] > 10) {
      color = "#FF8100";
    }
    else {
      color = "#FAC36B";
    }

    let location = features[i];
    if (location)
      // Create one marker on the map for each features (earhquake) location.
      L.circleMarker([location.geometry.coordinates[1], location.geometry.coordinates[0]],
        {
          fillOpacity: 0.75,
          color: "black",
          fillColor: color,
          // Setting our circle's radius to equal the output of our markerSize() function:
          // This will make our marker's size proportionate to the earthquake magnitude.
          // Bigger radius for greater magnitude.
          radius: markerSize(location.properties.mag)
          // Giving each feature a popup with information that's relevant to it
        })
        .bindPopup(`<p>Location: ${location.properties.place}</p><hr>
                <p>Magnitude: ${location.properties.mag}</p>
                <p>Depth: ${location.geometry.coordinates[2]}</p>`).addTo(myMap)
  };
}
).catch(function(error){
  console.log(error)
}
);

// Set up the legend.
let legend = L.control({ position: "bottomleft" });
legend.onAdd = function (myMap) {
  let div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Depth of Earthquakes</h4>";
  div.innerHTML += '<i style="background: #FAC36B"></i><span><10</span><br>';
  div.innerHTML += '<i style="background: #FF8100"></i><span>10-30</span><br>';
  div.innerHTML += '<i style="background: #FF5000"></i><span>30-50</span><br>';
  div.innerHTML += '<i style="background: #C15000"></i><span>50-70</span><br>';
  div.innerHTML += '<i style="background: #785084"></i><span>70-90</span><br>';
  div.innerHTML += '<i style="background: #155084"></i><span>>90</span><br>';
  // div.innerHTML += '<i class="icon" style="background-image: url(https://d30y9cdsu7xlg0.cloudfront.net/png/194515-200.png);background-repeat: no-repeat;"></i><span>Grænse</span><br>';

  return div;
};

legend.addTo(myMap);




