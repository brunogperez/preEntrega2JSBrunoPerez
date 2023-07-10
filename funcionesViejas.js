function validarEdad(age) {
    while (age < 18 || isNaN(age)) {
        alert("No puedes realizar un alquiler hasta ser mayor de edad.")
        age = parseInt(prompt("Ingrese nuevamente su edad."))
    }
    return age
}

function validarNum(num) {
    while (isNaN(num)) {
        num = parseInt(prompt("Por favor ingrese número. Ej: 27"))
    }
    return num
}

function validarOpcion(num) {
    while (num < 0 || num > 6 || isNaN(num)) {
        num = parseInt(prompt("Por favor ingrese un número entre 0 y 6"))

    }
    return num
}

function saludar(name) {
    alert(`Bienvenid@ ${name}`)
}

function verCatalogo(array) {
    console.log("Nuestro catálogo de productos es el siguiente:")
    array.forEach(maquina => console.log(maquina.id, maquina.categoria, maquina.nombre, maquina.precio));
}

function agregarMaq() {
    let categoriaI = prompt("Ingrese la categoría del producto")
    let nombreI = prompt("Ingrese el nombre del prodcuto")
    let precioI = parseInt(prompt("Ingrese el precio del producto"))

    const prodNuevo = new Maquina(catalogo.length + 1, categoriaI, nombreI, precioI)
    catalogo.push(prodNuevo)
}

function elimMaq(array) {
    console.log("¿Qué producto desea eliminar del catálogo?")
    verCatalogo(array)
    let elimID = parseInt(prompt("Ingrese el ID que desea eliminar"))
    let arrayID = array.map(maq => maq.id)
    let indice = arrayID.indexOf(elimID)
    array.splice(indice, 1)
    verCatalogo(array)
}

function opVendedor(array) {
    let opp = 0
    do {
        opp = parseInt(prompt(`¿Qué desea realizar?
   1 - Agregar producto.
   2 - Eliminar prodcuto.
   3 - Volver al menu.`))
        validarNum(opp)

        switch (opp) {
            case 1:
                agregarMaq(array)
                break;
            case 2:
                elimMaq(array)
                break;
            case 3:
                console.log(`Volviendo...`)
                opp = true
                break;
            default:
                alert("el número ingresado no coincide con una opción");
                break;
        }

    } while (!opp)
}

function filtrarDato(array) {
    let datoBusq = prompt("Ingrese el nombre o categoría del producto")
    let busqueda = array.filter(
        (dato => dato.categoria.toLowerCase().includes(datoBusq.toLowerCase()) || dato.nombre.toLowerCase().includes(datoBusq.toLowerCase()))
    )
    if (busqueda.length == 0) {
        console.log("El producto no se encuentra en nuestro catálogo")
    } else {
        verCatalogo(busqueda)
    }
}

function ordTitulo(array) {
    const arrayA = [].concat(array)
    arrayA.sort((a, b) => {
        if (a.titulo > b.titulo) {
            return 1
        }
        if (a.titulo < b.titulo) {
            return -1
        }
        return 0
    })

    verCatalogo(arrayA)
}

const carrito = []

function agregCarrito(array) {
    
    let opp = 0;
    verCatalogo(array);

    do {
        opp = parseInt(prompt(`¿Qué desea realizar?
   1 - Agregar producto al carrito.
   2 - Eliminar producto del carrito.
   3 - Volver al menú anterior.`));

        switch (opp) {
            case 1:
                let producto = parseInt(prompt("¿Qué producto desea alquilar?"));
                let maqExistente = array[producto - 1];
                carrito.push(maqExistente);
                console.log(carrito);
                break;
            case 2:
                elimMaq(carrito);
                break;
            case 3:
                console.log("Volviendo al menú anterior");
                opp = 0;
                break;
            default:
                alert("El número ingresado no coincide con una opción válida");
                break;
        }
    } while (opp !== 0);

    return carrito;
}

let sumaPrecios = 0;

function sumCarrito(array) {
    for (let i = 0; i < array.length; i++) {
        sumaPrecios += array[i].precio;
    }

    return sumaPrecios;
}



//comienza el simulador
let nameUser = prompt("Ingrese su Usuario")

saludar(nameUser)

let ageUser = parseInt(prompt("Ingrese su edad"))

validarEdad(ageUser)

console.log(`la edad ingresada es ${ageUser}`)
let opcion = 0
let precio = 0
let time = 0

do {
    opcion = parseInt(prompt(`¿Qué desea alquilar?

    1 - Opciones para el vendedor

    2 - Consultar catálogo.
    3 - Buscar producto.
    4 - Ordenar productos.
    5 - Agregar producto al carrito.
    6 - Ver carrito.

    0 - Salir del menú.`))

    validarOpcion(opcion)

    switch (opcion) {
        case 0:
            opcion = 0
            break;
        case 1:
            opVendedor(catalogo)
            break;
        case 2:
            verCatalogo(catalogo)
            break;
        case 3:
            filtrarDato(catalogo)
            break;
        case 4:
            ordTitulo(catalogo)
            break;
        case 5:
            agregCarrito(catalogo)

            break;
        case 6:
            if (sumCarrito == 0) {
                alert(`Tu carrito está vacio. Agregá algun producto!`)
                opcion = 10
            } else {
                verCatalogo(carrito)
                const totalCarrito = sumCarrito(carrito)
                alert(`Tu carrito tiene un total de $${totalCarrito} en productos.`)

                time = prompt("Cuanto días desea alquilar?")

                validarNum(time)

                console.log(time)

                let calAlquiler = totalCarrito * time

                alert(`El precio total del alquiler es $${calAlquiler}.`)

                alert(`Gracias ${nameUser} por utilizar nuestro simulador!`)
                opcion = 0
            }
            break;
        default:
            alert("el número ingresado no coincide con una opción");
            break;

    }
} while (opcion != 0)  
