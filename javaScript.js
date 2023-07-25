

cargarProductos ()


//array con productos en carrito
let prodCarrito = [];
if (localStorage.getItem("carrito")) {
    for (let maquina of JSON.parse(localStorage.getItem("carrito"))) {
        let catalogoStorage = new Maquina(maquina.id, maquina.categoria, maquina.nombre, maquina.precio, maquina.imagen)
        prodCarrito.push(catalogoStorage)
    }
} else {
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
let botonFinalizarCompra = document.getElementById("botonFinalizarCompra")
let buscador = document.getElementById("searchBox")
let search = document.getElementById("search")
let btnSearch = document.getElementById("btnSearch")
let loader = document.getElementById("loader")

let fecha = document.getElementById("fecha")
const DateTime = luxon.DateTime
setInterval(() => {
    let dateNow = DateTime.now()
    fecha.innerHTML = `${dateNow.toLocaleString(DateTime.DATETIME_MED)}`
}, 1000);

//FUNCIONES

function verCatalogo(array) {
    //resetear el DOM
    prodDiv.innerHTML = ``
    //Recorrer array para imprimir en el DOM
    for (let maquina of array) {
        let newMaqDiv = document.createElement("div")
        newMaqDiv.className = "col-sm-12 col-md-5 col-lg-3 m-3 p-0 "
        newMaqDiv.innerHTML = `<div id="cardProd">
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
            addCarrito(maquina);
            Toastify({
                text: `El producto ha sido agregado al carrito!`,
                duration: 1500,
                gravity: "bottom",
                position: "center"
            }).showToast()
        })
    }
}

function ordMenorMayor(array) {
    const menorMayor = [].concat(array)
    menorMayor.sort((a, b) => a.precio - b.precio)
    verCatalogo(menorMayor)
}

function ordMayorMenor(array) {
    const mayorMenor = [].concat(array)
    mayorMenor.sort((a, b) => b.precio - a.precio)
    verCatalogo(mayorMenor)
}

function ordNombre(array) {
    const arrayAlf = [].concat(array)
    arrayAlf.sort((a, b) => {

        if (a.nombre > b.nombre) {
            return 1
        }
        if (a.nombre < b.nombre) {
            return -1
        }
        return 0
    })
    verCatalogo(arrayAlf)
}

function addCarrito(maquina) {

    let maqCarrito = prodCarrito.find((elem) => elem.id == maquina.id)

    maqCarrito == undefined && (prodCarrito.push(maquina),
        localStorage.setItem("carrito", JSON.stringify(prodCarrito)))
}


function cargarCarrito(array) {
    modalBodyCarrito.innerHTML = ``
    //primer for each imprime las card
    array.forEach((productoCarrito) => {
        modalBodyCarrito.innerHTML += `
       <div class="card border-primary m-2 w-75 text-center" id ="productoCarrito${productoCarrito.id}">
                <div class="card-body">
                       <h4 class="card-title">${productoCarrito.nombre}</h4>
                        <p class="card-text">Precio unitario $${productoCarrito.precio}</p>
                        <p class="card-text">Total de unidades ${productoCarrito.cantidad}</p> 
                        <p class="card-text">SubTotal $${productoCarrito.cantidad * productoCarrito.precio}</p>   
                        <button class= "btn btn-success" id="botonSumarUnidad${productoCarrito.id}"><i class=""></i>+</button>
                       <button class= "btn btn-danger" id="botonEliminarUnidad${productoCarrito.id}"><i class=""></i>-</button> 
                        <button class= "btn btn-danger" id="botonEliminar${productoCarrito.id}"><i class="fas fa-trash-alt"></i></button>
                </div>    
           </div>
       `
    })
    //segundo for each adjunta EVENTOS eliminar
    array.forEach((productoCarrito) => {
        document.getElementById(`botonSumarUnidad${productoCarrito.id}`).addEventListener("click", (event) => {
            //utilizo método creado en la class constructora
            event.preventDefault()
            productoCarrito.sumarUnidad()
            //setear el storage
            localStorage.setItem("carrito", JSON.stringify(array))
            //para actualizar el DOM re imprimimos todo
            cargarCarrito(array)
        })
        //EVENTO PARA RESTAR UNA UNIDAD
        document.getElementById(`botonEliminarUnidad${productoCarrito.id}`).addEventListener("click", () => {
            let cantProd = productoCarrito.restarUnidad()

            if (cantProd < 1) {
                let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
                cardProducto.remove()
                let elimProd = array.find((maquina) => maquina.id == productoCarrito.id)
                let posicion = array.indexOf(elimProd)
                array.splice(posicion, 1)
                localStorage.setItem("carrito", JSON.stringify(array))
                calcularTotal(array)
            }
            else {
                localStorage.setItem("carrito", JSON.stringify(array))
            }

            cargarCarrito(array)
        })

        document.getElementById(`botonEliminar${productoCarrito.id}`).addEventListener("click", () => {
            let cardProducto = document.getElementById(`productoCarrito${productoCarrito.id}`)
            cardProducto.remove()
            let elimProd = array.find((libro) => libro.id == productoCarrito.id)
            let posicion = array.indexOf(elimProd)
            array.splice(posicion, 1)
            localStorage.setItem("carrito", JSON.stringify(array))

            calcularTotal(array)
        })
    })
    calcularTotal(array)
}

function calcularTotal(array) {

    let total = array.reduce((acc, productoCarrito) => acc + (productoCarrito.precio * productoCarrito.cantidad), 0)

    total == 0 ? precioTotal.innerHTML = `<p>No hay productos en el carrito</p>` : precioTotal.innerHTML = `<p>El total es $<strong>${total}</strong></p>`
}

function calcularAlquiler(array) {
    let input = parseFloat(document.getElementById("datoAlquiler").value);
    let total = array.reduce((acc, productoCarrito) => acc + (productoCarrito.precio * productoCarrito.cantidad), 0)

    let totalFinal = parseFloat(total) * parseFloat(input);

    let resultadoHTML = `<p>El total de su alquiler es $${totalFinal}</p>`;
    document.getElementById("totalFinal").innerHTML = resultadoHTML;
}

function searchBox(inputSearch, array) {
    let search = array.filter(
        (dato => dato.categoria.toLowerCase().includes(inputSearch.toLowerCase()) || dato.nombre.toLowerCase().includes(inputSearch.toLowerCase()))
    )
    search.length == 0 ? (searchDiv.innerHTML = `<h4> NO existen coincidencias </h4>`, verCatalogo(search)) :
        (searchDiv.innerHTML = ``, verCatalogo(search))
}



//EVENTOS

document.addEventListener("DOMContentLoaded", () => {
    if (modalMostrado == null) {
        let modal = document.getElementById("miModal");
        modal.style.display = "block";
        let cerrarModal = document.getElementById("cerrarModal");
        cerrarModal.addEventListener("click", function () {
            modal.style.display = "none";
        });
    }

    setTimeout(() => {
        loader.remove()
        verCatalogo(catalogo)
    }, 2000)

});

guardarEdad.addEventListener("click", () => {
    let modal = document.getElementById("miModal");
    const edad = document.getElementById("validarEdad").value;
    if (edad.trim() != "") {
        localStorage.setItem("edad", edad);
        localStorage.setItem("modalMostrado", "true");
        modal.style.display = "none";
    }
})

selectOrden.addEventListener("change", () => {
    console.log(selectOrden.value)
    switch (selectOrden.value) {
        case "1":
            ordMayorMenor(catalogo)
            break
        case "2":
            ordMenorMayor(catalogo)
            break
        case "3":
            ordNombre(catalogo)
            break
        default:
            verCatalogo(catalogo)
            break
    }
})

btnCarrito.addEventListener("click", () => {
    cargarCarrito(prodCarrito)
})

btnAlquiler.addEventListener("click", () => {
    let input = document.getElementById("datoAlquiler");
    localStorage.setItem("dias", input);

    calcularAlquiler(prodCarrito)
})

botonFinalizarCompra.addEventListener("click", () => {
    Swal.fire({
        title: `Su pedido ha sido realizado`,
        icon: "info",
        timer: 3000,
        showConfirmButton: false,
    })

})

buscador.addEventListener("input", () => {
    searchBox(buscador.value, catalogo)
})
buscador.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
    }
})

btnSearch.addEventListener("click", () => {
    searchDiv.innerHTML = ``,
        verCatalogo(catalogo)
})