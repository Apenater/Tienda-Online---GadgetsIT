// Constantes para completar la ruta de la API.
const LOGIN_API = '../../controllers/public/login.php';

// Constante para establecer el formulario de inicio de sesión.
const LOGIN_FORM = document.getElementById('login-form');

// Evento que se ejecuta al cargar el documento.
document.addEventListener('DOMContentLoaded', () => {
    // Evento que se ejecuta al enviar el formulario de inicio de sesión.
    LOGIN_FORM.addEventListener('submit', async (event) => {
        event.preventDefault();
        await login();
    });
});

// Función asincrónica para iniciar sesión.
async function login() {
    const FORM = new FormData(LOGIN_FORM);
    const DATA = await fetchData(LOGIN_API, 'login', FORM);
    if (DATA.status) {
        // Redirigir a la página de marcas si el inicio de sesión es exitoso.
        window.location.href = 'marcas.html';
    } else {
        // Mostrar mensaje de error si el inicio de sesión falla.
        swal('Error', DATA.error || 'Error al iniciar sesión', 'error');
    }
}

// Función asincrónica para obtener datos de la API.
async function fetchData(api, action, form = null) {
    const options = form ? { method: 'POST', body: form } : { method: 'GET' };
    const response = await fetch(`${api}?action=${action}`, options);
    const result = await response.json();
    return result;
}
