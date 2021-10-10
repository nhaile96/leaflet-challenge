var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson";
// get request to query URL
d3.json(queryUrl).then(function(data){
    //send response of data to createFeatures function
    createFeatures(data.features);
    console.log(data)

})

function createFeatures(earthquakeData) {

//Define faunction to run once for each feature in the features array.
//Give each feature a popup that describes the place and time of earthquake

    function onEachFeature(feature, layer){
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    }

    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
            let radius = feature.properties.mag * 5;

            return new L.CircleMarker(latlng, {
                fillOpacity:0.75,
                color: "white",
                fillColor: getFillColor(feature.geometry.coordinates[2]),
                radius: radius
            });
        },
    });

    createMap(earthquakes);
}

function getFillColor(depth) {
    if (depth >= 90) {
        return "#d73027"
    }
    else if (depth >= 70) {
        return "#fc8d59"
    }
    else if (depth > + 50) {
        return "#fee08b"
    }
    else if (depth >= 30) {
        return "#d9ef8b"
    }
    else if (depth >= 10) {
        return "#91cf60"
    }
    else {
        return "#1a9850"
    }
};

function createMap(earthquakes) {}