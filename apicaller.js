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