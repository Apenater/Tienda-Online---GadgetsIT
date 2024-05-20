const USER_API = 'services/admin/administrador.php';

const HEADER = document.querySelector('header');


HEADER.innerHTML = `

    <nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-end fixed-top" >
        <div class="container">
            <a class="navbar-brand" href="#" style="color: white;">GADGETSIT</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-end " id="navbarNavDropdown">
                <ul class="navbar-nav pr-3">
                <li class="nav-item"> <a class="nav-link" href="../../views/admin/Estadisticas.html" style="color: white;">Estadisticas</a> </li>
                    <li class="nav-item"> <a class="nav-link" href="../../views/admin/productos.html" style="color: white;">Productos</a> </li>
                    <li class="nav-item"> <a class="nav-link" href="../../views/admin/categorias.html" style="color: white;">Categoria</a>
                    <li class="nav-item"> <a class="nav-link" href="../../views/admin/marca.html" style="color: white;">Marcas</a> </li>
                    <li class="nav-item"> <a class="nav-link" href="../../views/admin/promociones.html" style="color: white;">Promociones</a> </li>
                    <li class="nav-item"> <a class="nav-link" href="../../views/admin/usuarios.html" style="color: white;">Clientes</a> </li>
                    <li class="nav-item"> <a class="nav-link" href="../../views/admin/usuarios_admin.html" style="color: white;">Administradores</a> </li>
                    <li class="nav-item"> <a class="nav-link" href="../../views/admin/comentarios.html" style="color: white;">Comentarios</a> </li>
                    <li class="nav-item"> <a class="nav-link" href="../../views/admin/pedidoss.html" style="color: white;">Pedidos</a> </li>
                    <li class="nav-item"> <a class="nav-link" href="../../views/admin/perfil.html" style="color: white;">Perfil</a> </li>

                </ul>
            </div>
        </div>
    </nav>
    
    `;



const loadTemplate = async () => {
    // Petición para obtener en nombre del usuario que ha iniciado sesión.
    const DATA = await fetchData(USER_API, 'getUser');
    // Se verifica si el usuario está autenticado, de lo contrario se envía a iniciar sesión.
    if (DATA.session) {
        // Se comprueba si existe un alias definido para el usuario, de lo contrario se muestra un mensaje con la excepción.
        if (DATA.status) {
            // Se agrega el encabezado de la página web antes del contenido principal.


        } else {
            sweetAlert(3, DATA.error, false, 'index.html');
        }
    } else {
        // Se comprueba si la página web es la principal, de lo contrario se direcciona a iniciar sesión.
        if (location.pathname.endsWith('index.html')) {
            // Se agrega el encabezado de la página web antes del contenido principal.
        } else {
            location.href = 'index.html';
        }
    }
}