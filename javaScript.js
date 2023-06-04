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
        num = parseInt(prompt("Por favor ingrese una opción correcta"))

    }
    return num
}

function saludar(name) {
    alert(`Bienvenid@ ${name}`)
}


//comienza el simulador
let nameUser = prompt("Ingrese su Usuario")

saludar(nameUser)

let ageUser = parseInt(prompt("Ingrese su edad"))

validarEdad(ageUser)

console.log(`la edad ingresada es ${ageUser}`)


let machine = 0
let value = 0
let precio = 0
let time = 0

do {
    machine = parseInt(prompt(`¿Qué desea alquilar?

    Herramientas

    1 - Taladro.
    2 - Soldadora.
    3 - Cámara termográfica.

    Máquinas

    4 - Grúa.
    5 - Retroexcavadora.
    6 - Compactadora.

    0 - Ver carrito.`))

    validarOpcion(machine)

    switch (machine) {
        case 0:
            if (value == 0) {
                alert(`Tu carrito está vacio. Agregá algun producto!`)
                machine = 10
            } else {

                alert(`Tu carrito tiene un total de $${value} en productos.`)

                time = prompt("Cuanto días desea alquilar?")

                validarNum(time)

                console.log(time)

                let calAlquiler = value * time

                alert(`El precio total del alquiler es $${calAlquiler}.`)

                alert(`Gracias ${nameUser} por utilizar nuestro simulador!`)
                machine = 0
            }

            break;
        case 1:
            precio = 900
            value = value + precio
            alert(`El precio del alquiler por dia del taladro es $${precio} y el total en su carrito es $${value}`);
            break;
        case 2:
            precio = 1200
            value = value + precio
            alert(`El precio del alquiler por dia de la soldadora es $${precio} y el total en su carrito es $${value}`);
            break;
        case 3:
            precio = 1000
            value = value + precio
            alert(`El precio del alquiler por dia de la cámara termografica es $${precio} y el total en su carrito es $${value}`);
            break;
        case 4:
            precio = 3100
            value = value + precio
            alert(`El precio del alquiler por dia de la grúa es $${precio} y el total en su carrito es $${value}`);
            break;
        case 5:
            precio = 2500
            value = value + precio
            alert(`El precio del alquiler por dia de la retroexcavadora es $${precio} y el total en su carrito es $${value}`);
            break;
        case 6:
            precio = 2000
            value = value + precio
            alert(`El precio del alquiler por dia de la compactadora es $${precio} y el total en su carrito es $${value}`);
            break;
        default:
            alert("el número ingresado no coincide con una opción");
            break;
    }
} while (machine != 0)



