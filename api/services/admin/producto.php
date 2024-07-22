<?php
require_once('../../models/data/producto_data.php');

if (isset($_GET['action'])) {
    session_start();
    $producto = new ProductoData;
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    if (isset($_SESSION['idAdministrador'])) {
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $producto->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$producto->setNombre($_POST['nombreProducto']) or
                    !$producto->setDescripcion($_POST['descripcionProducto']) or
                    !$producto->setPrecio($_POST['precioProducto']) or
                    !$producto->setExistencias($_POST['existenciasProducto']) or
                    !$producto->setCategoria($_POST['categoriaProducto']) or
                    !$producto->setImagen($_FILES['imagenProducto']) or
                    !$producto->setMarca($_POST['marcaProducto'])

                ) {
                    $result['error'] = $producto->getDataError();
                } elseif ($producto->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Producto creado correctamente';
                    $result['fileStatus'] = Validator::saveFile($_FILES['imagenProducto'],  $producto::RUTA_IMAGEN);
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el producto';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $producto->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen productos registrados';
                }
                break;
            case 'readOne':
                if (!$producto->setId($_POST['idProducto'])) {
                    $result['error'] = $producto->getDataError();
                } elseif ($result['dataset'] = $producto->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Producto inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$producto->setId($_POST['idProducto']) or
                    !$producto->setFilename() or
                    !$producto->setNombre($_POST['nombreProducto']) or
                    !$producto->setDescripcion($_POST['descripcionProducto']) or
                    !$producto->setPrecio($_POST['precioProducto']) or
                    !$producto->setCategoria($_POST['categoriaProducto']) or
                    !$producto->setEstado(isset($_POST['estadoProducto']) ? 1 : 0) or
                    !$producto->setImagen($_FILES['imagenProducto'], $producto->getFilename())
                ) {
                    $result['error'] = $producto->getDataError();
                } elseif ($producto->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Producto modificado correctamente';
                    // Se asigna el estado del archivo después de actualizar.
                    $result['fileStatus'] = Validator::changeFile($_FILES['imagenProducto'], $producto::RUTA_IMAGEN, $producto->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar el producto';
                }
                break;
            case 'deleteRow':
                if (
                    !$producto->setId($_POST['idProducto']) or
                    !$producto->setFilename()
                ) {
                    $result['error'] = $producto->getDataError();
                } elseif ($producto->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Producto eliminado correctamente';
                    // Se asigna el estado del archivo después de eliminar.
                    $result['fileStatus'] = Validator::deleteFile($producto::RUTA_IMAGEN, $producto->getFilename());
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar el producto';
                }
                break;
            case 'cantidadProductosCategoria':
                if ($result['dataset'] = $producto->cantidadProductosCategoria()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No hay datos disponibles';
                }
                break;
            case 'porcentajeProductosCategoria':
                if ($result['dataset'] = $producto->porcentajeProductosCategoria()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'No hay datos disponibles';
                }
                break;
            case 'top5ProductosMasExistencias':
                if ($result['dataset'] = $producto->top5ProductosMasExistencias()) {
                    $result['status'] = 1;
                    $result['message'] = 'Top 5 productos con más existencias obtenidos correctamente';
                } else {
                    $result['error'] = 'No se pudo obtener el top 5 de productos con más existencias';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
        }
        $result['exception'] = Database::getException();
        header('Content-type: application/json; charset=utf-8');
        print(json_encode($result));
    } else {
        print(json_encode('Acceso denegado'));
    }
} else {
    print(json_encode('Recurso no disponible'));
}
