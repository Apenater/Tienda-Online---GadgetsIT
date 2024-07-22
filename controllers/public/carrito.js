// Constante para completar la ruta de la API.
const PRODUCTO_API = 'services/public/producto.php';
const CATEGORIA_API = 'services/public/categoria.php';
const MARCA_API = 'services/public/marca.php';
const PEDIDO_API = 'services/public/pedido.php';

const TABLE_BODY = document.getElementById('tarjetas');

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    loadTemplate();
    // Llamada a la función para llenar la tabla con los registros existentes.
    fillTable();
});

const fillTable = async (form = null) => {
    // Se inicializa el contenido de la tabla.
    TABLE_BODY.innerHTML = '';
    // Petición para obtener los registros disponibles.
    const DATA = await fetchData(PEDIDO_API, 'readDetail');
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se recorre el conjunto de registros fila por fila.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las filas de la tabla con los datos de cada registro.
            TABLE_BODY.innerHTML += `
                <!-- contenedores de los productos del carrito -->
                <div class="gadgetit-container">
                    <div class="gadgetit-card">
                        <input type="number" class="d-none" id="idDetalle" name="idDetalle" value="${row.id_detalle}">
                        <div class="gadgetit-card-image">
                            <img src="${SERVER_URL}images/productos/${row.imagen_producto}" alt="img">
                        </div>
                        <div class="gadgetit-card-principal">
                            <div class="gadgetit-card-title">${row.nombre_producto}</div>
                        </div>
                        <div class="gadgetit-card-content">
                            <div class="gadgetit-card-title">$${row.precio_producto}</div>
                            <div class="gadgetit-card-description">Precio</div>
                        </div>
                        <div class="gadgetit-card-content">
                            <div class="cantidad">
                                <button class="gadgetit-btn-cantidad" onclick="decrementarCantidad(this)">-</button>
                                <span id="cantidadProducto-${row.id_detalle}">${row.cantidad_producto}</span>
                                <button class="gadgetit-btn-cantidad" onclick="incrementarCantidad(this)">+</button>

                            </div>

                            <div class="gadgetit-card-description">Cantidad</div>
                        </div>

                        <div class="gadgetit-card-actions">
                            <button class="gadgetit-btn gadgetit-btn-rojo" onclick="openDelete(${row.id_detalle})">
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

async function incrementarCantidad(element) {
    const cardContainer = element.closest('.gadgetit-card');
    const idDetalleInput = cardContainer.querySelector('input[name="idDetalle"]');
    const cantidadElement = cardContainer.querySelector('span[id^="cantidadProducto-"]');

    if (idDetalleInput && cantidadElement) {
        let cantidad = parseInt(cantidadElement.innerText);
        cantidad += 1;
        cantidadElement.innerText = cantidad;

        // Actualiza la cantidad en la API
        await updateCantidadAPI(idDetalleInput.value, cantidad);
    } else {
        console.error('No se encontraron los elementos necesarios para actualizar la cantidad.');
    }
}

async function decrementarCantidad(element) {
    const cardContainer = element.closest('.gadgetit-card');
    const idDetalleInput = cardContainer.querySelector('input[name="idDetalle"]');
    const cantidadElement = cardContainer.querySelector('span[id^="cantidadProducto-"]');

    if (idDetalleInput && cantidadElement) {
        let cantidad = parseInt(cantidadElement.innerText);
        if (cantidad > 1) {
            cantidad -= 1;
            cantidadElement.innerText = cantidad;

            // Actualiza la cantidad en la API
            await updateCantidadAPI(idDetalleInput.value, cantidad);
        }
    } else {
        console.error('No se encontraron los elementos necesarios para actualizar la cantidad.');
    }
}

async function updateCantidadAPI(idDetalle, cantidad) {
    const PEDIDO_API2 = '/Tienda-Online---GadgetsIT/api/services/public/pedido.php';
    const formData = new FormData();
    formData.append('idDetalle', idDetalle);
    formData.append('cantidadProducto', cantidad);

    const response = await fetch(`${PEDIDO_API2}?action=updateDetail`, {
        method: 'POST',
        body: formData
    });
    const data = await response.json();

    if (data.status) {
        sweetAlert(1, data.message, true);
    } else {
        sweetAlert(2, data.error, false);
    }
}

const openDelete = async (id) => {
    const RESPONSE = await confirmAction('¿Desea eliminar el producto del pedido de forma permanente?');
    if (RESPONSE) {
        const FORM = new FormData();
        FORM.append('idDetalle', id);
        const DATA = await fetchData(PEDIDO_API, 'deleteDetail', FORM);
        if (DATA.status) {
            await sweetAlert(1, DATA.message, true);
            fillTable();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

const finish = async () => {
    const RESPONSE = await confirmAction('¿Desea finalizar el pedido?');
    if (RESPONSE) {
        const DATA = await fetchData(PEDIDO_API, 'finishOrder');
        if (DATA.status) {
            await sweetAlert(1, DATA.message, true);
            fillTable();
        } else {
            sweetAlert(2, DATA.error, false);
        }
    }
}

const openReport = () => {
    // Se declara una constante tipo objeto con la ruta específica del reporte en el servidor.
    const PATH = new URL(`${SERVER_URL}reports/admin/comprobante.php`);
    // Se abre el reporte en una nueva pestaña.
    window.open(PATH.href);
}