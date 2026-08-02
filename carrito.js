import { productos } from "./data/productos.js";

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(idProducto) {

    const producto = productos.find(p => p.id === idProducto);

    const existe = carrito.find(p => p.id === idProducto);

    if (existe) {
        existe.cantidad++;
    } else {
        carrito.push({
            id: producto.id,
            titulo: producto.titulo,
            precio: producto.precio,
            imagen: producto.imagenes?.[0] || "",
            cantidad: 1
        });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
}