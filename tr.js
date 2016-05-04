 perfil = new Object();
 vehiculo = new Object();
 var trID = "TR010";
 var pedidos = [];

 function getPerfil() {
     $.ajax({
         url: "http://localhost:32318/Optimizador.asmx/infoTR"
         , type: "POST"
         , data: "trP=" + trID
         , success: function (results) {
             var response = (JSON.parse(results));
             for (i in response) {

                 perfil.RoleSpecificId = response[i].RoleSpecificId;
                 perfil.Name = response[i].FirstName + " " + response[i].MIDDLENAME + " " + response[i].LastName;

                 vehiculo.DESCRIPTION = response[i].DESCRIPTION;
                 vehiculo.LICENSENUMBER = response[i].LICENSENUMBER;
                 vehiculo.RTV = response[i].RTV;
                 vehiculo.MARCHAMO = response[i].MARCHAMO;

             }

             setPerfil();
             setTablaPedido();
         }
         , error: function () {
             console.log('No se puede obtener la informacion solicitada.');
         }
     });

 }

 function setPerfil() {
     var rol = document.getElementById('rolTr');
     rol.innerHTML = "Rol: " + perfil.RoleSpecificId;
     var nombre = document.getElementById('nombreTr');
     nombre.innerHTML = "Nombre del Responsable: " + perfil.Name;
     setCamionInfo();

 }

 function setCamionInfo() {
     var placa = document.getElementById('placa');
     placa.innerHTML = "Placa: " + vehiculo.LICENSENUMBER;

     var desc = document.getElementById('descripcion');
     desc.innerHTML = "Descripcion del vehiculo: " + vehiculo.DESCRIPTION;

     var rtv = document.getElementById('rtv');
     rtv.innerHTML = "RTV: " + vehiculo.RTV;

     var marchamo = document.getElementById('marchamo');
     marchamo.innerHTML = "Marchamo: " + vehiculo.MARCHAMO;


 }


 function setTablaPedido() {

     var bodyTable = document.getElementById('tablaContenido');
     var cantPedidos = objClients.length;
     if (cantPedidos > 0) {
         for (i = 0; i < cantPedidos; i++) {
             var tr = document.createElement("tr");

             var tdName = document.createElement("td");
             tdName.innerHTML = objClients[i].ADDRESSNAME;
             tr.appendChild(tdName);

             var tdMonto = document.createElement("td");
             tdMonto.innerHTML = "$200";
             tr.appendChild(tdMonto);

             var tdVol = document.createElement("td");
             tdVol.innerHTML = objClients[i].Volumen;
             tr.appendChild(tdVol);

             var tdPeso = document.createElement("td");
             tdPeso.innerHTML = objClients[i].Peso;
             tr.appendChild(tdPeso);


             bodyTable.appendChild(tr);


         }

     }
 }