var infoWindow;
var region = "1";
var showRegion = 0;
var polygons = [];
var readyB = 0;

function getBolsas() {
    console.log("llego");
    for (i = 1; i < 300; i++) {
        getRegions(i.toString());
    }

    init();

}

function CenterControl(controlDiv, map) {

    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.setAttribute("class", "bolsasB");
    controlUI.setAttribute("style", "visibility:hidden");
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '22px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click ver bolsas';
    controlDiv.appendChild(controlUI);

    // Set CSS for the control interior.
    var controlText = document.createElement('div');
    controlText.style.color = 'rgb(25,25,25)';
    controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
    controlText.style.fontSize = '16px';
    controlText.style.lineHeight = '38px';
    controlText.style.paddingLeft = '5px';
    controlText.style.paddingRight = '5px';
    controlText.style.backgroundColor = '#fff';
    controlText.innerHTML = 'Ver bolsas';
    controlUI.appendChild(controlText);

    // Setup the click event listeners: simply set the map to Chicago.
    controlUI.addEventListener('click', function () {
        show();
    });

}

function getRegions(idB) {
    $.ajax({
        url: "http://localhost:29870/WebServicePoints.asmx/getBolsas"
        , type: "POST"
        , data: "region=" + idB
        , success: function (results) {
            var response = (JSON.parse(results));
            var Coordenadas = [];
            for (i in response[0].coordenadas) {

                Coordenadas.push({
                    lng: parseFloat(response[0].coordenadas[i].latitud)
                    , lat: parseFloat(response[0].coordenadas[i].longitud)
                });

            }
            //function calls
            readyB++;
            createPolygons(Coordenadas);
            if (readyB == 290) {

                var bolsas = document.getElementById("vBolsas");
                bolsas.setAttribute("style", "visibility:visible");

            }

        }
        , error: function () {
            console.log('No se puede obtener la informacion solicitada.');

        }
    });

}



/** @this {google.maps.Polygon} */
function showArrays(event) {
    // Since this polygon has only one path, we can call getPath() to return the
    // MVCArray of LatLngs.
    var vertices = this.getPath();

    var contentString = '<b>Bermuda Triangle polygon</b><br>' +
        'Clicked location: <br>' + event.latLng.lat() + ',' + event.latLng.lng() +
        '<br>';

    // Iterate over the vertices.
    for (var i = 0; i < vertices.getLength(); i++) {
        var xy = vertices.getAt(i);
        contentString += '<br>' + 'Coordinate ' + i + ':<br>' + xy.lat() + ',' +
            xy.lng();
    }

    // Replace the info window's content and position.
    infoWindow.setContent(contentString);
    infoWindow.setPosition(event.latLng);

    infoWindow.open(map);
}

function createPolygons(coordenadas) {
    var color = getColor();
    var polygon = new google.maps.Polygon({
        paths: coordenadas
        , strokeColor: color
        , strokeOpacity: 0.8
        , strokeWeight: 3
        , fillColor: color
        , fillOpacity: 0.35
    });

    polygons.push(polygon);

}


function show() {
    console.log(polygons.length);
    var toggle = document.getElementById("offOn");
    if (showRegion == 0) {
        console.log(showRegion);
        for (i = 0; i < 290; i++) {
            polygons[i].setMap(map);

        }
        showRegion = 1;
        toggle.setAttribute("class", "fa fa-toggle-on");
    } else {
        for (i = 0; i < 290; i++) {
            polygons[i].setMap(null);
        }
        showRegion = 0;
        toggle.setAttribute("class", "fa fa-toggle-off");

    }



}