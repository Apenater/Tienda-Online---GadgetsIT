// Constantes para completar la ruta de la API.
const PRODUCTO_API = 'services/public/productos.php';
<<<<<<< HEAD
const COMENTARIOS_API = 'services/public/comentarios.php';
=======
const COMENTARIO_API = 'services/public/comentarios.php';
// const PEDIDO_API = 'services/public/pedido.php';
>>>>>>> 5f8f0a0696775257495f00f62fc006819e7c95d4

// Constante tipo objeto para obtener los parámetros disponibles en la URL.
const PARAMS = new URLSearchParams(location.search);
// Constante para establecer el formulario de agregar un producto al carrito de compras.
const SHOPPING_FORM = document.getElementById('shoppingForm');

document.addEventListener('DOMContentLoaded', async () => {
    const idProducto = PARAMS.get('id');
    await cargarProducto(idProducto);
    cargarComentarios(idProducto);
});

async function cargarProducto(idProducto) {
    const FORM = new FormData();
    FORM.append('idProducto', idProducto);
    const DATA = await fetchData(PRODUCTO_API, 'readOne', FORM);
    if (DATA.status) {
        document.getElementById('imagen_producto').src = SERVER_URL.concat('images/productos/', DATA.dataset.imagen_producto);
        document.getElementById('nombreProducto').textContent = DATA.dataset.nombreProducto;
        document.getElementById('descripcionProducto').textContent = DATA.dataset.descripcionProducto;
        document.getElementById('precioFinal').textContent = `$${DATA.dataset.precioFinal}`;
        document.getElementById('Modelo').textContent = DATA.dataset.Modelo;
        document.getElementById('especificacionesProducto').textContent = DATA.dataset.especificacionesProducto;
        document.getElementById('idProducto').value = DATA.dataset.idProducto;
    } else {
        document.getElementById('mainTitle').textContent = 'Producto no encontrado';
        document.querySelector('.contenedor').innerHTML = '<p>Producto no encontrado</p>';
    }
}

<<<<<<< HEAD
function cargarComentarios(idProducto) {
    fetch(`${COMENTARIOS_API}?action=readAll&idProducto=${idProducto}`)
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
}
=======
document.addEventListener('DOMContentLoaded', async () => {
    // Se define un objeto con los datos de la categoría seleccionada.
    const FORM = new FormData();
    FORM.append('idProducto', PARAMS.get('id'));
    // Petición para solicitar los comentarios del producto
    const DATA = await fetchData(COMENTARIO_API, 'readComentariosProducto', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se inicializa el contenedor de productos.
        PRODUCTOS.innerHTML = '';
        // Se recorre el conjunto de registros fila por fila a través del objeto row.
        DATA.dataset.forEach(row => {
            // Se crean y concatenan las tarjetas con los datos de cada producto.
            PRODUCTOS.innerHTML += `
            <div class="comentario">
                <div class="titulo-comentario">
                    <h5></h5>
                    <button class="like-button" id="likeButton">
                        <img src="../../resources/img/Vector.svg" alt="" loading="lazy" />
                        <span id="likeCount"></span>
                    </button>
                </div>
                <p class="comentario-contenido" id="">

                </p>
                <hr>
            </div>
            `;
        });
    } else {
        // Se presenta un mensaje de error cuando no existen datos para mostrar.
        MAIN_TITLE.textContent = DATA.error;
    }
});

// Método del evento para cuando se envía el formulario de agregar un producto al carrito.
// SHOPPING_FORM.addEventListener('submit', async (event) => {
//     // Se evita recargar la página web después de enviar el formulario.
//     event.preventDefault();
//     // Constante tipo objeto con los datos del formulario.
//     const FORM = new FormData(SHOPPING_FORM);
//     // Petición para guardar los datos del formulario.
//     const DATA = await fetchData(PEDIDO_API, 'createDetail', FORM);
//     // Se comprueba si la respuesta es satisfactoria, de lo contrario se constata si el cliente ha iniciado sesión.
//     if (DATA.status) {
//         sweetAlert(1, DATA.message, false, 'cart.html');
//     } else if (DATA.session) {
//         sweetAlert(2, DATA.error, false);
//     } else {
//         sweetAlert(3, DATA.error, true, 'login.html');
//     }
// });
>>>>>>> 5f8f0a0696775257495f00f62fc006819e7c95d4
