var marker1, marker2, marker3, marker4;
var poly, geodesicPoly;




function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12
        , center: {
            lat: 9.9656553
            , lng: -84.1201701
        }
    });

    map.controls[google.maps.ControlPosition.TOP_CENTER].push(
        document.getElementById('info'));


}