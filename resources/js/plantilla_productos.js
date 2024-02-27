const product = document.querySelector('card');

product.innerHTML = `
<div class="col">
<div class="card h-100 anuncio">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Apple Watch</h5>
    <div class="descripcion-precio">
      <p class="card-text">Series 5E</p>
      <h5>$529.00</h5>
    </div>
    <ul class="iconos-caracteristicas">
      <li>
        <a href="#"><img src="../../resources/img/carrito.svg" alt="añadir al carrito"></a>
      </li>
    </ul>
  </div>
</div>
</div>`;