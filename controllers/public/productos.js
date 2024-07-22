// Constante para completar la ruta de la API.
const PRODUCTO_API = 'services/public/producto.php';
const CATEGORIA_API = 'services/public/categoria.php';
const MARCA_API = 'services/public/marca.php';

const SEARCH_FORM = document.getElementById('searchForm');

const TABLE_BODY = document.getElementById('tarjetas');

const PARAMS = new URLSearchParams(location.search);

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
  loadTemplate();
  const idProducto = PARAMS.get('idProducto');
  const idCategoria = PARAMS.get('idCategoria');
  const idMarca = PARAMS.get('idMarca');
  
  if (idCategoria) {
    fillTable({idCategoria: idCategoria}, 'readProductosCategoria');
  } else if (idMarca) {
    fillTable({idMarca: idMarca}, 'readProductosMarca');
  } else {
    fillTable();
  }
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

const fillTable = async (form = null, action = 'readAll') => {
  TABLE_BODY.innerHTML = '';
  let postData = form instanceof FormData ? form : new FormData();
  if (form && !(form instanceof FormData)) {
    for (let key in form) {
      postData.append(key, form[key]);
    }
  }

  const DATA = await fetchData(PRODUCTO_API, action, postData);
  if (DATA.status) {
    DATA.dataset.forEach(row => {
      TABLE_BODY.innerHTML += `
        <div class="col">
          <div class="card h-100 border-light">
            <img src="${SERVER_URL}images/productos/${row.imagen_producto}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">${row.nombre_producto}</h5>
              <div class="descripcion-precio">
                <p class="card-text">${row.descripcion_producto}</p>
                <h5>$ ${row.precio_producto}</h5>
              </div>
              <ul class="iconos-caracteristicas">
                <li><a href="producto.html?id=${row.id_producto}"><img src="../../resources/img/carrito.svg" alt="añadir al carrito"></a></li>
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
