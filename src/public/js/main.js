const coordinates = [-33.437933957, -70.651292865];
const map = L.map('map').setView(coordinates, 14);
const baseMap = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
baseMap.addTo(map);

const colorMap = new L.TileLayer('https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png');
const baseMapIndex = {
  "Mapa base 1": baseMap,
  "Mapa base 2": colorMap
};

const url_geojson = 'http://cswcl.github.io/fake-api/monumentos_historicos_extracto.geojson'
const url_csv = 'http://cswcl.github.io/fake-api/monumentos_historicos_extracto.csv'

const POI = {}
const POI_coord = {}
function process(id) {
    return "(ID: "+ id+  ")<br><b>nombre</b>: "+ POI[id]+ 
    "<br><b>latitud y longitud</b>: " + POI_coord[id][1]+","+POI_coord[id][0]+ 
    "<br><b><a href='https://www.google.com/maps/search/"+POI_coord[id][1]+","+POI_coord[id][0]+"'>LINK</a> </b>";
}

function onEachFeature(feature, layer) {
    if ( feature.properties && feature.properties.id ) {
    	id = feature.properties.id
        POI_coord[ id ] = feature.geometry.coordinates;
        layer.bindPopup( process( id ) );
        p = feature.geometry.coordinates;
        pos = [p[1],p[0]];
        in_range = (id > 767 && id < 772); // ids that I want to change color 
        var circle = L.circleMarker(pos, {
          color: in_range ? "#f03":"blue",
          fillColor: in_range ? "#f03":"blue",
          fillOpacity: 0.5,
      }).addTo(map);        
    }
}

function generate(text){
	array = text.split('\n');
	for (var i = 0; i < array.length; i++) {
		el = array[i].split(',');
		POI[el[0]] = el[1];
	}
}

// First request: csv
var request = new XMLHttpRequest();
request.open("GET",url_csv);
request.addEventListener('load', function(event) {
   if (request.status >= 200 && request.status < 300) {
		generate(request.responseText);

		// Second request: geojson
		fetch(url_geojson).then(function(response) {
			return response.json();
		}).then(function(data) {
			cities = L.geoJSON(data, {
			    onEachFeature: onEachFeature,
			},);
			cities.addTo(map);
			var overlayMaps = {
			    "Marcadores": cities
			};
			// Create the control and add it to the map;
			var control = L.control.layers(baseMapIndex, overlayMaps); // Grab the handle of the Layer Control, it will be easier to find.
			control.addTo(map);
		});
   } else {
      console.warn(request.statusText, request.responseText);
   }
});
request.send();
