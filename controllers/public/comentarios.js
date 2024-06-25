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
