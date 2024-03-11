const HEADER = document.querySelector('header');

HEADER.innerHTML = `
<div class="header fixed-top ">
    <div class="uno ">
        <div class="dos-track">
            <div class="tres">
                <p>50% en cel</p>
            </div>
            <div class="tres">
                <p>50% en cel</p>
            </div>
            <div class="tres">
                <p>Texto 3</p>
            </div>
            <div class="tres">
                <p>Texto 4</p>
            </div>
            <div class="tres">
                <p>Texto 5</p>
            </div>
            <div class="tres">
                <p>Texto 6</p>
            </div>
            <div class="tres">
                <p>Texto 1</p>
            </div>
            <div class="tres">
                <p>Texto 2</p>
            </div>
            <div class="tres">
                <p>Texto 3</p>
            </div>
            <div class="tres">
                <p>Texto 4</p>
            </div>
            <div class="tres">
                <p>Texto 5</p>
            </div>
            <div class="tres">
                <p>Texto 6</p>
            </div>
        </div>
    </div>

    <div class="contenedor contenido-header">
        <div class="barra">
            <div class="logo">
                <a href="/">GADGETSIT</a>
            </div>
            <!--navegacion inicio-->
            <nav class="navegacion">
                <a href="categorias.html">Home</a>
                <a href="marcas.html">Marcas</a>
                <a href="#">Pedidos</a>
                <a href="#">Acerca de Nosotros</a>

                <a href="#" data-bs-toggle="modal" data-bs-target="#loginModal">Iniciar Sesión</a>

                <a href="carrito.html"><img src="../../resources/img/carrito.svg" alt=""></a>
            </nav> <!--Fin de la navegacion-->
        </div>
    </div>

   

    <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="loginModalLabel">WELCOME BACK!</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <input type="email" class="form-control" placeholder="Correo" required>
                        </div>
                        <div class="mb-3">
                            <input type="password" class="form-control" placeholder="Contraseña" required>
                        </div>
                        <div class="mb-3 text-end">
                            <a href="#" class="link-primary" style="text-decoration: none;">¿Contraseña olvidada?</a>
                        </div>
                        <div class="mb-3">
                            <button type="submit" class="btn btn-primary w-100">Iniciar sesión</button>
                        </div>
                        <div class="mb-3 text-center">
                            <a href="#" class="link-primary" style="text-decoration: none;">¿No tienes cuenta? Crear
                                cuenta</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `;