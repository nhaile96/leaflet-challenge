var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson";

d3.json(queryUrl).then(function(data){
    createFeatures(data.features);
    console.log(data)

})

function createFeatures(earthquakeData) {



    function onEachFeature(feature, layer){
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    }
}