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

                <a href="index.html">GADGETSIT</a>

            </div>

            <!--navegacion inicio-->

            <nav class="navegacion">

                <a href="index.html">Home</a>

                <a href="marcas.html">Marcas</a>

                <a href="#">Pedidos</a>

                <a href="nosotros.html">Acerca de Nosotros</a>

                <a href="#" data-bs-toggle="modal" data-bs-target="#exampleModal">Iniciar Sesión</a>



                <a href="carrito.html"><img src="../../resources/img/carrito.svg" alt=""></a>

            </nav> <!--Fin de la navegacion-->

        </div>

    </div>

</div>



<!-- Modal -->

<div class="container mt-5">
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-xl-custom">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6 login-container">
                            <h2>BIENVENIDO DE NUEVO!</h2>
                            <form id="login-form" action="/login" method="post">
                                <div class="input-group mb-3">
                                    <input type="email" id="email" name="email" class="form-control" placeholder="Correo" required>
                                </div>
                                <div class="input-group mb-3">
                                    <input type="password" id="password" name="password" class="form-control" placeholder="Contraseña" required>
                                </div>
                                <div class="mb-3">
                                    <a href="#" class="forgot-password-link">¿Contraseña olvidada?</a>
                                </div>
                                <button type="submit" class="btn login-btn">Iniciar sesión</button>
                                <div class="signup-link">
                                    ¿No tienes cuenta? <a href="#">crear cuenta</a>
                                </div>
                            </form>
                        </div>
                        <div class="col-md-6 d-flex align-items-center justify-content-center">
                            <img src=""  />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



`;