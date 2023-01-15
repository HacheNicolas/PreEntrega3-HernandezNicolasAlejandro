//Función flecha que busca elementos en el local storage y, de haber existencia, los inserta en el documento HTML.
const renderAlimentos = () => {
    const alimentosLS = recuperarAlimentos();
    let tabla = "";

    for (let alimento of alimentosLS) {
        //Se verifica el estado del alimento.
        if(alimento.estado == "Caducado"){
            tabla += `<div class="row bg-danger-subtle p-2 justify-content-between align-items-center">
                        <div class="col-1">
                            <p class="mb-0">${alimento.id}</p>
                        </div>
                        <div class="col-1">
                            <p class="mb-0">${alimento.nombre}</p>
                        </div>
                        <div class="col-1">
                            <p class="mb-0">${alimento.cantidad}</p>
                        </div>
                        <div class="col-1">
                            <p class="mb-0">${alimento.caducidad}</p>
                        </div>
                        <div class="col-1">
                            <p class="mb-0">${alimento.estado}</p>
                        </div>
                        <div class="col-1">
                            <p class="mb-0">${alimento.diasCaducidad}</p>
                        </div>
                    </div>`;
        } else {
            tabla += `<div class="row bg-success-subtle p-2 justify-content-between align-items-center">
                        <div class="col-1">
                            <p class="mb-0">${alimento.id}</p>
                        </div>
                        <div class="col-1">
                            <p class="mb-0">${alimento.nombre}</p>
                        </div>
                        <div class="col-1">
                            <p class="mb-0">${alimento.cantidad}</p>
                        </div>
                        <div class="col-1">
                            <p class="mb-0">${alimento.caducidad}</p>
                        </div>
                        <div class="col-1">
                            <p class="mb-0">${alimento.estado}</p>
                        </div>
                        <div class="col-1">
                            <p class="mb-0">${alimento.diasCaducidad}</p>
                        </div>
                    </div>`;
        }
        
    }

    document.getElementById("tabla").innerHTML = tabla;
}

//Se llama a la función anterior cada vez que se ingresa al sitio web.
renderAlimentos();

//Función para realizar la creación de objetos Articulo y la carga de los mismos en el array stock.
function cargarArticulos(){

    //Variable para detener la iteración del do-while.
    let cargaArticulo = true;

    do{
        let idArticulo = (stock.length + 1);
        let nombreArticulo = prompt("Ingrese el nombre del artículo");
        let cantidadArticulo;
        //Se verifica que la cantidad del artículo a ingresar sea un número positivo.
        do{
            cantidadArticulo = parseInt(prompt("Ingrese la cantidad del artículo"));
            if(!Number.isInteger(cantidadArticulo)){
                alerta("Por favor, ingrese solo números.");
            }
            if(cantidadArticulo < 0){
                alerta("Por favor, ingrese un número mayor a 0.");
            }
        }while((!Number.isInteger(cantidadArticulo)) || (cantidadArticulo < 0));
        
        //Se crea el artículo con los parámetros ingresados
        let articulo = new Articulo(idArticulo,nombreArticulo,cantidadArticulo);

        let esPerecedero = confirm("¿es una artículo perecedero?");

        //Si el artículo es perecedero se le agrega una fecha de caducidad.
        if(!esPerecedero){
            consola(articulo);
            //Se agrega el artículo al array stock.
            stock.push(articulo);
            consola(stock);
        } else {
            let caducidadArticulo = prompt("Ingrese la fecha de caducidad del artículo");
            articulo.agregarFechaCaducidad(caducidadArticulo);
            consola(articulo);
            //Se agrega el artículo al array stock.
            stock.push(articulo);
            consola(stock);
        }

        //Se consulta si se desea agregar otro artículo.
        cargaArticulo = confirm("¿Desea agregar otro artículo?");

    }while(cargaArticulo);
}

//Función que muestra los articulos cargados en el array de articulos.
function mostrarArticulos(){
    //Variable que almacena los artículos en forma de String para mostrarlos por pantalla.
    let contenidoStock = "";

    //Se recorre el array stock concatenando los atributos de cada artículo con la variable String a mostrar.
    for (let articulo of stock){
        contenidoStock += articulo.id + " - " + articulo.nombre + " - cantidad: (" + articulo.cantidad + ") - caducidad: (" + articulo.caducidad + ")\n";
    }
    consola(contenidoStock);
    return contenidoStock;
}

//Función de orden superior para buscar artículos por ID.
function buscarArticulo(id){
    return (stock.find(articulo => articulo.id === id) || null);
}

//Función para eliminar un artículo del array stock.
function eliminarArticulo(){

    //Variable para detener la iteración del do-while.
    let eliminarArticulo = true;

    do{
        //Se muestran los artículos por pantalla y se solicita el ID del artículo a eliminar.
        let idArticulo = parseInt(prompt(mostrarArticulos() + "Ingrese el ID del artículo a eliminar del stock"));
        let articulo = buscarArticulo(idArticulo);
        //Si el artículo con el ID ingresado se encuentra en el stock se lo elimina.
        if (articulo != null){
            stock.splice(((articulo.id) - 1),1);
            //Se actualiza el ID de los demas artículos.
            for (let i = 0; i < stock.length; i++){
                stock[i].actualizarID(i+1);
            }
        } else {
            alerta("No existe el artículo con el ID: " + idArticulo);
        }

        eliminarArticulo = confirm("¿Desea eliminar otro artículo?");
    } while(eliminarArticulo);
    
}

//Función principal que muestra el menú de opciones.
function gestionarStock(){
    let opcionIngresada = 0;

    //El simulador seguirá iniciado hasta que el usuario ingrese la opción de salir del mismo.
    do{
        opcionIngresada = parseInt(prompt("Menú de opciones:\n1. Agregar nuevos artículos al stock\n2. Mostrar artículos del stock\n3. Eliminar artículos del stock\n0. Salir"));
        switch(opcionIngresada){
            case 1:
                cargarArticulos();
                break;
            case 2:
                alerta(mostrarArticulos());
                break;
            case 3:
                eliminarArticulo();
                break;
            case 0:
                alerta("¡Gracias por utilizar el simulador!");
                break;
            default:
                alerta("Opción ingresada incorrecta");
                break;
        }
    }while(opcionIngresada != 0);
}

function limpiarInputAlimento(){
    document.getElementById("inputNombre").value = "";
    document.getElementById("inputCantidad").value = "";
    document.getElementById("inputCaducidad").value = "";
}

function limpiarInputAlimentos(){
    document.getElementById("inputCantidadAlimentos").value = "";
}

function eliminarTabla(){
    let tabla = "";
    document.getElementById("tabla").innerHTML = tabla;
    localStorage.removeItem("stock");
}

//Agregar alimento individual.
document.getElementById("btnAgregarAlimento").addEventListener("click", creacionAlimento);

//Limpia los campos para ingresar un alimento.
document.getElementById("btnLimpiarAlimento").addEventListener("click", limpiarInputAlimento);

//Agregar alimentos en cantidad.
document.getElementById("btnAgregarAlimentos").addEventListener("click", creacionAlimentos);

//Limpia el campo para ingresar la cantidad de alimentos a generar.
document.getElementById("btnLimpiarAlimentos").addEventListener("click", limpiarInputAlimentos);

//Eliminar tabla y los datos almacenados en el Local Storage.
document.getElementById("btnEliminarTabla").addEventListener("click", eliminarTabla);