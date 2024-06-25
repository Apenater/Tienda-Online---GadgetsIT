<?php
require_once('../../models/data/comentarios_data.php');

if (isset($_GET['action'])) {
    session_start();
    $comentario = new ComentariosData();
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null);

    if (isset($_SESSION['id_admin'])) {
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $comentario->searchRows($_POST['search'])) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $comentario->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' comentarios';
                } else {
                    $result['error'] = 'No existen comentarios registrados';
                }
                break;
            case 'readOne':
                if (!$comentario->setId($_POST['idComentario'])) {
                    $result['error'] = $comentario->getDataError();
                } elseif ($result['dataset'] = $comentario->readOne($id)) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Comentario inexistente';
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
} else {
    echo json_encode(array('error' => 'Recurso no disponible'));
}
?>
