// Constante para completar la ruta de la API.
const PRODUCTO_API = 'services/admin/productos.php';
const CATEGORIA_API = 'services/admin/categorias.php';
const MARCA_API = 'services/admin/marcas.php';

const SEARCH_FORM = document.getElementById('searchForm');

const TABLE_BODY = document.getElementById('tarjetas');

const SAVE_MODAL = new bootstrap.Modal('#exampleModal'),
    MODAL_TITLE = document.getElementById('exampleModalLabel');

const SAVE_FORM = document.getElementById('saveForm'),
    ID_PRODUCTO = document.getElementById('idProducto'),
    NOMBRE_PRODUCTO = document.getElementById('nombreProducto'),
    DESCRIPCION_PRODUCTO = document.getElementById('descripcionProducto'),
    MODELO_PRODUCTO = document.getElementById('modeloProducto'),
    ESPECIFICACIONES_PRODUCTO = document.getElementById('especificacionesProducto'),
    PRECIO_PRODUCTO = document.getElementById('precioProducto'),
    EXISTENCIAS_PRODUCTO = document.getElementById('existenciasProducto'),
    ESTADO_PRODUCTO = document.getElementById('estadoProducto');

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

// Método del evento para cuando se envía el formulario de guardar.
SAVE_FORM.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (ID_PRODUCTO.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(SAVE_FORM);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(PRODUCTO_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se cierra la caja de diálogo.
        SAVE_MODAL.hide();
        // Se muestra un mensaje de éxito.
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});

/*
*   Función asíncrona para llenar la tabla con los registros disponibles.
*   Parámetros: form (objeto opcional con los datos de búsqueda).
*   Retorno: ninguno.
*/
const fillTable = async (form = null) => {
    // Se inicializa el contenido de la tabla.
    TARJETAS.innerHTML = '';
    // Se verifica la acción a realizar.
    (form) ? action = 'searchRows' : action = 'readAll';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(PRODUCTO_API, action, form);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TARJETAS.innerHTML += `
            <div class="col">
            <div class="card h-100 border-light">
              <img src="${SERVER_URL}images/productos/${row.imagen_producto}" class="card-img-top" alt="..." loading="lazy">
              <div class="card-body">
                <h5 class="card-title">${row.nombreProducto}</h5>
                <div class="descripcion-precio">
                  <p class="card-text">${row.descripcionProducto}</p>
                  <h5>${row.precioProducto}</h5>
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
*   Función para preparar el formulario al momento de insertar un registro.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
/*
*   Función asíncrona para preparar el formulario al momento de actualizar un registro.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openCreate = () => {
    change();
    // Se muestra la caja de diálogo con su título.
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'Crear producto';
    // Se prepara el formulario.
    SAVE_FORM.reset();
    EXISTENCIAS_PRODUCTO.disabled = false;
    fillSelectCategoria(CATEGORIA_API, 'readAll', 'categoriaProducto');
    fillSelectMarca(MARCA_API, 'readAll', 'marcaProducto');
}


const openUpdate = async (id) => {
    change();
    // Se define un objeto con los datos del registro seleccionado.
    const FORM = new FormData();
    FORM.append('idProducto', id);
    // Petición para obtener los datos del registro solicitado.
    const DATA = await fetchData(PRODUCTO_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar producto';
        // Se prepara el formulario.
        SAVE_FORM.reset();
        //EXISTENCIAS_PRODUCTO.disabled = true;
        // Se inicializan los campos con los datos.
        const ROW = DATA.dataset;
        ID_PRODUCTO.value = ROW.idProducto;
        NOMBRE_PRODUCTO.value = ROW.nombreProducto;
        MODELO_PRODUCTO.value = ROW.Modelo;
        DESCRIPCION_PRODUCTO.value = ROW.descripcionProducto;
        PRECIO_PRODUCTO.value = ROW.precioProducto;
        EXISTENCIAS_PRODUCTO.value = ROW.existencias_producto;
        ESPECIFICACIONES_PRODUCTO.value = ROW.especificacionesProducto;
        fillSelectMarca(MARCA_API, 'readAll', 'marcaProducto', ROW.id_marca);
        fillSelectCategoria(CATEGORIA_API, 'readAll', 'categoriaProducto', ROW.id_categoria);
        set();
        document.getElementById('imagePreview').src = `${SERVER_URL}images/productos/${ROW.imagen_producto}`;
    } else {
        sweetAlert(2, DATA.error, false);
    }
}

const openDelete = async (id) => {
    const RESPONSE = await confirmAction('¿Desea eliminar el producto de forma permanente?');
    if (RESPONSE) {
        const FORM = new FormData();
        FORM.append('idProducto', id);
        const DATA = await fetchData(PRODUCTO_API, 'deleteRow', FORM);
        if (DATA.status) {
            await sweetAlert(1, DATA.message, true);
            fillTable();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

/*
*   Función para abrir un reporte automático de productos por categoría.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openReport = () => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/admin/productos.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}