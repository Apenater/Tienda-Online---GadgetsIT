// Selecciona el elemento footer en el documento HTML
const FOOTER = document.querySelector('footer');

// Asigna contenido HTML al footer
FOOTER.innerHTML = `
<div class="pie-pagina bottom">
    <div class="grupo-1">
        <div class="box">
            <figure>
                <a href="#">
                    <!-- Inserta una imagen como enlace -->
                    <img src="../../resources/img/logo.svg" alt="Logo de SLee Dw">
                </a>
            </figure>
        </div>
    </div>
</div>
`;
