const HEADER = document.querySelector('header');

HEADER.innerHTML = `
<div class="header fixed-top ">
<div class="contenedor contenido-header">
<div class="barra">
    <div class="logo">
        <a href="">GADGETSIT</a>
    </div>
    <!--navegacion inicio-->
    <nav class="navegacion">
        <a href="categorias.html">Home</a>
        <a href="marcas.html">Marcas</a>
        <a href="#">Pedidos</a>
        <a href="#">Acerca de Nosotros</a>
        <a href="#">Iniciar Sesión</a>
       
        <a href="carrito.html"><img src="../../resources/img/carrito.svg" alt=""></a>
    </nav> <!--Fin de la navegacion-->
</div>
</div>`;