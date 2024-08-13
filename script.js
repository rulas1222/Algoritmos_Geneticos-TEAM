//Nuestra variable global sera el arreglo de los numeros binarios 
var funcion = prompt("Ingrese la funcion que se va a evaluar")
const xMax = +prompt("Ingrese el valor de X maxima")
const xMin = +prompt("Ingrese el valor de X minima")
const arregloNumeros = [];
const arregloDecimales = [];
const arregloXReales =[];
const arregloXAdaptadas = [];
var longitudNumeros;

//Pintamos de colores como dice patito feo 
document.getElementById('funcion').textContent = funcion;
document.getElementById('xmax').textContent = xMax;
document.getElementById('xmin').textContent = xMin;



//Primero ingresamos los datos que vamos a estar utilizando 
recibirDatos();
function recibirDatos (){
    let numero = prompt("Ingrese el numero en binario");
    arregloNumeros.push(numero);
    longitudNumeros = numero.length;
    let respuesta = confirm("¿Desea agregar otro numero?")
    // Evaluar la respuesta del usuario
    if (respuesta) {
        console.log("Desea continuar");
        recibirDatos();
    } else {
        console.log("Ya no hay mas");
    }
}

//Funcion para convertir de binario a decimal 
convBinDec();
function convBinDec(){
    for (const elemento of arregloNumeros){
        let decimal = parseInt(elemento, 2);
        arregloDecimales.push(decimal)
    }
}

//Funcion para sustituir en la ecuacionde X real
calculaXReal();
function calculaXReal() {
    for (let i = 0; i < arregloNumeros.length; i++){
        const Xreal = xMin + (arregloDecimales[i]*((xMax-xMin)/((2**longitudNumeros)-1)));
        let X = Xreal.toFixed(2);
        arregloXReales.push(X)
    }
}

//Funcion para sustituir en la funcion (ADAPTADO)
calculaAdaptado();
function calculaAdaptado() {
    for (let i = 0; i < arregloNumeros.length; i++) {
        let xActual = Number(arregloXReales[i]);

        // Reemplaza `sen` por `Math.sin`
        let nuevaFuncion = funcion.replace(/sen/g, "Math.sin");

        // Asegúrate de que el número sea seguido por un operador de multiplicación antes de `x`
        nuevaFuncion = nuevaFuncion.replace(/(\d)(x)/g, '$1 * xActual');

        // Reemplaza todas las `x` por el valor de `xActual`
        nuevaFuncion = nuevaFuncion.replace(/x/g, `(${xActual})`);

        // Reemplaza `Math.sin` por `Math.sin` (sin cambios aquí pero útil para depuración)
        nuevaFuncion = nuevaFuncion.replace(/Math.sin/g, "Math.sin");

        try {
            let resultado = eval(nuevaFuncion);
            arregloXAdaptadas.push(resultado);
        } catch (error) {
            console.error("Error al evaluar la función:", error.message);
        }
    }
}

// Función para insertar valores en la tabla
agregarValores();
function agregarValores(){
    for(let i = 0; i < arregloNumeros.length; i++){
        // Obtener el tbody de la tabla
        let tabla = document.getElementById("tablaResultados").getElementsByTagName('tbody')[0];

        // Crear una nueva fila
        let nuevaFila = tabla.insertRow();

        // Insertar valor binario en la primera celda de la nueva fila
        let nuevaCeldaBinario = nuevaFila.insertCell(0);
        let current = arregloNumeros[i];
        nuevaCeldaBinario.textContent = current;

        // Insertar valor decimal en la segunda celda de la misma fila
        let nuevaCeldaDecimal = nuevaFila.insertCell(1);
        let currentDecimal = arregloDecimales[i];
        nuevaCeldaDecimal.textContent = currentDecimal;

        // Insertar valor Real en la segunda celda de la misma fila
        let nuevaCeldaReal = nuevaFila.insertCell(2);
        let currentReal = arregloXReales[i];
        nuevaCeldaReal.textContent = currentReal;

        // Insertar valor decimal en la segunda celda de la misma fila
        let nuevaCeldaAdaptado = nuevaFila.insertCell(3);
        let currentAdaptado = arregloDecimales[i];
        nuevaCeldaAdaptado.textContent = currentAdaptado;
    }
}



