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

    <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="index.html">GADGETSIT</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="index.html">Home</a>
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
                        <a class="nav-link" href="login.html" data-bs-toggle="modal" data-bs-target="#login">Iniciar
                            Sesión</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="carrito.html"><img src="../../resources/img/carrito.svg" alt=""></a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</div>

<!-- Modal -->


<div class="container mt-5">
    <div class="modal fade" id="login" tabindex="-1" aria-labelledby="loginLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-xl-custom">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6 login-container">
                            <h2>BIENVENIDO DE NUEVO!</h2>
                            <form id="login-form" action="/login" method="post">
                                <div class="input-group mb-3">
                                    <input type="email" id="email" name="email" class="form-control"
                                        placeholder="Correo" required>
                                </div>
                                <div class="input-group mb-3">
                                    <input type="password" id="password" name="password" class="form-control"
                                        placeholder="Contraseña" required>
                                </div>
                                <div class="mb-3">
                                    <a href="#" class="forgot-password-link" data-bs-toggle="modal"
                                        data-bs-target="#contra">¿Contraseña olvidada?</a>
                                </div>
                                <button type="submit" class="btn login-btn">Iniciar sesión</button>
                                <div class="signup-link">
                                    ¿No tienes cuenta? <a href="#" data-bs-toggle="modal"
                                        data-bs-target="#Crear_cuenta">crear cuenta</a>
                                </div>
                            </form>
                        </div>
                        <div class="col-md-6 d-flex align-items-center justify-content-center">
                            <img src="../../../resources/img/login_fondo.svg" alt="Amazon Speakers" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<!-- crer cuenta -->

<div class="container mt-5">
    <div class="modal fade" id="Crear_cuenta" tabindex="-1" aria-labelledby="Crear_cuentaLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-xl-custom">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6 login-container">
                            <h2>Crear cuenta</h2>
                            <form id="login-form" action="/login" method="post">
                                <div class="input-group mb-3">
                                    <input type="Nombre" id="Nombre" name="Nombre" class="form-control"
                                        placeholder="Nombre" required>
                                </div>
                                <div class="input-group mb-3">
                                    <input type="Apellido" id="Apellido" name="Apellido" class="form-control"
                                        placeholder="Apellido" required>
                                </div>
                                <div class="input-group mb-3">
                                    <input type="Correo" id="Correo" name="Correo" class="form-control"
                                        placeholder="Correo" required>
                                </div>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="input-group mb-3">
                                            <input type="password" id="password" name="password" class="form-control"
                                                placeholder="Contraseña" required>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="input-group mb-3">
                                            <input type="Telefono" id="Telefono" name="Telefono" class="form-control"
                                                placeholder="Telefono" required>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" class="btn login-btn">Crear</button>
                            </form>
                        </div>
                        <div class="col-md-6 d-flex align-items-center justify-content-center">
                            <img src="../../../resources/img/login_fondo.svg" alt="Amazon Speakers" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>





<!-- olvidar mi contra -->

<div class="container mt-5">
    <div class="modal fade" id="contra" tabindex="-1" aria-labelledby="contraLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-xl-custom">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6 login-container">
                            <h2>Recupera contraseña</h2>
                            <form id="login-form" action="/login" method="post" style="margin-top: 100px;">
                                <div class="input-group">
                                  <input type="Correo" id="Correo" name="Correo" class="form-control" placeholder="Correo" required>
                                </div>
                                <button type="submit" class="btn login-btn"  data-bs-toggle="modal"
                                data-bs-target="#codigo">Siguiente</button>
                              </form>
                        </div>
                        <div class="col-md-6 d-flex align-items-center justify-content-center">
                            <img src="../../../resources/img/login_fondo.svg" alt="Amazon Speakers" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



<div class="container mt-5">
    <div class="modal fade" id="codigo" tabindex="-1" aria-labelledby="codigoLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-xl-custom">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6 login-container">
                            <h2>Recupera contraseña</h2>
                            <form id="login-form" action="/login" method="post" style="margin-top: 100px;">
                                <div class="input-group">
                                  <input type="Correo" id="Correo" name="Correo" class="form-control" placeholder="Codigo" required>
                                </div>
                                <button type="submit" class="btn login-btn"  data-bs-toggle="modal"
                                data-bs-target="#contra_nueva">Siguiente</button>
                              </form>
                        </div>
                        <div class="col-md-6 d-flex align-items-center justify-content-center">
                            <img src="../../../resources/img/login_fondo.svg" alt="Amazon Speakers" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



<div class="container mt-5">
    <div class="modal fade" id="contra_nueva" tabindex="-1" aria-labelledby="contra_nuevaLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-xl-custom">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6 login-container">
                            <h2>Recupera contraseña</h2>
                            <form id="login-form" action="/login" method="post" style="margin-top: 100px;">
                                <div class="input-group">
                                  <input type="codigo" id="codigo" name="codigo" class="form-control" placeholder="Codigo de verificacion" required>
                                </div>
                                <button type="submit" class="btn login-btn" data-bs-toggle="modal"
                                data-bs-target="#login">Siguiente</button>
                              </form>
                        </div>
                        <div class="col-md-6 d-flex align-items-center justify-content-center">
                            <img src="../../../resources/img/login_fondo.svg" alt="Amazon Speakers" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
`;