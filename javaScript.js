//DOM con array de objetos.

//creación del array de máquinas y herramientas
const catalogo = []
const catalogoVacio = []

catalogo.push(maquina1, maquina2, maquina3, maquina4, maquina5, maquina6, maquina7, maquina8, maquina9, maquina10,
    maquina11, maquina12, maquina13, maquina14, maquina15, maquina16, maquina17, maquina18, maquina19)


//array con productos en carrito
let prodCarrito = [];
if (localStorage.getItem("carrito")) {
    //cuando ya existe algo en el storage con la clave carrito
    // prodCarrito = JSON.parse(localStorage.getItem("carrito"))
    //es traer la info localStorage pero debemos volver a pasarlo por las class constructor
    for (let maquina of JSON.parse(localStorage.getItem("carrito"))) {
        //Problema abierto, cómo conservar la cantidad? 
        let catalogoStorage = new Maquina(maquina.id, maquina.categoria, maquina.nombre, maquina.precio, maquina.imagen)
        prodCarrito.push(catalogoStorage)
    }
    console.log(prodCarrito)
} else {
    //no existe nada en el storage
    prodCarrito = []
    localStorage.setItem("carrito", prodCarrito)
}

//Captura de botones para eventos

let prodDiv = document.getElementById("catalogo");
let guardarEdad = document.getElementById("guardarEdad");
let selectOrden = document.getElementById("selectOrden");
let modalMostrado = localStorage.getItem("modalMostrado");
let edad = localStorage.getItem("validarEdad");
let modalBodyCarrito = document.getElementById("modal-bodyCarrito");
let precioTotal = document.getElementById("precioTotal");
let btnCalAlquiler = document.getElementById("btnAlquiler");
let totalFinal = document.getElementById("totalFinal");
let botonFinalizarCompra = document.getElementById ("botonFinalizarCompra")


//FUNCIONES

function verCatalogo(array) {
    //resetear el DOM
    prodDiv.innerHTML = ``
    //Recorrer array para imprimir en el DOM
    for (let maquina of array) {
        let newMaqDiv = document.createElement("div")
        newMaqDiv.className = "col-sm-12 col-md-5 col-lg-3 m-3 p-0 "
        newMaqDiv.innerHTML = `<div class="cardProd">
                                <div id="${maquina.id}" class="image">
                                    <img src="assets/maquina${maquina.id}.webp">
                                </div>
                                <div class="details">
                                    <div class="center">
                                        <h1>${maquina.nombre}</h1>
                                        <p>Categoría: ${maquina.categoria}</p>
                                        <p class="">Precio: $${maquina.precio}</p>
                                        <button id="addBtn${maquina.id}" class="btn btn-light">Agregar al carrito</button>
                                    </div>
                                </div>
                            </div>`
        prodDiv.appendChild(newMaqDiv)

        let addBtn = document.getElementById(`addBtn${maquina.id}`)

        addBtn.addEventListener("click", () => {
            addCarrito(maquina)
        })
    }
}

function validarEdad(edad) {
    if (edad < 18) {
        console.log("Eres menor de edad")
    }
}

function ordenarMenorMayor(array) {
    const menorMayor = [].concat(array)
    menorMayor.sort((a, b) => a.precio - b.precio)
    verCatalogo(menorMayor)
}

function ordenarMayorMenor(array) {
    const mayorMenor = [].concat(array)
    mayorMenor.sort((elem1, elem2) => elem2.precio - elem1.precio)
    verCatalogo(mayorMenor)
}

function ordenarTitulo(array) {
    const arrayAlfabetico = [].concat(array)
    arrayAlfabetico.sort((a, b) => {

        if (a.nombre > b.nombre) {
            return 1
        }
        if (a.nombre < b.nombre) {
            return -1
        }
        return 0
    })
    verCatalogo(arrayAlfabetico)
}

function addCarrito(maquina) {

    let maquinaCarrito = prodCarrito.find((elem) => elem.id == maquina.id)
    if (maquinaCarrito == undefined) {
        //código para sumar al array carrito
        prodCarrito.push(maquina)
        localStorage.setItem("carrito", JSON.stringify(prodCarrito))
        console.log(prodCarrito)
    }
}

function cargarCarrito(array){
    modalBodyCarrito.innerHTML = ``
    //primer for each imprime las card
    array.forEach((productoCarrito)=>{
       modalBodyCarrito.innerHTML += `
       <div class="card border-primary m-2 w-75 text-center" id ="productoCarrito${productoCarrito.id}">
                <div class="card-body">
                       <h4 class="card-title">${productoCarrito.nombre}</h4>
                        <p class="card-text">Precio unitario $${productoCarrito.precio}</p>
                        <p class="card-text">Total de unidades ${productoCarrito.cantidad}</p> 
                        <p class="card-text">SubTotal $${productoCarrito.cantidad * productoCarrito.precio}</p>   
                        <button class= "btn btn-success" id="botonSumarUnidad${productoCarrito.id}"><i class=""></i>+1</button>
                       <button class= "btn btn-danger" id="botonEliminarUnidad${productoCarrito.id}"><i class=""></i>-1</button> 
                        <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
                </div>    
           </div>
       `
    })
    //segundo for each adjunta EVENTOS eliminar
    array.forEach((productoCarrito) => {
       document.getElementById(`botonSumarUnidad${productoCarrito.id}`).addEventListener("click", () =>{
          console.log(`Se ha sumado una unidad`)
          //utilizo método creado en la class constructora
          productoCarrito.sumarUnidad()
          console.log(productoCarrito.cantidad)
          //setear el storage
          localStorage.setItem("carrito", JSON.stringify(array))
          //para actualizar el DOM re imprimimos todo
          cargarCarrito(array)
       })
       //EVENTO PARA RESTAR UNA UNIDAD
       document.getElementById(`botonEliminarUnidad${productoCarrito.id}`).addEventListener("click", ()=>{
          let cantProd = productoCarrito.restarUnidad()
          console.log(cantProd)
          if(cantProd < 1){
             //borrar del DOM
             let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
             cardProducto.remove()
             //borrar del array
             //encontramos objeto a eliminar
             let productoEliminar = array.find((libro) => libro.id == productoCarrito.id)
             console.log(productoEliminar)
             //buscar indice
             let posicion = array.indexOf(productoEliminar)
             console.log(posicion)
             array.splice(posicion,1)
             console.log(array)
             //setear storage
             localStorage.setItem("carrito", JSON.stringify(array))
 
             //debemos calcularTotal??
             calcularTotal(array)
             }
             else{
                 localStorage.setItem("carrito", JSON.stringify(array))
             }
          
          cargarCarrito(array)
       })
 
      document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", () => {
        let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
        cardProducto.remove()
        let productoEliminar = array.find((libro) => libro.id == productoCarrito.id)
        let posicion = array.indexOf(productoEliminar)
        array.splice(posicion,1)
        console.log(array)
        localStorage.setItem("carrito", JSON.stringify(array))

        calcularTotal(array)
     })
  })
  calcularTotal(array)
}


function calcularTotal(array){
    //método reduce 
    //DOS PARAMETROS: primero la function y segundo valor en el que quiero inicializar el acumulador
    let total = array.reduce((acc, productoCarrito)=> acc + (productoCarrito.precio * productoCarrito.cantidad), 0)
    
    total == 0 ? precioTotal.innerHTML= `No hay productos en el carrito` : precioTotal.innerHTML = `El total es $<strong>${total}</strong>`
 
 }

function calcularAlquiler (array){
    let input = parseFloat(document.getElementById("datoAlquiler").value);
    let total = array.reduce((acc, productoCarrito)=> acc + (productoCarrito.precio * productoCarrito.cantidad), 0)

    let totalFinal = parseFloat(total) * parseFloat(input);
    
    let resultadoHTML = `<p>El total de su alquiler es $${totalFinal}</p>`;
    document.getElementById("totalFinal").innerHTML = resultadoHTML;

    console.log(totalFinal)
}


//EVENTOS


document.addEventListener("DOMContentLoaded", () => {
    // Comprueba si se ha mostrado el modal antes
    if (modalMostrado == null) {
        // Si no se ha mostrado antes y la edad no esta seteada, mostrar el modal
        let modal = document.getElementById("miModal");
        modal.style.display = "block";
        // Cierra el modal al hacer clic en el botón de cerrar 
        let cerrarModal = document.getElementById("cerrarModal");
        cerrarModal.addEventListener("click", function () {
            modal.style.display = "none";
        });
    }
    verCatalogo(catalogo)
});



guardarEdad.addEventListener("click", () => {
    let modal = document.getElementById("miModal");
    const edad = document.getElementById("validarEdad").value;
    if (edad.trim() != "") {
        localStorage.setItem("edad", edad);
        validarEdad(edad)
        // Marca el modal como mostrado para evitar que se abra nuevamente
        localStorage.setItem("modalMostrado", "true");
        modal.style.display = "none";
    }
})

selectOrden.addEventListener("change", () => {
    console.log(selectOrden.value)
    switch (selectOrden.value) {
        case "1":
            ordenarMayorMenor(catalogo)
            break
        case "2":
            ordenarMenorMayor(catalogo)
            break
        case "3":
            ordenarTitulo(catalogo)
            break
        default:
            verCatalogo(catalogo)
            break
    }
})

btnCarrito.addEventListener("click", () =>{
    cargarCarrito(prodCarrito)
})

btnAlquiler.addEventListener("click", () =>{
    let input = document.getElementById("datoAlquiler");
    localStorage.setItem("dias", input);
    
    calcularAlquiler(prodCarrito)

} )

botonFinalizarCompra.addEventListener("click", ()=>{
    Swal.fire({
        title: `Su pedido ha sido realizado`,
        icon: "info",
        timer: 3000,
        showConfirmButton: false,
    })

})