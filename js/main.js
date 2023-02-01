//Función flecha que busca elementos en el local storage y, de haber existencia, los inserta en el documento HTML.
const renderAlimentos = () => {
    const alimentosLS = recuperarAlimentos();
    let tabla = "";

    for (let alimento of alimentosLS) {
        //Desestructuración de los atributos del objeto alimento.
        const {id,nombre,cantidad,caducidad,estado,diasCaducidad} = alimento;
        //Se verifica el estado del alimento.
        if(estado == "Caducado"){
            tabla += `<div class="row bg-danger-subtle p-2 justify-content-between align-items-center">
                        <div class="col-2">
                            <p class="mb-0">${id}</p>
                        </div>
                        <div class="col-2">
                            <p class="mb-0">${nombre}</p>
                        </div>
                        <div class="col-2">
                            <p class="mb-0">${cantidad}</p>
                        </div>
                        <div class="col-2">
                            <p class="mb-0">${caducidad}</p>
                        </div>
                        <div class="col-2">
                            <p class="mb-0">${estado}</p>
                        </div>
                        <div class="col-2">
                            <p class="mb-0">${diasCaducidad}</p>
                        </div>
                    </div>`;
        } else {
            tabla += `<div class="row bg-success-subtle p-2 justify-content-between align-items-center">
                        <div class="col-2">
                            <p class="mb-0">${id}</p>
                        </div>
                        <div class="col-2">
                            <p class="mb-0">${nombre}</p>
                        </div>
                        <div class="col-2">
                            <p class="mb-0">${cantidad}</p>
                        </div>
                        <div class="col-2">
                            <p class="mb-0">${caducidad}</p>
                        </div>
                        <div class="col-2">
                            <p class="mb-0">${estado}</p>
                        </div>
                        <div class="col-2">
                            <p class="mb-0">${diasCaducidad}</p>
                        </div>
                    </div>`;
        }
        
    }

    document.getElementById("tabla").innerHTML = tabla;
}

//Se llama a la función anterior cada vez que se ingresa al sitio web.
renderAlimentos();

//Validaciones de los formularios. (No se utiliza sintaxis simplificada por la imposibilidad de usar return).

//Función para verificar que la completitud de los campos hayan sido llenados.
function datosFaltantes(input) {
    Swal.fire({
        icon: 'error',
        title: '¡Error!',
        text: 'Datos faltantes en el campo: ' + input
    })
}

//Función para verificar que los datos ingresados en ciertos campos son válidos.
function datosInvalidos(input) {
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: 'Datos ingresados inválidos en el campo: ' + input
    })
}

//Función que valida los datos ingresados en los campos para ingresar un alimento de forma individual.
function validarCargaIndividual(){
    let nombre = document.getElementById("inputNombre").value;
    let cantidad = document.getElementById("inputCantidad").value;
    let caducidad = document.getElementById("inputCaducidad").value;

    //Validaciones para el campo "nombre".
    if (nombre.trim() == 0){
        datosFaltantes("Nombre");
        return false;
    } 

    //Validaciones para el campo "cantidad".
    if (cantidad.trim() == 0){
        datosFaltantes("Cantidad");
        return false;
    } else if (!Number.isInteger(parseInt(cantidad)) || cantidad < 0){
        datosInvalidos("Cantidad");
        return false;
    }

    //Validaciones para el campo "caducidad".
    if (caducidad.trim() == 0){
        datosFaltantes("Caducidad");
        return false;
    }

    Swal.fire({
        title: '¿Desea ingresar este alimento?',
        text: "Los datos del alimento serán almacenados en una LocalStorage.",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
    }).then((resultado) => {
        if (resultado.isConfirmed) {
            //Se realiza la creación del alimento por medio de la función flecha instanciada en el archivo: "alimentos.js";
            creacionAlimento();
            Swal.fire(
                '¡Almacenado!',
                'El alimento se almacenó correctamente.',
                'success'
            )
        } else {
            Swal.fire(
                '¡No Almacenado!',
                'El alimento no fué almacenado.',
                'error'
            )
        }
    })
}

//Función que valida los datos ingresados en el campo para ingresar alimentos de forma masiva.
function validarCargaAutomatica(){
    let cantidad = document.getElementById("inputCantidadAlimentos").value;

    if (cantidad.trim() == 0){
        datosFaltantes("Cantidad");
        return false;
    } else if (!Number.isInteger(parseInt(cantidad)) || cantidad < 0){
        datosInvalidos("Cantidad");
        return false;
    }

    Swal.fire({
        title: '¿Desea ingresar ' + (cantidad) + ' alimentos?',
        text: "Los datos de los alimentos serán almacenados en una LocalStorage.",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
    }).then((resultado) => {
        if (resultado.isConfirmed) {
            //Se realiza la creación de los alimentos por medio de la función flecha instanciada en el archivo: "alimentos.js".
            creacionAlimentos();
            Toastify({
                text: "Se almacenaron " + (cantidad) + " alimentos correctamente.",
                duration: 3000,
                gravity: "top",
                position: "right",
                close: false,
                style: {
                    background: "green",
                }
            }).showToast();
        } else {
            Toastify({
                text: "Los alimentos no fueron almacenados.",
                duration: 3000,
                gravity: "top",
                position: "right",
                close: false,
                style: {
                    background: "red",
                }
            }).showToast();
        }
    })
}

//Función que limpia los campos para ingresar un alimento de manera individual.
function limpiarInputAlimento(){
    document.getElementById("inputNombre").value = "";
    document.getElementById("inputCantidad").value = "";
    document.getElementById("inputCaducidad").value = "";
}

//Función que limpia el campo para ingresar alimentos de manera masiva.
function limpiarInputAlimentos(){
    document.getElementById("inputCantidadAlimentos").value = "";
}

//Función que elimina la tabla
function eliminarTabla(){
    Swal.fire({
        title: '¿Desea eliminar la tabla?',
        text: "Se eliminarán todos los alimentos almacenados en el LocalStorage.",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
    }).then((resultado) => {
        if (resultado.isConfirmed) {
            //Se realiza la eliminación de los elementos de la tabla insertados en el archivo HTML y de los alimentos almacenados en el LocalStorage.
            let tabla = "";
            document.getElementById("tabla").innerHTML = tabla;
            localStorage.removeItem("stock");
            Toastify({
                text: "La tabla de alimentos se eliminó correctamente.",
                duration: 3000,
                gravity: "top",
                position: "right",
                close: false,
                style: {
                    background: "red",
                }
            }).showToast();
        }
    })
}

//EventListeners de los botones.

//Agregar alimento individual.
document.getElementById("btnAgregarAlimento").addEventListener("click", validarCargaIndividual);

//Limpia los campos para ingresar un alimento.
document.getElementById("btnLimpiarAlimento").addEventListener("click", limpiarInputAlimento);

//Agregar alimentos en cantidad.
document.getElementById("btnAgregarAlimentos").addEventListener("click", validarCargaAutomatica);

//Limpia el campo para ingresar la cantidad de alimentos a generar.
document.getElementById("btnLimpiarAlimentos").addEventListener("click", limpiarInputAlimentos);

//Eliminar tabla y los datos almacenados en el Local Storage.
document.getElementById("btnEliminarTabla").addEventListener("click", eliminarTabla);