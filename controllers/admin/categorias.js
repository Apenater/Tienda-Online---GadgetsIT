const CATEGORIA_API = 'services/admin/categoria.php';
const SEARCH_FORM = document.getElementById('searchForm');
const TARJETAS = document.getElementById('tarjetas');
const SAVE_MODAL = new bootstrap.Modal('#exampleModal'),
    MODAL_TITLE = document.getElementById('exampleModalLabel');
const SAVE_FORM = document.getElementById('saveForm'),
    ID_CATEGORIA = document.getElementById('idCategoria'),
    NOMBRE_CATEGORIA = document.getElementById('nombreCategoria'),
    DESCRIPCION_CATEGORIA = document.getElementById('descripcionCategoria'),
    IMAGEN_CATEGORIA = document.getElementById('foto');

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
    (ID_CATEGORIA.value) ? action = 'updateRow' : action = 'createRow';
    const FORM = new FormData(SAVE_FORM);
    const DATA = await fetchData(CATEGORIA_API, action, FORM);
    if (DATA.status) {
        SAVE_MODAL.hide();
        sweetAlert(1, DATA.message, true);
        fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});


const fillTable = async (form = null) => {
    TARJETAS.innerHTML = '';
    (form) ? action = 'searchRows' : action = 'readAll';
    const DATA = await fetchData(CATEGORIA_API, action, form);
    if (DATA.status) {
        DATA.dataset.forEach(row => {
            TARJETAS.innerHTML += `
                    <div class="gadgetit-container">
                    <div class="gadgetit-card">
                        <div class="gadgetit-card-image">
                            <img src="${SERVER_URL}images/categorias/${row.imagen_categoria}" alt="Image-ct">
                        </div>
                        <div class="gadgetit-card-content">
                            <div class="gadgetit-card-title">${row.nombre_categoria}</div>
                            <div class="gadgetit-card-description">${row.descripcion_categoria}</div>
                        </div>
                        <div class="gadgetit-card-actions">
                            <button type="button" class="gadgetit-btn gadgetit-btn-verde" onclick="openUpdate(${row.id_categoria})"egoria>
                                <img src="../../resources/img/actualizar.svg" alt="Actualizar" class="gadgetit-btn-icon">
                                Actualizar
                            </button>   
                            <button type="button" class="gadgetit-btn gadgetit-btn-rojo" onclick="openDelete(${row.id_categoria})">
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
    MODAL_TITLE.textContent = 'Crear categoría';
    SAVE_FORM.reset();
}


const openUpdate = async (id) => {
    change();
    const FORM = new FormData();
    FORM.append('idCategoria', id);
    const DATA = await fetchData(CATEGORIA_API, 'readOne', FORM);
    if (DATA.status) {
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Actualizar categoría';
        SAVE_FORM.reset();
        const ROW = DATA.dataset;
        ID_CATEGORIA.value = ROW.id_categoria;
        NOMBRE_CATEGORIA.value = ROW.nombre_categoria;
        DESCRIPCION_CATEGORIA.value = ROW.descripcion_categoria;
        set();
        document.getElementById('imagePreview').src = `${SERVER_URL}images/categorias/${ROW.imagen_categoria}`;
    } else {
        sweetAlert(2, DATA.error, false);
    }
}


const openDelete = async (id) => {
    const RESPONSE = await confirmAction('¿Desea eliminar la categoría de forma permanente?');
    if (RESPONSE) {
        const FORM = new FormData();
        FORM.append('idCategoria', id);
        const DATA = await fetchData(CATEGORIA_API, 'deleteRow', FORM);
        if (DATA.status) {
            await sweetAlert(1, DATA.message, true);
            fillTable();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

/*
*   Función para abrir un reporte parametrizado de productos de una categoría.
*   Parámetros: id (identificador del registro seleccionado).
*   Retorno: ninguno.
*/
const openReport = (id) => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/admin/productos_categoria.php`);
    // Se agrega un parámetro a la ruta con el valor del registro seleccionado.
    PATH.searchParams.append('id_Categoria', id);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}