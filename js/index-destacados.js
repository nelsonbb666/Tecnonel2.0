import { productos } from "../data/productos.js";

const contenedor = document.getElementById("contenedor-destacados");

// Filtrar solo los productos destacados
let destacados = productos.filter(p => p.destacado === true);

// Si no hay ninguno marcado, mostrar algunos aleatorios
if (destacados.length === 0) {
    destacados = productos.slice().sort(() => Math.random() - 0.5).slice(0, 8);
}

// Limitar a 8 productos para el index
destacados = destacados.slice(0, 8);

destacados.forEach(p => {
    const card = document.createElement("div");
    card.classList.add("producto-promocion");
    card.innerHTML = `
        <a href="productos/producto.html?id=${p.id}">
            <img src="${p.imagenes[0]}" alt="${p.titulo}" onerror="this.src='img/Producto1.png'">
            <h3>${p.titulo}</h3>
        </a>
    `;
    contenedor.appendChild(card);
});
