var logged = "false";

function login() {
    var user = document.getElementById("user-input").value;
    var pass = document.getElementById("password-input").value;
    console.log(user);
    console.log(pass);

    $.ajax({
        url: "http://localhost:47712/Models/ServicioClientes.asmx/login"
        , type: "POST"
        , data: {
            username: user
            , pass: pass
        }
        , success: function (results) {
            var response = (JSON.parse(results));
            console.log(response);
            if (response[0].toString() == "true") {

                console.log("acess");
                logged = "true";
                window.location.href = "index.html"
            } else {

                console.log("no acess");
            }

        }
        , error: function () {
            console.log('No se puede obtener la informacion solicitada.');
        }
    });

}

function ajaxindicatorstart(text) {
    if (jQuery('body').find('#resultLoading').attr('id') != 'resultLoading') {
        jQuery('body').append('<div id="resultLoading" style="display:none"><div><img src="page-loader.gif"><div>' + text + '</div></div><div class="bg"></div></div>');
    }

    jQuery('#resultLoading').css({
        'width': '100%'
        , 'height': '100%'
        , 'position': 'fixed'
        , 'z-index': '10000000'
        , 'top': '0'
        , 'left': '0'
        , 'right': '0'
        , 'bottom': '0'
        , 'margin': 'auto'
    });

    jQuery('#resultLoading .bg').css({
        'background': '#000000'
        , 'opacity': '0.7'
        , 'width': '100%'
        , 'height': '100%'
        , 'position': 'absolute'
        , 'top': '0'
    });

    jQuery('#resultLoading>div:first').css({
        'width': '250px'
        , 'height': '75px'
        , 'text-align': 'center'
        , 'position': 'fixed'
        , 'top': '0'
        , 'left': '0'
        , 'right': '0'
        , 'bottom': '0'
        , 'margin': 'auto'
        , 'font-size': '16px'
        , 'z-index': '10'
        , 'color': '#ffffff'

    });

    jQuery('#resultLoading .bg').height('100%');
    jQuery('#resultLoading').fadeIn(300);
    jQuery('body').css('cursor', 'wait');
}

function ajaxindicatorstop() {
    jQuery('#resultLoading .bg').height('100%');
    jQuery('#resultLoading').fadeOut(300);
    jQuery('body').css('cursor', 'default');
}

function plans() {

    $.ajax({
        url: "http://localhost:32318/Optimizador.asmx/planes"
        , type: "POST"
        , data: "tr=" + "TR002"
        , success: function (results) {
            var response = (JSON.parse(results));

            for (i in response) {
                plan = new Object();
                plan.ID = response[i].ID;
                plan.TRANSDATE = response[i].TRANSDATE;
                plan.NAME = response[i].NAME;
                planes.push(plan);
            }
            addPlanes();
        }
        , error: function () {
            console.log('No se puede obtener la informacion solicitada.');
        }
    });

}