const alimentos = ["manzana","pera","banana","naranja","pomelo","pollo","cerdo","pavo","atún","salmón","huevo","yogur","queso","leche","brócoli","coliflor","espinaca","berenjena","zanahoria","zapallo,","papa","tomate","batata"];

//Cantidad de milisegundos en un año (para el cálculo de las fechas).
const milisegundosAño = 86400000;
//Fecha actual.
let fechaActual = new Date();
//Fecha actual en milisegundos.
let fAms = fechaActual.getTime();

class Alimento{
    constructor(id,nombre,cantidad,caducidad){
        this.id = id;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.caducidad = caducidad;
        this.estado = null;
        this.diasCaducidad = null;
        //this.caducidad = "No caduca";
    }
    // agregarFechaCaducidad(fecha){
    //     this.caducidad = fecha;
    // }
    actualizarID(valor){
        this.id = valor;
    }
    //Método que calcula el estado del alimento en base a la fecha de caducidad del mismo.
    calcularEstado(fechaCaducidadMS,fechaActualMS){
        let fechaCaducidad = (fechaCaducidadMS / milisegundosAño);
        let fechaActual = (fechaActualMS / milisegundosAño);
        if(fechaCaducidad > fechaActual){
            this.estado = "En fecha";
        } else {
            this.estado = "Caducado";
        }
    }
    //Método que calcula la cantidad de días faltantes hasta la fecha de caducidad del alimento.
    calcularDiasCaducidad(fechaCaducidad,fechaActual,milisegundosAño){
        let diferencia = Math.ceil((fechaCaducidad - fechaActual) / milisegundosAño);
        this.diasCaducidad = diferencia;
    }
}

//Función flecha para guardar los alimentos del stock en el Local Storage.
const guardarAlimentos = (stock) => {
    localStorage.setItem("stock", JSON.stringify(stock));
}

//Función flecha para recuperar los alimentos del stock guardado en el Local Storage.
const recuperarAlimentos = () => {
    return JSON.parse(localStorage.getItem("stock")) || [];
}

//Función para el cálculo de las fechas de caducidad.
function calculoCaducidad(alimento){

    //Rango de fecha máxima.
    const fechaMin = new Date("2022-10-01");
    //Rango de fecha mínima.
    const fechaMax = new Date("2024-01-01");

    //Fechas en milisegundos.
    let fMinMS = fechaMin.getTime();
    let fMaxMS = fechaMax.getTime();
    
    //Fechas en horas.
    let fMinHS = (fMinMS / milisegundosAño);
    let fMaxHS = (fMaxMS / milisegundosAño);

    //Calculo de la fecha de caducidad del alimento.
    let fechaRandomMS = ((Math.ceil(Math.random()*(fMaxHS - fMinHS) + fMinHS)) * milisegundosAño);

    return fechaRandomMS;
}

function creacionAlimentos(){
    //Array de alimentos
    const stock = [];
    //Se recuperan los alimentos del Local Storage parseandolos a su tipo original.
    let stockRecuperado = recuperarAlimentos();
    for (let alimentoRecuperado of stockRecuperado){
        stock.push(alimentoRecuperado);
    }
    //Se elimina el stock almacenado en el Local Storage para que no se superpongan los datos a ingresar.
    localStorage.removeItem("stock");
    //Se solicita la cantidad de alimentos a generar.
    let cantidad = document.getElementById("inputCantidadAlimentos").value;

    //Se crean la cantidad de alimentos solicitados.
    for(let i=0 ; i<cantidad ; i++){
        let idAlimento = (stock.length + 1);
        let nombreAlimento = alimentos[Math.floor(Math.random()*alimentos.length)];
        let cantidadAlimento = Math.round(Math.random()*30+1);
        let caducidadAlimentoMS = calculoCaducidad();
        let caducidadAlimento = new Date(caducidadAlimentoMS).toLocaleDateString();
        let alimento = new Alimento(idAlimento,nombreAlimento,cantidadAlimento,caducidadAlimento);

        //Se calcula el estado del alimento.
        alimento.calcularEstado(caducidadAlimentoMS,fAms);
        //Se calcula la cantidad de días faltantes hasta la caducidad del alimento.
        alimento.calcularDiasCaducidad(caducidadAlimentoMS,fAms,milisegundosAño);
        stock.push(alimento);
    }

    //Se guardan los alimentos en el Local Storage en formato JSON.
    guardarAlimentos(stock);
    let tabla = "";

    for (let alimento of stock) {
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

function creacionAlimento(){
    //Array de alimentos
    const stock = [];
    //Se recuperan los alimentos del Local Storage parseandolos a su tipo original.
    let stockRecuperado = recuperarAlimentos();
    for (let alimentoRecuperado of stockRecuperado){
        stock.push(alimentoRecuperado);
    }
    //Se elimina el stock almacenado en el Local Storage para que no se superpongan los datos a ingresar.
    localStorage.removeItem("stock");
    //Se toman los elementos ingresados en los campos correspondientes y se crea el alimento.
    let idAlimento = (stock.length + 1);
    let nombreAlimento = document.getElementById("inputNombre").value;
    let cantidadAlimento = document.getElementById("inputCantidad").value;
    let caducidadAlimento = document.getElementById("inputCaducidad").value;
    let alimento = new Alimento(idAlimento,nombreAlimento,cantidadAlimento,caducidadAlimento);
    
    //Se calcula el estado del alimento.
    let caducidad = new Date(caducidadAlimento);
    let caducidadAlimentoMS = caducidad.getTime();
    alimento.calcularEstado(caducidadAlimentoMS,fAms);
    //Se calcula la cantidad de días faltantes hasta la caducidad del alimento.
    alimento.calcularDiasCaducidad(caducidadAlimentoMS,fAms,milisegundosAño);
    stock.push(alimento);

    //Se guardan los alimentos en el Local Storage en formato JSON.
    guardarAlimentos(stock);

    let tabla = "";

    for (let alimento of stock) {
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