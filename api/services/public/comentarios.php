<?php
require_once('../../models/data/comentarios_data.php');

if (isset($_GET['action'])) {
    $comentario = new ComentariosData;
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null);

    switch ($_GET['action']) {
        case 'searchRows':
            if (!Validator::validateSearch($_POST['search'])) {
                $result['error'] = Validator::getSearchError();
            } elseif ($result['dataset'] = $comentario->searchRows()) {
                $result['status'] = 1;
                $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
            } else {
                $result['error'] = 'No hay coincidencias';
            }
            break;

        case 'createRow':
            $_POST = Validator::validateForm($_POST);
            if (
                !$comentario->setComentario($_POST['comentario']) ||
                !$comentario->setFechaPublicacion($_POST['fechaPublicacion']) ||
                !$comentario->setUsuario($_POST['id_usuario']) ||
                !$comentario->setProducto($_POST['id_Producto'])
            ) {
                $result['error'] = $comentario->getDataError();
            } elseif ($comentario->createRow()) {
                $result['status'] = 1;
                $result['message'] = 'Comentario creado correctamente';
            } else {
                $result['error'] = 'Ocurrió un problema al crear el comentario';
            }
            break;

        case 'readAll':
            if ($result['dataset'] = $comentario->readAll()) {
                $result['status'] = 1;
                $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
            } else {
                $result['error'] = 'No existen comentarios registrados';
            }
            break;

        case 'readOne':
            if (!$comentario->setId($_POST['id_Comentarios'])) {
                $result['error'] = $comentario->getDataError();
            } elseif ($result['dataset'] = $comentario->readOne()) {
                $result['status'] = 1;
            } else {
                $result['error'] = 'Comentario inexistente';
            }
            break;

        case 'updateRow':
            $_POST = Validator::validateForm($_POST);
            if (
                !$comentario->setId($_POST['id_Comentarios']) ||
                !$comentario->setComentario($_POST['comentario']) ||
                !$comentario->setFechaPublicacion($_POST['fechaPublicacion']) ||
                !$comentario->setUsuario($_POST['id_usuario']) ||
                !$comentario->setProducto($_POST['id_Producto'])
            ) { 
                $result['error'] = $comentario->getDataError();
            } elseif ($comentario->updateRow()) {
                $result['status'] = 1;
                $result['message'] = 'Comentario modificado correctamente';
            } else {
                $result['error'] = 'Ocurrió un problema al modificar el comentario';
            }
            break;

        case 'deleteRow':
            if (!$comentario->setId($_POST['id_Comentarios'])) {
                $result['error'] = $comentario->getDataError();
            } elseif ($comentario->deleteRow()) {
                $result['status'] = 1;
                $result['message'] = 'Comentario eliminado correctamente';
            } else {
                $result['error'] = 'Ocurrió un problema al eliminar el comentario';
            }
            break;

        case 'readComentariosProducto':
            if (!$comentario->setProducto($_POST['id_Producto'])) {
                $result['error'] = $comentario->getDataError();
            } elseif ($result['dataset'] = $comentario->readComentariosProducto()) {
                $result['status'] = 1;
                $result['message'] = 'Existen ' . count($result['dataset']) . ' comentarios';
            } else {
                $result['error'] = 'No existen comentarios para este producto';
            }
            break;

        default:
            $result['error'] = 'Acción no disponible dentro de la sesión';
    }

    // Se obtiene la excepción del servidor de base de datos por si ocurrió un problema.
    $result['exception'] = Database::getException();
    // Se indica el tipo de contenido a mostrar y su respectivo conjunto de caracteres.
    header('Content-type: application/json; charset=utf-8');
    // Se imprime el resultado en formato JSON y se retorna al controlador.
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}
?>
