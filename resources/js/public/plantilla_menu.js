const HEADER = document.querySelector('header');
HEADER.innerHTML = `

<nav class="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
<div class="container-fluid" >
    <a class="navbar-brand" href="index.html">GADGETSIT</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
            <li class="nav-item">
                <a class="nav-link" aria-current="page" href="productos.html">Todo</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" aria-current="page" href="index.html">Categorias</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="marcas.html">Marcas</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="historial_pedidos.html">Pedidos</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="nosotros.html">Acerca de Nosotros</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="login.html">Iniciar
                    Sesión</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="carrito.html"><img src="../../resources/img/carrito.svg" alt=""></a>
            </li>
        </ul>
    </div>
</div>
</nav>
`;