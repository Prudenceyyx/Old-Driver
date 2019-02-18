var styledMapType1 = new google.maps.StyledMapType(standard_style, { name: "standard" });
var styledMapType2 = new google.maps.StyledMapType(retro_style, { name: "retro" });
var styledMapType3 = new google.maps.StyledMapType(night_style, { name: "night" });
var styledMapType4 = new google.maps.StyledMapType(aube_style, { name: "aube" });


// var map = new google.maps.Map(document.getElementById('map'), {
//     center: { lat: 55.647, lng: 37.581 },
//     zoom: 11,
//     mapTypeControlOptions: {
//         mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
//             'styled_map'
//         ]
//     }
// });
// map.mapTypes.set('styled_map', styledMapType);
// map.setMapTypeId('styled_map');

// google map api direction 画出车辆路径
var markerOption = {
    clickable: false,
    flat: true,
    icon: 'images/no.pic',
    visible: true,
    map: map
};

var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer({ markerOptions: markerOption });


var mk1 = new google.maps.Marker({
    position: myCenter,
    map: map,
    icon: 'images/car_30_past.png'
});
var mk2 = new google.maps.Marker({
    position: myCenter,
    map: map,
    icon: 'images/car_30.png'
});

function draw_trip(lg1, lg2) {

    mk1.setPosition(lg1);
    mk2.setPosition(lg2);

    mk1.setMap(map);
    mk2.setMap(map);

    calcRoute(lg1, lg2);
}

function placeMarker_car(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: 'images/car_30.png'
    });
    //return marker;
}

function placeMarker_leaving_car(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: 'images/car_30_past.png'
    });
    //return marker;
}
//用googlemap api 画出路径
function calcRoute(start, end) {
    var request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
    };
    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(result);
        }
    });
}


function dataVisualize() {

    // Create a <script> tag and set the USGS URL as the source.
    //数据可视化
    var script = document.createElement('script');

    // This example uses a local copy of the GeoJSON stored at
    // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
    //script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';

    script.src = 'earthquake_big.js'
    document.getElementsByTagName('head')[0].appendChild(script);
    map.data.setStyle(function(feature) {
        var magnitude = feature.getProperty('mag');
        return {
            icon: getCircle(magnitude)
        };
    });
}


//数据可视化里，画圆
function getCircle(magnitude) {
    return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'red',
        fillOpacity: magnitude * 0.3,
        scale: 8,
        olor: 'white',
        strokeWeight: 0,
    };
}

function eqfeed_callback(results) {
    map.data.addGeoJson(results);
}



function getPlace(loc) {
    //Given loc, change id="current-place" content
    $.ajax({
        url: 'https://maps.google.com/maps/api/geocode/json?key=AIzaSyBzE9xAESye6Kde-3hT-6B90nfwUkcS8Yw&latlng=' + loc.lat() + ',' + loc.lng() + '&language=en&result_type=street_address&sensor=false',
        type: 'get',
        dataType: 'json',
        success: function(resp) {
            if (resp['status'] === 'OK') {
                // document.getElementById("current-place").innerHTML = resp.results[2].address_components[0].long_name;
            } else {
                console.log(resp)
            }
        }
    });
}

function displayLoc(lstlg) {
    function num(x) {
        return Number.parseFloat(x).toFixed(3);
    }
    return num(lstlg.lat()) + " N " + num(lstlg.lng()) + " W";
}