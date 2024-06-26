const COMENTARIOS_API = 'services/public/comentarios.php';

const INPUT_COMENTAR = document.getElementById('comentar')

document.addEventListener('DOMContentLoaded', function() {
    loadComments();
});

function loadComments() {
    fetch('../../api/services/admin/comentarios.php?action=readAll')
        .then(response => response.json())
        .then(result => {
            if (result.status) {
                displayComments(result.dataset);
            } else {
                console.error('No se pudieron cargar los comentarios:', result.error);
            }
        })
        .catch(error => console.error('Error al cargar los comentarios:', error));
}

function displayComments(comments) {
    const container = document.querySelector('.Opiniones');
    comments.forEach(comment => {
        container.innerHTML += `
            <div class="comentario">
                <div class="titulo-comentario">
                    <h5>${comment.usuario} - ${comment.fechaPublicacion}</h5>
                </div>
                <p class="comentario-contenido">${comment.comentario}</p>
                <hr>
            </div>
        `;
    });
}

INPUT_COMENTAR.addEventListener('submit', async (event) => {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se verifica la acción a realizar.
    (id.value) ? action = 'updateRow' : action = 'createRow';
    // Constante tipo objeto con los datos del formulario.
    const FORM = new FormData(INPUT_COMENTAR);
    // Petición para guardar los datos del formulario.
    const DATA = await fetchData(COMENTARIOS_API, action, FORM);
    // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
    if (DATA.status) {
        sweetAlert(1, DATA.message, true);
        // Se carga nuevamente la tabla para visualizar los cambios.
        fillTable();
    } else {
        sweetAlert(2, DATA.error, false);
    }
});