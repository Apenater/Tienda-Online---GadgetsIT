    // Constante para completar la ruta de la API.
    const CATEGORIA_API = 'services/admin/categorias.php';
    // Constante para establecer el formulario de buscar.
    const SEARCH_FORM = document.getElementById('searchForm');
    // Constantes para establecer los elementos de la tabla.
    const TARJETAS = document.getElementById('tarjetas');
    // Constantes para establecer los elementos del componente Modal.
    const SAVE_MODAL = new bootstrap.Modal('#exampleModal'),
        MODAL_TITLE = document.getElementById('exampleModalLabel');
    // Constantes para establecer los elementos del formulario de guardar.
    const SAVE_FORM = document.getElementById('saveForm'),
        ID_CATEGORIA = document.getElementById('id_Categoria'),  
        NOMBRE_CATEGORIA = document.getElementById('nombreC'),
        DESCRIPCION_CATEGORIA = document.getElementById('Descripcion'),
        IMAGEN_CATEGORIA = document.getElementById('foto');

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
        (ID_CATEGORIA.value) ? action = 'updateRow' : action = 'createRow';
        // Constante tipo objeto con los datos del formulario.
        const FORM = new FormData(SAVE_FORM);
        // Petición para guardar los datos del formulario.
        const DATA = await fetchData(CATEGORIA_API, action, FORM);
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
        const DATA = await fetchData(CATEGORIA_API, action, form);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se recorre el conjunto de registros fila por fila.
            DATA.dataset.forEach(row => {
                // Se crean y concatenan las filas de la tabla con los datos de cada registro.
                TARJETAS.innerHTML += `
                    <div class="gadgetit-container">
                    <div class="gadgetit-card">
                        <div class="gadgetit-card-image">
                            <img src="${SERVER_URL}images/categorias/${row.foto}" alt="Image-ct">
                        </div>
                        <div class="gadgetit-card-content">
                            <div class="gadgetit-card-title">${row.nombreC}</div>
                            <div class="gadgetit-card-description">${row.Descripcion}</div>
                        </div>
                        <div class="gadgetit-card-actions">
                            <button type="button" class="gadgetit-btn gadgetit-btn-verde" onclick="openUpdate(${row.id_Categoria})">
                                <img src="../../resources/img/actualizar.svg" alt="Actualizar" class="gadgetit-btn-icon">
                                Actualizar
                            </button>   
                            <button type="button" class="gadgetit-btn gadgetit-btn-rojo" onclick="openDelete(${row.id_Categoria})">
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

    /*
    *   Función para preparar el formulario al momento de insertar un registro.
    *   Parámetros: ninguno.
    *   Retorno: ninguno.
    */
    const openCreate = () => {
        change();
        // Se muestra la caja de diálogo con su título.
        SAVE_MODAL.show();
        MODAL_TITLE.textContent = 'Crear categoría';
        // Se prepara el formulario.
        SAVE_FORM.reset();
    }

    /*
    *   Función asíncrona para preparar el formulario al momento de actualizar un registro.
    *   Parámetros: id (identificador del registro seleccionado).
    *   Retorno: ninguno.
    */
    const openUpdate = async (id) => {
        change();
        // Se define una constante tipo objeto con los datos del registro seleccionado.
        const FORM = new FormData();
        FORM.append('id_Categoria', id);
        // Petición para obtener los datos del registro solicitado.
        const DATA = await fetchData(CATEGORIA_API, 'readOne', FORM);
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se muestra la caja de diálogo con su título.
            SAVE_MODAL.show();
            MODAL_TITLE.textContent = 'Actualizar categoría';
            // Se prepara el formulario.
            SAVE_FORM.reset();
            // Se inicializan los campos con los datos.
            const ROW = DATA.dataset;
            ID_CATEGORIA.value = ROW.id_Categoria;
            NOMBRE_CATEGORIA.value = ROW.nombreC;
            DESCRIPCION_CATEGORIA.value = ROW.Descripcion;
            set();
            document.getElementById('imagePreview').src = `${SERVER_URL}images/categorias/${ROW.foto}`;
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }

    /*
    *   Función asíncrona para eliminar un registro.
    *   Parámetros: id (identificador del registro seleccionado).
    *   Retorno: ninguno.
    */
    const openDelete = async (id) => {
        // Llamada a la función para mostrar un mensaje de confirmación, capturando la respuesta en una constante.
        const RESPONSE = await confirmAction('¿Desea eliminar la categoría de forma permanente?');
        // Se verifica la respuesta del mensaje.
        if (RESPONSE) {
            // Se define una constante tipo objeto con los datos del registro seleccionado.
            const FORM = new FormData();
            FORM.append('id_Categoria', id);
            // Petición para eliminar el registro seleccionado.
            const DATA = await fetchData(CATEGORIA_API, 'deleteRow', FORM);
            // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
            if (DATA.status) {
                // Se muestra un mensaje de éxito.
                await sweetAlert(1, DATA.message, true);
                // Se carga nuevamente la tabla para visualizar los cambios.
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