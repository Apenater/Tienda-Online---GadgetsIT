// Selecciona el elemento 'header' en el documento HTML
const HEADER = document.querySelector('header');

// Modifica el contenido HTML del header
HEADER.innerHTML = `
<nav class="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
  <div class="container-fluid">
    <!-- Logo de la página enlazado a la página de inicio -->
    <a class="navbar-brand" href="index.html">GADGETSIT</a>
    <!-- Botón de alternar la navegación para dispositivos móviles -->
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <!-- Contenedor de la barra de navegación -->
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
            <!-- Enlace a la página de productos -->
            <li class="nav-item">
                <a class="nav-link" aria-current="page" href="productos.html">Todo</a>
            </li>
            <!-- Enlace a la página de categorías -->
            <li class="nav-item">
                <a class="nav-link" aria-current="page" href="index.html">Categorias</a>
            </li>
            <!-- Enlace a la página de marcas -->
            <li class="nav-item">
                <a class="nav-link" href="marcas.html">Marcas</a>
            </li>
            <!-- Enlace a la página de historial de pedidos -->
            <li class="nav-item">
                <a class="nav-link" href="historial_pedidos.html">Pedidos</a>
            </li>
            <!-- Enlace a la página "Acerca de Nosotros" -->
            <li class="nav-item">
                <a class="nav-link" href="nosotros.html">Acerca de Nosotros</a>
            </li>
            <!-- Enlace a la página de inicio de sesión -->
            <li class="nav-item">
                <a class="nav-link" href="login.html">Iniciar Sesión</a>
            </li>
            <!-- Enlace al carrito de compras -->
            <li class="nav-item">
                <a class="nav-link" href="carrito.html"><img src="../../resources/img/carrito.svg" alt=""></a>
            </li>
        </ul>
    </div>
  </div>
</nav>
`;
