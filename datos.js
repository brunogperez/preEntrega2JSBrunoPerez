//class constructora
class Maquina {
    constructor(id, categoria, nombre, precio) {
        this.id = id,
            this.categoria = categoria,
            this.nombre = nombre,
            this.precio = precio,
            this.cantidad = 1
    }

    sumarUnidad() {
        this.cantidad = this.cantidad + 1
        return this.cantidad
    }
    restarUnidad() {
        this.cantidad = this.cantidad - 1
        return this.cantidad
    }
}

/* 
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
 */

let catalogo = []
const catalogoVacio = []

const cargarProductos = async () => {
    const res = await fetch("data.json")
    const data = await res.json()

    for (let maquina of data) {
        let prodData = new Maquina(maquina.id, maquina.categoria, maquina.nombre, maquina.precio, maquina.cantidad)
        catalogo.push(prodData)
    }
    localStorage.setItem("catalogo", JSON.stringify(catalogo))
}

if(localStorage.getItem("catalogo")){
    estanteria = JSON.parse(localStorage.getItem("catalogo"))
}else{
    cargarProductos()
}