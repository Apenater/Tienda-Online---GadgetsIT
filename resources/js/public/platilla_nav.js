const HEADER = document.querySelector('header');

HEADER.innerHTML = `
<div class="header fixed-top ">
<div class="contenedor contenido-header">
<div class="barra">
    <div class="logo">
        <a href="index.html">GADGETSIT</a>
    </div>
    <!--navegacion inicio-->
    <nav class="navegacion">
        <a href="../../../views/public/index.htmll">Home</a>
        <a href="../../../views/public/marcas.html">Marcas</a>
        <a href="../../../views/public/historial_pedidos.html">Pedidos</a>
        <a href="#">Acerca de Nosotros</a>

        <a class="data-bs-toggle="modal" data-bs-target="#exampleModal">Iniciar Sesión</a>

    </nav> 
</div>
</div>


    <div class="container mt-5">
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Nuevo Producto</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6 d-flex align-items-center justify-content-center">
                                <img id="imagePreview" src="#" alt="Imagen del producto" class="img-thumbnail"
                                    style="display: none; height: 26rem;">
                                <i id="addImageIcon" class="fa fa-upload fa-5x"
                                    style="cursor: pointer; display: block; color: rgb(0, 0, 0);"></i>
                                <input type="file" id="inputGroupFile01" accept="image/*" style="display: none;">
                            </div>
                            <div class="col-md-6 align-items-center justify-content-center">
                                <form>
                                    <div class="mb-3">
                                        <input type="text" class="form-control" id="category-name" placeholder="Nombre">
                                    </div>
                                    <div class="mb-3">
                                        <input type="text" class="form-control" id="product-model" placeholder="Modelo">
                                    </div>
                                    <div class="mb-3">
                                        <input type="text" class="form-control" id="product-description"
                                            placeholder="Descripción">
                                    </div>
                                    <div class="mb-3">
                                        <input type="text" class="form-control" id="product-price" placeholder="Precio">
                                    </div>
                                    <div class="mb-3">
                                        <textarea class="form-control" id="category-description"
                                            placeholder="Especificaciones"></textarea>
                                    </div>
                                    <div class="row mb-3">
                                        <div class="col-md-6">
                                            <select class="form-select form-select-sm" aria-label="Small select example"
                                                aria-placeholder="Categoria">
                                                <option selected>Categoria</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </select>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="input-group mb-3">
                                                <input type="number" class="form-control"
                                                    placeholder="Cantidad de producto..." min="0">
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        <button type="button" class="btn btn-success">Agregar</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <button class="gadgetit-btn gadgetit-btn-agragar" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <img src="../../resources/img/agregar.svg" alt="Actualizar" class="gadgetit-btn-icon"> Agregar
    </button>
`;