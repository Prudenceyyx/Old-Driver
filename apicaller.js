var styledMapType1 = new google.maps.StyledMapType(standard_style, { name: "standard" });
var styledMapType2 = new google.maps.StyledMapType(retro_style, { name: "retro" });
var styledMapType3 = new google.maps.StyledMapType(night_style, { name: "night" });
var styledMapType4 = new google.maps.StyledMapType(aube_style, { name: "aube" });



function getPlace(loc){
	//Given loc, change id="current-place" content
	$.ajax({
		url:'https://maps.google.com/maps/api/geocode/json?key=AIzaSyBzE9xAESye6Kde-3hT-6B90nfwUkcS8Yw&latlng='+loc.lat()+','+loc.lng()+'&language=en&result_type=street_address&sensor=false',
		type:'get',
		dataType:'json',
		success:function(resp){
			if(resp['status']==='OK')
			{
				document.getElementById("current-place").innerHTML = resp.results[2].address_components[0].long_name;
			}else{
				console.log(resp)
			}
		}	
	});
}

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