const COMENTARIOS_API = 'services/public/comentarios.php';

const INPUT_COMENTAR = document.getElementById('comentar')

document.addEventListener('DOMContentLoaded', function() {
    const idProducto = getParameterByName('idProducto'); // Función para obtener el ID del producto desde la URL
    cargarComentarios(idProducto);

    document.getElementById('button-enviar').addEventListener('click', function() {
        enviarComentario(idProducto);
    });
});

function cargarComentarios(idProducto) {
    fetch(`comentarios.php?action=readAll&idProducto=${idProducto}`)
        .then(response => response.json())
        .then(result => {
            const comentariosContainer = document.getElementById('comentarios');
            if (result.status && result.dataset.length > 0) {
                comentariosContainer.innerHTML = '';
                result.dataset.forEach(comentario => {
                    comentariosContainer.innerHTML += `
                        <div class="comentario">
                            <div class="titulo-comentario">
                                <h5>${comentario.usuarioNombre} - ${comentario.fechaPublicacion}</h5>
                            </div>
                            <p class="comentario-contenido">${comentario.comentario}</p>
                            <hr>
                        </div>
                    `;
                });
            } else {
                comentariosContainer.innerHTML = '<p>No hay comentarios para este producto.</p>';
            }
        })
        .catch(error => console.error('Error al cargar los comentarios:', error));
}

function enviarComentario(idProducto) {
    const comentario = document.getElementById('comentar').value;
    const idUsuario = 1; // Obtener este valor según la sesión del usuario

    if (comentario.trim() === '') {
        alert('El comentario no puede estar vacío');
        return;
    }

    const data = new FormData();
    data.append('comentario', comentario);
    data.append('id_Producto', idProducto);
    data.append('id_usuario', idUsuario);

    fetch('comentarios.php?action=createRow', {
        method: 'POST',
        body: data
    })
    .then(response => response.json())
    .then(result => {
        if (result.status) {
            alert('Comentario enviado');
            document.getElementById('comentar').value = '';
            cargarComentarios(idProducto);
        } else {
            console.error(result.error);
        }
    })
    .catch(error => console.error('Error al enviar el comentario:', error));
}

function getParameterByName(name) {
    const url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
