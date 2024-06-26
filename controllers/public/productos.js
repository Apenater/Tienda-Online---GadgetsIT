// Constante para completar la ruta de la API.
const PRODUCTO_API = 'services/public/productos.php';
const CATEGORIA_API = 'services/admin/categorias.php';
const MARCA_API = 'services/admin/marcas.php';

const SEARCH_FORM = document.getElementById('searchForm');

const TABLE_BODY = document.getElementById('tarjetas');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();
});

// Método del evento para cuando se envía el formulario de buscar.
SEARCH_FORM.addEventListener('submit', (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SEARCH_FORM);
    // Llamada a la función para llenar la tabla con los resultados de la búsqueda.
    fillTable(FORM);
});

const fillTable = async (form = null) => {
    // Se inicializa el contenido de la tabla.
    TABLE_BODY.innerHTML = '';
    // Se verifica la acción a realizar.
    (form) ? action = 'searchRows' : action = 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(PRODUCTO_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
            <div class="col">
            <div class="card h-100 border-light">
              <img src="${SERVER_URL}images/productos/${row.imagen_producto}" class="card-img-top" alt="..." loading="lazy">
              <div class="card-body">
                <h5 class="card-title">${row.nombreProducto}</h5>
                <div class="descripcion-precio">
                  <p class="card-text">${row.descripcionProducto}</p>
                  <h5>$ ${row.precioProducto}</h5>
                </div>
                <ul class="iconos-caracteristicas">
                  <li>
                    <a href="producto.html"><img src="../../resources/img/carrito.svg" alt="añadir al carrito"></a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
                `;
        });
    } else {
        sweetAlert(4, DATA.error, true);
    }
}
