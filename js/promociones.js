import { productos } from "../data/productos.js";

const contenedor = document.getElementById("contenedor-promociones");

const promociones = productos.filter(p => p.promocion === true);

if (!contenedor) {
    console.error("No se encontró el contenedor de promociones (id=contenedor-promociones). La página puede estar usando un id diferente.");
} else if (promociones.length === 0) {
    contenedor.innerHTML = `<p style="text-align:center; padding:40px;">No hay promociones disponibles en este momento.</p>`;
} else {
    //calcular el descuento para cada producto promocionado

    promociones.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("producto-promocion");
        card.innerHTML = `
            <div class="producto-link">
                <a href="productos/producto.html?id=${p.id}">
                    <img src="${p.imagenes[0]}" alt="${p.titulo}" onerror="this.src='img/Producto1.png'">
                    <h3>${p.titulo}</h3>
                    <p class="descripcion">${p.descripcion}</p>
                    <h4 class="precio">$${p.precio.toLocaleString('es-CO')}</h4>
                </a>
                <a href="${p.whatsapp}" target="_blank" class="btn-comprar">
                    Comprar por WhatsApp
                </a>
            </div>
        `;
        contenedor.appendChild(card);
    });
}