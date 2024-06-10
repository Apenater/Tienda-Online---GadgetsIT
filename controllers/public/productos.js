// Constantes para completar las rutas de la API.
const PRODUCTO_API = 'services/public/productos.php';
const CATEGORIA_API = 'services/admin/categorias.php';
const MARCA_API = 'services/admin/marcas.php';

const SEARCH_FORM = document.getElementById('searchForm');

const TABLE_BODY = document.getElementById('tarjetas');

const SAVE_FORM = document.getElementById('saveForm'),
  ID_PRODUCTO = document.getElementById('idProducto'),
  NOMBRE_PRODUCTO = document.getElementById('nombreProducto'),
  DESCRIPCION_PRODUCTO = document.getElementById('descripcionProducto'),
  MODELO_PRODUCTO = document.getElementById('modeloProducto'),
  ESPECIFICACIONES_PRODUCTO = document.getElementById('especificacionesProducto'),
  PRECIO_PRODUCTO = document.getElementById('precioProducto'),
  EXISTENCIAS_PRODUCTO = document.getElementById('existenciasProducto'),
  ESTADO_PRODUCTO = document.getElementById('estadoProducto');

/** */
SEARCH_FORM.addEventListener('submit', (event) => {
  event.preventDefault();
  const FORM = new FormData(SEARCH_FORM);
  fillTable(FORM);
});

document.addEventListener('DOMContentLoaded', async () => {
  // Mandar a llamar la funcion para mostrar los productos en la
  fillTable();
});

const fillTable = async (form = null) => {
  TABLE_BODY.innerHTML = '';
  (form) ? action = 'searchRows' : action = 'readAll';
  const DATA = await fetchData(PRODUCTO_API, action, form);
  if (DATA.status) {
    DATA.dataset.forEach(row => {
m
      TABLE_BODY.innerHTML += `
        <div class="col">
          <div class="card h-100 border-light">
            <img src="${SERVER_URL}images/productos/${row.imagen_producto}" class="card-img-top" alt="..." loading="lazy">
            <div class="card-body">
              <h5 class="card-title">${row.nombreProducto}</h5>
              <div class="descripcion-precio">
                <p class="card-text">${row.descripcionProducto}</p>
                <h5>$${row.precioProducto}</h5>
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

/*
*   Función para abrir un reporte automático de productos por categoría.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openReport = () => {
  // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
  const PATH = new URL(`${SERVER_URL}reports/public/productos.php`);
  // Se abre el reporte en una nueva pestaña.
  window.open(PATH.href);
}