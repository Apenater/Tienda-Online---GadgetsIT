const HEADER = document.querySelector('header');

HEADER.innerHTML = `


 


<div class="uno ">
        <div class="dos-track">
            <div class="tres"><p>50% en cel</p></div>
            <div class="tres"><p>50% en cel</p></div>
            <div class="tres"><p>Texto 3</p></div>
            <div class="tres"><p>Texto 4</p></div>
            <div class="tres"><p>Texto 5</p></div>
            <div class="tres"><p>Texto 6</p></div>
            <div class="tres"><p>Texto 1</p></div>
            <div class="tres"><p>Texto 2</p></div>
            <div class="tres"><p>Texto 3</p></div>
            <div class="tres"><p>Texto 4</p></div>
            <div class="tres"><p>Texto 5</p></div>
            <div class="tres"><p>Texto 6</p></div>
        </div>
</div>
<nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">


    <div class="navbar-brand">

        <a class="navbar-item" href="../../views/public/categorias.html">
            <img src="../../resources/img/gadgetsit.svg" width="112" height="28">
        </a>
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>
 

    <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-end">
            <a class="navbar-item">Home</a>
            <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link">Categorias</a>
                <div class="navbar-dropdown">
                    <a class="navbar-item">Marcas</a>
                </div>
            </div>
            <a class="navbar-item">Pedidos</a>
            <a class="navbar-item">
                Carrito
                <img src="../../resources/img/carrito.svg" alt="Actualizar" class="gadgetit-btn-icon">
            </a>
            <div class="navbar-item">
                <div class="buttons">
                    <a class="button is-link"><strong>Sign up</strong></a>
                </div>
            </div>
        </div>
    </div>
</nav>`;


document.addEventListener('DOMContentLoaded', () => {

    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

        // Add a click event on each of them
        $navbarBurgers.forEach(el => {
            el.addEventListener('click', () => {

                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle('is-active');
                $target.classList.toggle('is-active');

            });
        });
    }

});