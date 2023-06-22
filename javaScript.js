// Declaración de funciones a utilizar en el simulador

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
    const carrito = [];
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

function sumCarrito(array) {
    let sumaPrecios = 0;

    for (let i = 0; i < array.length; i++) {
        sumaPrecios += array[i].precio;
    }

    return sumaPrecios;
}


//class constructora
class Maquina {
    constructor(id, categoria, nombre, precio) {
        this.id = id,
            this.categoria = categoria,
            this.nombre = nombre,
            this.precio = precio
    }
}

const maquina1 = new Maquina(1, "Maquinaria Pesada", "Excavadora", 5200)
const maquina2 = new Maquina(2, "Maquinaria Pesada", "Grúa", 4800)
const maquina3 = new Maquina(3, "Maquinaria Pesada", "Cargadora frontal", 4600)
const maquina4 = new Maquina(4, "Maquinaria Pesada", "Retroexcavadora", 4700)
const maquina5 = new Maquina(5, "Maquinaria Pesada", "Compactadora", 4000)
const maquina6 = new Maquina(6, "Maquinaria Pesada", "Dumper", 4000)
const maquina7 = new Maquina(7, "Herramienta de construcción", "Martillo demoledor", 1200)
const maquina8 = new Maquina(8, "Herramienta de construcción", "Sierra circular", 800)
const maquina9 = new Maquina(9, "Herramienta de construcción", "Taladro", 600)
const maquina10 = new Maquina(10, "Herramienta de construcción", "Amoladora", 500)
const maquina11 = new Maquina(11, "Herramienta de construcción", "Mezcladora de concreto", 1000)
const maquina12 = new Maquina(12, "Herramienta de construcción", "Nivel láser", 450)
const maquina13 = new Maquina(13, "Equipo de soldadura", "Soldadora eléctrica", 1500)
const maquina14 = new Maquina(14, "Equipo de soldadura", "Soldadora de arco", 1300)
const maquina15 = new Maquina(15, "Equipo de soldadura", "Soldadora de gas", 1200)
const maquina16 = new Maquina(16, "Equipo de soldadura", "Equipo de soldadura por punto", 1600)
const maquina17 = new Maquina(17, "Equipo de energía", "Generador eléctrico", 3000)
const maquina18 = new Maquina(18, "Equipo de energía", "Torre de iluminación", 2000)
const maquina19 = new Maquina(19, "Equipo de energía", "Compresor de aire", 2100)

//creación del array de máquinas y herramientas
const catalogo = []

catalogo.push(maquina1, maquina2, maquina3, maquina4, maquina5, maquina6, maquina7, maquina8, maquina9, maquina10,
    maquina11, maquina12, maquina13, maquina14, maquina15, maquina16, maquina17, maquina18, maquina19)


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
