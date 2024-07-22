// Constantes para completar la ruta de la API.
const PRODUCTO_API = 'services/public/producto.php';
const PEDIDO_API = 'services/public/pedido.php';
//const COMENTARIOS_API = 'services/public/comentarios.php';

// Constante tipo objeto para obtener los parámetros disponibles en la URL.
const PARAMS = new URLSearchParams(location.search);
// Constante para establecer el formulario de agregar un producto al carrito de compras.
const SHOPPING_FORM = document.getElementById('shoppingForm');

document.addEventListener('DOMContentLoaded', async () => {
    loadTemplate();
    const idProducto = PARAMS.get('id');
    await cargarProducto(idProducto);
    //cargarComentarios(idProducto);
});

async function cargarProducto(idProducto) {
    const FORM = new FormData();
    FORM.append('idProducto', idProducto);
    const DATA = await fetchData(PRODUCTO_API, 'readOne', FORM);
    if (DATA.status) {
        document.getElementById('imagen_producto').src = SERVER_URL.concat('images/productos/', DATA.dataset.imagen_producto);
        document.getElementById('nombreProducto').textContent = DATA.dataset.nombre_producto;
        document.getElementById('descripcionProducto').textContent = DATA.dataset.descripcion_producto;
        document.getElementById('precioProducto').textContent = '$' + DATA.dataset.precio_producto;
        document.getElementById('Modelo').textContent = DATA.dataset.marca_producto;
        document.getElementById('idProducto').value = DATA.dataset.id_producto;
    } else {
        document.getElementById('mainTitle').textContent = 'Producto no encontrado';
        document.querySelector('.contenedor').innerHTML = '<p>Producto no encontrado</p>';
    }
}

const add = async () => {
    const idProducto = PARAMS.get('id');
    const PEDIDO_API2 = '/Tienda-Online---GadgetsIT/api/services/public/pedido.php';
    const formData = new FormData();
    formData.append('idProducto', idProducto);
    formData.append('cantidadProducto', 1);

    const response = await fetch(`${PEDIDO_API2}?action=createDetail`, {
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

/*function cargarComentarios(idProducto) {
    fetch(`${COMENTARIOS_API}?action=readAll&idProducto=${idProducto}
        ../..readAll/api/services/admin/comentarios.php?action=`)
        .then(response => response.json())
        .then(result => {
            if (result.status && result.dataset.length > 0) {
                const comentariosContainer = document.querySelector('.Opiniones');
                comentariosContainer.innerHTML = ''; // Limpiar comentarios previos
                result.dataset.forEach(comentario => {
                    comentariosContainer.innerHTML += `
                        <div class="comentario">
                            <div class="titulo-comentario">
                                <h5>${comentario.usuario}</h5>
                            </div>
                            <p class="comentario-contenido">${comentario.texto}</p>
                            <hr>
                        </div>
                    `;
                });
            } else {
                document.querySelector('.Opiniones').innerHTML = '<p>No hay comentarios para este producto.</p>';
            }
        })
        .catch(error => console.error('Error al cargar los comentarios:', error));
}*/
