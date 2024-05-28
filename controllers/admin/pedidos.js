// Constantes para completar las rutas de la API.
const PEDIDOS_API = 'services/admin/pedidos.php';
const PRODUCTOS_API = 'services/admin/productos.php';

const SEARCH_FORM = document.getElementById('searchForm');

const TABLE_BODY = document.getElementById('tarjetas');
const TABLE_BODY2 = document.getElementById('tarjetas2');

const SAVE_MODAL = new bootstrap.Modal('#exampleModal'),
    MODAL_TITLE = document.getElementById('exampleModalLabel');

const SAVE_FORM = document.getElementById('saveForm');

document.addEventListener('DOMContentLoaded', async () => {
    loadTemplate();

    const DATA = await fetchData(USER_API, 'readProfile');
    if (DATA.status) {
        fillTable();
    } else {
        sweetAlert(2, DATA.error, null);
    }
});

SEARCH_FORM.addEventListener('submit', (event) => {
    event.preventDefault();
    const FORM = new FormData(SEARCH_FORM);
    fillTable(FORM);
});


const fillTable = async (form = null) => {
    TABLE_BODY.innerHTML = '';
    (form) ? action = 'searchRows' : action = 'readAll';
    const DATA = await fetchData(PEDIDOS_API, action, form);
    if (DATA.status) {
        DATA.dataset.forEach(row => {

            TABLE_BODY.innerHTML += `

            <div class="gadgetit-container">
            <div class="gadgetit-card">
                <div class="gadgetit-card-image">
                    <img src="../../resources/img/profile.svg" alt="profile">
                </div>
                <div class="gadgetit-card-content">
                    <div class="gadgetit-card-title">${row.nombre} ${row.apellido}</div>
                </div>
                <div class="gadgetit-card-actions">
                    <!-- Botón para ver detalles del pedido -->
                    <button type="button" class="gadgetit-btn gadgetit-btn-verde" onclick="openUpdate(${row.idProducto}">
                        Ver pedido
                    </button>
                    <!-- Botón para rechazar el pedido -->
                    <button type="button class="gadgetit-btn gadgetit-btn-rojo onclick="openDelete(${row.idProducto})">
                        <img src="../../resources/img/rechazar.svg" alt="rechazar" class="gadgetit-btn-iconn"> Rechazar
                    </button>
                    </div>
                </div>
            </div>
            `;
        });
    } else {
        sweetAlert(4, DATA.error, true);
    }
}


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