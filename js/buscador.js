import { productos } from "../data/productos.js";

const buscador =
    document.getElementById("buscador");

const sugerencias =
    document.getElementById("sugerencias");

buscador.addEventListener("input", () => {

    const texto =
        buscador.value
        .toLowerCase()
        .trim();

    sugerencias.innerHTML = "";

    if (texto.length < 2) {

        sugerencias.style.display =
            "none";

        return;
    }

    const resultados =
        productos.filter(producto =>

            producto.titulo
            .toLowerCase()
            .includes(texto)

            ||

            producto.descripcion
            .toLowerCase()
            .includes(texto)

            ||

            producto.categoria
            .toLowerCase()
            .includes(texto)

        );

    if (resultados.length === 0) {

        sugerencias.style.display =
            "none";

        return;
    }

    sugerencias.style.display =
        "block";

    resultados
        .slice(0, 5)
        .forEach(producto => {

            const item =
                document.createElement("div");

            item.classList.add(
                "sugerencia"
            );

            item.innerHTML = `
            📦 ${producto.titulo}
        `;

            item.addEventListener(
                "click",
                () => {

                    window.location.href =
                        `productos/producto.html?id=${producto.id}`;

                }
            );

            sugerencias.appendChild(
                item
            );

        });

});

document.addEventListener(
    "click",
    (e) => {

        if (!e.target.closest(
                ".contenedor-buscador"
            )) {

            sugerencias.style.display =
                "none";
        }

    }
);