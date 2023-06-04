function validarEdad(age) {
    while (age < 18) {
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


let nameUser = prompt("Ingrese su Usuario")
console.log(nameUser)
let ageUser = parseInt(prompt("Ingrese su edad"))
console.log(ageUser)


validarNum(ageUser)

validarEdad(ageUser)

let maqAlquilada = parseInt(prompt(`Qué desea alquilar?
 1. Herramienta 
 2. Máquina`))

validarNum(maqAlquilada)

let machine = ("")

switch (maqAlquilada) {
    case 1:
        machine = parseInt(prompt(`¿Qué herramienta desea alquilar?
    1 - Taladro.
    2 - Soldadora.
    3 - Cámara termográfica.`))
        break;
    case 2:
        machine = parseInt(prompt(`¿Qué máquina desea alquilar?
    1 - Grúa.
    2 - Retroexcavadora.
    3 - Compactadora.`))
        break;
    default:
        alert("el número ingresado no coincide con una opción");
        break
}

console.log(`La opción elegida es ${machine}`)

let precio = 0

switch (machine) {
    case 1:
        precio = 900
        alert(`El precio del alquiler por dia del taladro es ${precio}`);
        break;
    case 2:
        precio = 1200
        alert(`El precio del alquiler por dia de la soldadora es ${precio}`);
        break;
    case 3:
        precio = 850
        alert(`El precio del alquiler por dia de la cámara termografica es ${precio}`);
        break;
    case 4:
        precio = 3100
        alert(`El precio del alquiler por dia de la grúa es ${precio}`);
        break;
    case 5:
        precio = 2500
        alert(`El precio del alquiler por dia de la retroexcavadora es ${precio}`);
        break;
    case 6:
        precio = 2000
        alert(`El precio del alquiler por dia de la compactadora es ${precio}`);
        break;
    default:
        alert("el número ingresado no coincide con una opción");
        break
}

console.log(precio)

let time = prompt("Cuanto días desea alquilarla?")

validarNum(time)

console.log(time)

let calAlquiler = precio * time

alert(`El precio total del alquiler del producto es ${calAlquiler}.
Gracias por utilizar nuestro simulador!`)



