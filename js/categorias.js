import { productos } from "../data/productos.js";

document.querySelectorAll('.categoria').forEach(categoria => {
    categoria.style.cursor = "pointer";

    categoria.addEventListener('click', () => {
        const categoriaKey = categoria.getAttribute('data-categoria');
        window.location.href = `categoria.html?cat=${categoriaKey}`;
    });
});