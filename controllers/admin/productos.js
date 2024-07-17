// Constantes para completar las rutas de la API.
const PRODUCTO_API = 'services/admin/producto.php';
const CATEGORIA_API = 'services/public/categoria.php';
const MARCA_API = 'services/public/marca.php';

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
    IMAGEN_PRODUCTO = document.getElementById('inputGroupFile01'),
    ESTADO_PRODUCTO = document.getElementById('estadoProducto');



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


SAVE_FORM.addEventListener('submit', async (event) => {
    event.preventDefault();
    (ID_PRODUCTO.value) ? action = 'updateRow' : action = 'createRow';
    const FORM = new FormData(SAVE_FORM);
    const DATA = await fetchData(PRODUCTO_API, action, FORM);
    if (DATA.status) {
        document.getElementById('imagenProducto').value = '';
        SAVE_MODAL.hide();
        SAVE_FORM.reset();
        sweetAlert(1, DATA.message, true);
        fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});


const fillTable = async (form = null) => {
    TABLE_BODY.innerHTML = '';
    (form) ? action = 'searchRows' : action = 'readAll';
    const DATA = await fetchData(PRODUCTO_API, action, form);
    if (DATA.status) {
        DATA.dataset.forEach(row => {

            TABLE_BODY.innerHTML += `
                <div class="gadgetit-container">
                    <div class="gadgetit-card">
                        <div class="gadgetit-card-image">
                            <img src="${SERVER_URL}images/productos/${row.imagen_producto}" alt="img">
                        </div>
                        <div class="gadgetit-card-principal">
                            <div class="gadgetit-card-title">${row.nombre_producto}</div>
                            <div class="gadgetit-card-description">${row.descripcion_producto}</div>
                        </div>
                        <div class="gadgetit-card-content">
                            <div class="gadgetit-card-title">$${row.precio_producto}</div>
                            <div class="gadgetit-card-description">${row.nombre_marca}</div>
                        </div>
                        <div class="gadgetit-card-content">
                            <div class="gadgetit-card-title">${row.existencias_producto}</div>
                            <div class="gadgetit-card-description">En Stock</div>
                        </div>

                        <div class="gadgetit-card-actions">
                            <button type="button" class="gadgetit-btn gadgetit-btn-verde"  onclick="openUpdate(${row.id_producto})">
                                <img src="../../resources/img/actualizar.svg" alt="Actualizar" class="gadgetit-btn-icon">
                                Actualizar
                            </button>   
                            <button type="button" class="gadgetit-btn gadgetit-btn-rojo" onclick="openDelete(${row.id_producto})">
                                <img src="../../resources/img/eliminar.svg" alt="Eliminar" class="gadgetit-btn-iconn"> Eliminar
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
    SAVE_MODAL.show();
    MODAL_TITLE.textContent = 'Crear producto';
    SAVE_FORM.reset();
    EXISTENCIAS_PRODUCTO.disabled = false;
    fillSelectCategoria(CATEGORIA_API, 'readAll', 'categoriaProducto');
    fillSelectMarca(MARCA_API, 'readAll', 'marcaProducto');
}


const openUpdate = async (id) => {
    change();
    const FORM = new FormData();
    FORM.append('idProducto', id);
    const DATA = await fetchData(PRODUCTO_API, 'readOne', FORM);
    if (DATA.status) {
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar producto';
        SAVE_FORM.reset();
        //EXISTENCIAS_PRODUCTO.disabled = true;
        const ROW = DATA.dataset;
        ID_PRODUCTO.value = ROW.id_producto;
        NOMBRE_PRODUCTO.value = ROW.nombre_producto;
        DESCRIPCION_PRODUCTO.value = ROW.descripcion_producto;
        PRECIO_PRODUCTO.value = ROW.precio_producto;
        EXISTENCIAS_PRODUCTO.value = ROW.existencias_producto;
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