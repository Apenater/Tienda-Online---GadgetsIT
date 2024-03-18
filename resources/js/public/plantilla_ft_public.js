// Selecciona el elemento 'footer' en el documento HTML
const FOOTER = document.querySelector('footer');

// Modifica el contenido HTML del footer
FOOTER.innerHTML = `
<div class="pie-pagina">
  <div class="grupo-1">
    <div class="box">
      <figure>
        <!-- Agrega un enlace con el logo de SLee Dw -->
        <a href="#">
          <img src="../../resources/img/blaco_logo.svg" alt="Logo de SLee Dw">
        </a>
      </figure>
    </div>
    <div class="box">
      <div class="red-social">
        <!-- Agrega enlaces a las redes sociales con iconos -->
        <a href="" class="fa fa-linkedin" target="_blank"></a>
        <a href="" class="fa fa-instagram" target="_blank"></a>
        <a href="" class="fa fa-twitter" target="_blank"></a>
        <a href="" class="fa fa-whatsapp" target="_blank"></a>
      </div>
    </div>
  </div>
</div>
`;
