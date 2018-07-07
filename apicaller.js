var styledMapType = new google.maps.StyledMapType(retro_style,{name:"a"})

 var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 55.647, lng: 37.581},
          zoom: 11,
          mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                    'styled_map']
          }
        });
map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');