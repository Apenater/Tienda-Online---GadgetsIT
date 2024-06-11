// Constantes para completar la ruta de la API.
const PRODUCTO_API = 'services/public/productos.php';
// const PEDIDO_API = 'services/public/pedido.php';

// Constante tipo objeto para obtener los parámetros disponibles en la URL.
const PARAMS = new URLSearchParams(location.search);
// Constante para establecer el formulario de agregar un producto al carrito de compras.
const SHOPPING_FORM = document.getElementById('shoppingForm');

// Método del eventos para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', async () => {
    // Constante tipo objeto con los datos del producto seleccionado.
    const FORM = new FormData();
    FORM.append('idProducto', PARAMS.get('id'));
    // Petición para solicitar los datos del producto seleccionado.
    const DATA = await fetchData(PRODUCTO_API, 'readOne', FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        // Se colocan los datos en la página web de acuerdo con el producto seleccionado previamente.
        document.getElementById('imagen_producto').src = SERVER_URL.concat('images/productos/', DATA.dataset.imagen_producto);
        document.getElementById('nombreProducto').textContent = DATA.dataset.nombreProducto;
        document.getElementById('descripcionProducto').textContent = DATA.dataset.descripcionProducto;
        document.getElementById('precioFinal').textContent = DATA.dataset.precioFinal;
        document.getElementById('Modelo').textContent = DATA.dataset.Modelo;
        document.getElementById('idProducto').value = DATA.dataset.idProducto;
    } else {
        // Se presenta un mensaje de error cuando no existen datos para mostrar.
        document.getElementById('mainTitle').textContent = DATA.error;
        // Se limpia el contenido cuando no hay datos para mostrar.
        document.getElementById('detalle').innerHTML = '';
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