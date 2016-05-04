var currentRoute = "RE103";
var objClients = [];
var estado;
var directionsDisplay = [];
var directionsService = [];
var map = null;
var tiempo = 0;
var distancia = 0;
var colores = [];
var col = ["#2a7015", "#957816", "#a67a81", "#7b52ff", "#c6a147", "#9d90fb", "#e8de66", "#6992a9", "#bd94e9", "#598633", "#186904", "#9f2c2e", "#ff2b5c", "#bc0b5b", "#aa651c", "#4e589b", "#5635a8", "#11cd0e", "#897623", "#ed3b77", "#36f92e", "#dbef81", "#de775a", "#5d7e0b", "#64b534", "#29c42f", "#466985", "#205b40", "#6992a9"];


/**
 * [[Consulta el web service que obtiene la lista de clientes para una determinada ruta,Guarda la lista de clientes en objClients.]]
 * Call to other functions:init
                           addAnother
                           calcruta
                           colocarTodosMarcadores
                           getPerfil
  * Last modification:26-04-2016
  * Author: Diana Arce
 */
function getClients() {
    $.ajax({
        url: "http://localhost:32318/Optimizador.asmx/getClientsTR"
        , type: "POST"
        , data: "trP=" + currentRoute
        , success: function (results) {
            var response = (JSON.parse(results));
            for (i in response) {
                client = new Object(); //new object
                //add all properties to the new object
                client.ADDRESS = response[i].ADDRESS;
                client.ADDRESSNAME = "" + response[i].ADDRESSNAME

                client.LATITUDE = response[i].LATITUDE;
                client.LONGITUDE = response[i].LONGITUDE;
                client.Peso = response[i].Peso;
                client.Volumen = response[i].Volumen;
                client.COLOR = col[i];

                objClients.push(client); //add response to objClients push

            }
            //function calls
            //   init();
            getBolsas();
            addAnother();
            calcruta();
            colocarTodosMarcadores();
            getPerfil();
            generateCombobox();

        }
        , error: function () {
            console.log('No se puede obtener la informacion solicitada.');

        }
    });

}

function verRuta() {
    var e = document.getElementById("desde");
    var desde = e.options[e.selectedIndex].value;
    var h = document.getElementById("hasta");
    var hasta = h.options[h.selectedIndex].value;


    var indice1 = parseInt(desde);
    var indice2 = parseInt(hasta);
    var rutaT = [];
    rutaT.push(objClients[indice1 - 1]);
    rutaT.push(objClients[indice2 - 1]);
    rutaT.push(objClients[indice2 - 1]);


    init();
    calcrutaT(rutaT);
    colocarMarcadores(parseFloat(rutaT[0].LATITUDE), rutaT[0].LONGITUDE, desde, rutaT[0].COLOR);
    colocarMarcadores(parseFloat(rutaT[1].LATITUDE), rutaT[1].LONGITUDE, hasta, rutaT[1].COLOR);

}

function verToda() {
    init();
    calcruta();
    colocarTodosMarcadores();

}

/**
 * [[Para cada uno de los clientes llama a colocar marcador.]]
 * Call to other functions: colocarMarcadores 
 * Last modification:26-04-2016
 * Author: Diana Arce
 */
function colocarTodosMarcadores() {
    for (i = 0; i < objClients.length; i++) {
        var pos = i + 1; //indice del marcador
        colocarMarcadores(parseFloat(objClients[i].LATITUDE), objClients[i].LONGITUDE, pos.toString(), objClients[i].COLOR);
    }

}

/**
 * [[Obtiene un color aleatorio hexadecimal]] 
 * @returns {[[String]]} [[random color html]]
 * Last modification:26-04-2016
 * Author: Diana Arce
 */
function getColor() {
    var color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    return color;
};


/**
 * [[Places marker on google maps map]]
 * @param {Float} latitude   [[latitude marker]]
 * @param {Float} longuitude [[longuitude marker]]
 * @param {String} pos        [[text marker]]
 * @param {string}   color      [[color marker]]
 *  Last modification:26-04-2016
 * Author: Diana Arce
 */
function colocarMarcadores(latitude, longuitude, pos, color) {
    //content pup up window on marker click
    var contentString = '<div id="content">' +
        '<div id="siteNotice">' +
        '</div>' +
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
        '<div id="bodyContent">' +
        '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
        'sandstone rock formation in the southern part of the ' +
        'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) ' +
        'south west of the nearest large town, Alice Springs; 450&#160;km ' +
        '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major ' +
        'features of the Uluru - Kata Tjuta National Park. Uluru is ' +
        'sacred to the Pitjantjatjara and Yankunytjatjara, the ' +
        'Aboriginal people of the area. It has many springs, waterholes, ' +
        'rock caves and ancient paintings. Uluru is listed as a World ' +
        'Heritage Site.</p>' +
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
        'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
        '(last visited June 22, 2009).</p>' +
        '</div>' +
        '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    var col = color.substr(1);
    var myLatLng = {
        lat: latitude
        , lng: longuitude
    };

    var image = {
        url: 'chart.png'
    };
    var icon1 = "http://chart.apis.google.com/chart?chst=d_map_spin&chld=0.7|0|" + col + "|12|_|" + pos;
    var icon2 = "http://chart.apis.google.com/chart?chst=d_map_spin&chld=1|0|" + col + "|12|_|" + pos;

    var marker = new google.maps.Marker({
        position: myLatLng
        , map: map
        , icon: icon1
        , animation: google.maps.Animation.DROP
        , title: "Marcador"
    });
    var id = "#" + pos.toString();
    $(id).mouseover(function () {
        marker.setIcon(icon2);
        marker.setAnimation(google.maps.Animation.BOUNCE);

    });
    $(id).mouseout(function () {
        marker.setIcon(icon1);
        marker.setAnimation(null);

    });


    marker.addListener('click', function () {
        infowindow.open(map, marker1);
    });

}


/**
 * [[Creates google map]]
 * Last modification:26-04-2016
 * Author: Diana Arce
 */
function init() {
    var lat = parseFloat(objClients[0].LATITUDE);
    var long = parseFloat(objClients[0].LONGITUDE);
    var centerMap = new google.maps.LatLng(lat, long);
    var locations = new Array();

    var mapOptions = {
        center: centerMap
        , zoom: 12
        , streetViewControl: false
        , disableDefaultUI: true
        , mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById('dvMap'), mapOptions);
    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map);

    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);


}

/**
 * [[Calculates route for all the clients]]
 * Call to other functions: drawrutaMap
 * Last modification:26-04-2016
 * Author: Diana Arce
 */
function calcruta() {

    var locations = new Array();

    // var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < objClients.length; i++) {
        // var tmp_lat_lng = puntos[i].split(",");
        locations.push(new google.maps.LatLng(objClients[i].LATITUDE, objClients[i].LONGITUDE));

    }
    var i = locations.length;
    var index = 0;
    while (i != 0) {

        if (i < 3) {
            var tmp_locations = new Array();
            for (var j = index; j < locations.length; j++) {
                tmp_locations.push(locations[index]);
            }
            drawrutaMap(tmp_locations);
            i = 0;
            index = locations.length;
        }

        if (i >= 3 && i <= 10) {

            var tmp_locations = new Array();
            for (var j = index; j < locations.length; j++) {
                tmp_locations.push(locations[j]);
            }
            drawrutaMap(tmp_locations);
            i = 0;
            index = locations.length;

        }

        if (i >= 10) {

            var tmp_locations = new Array();
            for (var j = index; j < index + 10; j++) {
                tmp_locations.push(locations[j]);
            }
            drawrutaMap(tmp_locations);

            i = i - 9;
            index = index + 9;

        }
    }
}


function calcrutaT(puntos) {

    var locations = new Array();

    // var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < puntos.length; i++) {
        // var tmp_lat_lng = puntos[i].split(",");
        locations.push(new google.maps.LatLng(puntos[i].LATITUDE, puntos[i].LONGITUDE));

    }
    var i = locations.length;
    var index = 0;
    while (i != 0) {

        if (i < 3) {
            var tmp_locations = new Array();
            for (var j = index; j < locations.length; j++) {
                tmp_locations.push(locations[index]);
            }
            drawrutaMap(tmp_locations);
            i = 0;
            index = locations.length;
        }

        if (i >= 3 && i <= 10) {

            var tmp_locations = new Array();
            for (var j = index; j < locations.length; j++) {
                tmp_locations.push(locations[j]);
            }
            drawrutaMap(tmp_locations);
            i = 0;
            index = locations.length;

        }

        if (i >= 10) {

            var tmp_locations = new Array();
            for (var j = index; j < index + 10; j++) {
                tmp_locations.push(locations[j]);
            }
            drawrutaMap(tmp_locations);

            i = i - 9;
            index = index + 9;

        }
    }
}


/**
 * [[Description]]
 * @param {Array} locations [[Description]]
 * Last modification:26-04-2016
 * Author: Diana Arce
 */
function drawrutaMap(locations) {
    var start, end;
    var waypts = [];

    for (var k = 0; k < locations.length; k++) {
        if (k >= 1 && k <= locations.length - 2) {
            waypts.push({
                location: locations[k]
                , stopover: true
            });
        }
        if (k == 0) start = locations[k];

        if (k == locations.length - 1) end = locations[k];

    }
    var request = {
        origin: start
        , destination: end
        , waypoints: waypts
        , optimizeWaypoints: true
        , travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.push(new google.maps.DirectionsService());
    var instance = directionsService.length - 1;
    directionsDisplay.push(new google.maps.DirectionsRenderer({
        preserveViewport: true
        , suppressMarkers: true


    }));

    directionsDisplay[instance].setMap(map);
    //   directionsDisplay[instance].setPanel(document.getElementById("tabla2"));
    directionsService[instance].route(request, function (response, status) {

        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay[instance].setDirections(response);
            //sumar distancia y tiempo
            var div = response.routes[0].legs.length;
            for (i = 0; i < div - 1; i++) {

                distancia += response.routes[0].legs[i].distance.value;
                tiempo += response.routes[0].legs[i].duration.value;

            }
            var distanciaE = document.getElementById("distanciaAprox");
            distanciaE.innerHTML = "Distancia aproximada de recorrido: " + (distancia / 1000).toFixed(2) + "Km";

            var tiempoE = document.getElementById("tiempoAprox");
            tiempoE.innerHTML = "Tiempo aproximado de manejo: " + (tiempo / 60).toFixed(2) + "min";


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