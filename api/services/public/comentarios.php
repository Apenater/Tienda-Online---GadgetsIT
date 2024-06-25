<?php
require_once('../../models/data/comentarios_data.php');

if (isset($_GET['action'])) {
    session_start();
    $comentario = new ComentariosData();
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null);

        switch ($_GET['action']) {
            case 'readAll':
                // Recibir el ID del producto desde GET
                if (!isset($_GET['idProducto']) || !$comentario->setProductoId($_GET['idProducto'])) {
                    $result['error'] = 'ID de producto inválido';
                } elseif ($result['dataset'] = $comentario->readAllByProductId($_GET['idProducto'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' comentarios para este producto';
                } else {
                    $result['error'] = 'No existen comentarios registrados para este producto';
                }
                break;
            case 'hide':
                if (!$comentario->setId($_POST['idComentario'])) {
                    $result['error'] = $comentario->getDataError();
                } elseif ($comentario->hideComment()) {
                    $result['status'] = 1;
                    $result['message'] = 'Comentario ocultado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al ocultar el comentario';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$comentario->setComentario($_POST['comentario']) ||
                    !$comentario->setFechaPublicacion($_POST['fechaPublicacion']) ||
                    !$comentario->setUsuarioId($_POST['id_usuario']) ||
                    !$comentario->setProductoId($_POST['id_Producto'])
                ) {
                    $result['error'] = $comentario->getDataError();
                } elseif ($comentario->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Comentario creado correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear el comentario';
                }
                break;
            default:
                $result['error'] = 'Acción no disponible dentro de la sesión';
                break;
        }
        $result['exception'] = Database::getException();
    } else {
        $result['error'] = 'Acceso denegado';
    }

    header('Content-type: application/json; charset=utf-8');
    echo json_encode($result);

?>
