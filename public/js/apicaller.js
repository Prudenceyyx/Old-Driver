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
  // This example uses a local copy of the GeoJSON stored at
  // http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp
  //script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';

  // map.data.addGeoJson(data_raw); //data_raw loaded from the data js file

  // Google Map way of visualization
  // map.data.setStyle(function(feature) {
  //   var magnitude = feature.getProperty('mag');
  //   return {
  //     icon: getCircle(magnitude)
  //   };
  // });


  //d3 way of visualization
  var overlay = new google.maps.OverlayView();
  overlay.onAdd = () => {
    var layer = d3.select(overlay.getPanes().overlayLayer).append("div")
      .attr("class", "stations");

  //   // Draw each marker as a separate SVG element.
  //   // We could use a single SVG, but what size would it have?
    overlay.draw = function() {
      var projection = this.getProjection(),
        padding = 10;

      var marker = layer.selectAll("svg")
        .data(d3.entries(data_raw["features"]))
  //       .each(transform) // update existing markers
        .enter().append("svg")
        .each(transform)
        .attr("class", "marker");

  //     // Add a circle.
      marker.append("circle")
        .attr("r", 4.5)
        .attr("cx", padding)
        .attr("cy", padding);

      function transform(d) {
        // console.log(d.value.geometry)
        let lat = d.value.geometry.coordinates[0]; 
        let lng = d.value.geometry.coordinates[1]; 
        d = new google.maps.LatLng(lat, lng);
        d = projection.fromLatLngToDivPixel(d);
        return d3.select(this)
          .style("left", (d.x - padding) + "px")
          .style("top", (d.y - padding) + "px");
      }
    };
  }
  overlay.setMap(map);

}


//数据可视化里，画圆
function getCircle(magnitude) {
  return {
    path: google.maps.SymbolPath.CIRCLE,
    fillColor: 'red',
    fillOpacity: magnitude * 0.3,
    scale: 8,
    strokeColor: 'white',
    strokeWeight: 0,
  };
}





function getPlace(loc) {
  //Given loc, change id="current-place" content
  // $.ajax({
  //   url: 'https://maps.google.com/maps/api/geocode/json?key=AIzaSyBzE9xAESye6Kde-3hT-6B90nfwUkcS8Yw&latlng=' + loc.lat() + ',' + loc.lng() + '&language=en&result_type=street_address&sensor=false',
  //   type: 'get',
  //   dataType: 'json',
  //   success: function(resp) {
  //     if (resp['status'] === 'OK') {
  //       // document.getElementById("current-place").innerHTML = resp.results[2].address_components[0].long_name;
  //     } else {
  //       console.log(resp)
  //     }
  //   }
  // });


  var request = new XMLHttpRequest();
  var url = `https://maps.google.com/maps/api/geocode/json?key=AIzaSyBzE9xAESye6Kde-3hT-6B90nfwUkcS8Yw&latlng=${loc.lat()},${loc.lng()}&language=en&result_type=street_address&sensor=false`;
  request.responseType = 'json';
  request.open('GET', url, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      // var resp = request.responseText;
    } else {
      // We reached our target server, but it returned an error
      console.log(request)

    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
  };

  request.send();

}

function displayLoc(lstlg) {
  function num(x) {
    return Number.parseFloat(x).toFixed(3);
  }
  return num(lstlg.lat()) + " N " + num(lstlg.lng()) + " W";
}