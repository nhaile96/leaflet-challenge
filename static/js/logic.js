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

function createMap(earthquakes) {
    var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });

    var baseMaps={
        'Street Map':street,
    };

    var overlayMaps = {
        Earthquakes: earthquakes
    };

    var myMap= L.map("map", {
        center: [15.5994, -28.6731],
        zoom : 3
    });

    L.control.layers(baseMaps,overlayMaps, {
        collapsed: false
    }).addTo(myMap);


    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function () {
        var div = L.DomUtil.create('div', 'info legend');
        depth= [-10, 10, 30, 50, 70, 90];
        labels=[];

        div.innerHTML += "<h3 style = 'text-align: center'>Depth</h3>"
        for (var i = 0; i < depth.length; i++) {
            labels.push('<li style="background-color:' + getFillColor(depth[i] + 1) + '"> <span>' + depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '' : '+') + '</span></li>');
        }
        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
    };
    legend.addTo(myMap);
}
