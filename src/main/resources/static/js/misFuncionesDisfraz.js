function autoInicioCategoria(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://132.226.165.169:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}
//Manejador GET
function traerInformacionDisfraz() {
    $.ajax({
        url:"http://132.226.165.169:8080/api/Costume/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            pintarRespuestaDisfraz(response);
        }

    });

}

function pintarRespuestaDisfraz(response){

    let myTable="<table class='table table-bordered table-dark'><thead>"
    myTable+="<tr>";
        myTable+="<th scope='col'>Nombre</th>";
        myTable+="<th scope='col'>Modelo</th>";
        myTable+="<th scope='col'>Año</th>";
        myTable+="<th scope='col'>Descripcion</th>";
        myTable+="<th scope='col'>Categoria</th>";
        myTable+="<th scope='col'>Borrar</th>";
        myTable+="<th scope='col'>Editar</th>";
        myTable+="<th scope='col'>Actualizar</th>";
    "</tr></thead>";

    for(i=0;i<response.length;i++){
        myTable+="<tbody>";
    myTable+="<tr>";
        myTable+="<td>" + response[i].name + "</td>";
        myTable+="<td>" + response[i].brand + "</td>";
        myTable+="<td>" + response[i].year + "</td>";
        myTable+="<td>" + response[i].description + "</td>";
        myTable+="<td>" + response[i].category.name + "</td>";
        myTable+='<td><button class = "botonDisfraz2 btn btn-warning" onclick="borrar(' + response[i].id + ')">Borrar Disfraz</button></td>';
        myTable+='<td><button class = "botonDisfraz2 btn btn-primary" onclick="cargarDatosDisfraz(' + response[i].id + ')">Editar Disfraz</button></td>';
        myTable+='<td><button class = "botonDisfraz2 btn btn-primary" onclick="actualizar(' + response[i].id + ')">Actualizar Disfraz</button></td>';
        myTable+="</tr></tbody>";
    }
    myTable+="</table>";
    $("#miListaDisfraz").html(myTable);
}
//Capturar informacion para Actualizar
function cargarDatosDisfraz(id) {
    $.ajax({
        dataType: 'json',
        url:"http://132.226.165.169:8080/api/Costume/"+id,
        //url: "http://localhost:8080/api/Skate/" + id,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#id").val(item.id);
            $("#name2").val(item.name);
            $("#brand").val(item.brand);
            $("#year").val(item.year);
            $("#description2").val(item.description);

        },

        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function agregarDisfraz() {

    if($("#name2").val().length == 0 || $("#brand").val().length == 0 || $("#year").val().length == 0 || $("#description2").val().length == 0){
       alert("Todos los campos son obligatorios")
    }else{

            let elemento = {
                name: $("#name2").val(),
                brand: $("#brand").val(),
                year: $("#year").val(),
                description: $("#description2").val(),
                category:{id: +$("#select-category").val()},
            }

            let dataToSend = JSON.stringify(elemento);
            console.log(elemento);

            $.ajax({
                type: "POST",
                contentType: "application/json",
                url:"http://132.226.165.169:8080/api/Costume/save",
                //url: "http://localhost:8080/api/Skate/save",
                data: dataToSend,
                datatype: 'json',

                success: function (response) {
                    console.log(response);
                    console.log("Se guardo Correctamente");
                    //Limpiar Campos
                    $("#resultado2").empty();
                    $("#name2").val("");
                    $("#brand").val("");
                    $("#year").val("");
                    $("#description2").val("");
                    

                    //Listar Tabla

                    alert("Se ha guardado Correctamente!")
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    alert("No se Guardo Correctamente")
                }
            });
    }
}
//Manejador DELETE
function borrar(idElemento) {
    var elemento = {
        id: idElemento
    }

    var dataToSend = JSON.stringify(elemento);
console.log(dataToSend);
    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url:"http://132.226.165.169:8080/api/Costume/"+idElemento,
            //url: "http://localhost:8080/api/Skate/" + idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (response) {
                console.log(response);
                $("#miListaDisfraz").empty();

                alert("se ha Eliminado Correctamente!")
            },

            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}

//Manejador PUT
function actualizar(idElemento) {
    
    if($("#name2").val().length == 0 || $("#brand").val().length == 0 || $("#year").val().length == 0 || $("#description2").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento = {
            id: idElemento,
            name: $("#name2").val(),
            brand: $("#brand").val(),
            year: $("#year").val(),
            description: $("#description2").val(),
            category:{id: +$("#select-category").val()},
        }

        console.log(elemento);
        let dataToSend = JSON.stringify(elemento);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",
            url:"http://132.226.165.169:8080/api/Costume/update",
            //url: "http://localhost:8080/api/Skate/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#miListaDisfraz").empty();
                listarDisfraz();
                alert("se ha Actualizado Correctamente!")

                //Limpiar Campos
                $("#resultado2").empty();
                $("#id").val("");
                $("#name2").val("");
                $("#brand").val("");
                $("#year").val("");
                $("#description2").val("");


            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}
