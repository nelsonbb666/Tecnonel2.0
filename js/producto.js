import { productos } from "../data/productos.js";

const params = new URLSearchParams(window.location.search);

const id = params.get("id");

const producto = productos.find(
    p => p.id === id
);

const contenedor = document.getElementById("contenedor-producto");

const tituloPagina = document.getElementById("titulo-producto");

const nombreHeader = document.getElementById("nombre-producto");

if (!producto) {

    contenedor.innerHTML = `
        <h2 style="text-align:center;padding:100px;">
            Producto no encontrado 😔
        </h2>
    `;

} else {

    tituloPagina.textContent = producto.titulo;

    nombreHeader.textContent = producto.titulo;

    let imagenesHTML = `
<div class="slider-producto">

    <button class="flecha izquierda">&#10094;</button>

    <div class="slider-imagenes">

        ${producto.imagenes.map(img => `
            <img src="${img}" alt="${producto.titulo}">
        `).join('')}

    </div>

    <button class="flecha derecha">&#10095;</button>

</div>

<div class="miniaturas">

    ${producto.imagenes.map((img, i) => `
        <img src="${img}" data-index="${i}">
    `).join('')}

</div>
`;

    let videoHTML = producto.video ? `

        <div class="video-container">

            <iframe
                width="100%"
                height="450"
                src="${producto.video}"
                title="Video del producto"
                frameborder="0"
                allowfullscreen>
            </iframe>

        </div>

    ` : "";

    contenedor.innerHTML = `

        <div class="producto-detalle">

            <div class="galeria-producto">

                ${imagenesHTML}

                ${videoHTML}

            </div>

            <div class="info-producto">

                <h1>
                    ${producto.titulo}
                </h1>

                <div class="precios">

                    ${
                        producto.precioOriginal
                        ?
                        `
                        <div style="
                            text-decoration:line-through;
                            color:#888;
                            font-size:22px;
                            margin-bottom:10px;
                        ">
                            $${producto.precioOriginal.toLocaleString("es-CO")}
                        </div>
                        `
                        : ""
                    }

                    <div class="precio-grande">

                        $${producto.precio.toLocaleString("es-CO")}

                    </div>

                </div>

                <p class="descripcion-larga" id="descripcion-${producto.id}">

                    ${producto.descripcion.length > 100 ? producto.descripcion.substring(0, 100) + '...' : producto.descripcion}

                </p>

                ${producto.descripcion.length > 100 ? `
                <button class="btn-leer-mas" data-id="${producto.id}">
                    Leer más
                </button>
                ` : ''}

                <a
                    href="${producto.whatsapp}"
                    target="_blank"
                    class="btn-comprar-grande">

                    🛒 Comprar por WhatsApp

                </a>

                ${
                    producto.bannerInfo
                    ?
                    `
                    <img
                        src="${producto.bannerInfo}"
                        style="
                            width:100%;
                            margin-top:30px;
                            border-radius:12px;
                        ">
                    `
                    : ""
                }

            </div>

        </div>

    `;
}

if (producto) {
    const slider = document.querySelector(".slider-imagenes");

    const imagenes = document.querySelectorAll(".miniaturas img");

    let indice = 0;

    document.querySelector(".derecha")
    ?.addEventListener("click", () => {

        if (indice < imagenes.length - 1) {
            indice++;
        }

        slider.style.transform =
            `translateX(-${indice * 100}%)`;
    });

    document.querySelector(".izquierda")
    ?.addEventListener("click", () => {

        if (indice > 0) {
            indice--;
        }

        slider.style.transform =
            `translateX(-${indice * 100}%)`;
    });

    imagenes.forEach((img, i) => {

        img.addEventListener("click", () => {

            indice = i;

            slider.style.transform =
                `translateX(-${indice * 100}%)`;

        });
    });

    // Event listener para el botón "Leer más"
    const btnLeerMas = document.querySelector('.btn-leer-mas');
    if (btnLeerMas) {
        btnLeerMas.addEventListener('click', () => {
            const idProducto = btnLeerMas.getAttribute('data-id');
            const descripcion = document.getElementById(`descripcion-${idProducto}`);
            
            if (descripcion.classList.contains('expandida')) {
                descripcion.classList.remove('expandida');
                descripcion.textContent = producto.descripcion.length > 100 ? producto.descripcion.substring(0, 100) + '...' : producto.descripcion;
                btnLeerMas.textContent = 'Leer más';
            } else {
                descripcion.classList.add('expandida');
                descripcion.textContent = producto.descripcion;
                btnLeerMas.textContent = 'Leer menos';
            }
        });
    }
}

