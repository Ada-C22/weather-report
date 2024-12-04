require('dotenv').config()
console.log(process.env)

// var key = dotenv.config.
// var key = config.
// 'pk.aa7f5d0539c5675b7f3429402939d8fa';   //Insert your LocationIQ access token here

var styleJson = 'https://tiles-staging.locationiq.com/v3/streets/vector.json?key=' + key;

const map = new ol.Map({
    target: 'map',
    view: new ol.View({
        center: ol.proj.fromLonLat([-122.335167, 47.608013]),
        zoom: 12
    })
});

olms.apply(map, styleJson);