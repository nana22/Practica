var planes = [];
var initit = 0;
var options = 0;


/**
 * [Crea la lista de clientes, sortable, con sus componentes internos]
 * Call to other functions:agregarTabla
 * Last modification:26-04-2016
 * Author: Diana Arce
 */
function addAnother() {
    var ul = document.getElementById("sortable");
    var arrayLength = objClients.length;
    for (var i = 0; i < arrayLength; i++) {
        var indice = i + 1;
        var idColaps = "idC" + i;

        var children = ul.children.length + 1;
        var a = document.createElement("a");
        a.setAttribute("class", "list-group-item ");

        ul.appendChild(a);

        var div = document.createElement("div");
        div.setAttribute("class", "row");

        var col1 = document.createElement("div");
        col1.setAttribute("class", "col-sm-1");

        var span = document.createElement("span");
        span.setAttribute("style", "color:" + objClients[i].COLOR);
        span.appendChild(document.createTextNode(indice.toString() + " "));
        col1.appendChild(span);
        div.appendChild(col1);

        //li agregado del documento
        var col2 = document.createElement("div");
        col2.setAttribute("class", "col-sm-8");
        var li = document.createElement("li");
        li.setAttribute("id", indice.toString());
        li.setAttribute("class", "fa fa-map-marker");
        li.setAttribute("style", "color:" + objClients[i].COLOR);
        li.innerHTML = " " + objClients[i].ADDRESSNAME;


        li.setAttribute("data-model", objClients[i]);
        col2.appendChild(li);

        div.appendChild(col2);


        var bar = document.createElement("i");
        bar.setAttribute("class", "fa fa-bars handle edita");
        bar.setAttribute("style", "visibility:hidden;color:#424242");
        div.appendChild(bar);

        // BOTA EL CODIGO ESTE AGREGADO//
        agregarTabla(div, i);


        a.appendChild(div);

        ul.appendChild(a);
    }

    if (initit == 0) {
        plans();
        setInfoGeneral();
        initit = 1;
    }
}




/**
 * [Agrega los planes de servicio del responsable]
 * 
 * Last modification:03-05-2016
 * Author: Diana Arce
 */
function addPlanes() {

    var ul = document.getElementById("planes");
    var arrayLength = planes.length;
    for (var i = 0; i < arrayLength; i++) {
        var indice = "p" + i;
        var children = ul.children.length + 1;
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.setAttribute("id", indice);
        console.log("cargarPlan(" + indice.toString() + ")");
        a.setAttribute("onClick", "cargarPlan('" + indice.toString() + "')");
        a.innerHTML = planes[i].TRANSDATE;
        li.appendChild(a);
        ul.appendChild(li);


    }

}


function cargarPlan(id) {
    console.log(id);
    //TODO cargar clientes
    //TODO cargar camion

}




/**
 * [Obtiene el orden actual de la lista de clientes]
 * @param   {String} nombreCliente [Busqueda para el match]
 * @returns {Cliente} [Cliente segun el match de nombre]
 * Last modification:26-04-2016
 * Author: Diana Arce
 */
function getObjectList(nombreCliente) {
    var arrayLength = objClients.length;
    for (var i = 0; i < arrayLength; i++) {
        var cliente = nombreCliente.toString();
        var clienteActual = " " + objClients[i].ADDRESSNAME.toString();
        if (cliente == clienteActual) {
            return objClients[i];
        }

    }
}

/**
 * [Re calcula en googlemaps segun el nuevo orden]
 * Last modification:26-04-2016
 * Author: Diana Arce
 */
function verOrden() {
    tiempo = 0;
    distancia = 0;
    var clientesOrdenados = "";
    var nuevaLista = [];
    var lis = document.getElementById("sortable").getElementsByClassName("fa fa-map-marker");
    var arrayLength = lis.length;

    for (var i = 0; i < arrayLength; i++) {
        clientesOrdenados += lis[i].innerHTML;
        nuevaLista.push(getObjectList(lis[i].textContent));

    }
    objClients = nuevaLista;
    init();
    calcruta();
    colocarMarcadoresReCalcular(nuevaLista);
    var bolsas = document.getElementById("vBolsas");
    bolsas.setAttribute("style", "visibility:visible");
}


function generateCombobox() {

    var desde = document.getElementById("desde");
    var hasta = document.getElementById("hasta");
    var largo = objClients.length;
    for (var i = 0; i < largo; i++) {
        var option = document.createElement("option");
        var option2 = document.createElement("option");
        var op = i + 1;
        option.text = op.toString();
        option2.text = op.toString();
        desde.add(option);
        hasta.add(option2);

    }






}

function optionsM() {


}

/**
 * [Coloca los marcadores al re calcular la ruta]
 * @param {[[Type]]} nuevaLista [[Description]]
 * Last modification:26-04-2016
 * Author: Diana Arce
 */
function colocarMarcadoresReCalcular(nuevaLista) {

    for (i = 0; i < nuevaLista.length; i++) {
        var pos = i + 1;
        colocarMarcadores(parseFloat(nuevaLista[i].LATITUDE), nuevaLista[i].LONGITUDE, pos.toString(), nuevaLista[i].COLOR);

    }


}

function verInfoCliente(cliente) {

    alert("informacion importante del cliente:" + cliente);
}

function setInfoGeneral() {
    var clientes = document.getElementById("cantClientes");
    clientes.appendChild(document.createTextNode(objClients.length));

}

/**
 * [Vuelve el orden de la lista de clientes al original]
 * Last modification:26-04-2016
 * Author: Diana Arce
 */
function reInicarList() {

    var myNode = document.getElementById("sortable");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    addAnother();

}


/**
 * [Re asigna la numeracion en la lista de clientes]
 * Last modification:26-04-2016
 * Author: Diana Arce
 */
function reAsignarIndices() {
    var arrayLength = objClients.length;
    var myNode = document.getElementById("sortable");
    var lista = myNode.getElementsByTagName("span");
    for (var i = 0; i < arrayLength; i++) {
        var indice = i + 1;
        lista[i].removeChild(lista[i].firstChild);
        lista[i].appendChild(document.createTextNode(indice.toString()));
    }


}

//funcion ejecutada en el editar, muestra a opcion de editar oculta las flechas de info, y viseversa segun el onclick

/**
 * [Permite el sortable de clientes dentro de la lista]
 * Last modification:26-04-2016
 * Author: Diana Arce
 */
function noEdit() {
    var divsToHide = document.getElementsByClassName("edita"); // los elementos de tipo edita
    var divsArrow = document.getElementsByClassName("Arrow"); // los elementos de la clase arrow
    var estado = divsToHide[0].style.visibility; // verifica cual es el estado actual del editable
    for (var i = 0; i < divsToHide.length; i++) {
        if (estado == "visible") { // si esta visible lo esconde y muestra el otro

            divsToHide[i].style.visibility = "hidden"; // or
            divsArrow[i].style.visibility = "visible";
            reAsignarIndices();
        }

        if (estado == "hidden") { //si esta escondido lo muestra y esconde el otro

            divsToHide[i].style.visibility = "visible"; // or
            divsArrow[i].style.visibility = "hidden";
        }
    }
}

/**
 * [Agrega las tablas de pedido a la lista de clientes]
 * @param {object} a [[Description]]
 *  Last modification:26-04-2016
 * Author: Diana Arce             
 */
function agregarTabla(a, i) {

    var boton = document.createElement("i");
    boton.setAttribute("class", "fa fa-angle-right  Arrow dropdown-toggle");
    boton.setAttribute("id", "dropdownMenu" + a.id);
    boton.setAttribute("data-toggle", "dropdown");
    boton.setAttribute("aria-haspopup", "true");
    boton.setAttribute("aria-expanded", "true");

    a.appendChild(boton);

    var ulT = document.createElement("ul");

    ulT.setAttribute("style", "z-index:1000;");
    ulT.setAttribute("class", "dropdown-menu pull - right");
    ulT.setAttribute("aria-labelledby", "dropdownMenu1" + a.id);


    var liT = document.createElement("li");

    var tableT = document.createElement("table");
    tableT.setAttribute("class", "table table-bordered");

    var theadT = document.createElement("thead");
    var trTHead = document.createElement("tr");
    var thT1 = document.createElement("th");
    thT1.appendChild(document.createTextNode("Volumen"));
    trTHead.appendChild(thT1);

    var thT2 = document.createElement("th");
    thT2.appendChild(document.createTextNode("Peso"));
    trTHead.appendChild(thT2);

    var thT3 = document.createElement("th");
    thT3.appendChild(document.createTextNode("Total"));
    trTHead.appendChild(thT3);

    theadT.appendChild(trTHead);
    tableT.appendChild(theadT);

    var tbodyT = document.createElement("tbody");

    var trT = document.createElement("tr");
    var tdT = document.createElement("td");
    tdT.innerHTML = objClients[i].Volumen

    var tdT2 = document.createElement("td");
    tdT2.innerHTML = objClients[i].Peso
    var tdT3 = document.createElement("td");
    tdT3.appendChild(document.createTextNode("$ 200"));

    trT.appendChild(tdT);
    trT.appendChild(tdT2);
    trT.appendChild(tdT3);

    tbodyT.appendChild(trT);

    tableT.appendChild(tbodyT);
    liT.appendChild(tableT);


    ulT.appendChild(liT);


    var ulPedido = document.createElement("ul");
    ulPedido.setAttribute("class", "col-md-12 text-center");

    var pedidoB = document.createElement("button");
    pedidoB.setAttribute("class", "btn btn-info center-block");
    pedidoB.setAttribute("style", "width:100%;");
    pedidoB.appendChild(document.createTextNode("Ver factura"));
    pedidoB.setAttribute("data-toggle", "modal");
    pedidoB.setAttribute("data-target", "#myModal");


    ulPedido.appendChild(pedidoB);


    ulT.appendChild(ulPedido);
    a.appendChild(ulT);

    //boton ver pedido

}