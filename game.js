var map;
var myCenter = new google.maps.LatLng(40.7143528, -74.0059731);
var lstlg = new google.maps.LatLng(40.7143528, -74.0059731);
var tmplg = new google.maps.LatLng(40.7143528, -74.0059731);

var markerOption = {
    clickable: false,
    flat: true,
    icon: 'images/car_ico_25.png',
    visible: true,
    map: map
};

var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer({ markerOptions: markerOption });


var initPosition = new google.maps.Marker({
    position: myCenter,
    icon: 'images/car_ico_25.png',
    map: map,
});




var EARTH_RADIUS = 6378137.0; //单位M
var PI = Math.PI;

function getRad(d) {
    return d * PI / 180.0;
}

function getGreatCircleDistance(lat1, lng1, lat2, lng2) {
    var radLat1 = getRad(lat1);
    var radLat2 = getRad(lat2);
    var a = radLat1 - radLat2;
    var b = getRad(lng1) - getRad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * EARTH_RADIUS;
    s = Math.round(s * 10000) / 10000.0;
    return s;
}


function initialize() {
    var mapProp = {
        center: myCenter,
        zoom: 15,
        disableDefaultUI: false, //hide the UI buttons
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControlOptions: {
            mapTypeIds: ['standard_style','retro_style','night_style','aube_style']
        }
    };

    map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('standard_style', styledMapType1);
    map.mapTypes.set('retro_style', styledMapType2);
    map.mapTypes.set('night_style', styledMapType3);
    map.mapTypes.set('aube_style', styledMapType4);
    map.setMapTypeId('standard_style');

    directionsDisplay.setMap(map);
	
	
	        // Create a <script> tag and set the USGS URL as the source.
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
	
	
	


    //placeMarker(myCenter)
     initPosition.setMap(map);
     warring.innerHTML = "本次行程花费  " + "时  " + "分  " + "秒"  ;
	 
    google.maps.event.addListener(map, 'click', function(event) {

        // Freeze zoom when route
        directionsDisplay.setOptions({ preserveViewport: true });
        

        tmplg=event.latLng;
		initPosition.setMap(null);
		//placeMarker(tmplg);
		calcRoute(lstlg,tmplg);
		var dis = getGreatCircleDistance(lstlg.lat(),lstlg.lng(),tmplg.lat(),tmplg.lng());
		dis = dis/1000.0;
		var spe=1000.0;
		var dishours = Math.floor(dis*spe / 60/60 ) ;
		var disminutes = Math.floor( (dis*spe - dishours*60*60) / 60);
		var disseconds = Math.floor( dis*spe % 60);
	   // var dis= 6370*accros[cos(lstlg.lat())*cos(tmplg.lat())*cos(lstlg.lng()-tmplg.lng())+sin(lstlg.lat())*sin(tmplg.lat())];
		//warring.innerHTML = "本次行程花费 " +dis * 60+ "秒";
		warring.innerHTML = "本次行程花费 " +dishours+ "时 " + disminutes+ "分 " +disseconds+ "秒"  ;
		var tmptime = dis *spe;
		maxtime -= tmptime;
		pasttime += tmptime;


        map.panTo(tmplg);
        lstlg = tmplg;
        //map.panTo(tmplg)

        //placeMarker(lstlg);
    });
	
	map.data.addListener('click',function(e){
		google.maps.event.trigger(this.getMap(),'click',e);
	});

    google.maps.event.addListener(map, 'zoom_changed', function() {
        // 3 seconds after the center of the map has changed, pan back to the marker
        window.setTimeout(function() {
            //map.setZoom(12);
            //map.panTo(lstlg);

            map.panTo(tmplg);
        }, 1000);
    });
}



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

function placeMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        map: map,
    });
    var infowindow = new google.maps.InfoWindow({
        content: 'Latitude: ' + location.lat() + '<br>Longitude: ' + location.lng()
    });
    infowindow.open(map, marker);
}

google.maps.event.addDomListener(window, 'load', initialize);

var maxtime = 60 * 60 * 8;
var pasttime = 0;

function CountDown() {

 
    var ohours = Math.floor(pasttime / 60 / 60);
    var ominutes = Math.floor((pasttime - ohours * 60 * 60) / 60);
    var oseconds = Math.floor(pasttime % 60);
    var oDate = new Date();
    timer2.innerHTML = oDate.getFullYear() + "年 " + (oDate.getMonth() + 1) + "月 " + oDate.getDate() + "日 " + (ohours + 9) + "时" + ominutes + "分" + oseconds + "秒";
    pasttime = pasttime + 1;
    if (maxtime > 0) {
        hours = Math.floor(maxtime / 60 / 60);
        minutes = Math.floor((maxtime - hours * 60 * 60) / 60);
        seconds = Math.floor(maxtime % 60);
        msg = "距离下班还有" + hours + "时" + minutes + "分" + seconds + "秒";
        document.all["timer"].innerHTML = msg;
        --maxtime;
		if(maxtime<=6*3600 &&  maxtime>4*3600)
			map.setMapTypeId('retro_style');
		else if(maxtime<=4*3600 &&  maxtime>2*3600)
			map.setMapTypeId('night_style');
		else if(maxtime<=2*3600)
			map.setMapTypeId('aube_style');
    }
	else {

        maxtime = 0;
		warring.innerHTML = "时间到!";
		hours = Math.floor(maxtime / 60/60);
		minutes = Math.floor( (maxtime - hours*60*60) / 60);
		seconds = Math.floor(maxtime % 60);
		msg = "距离下班还有" + hours + "时"+ minutes + "分" + seconds + "秒";
		document.all["timer"].innerHTML = msg;

		pasttime = 8*60*60;
		oDate = new Date(); 
		ohours = Math.floor(pasttime / 60/60 ) ;
		ominutes = Math.floor( (pasttime - ohours*60*60) / 60);
		oseconds = Math.floor(pasttime % 60);
		timer2.innerHTML = oDate.getFullYear() +"年 " + (oDate.getMonth()+1) +"月 "  + oDate.getDate()+"日 " + (ohours+9) + "时"+ ominutes + "分" + oseconds + "秒";

		clearInterval(timer);
        //initialize();

    }
}
timer = setInterval("CountDown()", 1000);

function Calfee() {

}
