const HEADER = document.querySelector('header');

HEADER.innerHTML = `
<div class="header fixed-top">
      <div class="contenedor contenido-header">
        <div class="barra">
          <div class="logo">
            <a href="/">GADGETSIT</a>
          </div>
          <!--navegacion inicio-->
          <nav class="navegacion">
            <a href="#">Home</a>
            <div class="dropdown"> <!--Boton dropdown-->
              <a class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown"
                aria-expanded="false" href="categorias.html">
                Categorias
              </a>
              <ul class="dropdown-menu bg-light text-dark border-light" aria-labelledby="dropdownMenuButton">
                <li><a class="dropdown-item" href="productos.html">Productos</a></li>
                <li><a class="dropdown-item" href="#">Marcas</a></li>
              </ul>
            </div>
            <a href="#">Acerca de Nosotros</a>
            <a href="#">Iniciar Sesión</a>
            <a href="#">Pedidos</a>
            <a href="carrito.html"><img src="../../resources/img/carrito.svg" alt=""></a>
          </nav> <!--Fin de la navegacion-->
        </div>
      </div>
    </div>`;