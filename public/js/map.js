// var myCenter = new google.maps.LatLng(40.7143528, -74.0059731);
// var lstlg = new google.maps.LatLng(40.7143528, -74.0059731);
// var tmplg = new google.maps.LatLng(40.7143528, -74.0059731);
var center = { lat: 40.7143528, lon: -74.0059731 }

new deck.DeckGL({
  mapboxApiAccessToken: 'pk.eyJ1IjoicHJ1ZGVuY2V5eXgiLCJhIjoiY2pzaWd2MG1pMW1yZzQ5cWdleGtxdHByOCJ9._iDU8XV5SPRY2hGmVPvCKg',
  mapStyle: 'mapbox://styles/mapbox/light-v9',
  longitude: center.lon,
  latitude: center.lat,
  zoom: 12,
  layers: [
    new deck.ScatterplotLayer({
      data: [
        { position: [center.lon, center.lat], color: [255, 0, 0], radius: 100 }
      ]
    })
  ]
});