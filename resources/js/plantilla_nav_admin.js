const HEADER = document.querySelector('header');


HEADER.innerHTML = `

<nav class="navbar navbar-expand-lg bg-body-tertiary justify-content-end fixed-top">
    <div class="container"> <a class="navbar-brand" href="#">GADGETSIT</a> <button class="navbar-toggler" type="button"
            data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
            aria-expanded="false" aria-label="Toggle navigation"> <span class="navbar-toggler-icon"></span> </button>
        <div class="collapse navbar-collapse justify-content-end " id="navbarNavDropdown">
            <ul class="navbar-nav pr-3">
                <li class="nav-item"> <a class="nav-link active" aria-current="page"
                        href="../../views/admin/categorias.html">Categoria</a>
                </li>
                <li class="nav-item"> <a class="nav-link" href="../../views/admin/productos.html">Productos</a> </li>
                <li class="nav-item"> <a class="nav-link" href="../../views/admin/marca.html">Marcas</a> </li>
                <li class="nav-item"> <a class="nav-link" href="../../views/admin/promociones.html">Promociones</a>
                </li>
                <li class="nav-item"> <a class="nav-link" href="#">Usuarios</a> </li>
                <li class="nav-item"> <a class="nav-link" href="#">Comentarios</a> </li>
            </ul>
        </div>
    </div>
</nav>`;