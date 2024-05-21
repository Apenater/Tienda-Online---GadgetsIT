const PERFIL_FORM = document.getElementById('perfilForm'),
NOMBRE_EMPLEADO = document.getElementById('nombreEmpleado'),
APELLIDO_EMPLEADO = document.getElementById('apellidoEmpleado'),
TELEFONO_EMPLEADO = document.getElementById('telefonoEmpleado'),
CORREO_EMPLEADO = document.getElementById('correoEmpleado');
const PASSWORD_MODAL = new bootstrap.Modal(document.getElementById('passwordModal'));
// Constante para establecer el formulario de cambiar contraseña.
const PASSWORD_FORM = document.getElementById('passwordForm');

document.addEventListener('DOMContentLoaded', async () => {
// Llamada a la función para mostrar el encabezado y pie del documento.
loadTemplate();

// Petición para obtener los datos del usuario que ha iniciado sesión.
const DATA = await fetchData(USER_API, 'readProfile');
// Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
if (DATA.status) {
    // Se inicializan los campos del formulario con los datos del usuario que ha iniciado sesión.
    const ROW = DATA.dataset;
    NOMBRE_EMPLEADO.value = ROW.nombre;
    APELLIDO_EMPLEADO.value = ROW.apellido;
    CORREO_EMPLEADO.value = ROW.correo;
    TELEFONO_EMPLEADO.value = ROW.telefono;
} else {
    sweetAlert(2, DATA.error, null);
}
});

PERFIL_FORM.addEventListener('submit', async (event) => {
// Se evita recargar la página web después de enviar el formulario.
event.preventDefault();
// Constante tipo objeto con los datos del formulario.
const FORM = new FormData(PERFIL_FORM);
// Petición para actualizar los datos personales del usuario.
const DATA = await fetchData(USER_API, 'editProfile', FORM);
// Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
if (DATA.status) {
    sweetAlert(1, DATA.message, true);
} else {
    sweetAlert(2, DATA.error, false);
}
});

// Método del evento para cuando se envía el formulario de cambiar contraseña.
PASSWORD_FORM.addEventListener('submit', async (event) => {
// Se evita recargar la página web después de enviar el formulario.
event.preventDefault();
// Constante tipo objeto con los datos del formulario.
const FORM = new FormData(PASSWORD_FORM);
// Petición para actualizar la constraseña.
const DATA = await fetchData(USER_API, 'changePassword', FORM);
// Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
if (DATA.status) {
    // Se cierra la caja de diálogo.
    PASSWORD_MODAL.hide();
    // Se muestra un mensaje de éxito.
    sweetAlert(1, DATA.message, true);
} else {
    sweetAlert(2, DATA.error, false);
}
});

/*
*   Función para preparar el formulario al momento de cambiar la contraseña.
*   Parámetros: ninguno.
*   Retorno: ninguno.
*/
const openPassword = () => {
// Se abre la caja de diálogo que contiene el formulario.
PASSWORD_MODAL.show();
// Se restauran los elementos del formulario.
PASSWORD_FORM.reset();
}
