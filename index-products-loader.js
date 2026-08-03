// Cargador dinámico de productos para index.html
(function() {
    // Mapeo de títulos de sección a IDs de categoría
    const sectionCategoryMap = {
        'Productos Destacados': null, // Todos los destacados
        'Tecnología': '1',
        'Hogar Inteligente': '2',
        'Iluminación LED': '3',
        'Cocina Inteligente': '4',
        'Vehículos': '5',
        'Gaming': '6',
        'Audio y Música': '7',
        'Oficina': '8'
    };

    function formatPrice(price) {
        return '$' + parseFloat(price).toFixed(2);
    }

    function createProductHTML(product, index) {
        const imageUrl = product.images && product.images[0] && product.images[0].url 
            ? product.images[0].url 
            : 'images/default-product.png';
        
        const hasDiscount = product.oldPrice && parseFloat(product.oldPrice) > parseFloat(product.price);
        const oldPriceHTML = hasDiscount 
            ? `<div class="u-old-price" style="text-decoration: line-through !important;">${formatPrice(product.oldPrice)}</div>`
            : '';
        
        const categoryLetter = String.fromCharCode(97 + (index % 26));
        
        return `
          <div class="u-align-center u-container-align-center u-container-style u-products-item u-repeater-item" data-product-id="${product.id}" data-product-variation-values="{}">
            <title>${product.title}</title>
            <meta name="twitter:title" content="${product.title}">
            <meta name="twitter:description" content="${product.description}">
            <meta name="description" content="${product.description}">
            <meta name="keywords" content="">
            <meta property="og:type" content="product">
            <meta property="og:title" content="${product.title}">
            <meta property="og:description" content="${product.description}">
            <div class="u-container-layout u-similar-container u-container-layout-${categoryLetter}">
              <img src="${imageUrl}" alt="" class="u-expanded-width u-image u-image-contain u-image-default u-product-control u-image-${index + 1}" data-href="Tecnonel/producto.html?id=${product.id}">
              <h4 class="u-product-control u-text u-text-${index + 1}">
                <a class="u-product-title-link" href="Tecnonel/producto.html?id=${product.id}">${product.title}</a>
              </h4>
              <div data-add-zero-cents="true" class="u-product-control u-product-price u-product-price-${index + 1}">
                <div class="u-price-wrapper u-spacing-10">
                  ${oldPriceHTML}
                  <div class="u-price u-text-palette-2-base" style="font-size: 1.25rem; font-weight: 700;">${formatPrice(product.price)}</div>
                </div>
              </div>
              <a href="Tecnonel/producto.html?id=${product.id}" class="u-active-grey-75 u-black u-border-none u-btn u-button-style u-hover-grey-75 u-product-control u-btn-${index + 1} u-dialog-link u-payment-button" data-product-button-click-type="buy-now" data-product-id="${product.id}">Comprar ahora</a>
            </div>
          </div>`;
    }

    async function loadProductsForSection(sectionTitle, containerSelector, categoryId, isFeatured = false) {
        try {
            const response = await fetch('productos/productos.json');
            const data = await response.json();
            
            let filteredProducts = data.products || [];
            
            if (isFeatured) {
                filteredProducts = filteredProducts.filter(p => p.isFeatured === true);
            } else if (categoryId) {
                filteredProducts = filteredProducts.filter(p => 
                    p.categories && p.categories.includes(categoryId)
                );
            }
            
            if (filteredProducts.length === 0) return;
            
            const container = document.querySelector(containerSelector);
            if (!container) return;
            
            const repeater = container.querySelector('.u-repeater');
            if (!repeater) return;
            
            repeater.innerHTML = filteredProducts.slice(0, 6).map((p, i) => createProductHTML(p, i)).join('');
            
        } catch (error) {
            console.error('Error cargando productos para', sectionTitle, error);
        }
    }

    // Iniciar carga cuando el DOM esté listo
    document.addEventListener('DOMContentLoaded', function() {
        // Productos Destacados
        loadProductsForSection('Productos Destacados', '#block-1 .u-products-1', null, true);
        
        // Tecnología (categoria ID 1)
        loadProductsForSection('Tecnología', '#block-3 .u-products-2', '1');
    });
})();
