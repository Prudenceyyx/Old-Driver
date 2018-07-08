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
	icon: 'images/car_ico_25.png',
	visible: true,
	map: map
};

var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer({ markerOptions: markerOption });

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
		fillOpacity: magnitude*0.3,
		scale: 8,
		olor: 'white',
		strokeWeight: .5
	};
}

function eqfeed_callback(results) {
	map.data.addGeoJson(results);
}