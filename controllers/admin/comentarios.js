document.addEventListener('DOMContentLoaded', function () {
    fillTable(); // Carga inicial de todos los comentarios
});

document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const searchTerm = new FormData(this).get('search');
    fillTable(searchTerm); // Llama a fillTable con términos de búsqueda solo después de submit
});

document.getElementById('searchForm').addEventListener('reset', function (event) {
    fillTable(); // Recargar todos los comentarios cuando el formulario se resetea
});

function fillTable(searchTerm = '') {
    const container = document.getElementById('commentsContainer');
    container.innerHTML = ''; // Limpiar el contenedor existente
    let url = '../../api/services/admin/comentarios.php?action=readAll'; // URL por defecto para cargar todos
    if (searchTerm) {
        url = `../../api/services/admin/comentarios.php?action=searchRows&term=${encodeURIComponent(searchTerm)}`; // Cambia URL si hay términos de búsqueda
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Depuración para verificar los datos recibidos
            if (data.status) {
                data.dataset.forEach(comment => {
                    container.innerHTML += `
                        <div class="gadgetit-container">
                            <div class="gadgetit-card">
                                <div class="gadgetit-card-content">
                                    <div class="gadgetit-card-title">${comment.usuarioNombre + ' ' + comment.usuarioApellido}</div>
                                    <div class="gadgetit-card-description">${comment.comentario}</div>
                                </div>
                                <div class="gadgetit-card-actions">
                                    <button type="button" class="gadgetit-btn gadgetit-btn-verde" onclick="viewDetails(${comment.id_Comentarios})">
                                        Ver Detalles
                                    </button>   
                                    <button type="button" class="gadgetit-btn gadgetit-btn-rojo" onclick="hideComment(${comment.id_Comentarios})">
                                        Ocultar
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                });
            } else {
                alert('No se encontraron comentarios');
            }
        })
        .catch(error => console.error('Error loading comments:', error));
}



function viewDetails(id_Comentarios) {
    console.log("ID del comentario:", id_Comentarios);  
    fetch(`../../api/services/admin/comentarios.php?action=readOne&idComentario=${id_Comentarios}`)
        .then(response => response.json())
        .then(data => {
            console.log("Respuesta del servidor:", data);  
            if (data.status) {
                const commentData = data.dataset[0];
                document.getElementById('Comentario-name').value = `${commentData.usuarioNombre} ${commentData.usuarioApellido}`;
                document.getElementById('Comentario-producto').value = commentData.nombreProducto;
                document.getElementById('Comentario-date').value = commentData.fechaPublicacion;
                document.getElementById('comentario').value = commentData.comentario;
                $('#commentModal').modal('show');
            } else {
                alert('Error al cargar los detalles del comentario: ' + data.error);
            }
        })
        .catch(error => console.error('Error fetching comment details:', error));
}



function hideComment(id) {
    if (confirm('¿Está seguro de que desea ocultar este comentario?')) {
        fetch(`../../api/services/admin/comentarios.php?action=hide&id=${id}`, {
            method: 'POST'
        })
            .then(response => response.json())
            .then(data => {
                if (data.status) {
                    alert('Comentario ocultado exitosamente');
                    fillTable();
                } else {
                    alert('Error al ocultar el comentario');
                }
            })
            .catch(error => console.error('Error hiding comment:', error));
    }
}
