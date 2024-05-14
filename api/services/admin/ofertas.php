<?php
// Se incluye la clase del modelo.
require_once('../../models/data/ofertas_data.php');

// Se comprueba si existe una acción a realizar, de lo contrario se finaliza el script con un mensaje de error.
if (isset($_GET['action'])) {
    // Se crea una sesión o se reanuda la actual para poder utilizar variables de sesión en el script.
    session_start();
    // Se instancia la clase correspondiente.
    $oferta = new OfertaData;
    // Se declara e inicializa un arreglo para guardar el resultado que retorna la API.
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null, 'fileStatus' => null);
    // Se verifica si existe una sesión iniciada como administrador, de lo contrario se finaliza el script con un mensaje de error.
    if (isset($_SESSION['id_admin']) or true) {
        // Se compara la acción a realizar cuando un administrador ha iniciado sesión.
        switch ($_GET['action']) {
            case 'searchRows':
                if (!Validator::validateSearch($_POST['search'])) {
                    $result['error'] = Validator::getSearchError();
                } elseif ($result['dataset'] = $oferta->searchRows()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' coincidencias';
                } else {
                    $result['error'] = 'No hay coincidencias';
                }
                break;
            case 'createRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$oferta->setTitulo($_POST['titulo']) or
                    !$oferta->setDescripcion($_POST['descripcion']) or
                    !$oferta->setDescuento($_POST['descuento'])
                ) {
                    $result['error'] = $oferta->getDataError();
                } elseif ($oferta->createRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Oferta creada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al crear la oferta';
                }
                break;
            case 'readAll':
                if ($result['dataset'] = $oferta->readAll()) {
                    $result['status'] = 1;
                    $result['message'] = 'Existen ' . count($result['dataset']) . ' registros';
                } else {
                    $result['error'] = 'No existen ofertas registradas';
                }
                break;
            case 'readOne':
                if (!$oferta->setId($_POST['id_oferta'])) {
                    $result['error'] = $oferta->getDataError();
                } elseif ($result['dataset'] = $oferta->readOne()) {
                    $result['status'] = 1;
                } else {
                    $result['error'] = 'Oferta inexistente';
                }
                break;
            case 'updateRow':
                $_POST = Validator::validateForm($_POST);
                if (
                    !$oferta->setId($_POST['id_oferta']) or
                    !$oferta->setTitulo($_POST['titulo']) or
                    !$oferta->setDescripcion($_POST['descripcion']) or
                    !$oferta->setDescuento($_POST['descuento'])
                ) {
                    $result['error'] = $oferta->getDataError();
                } elseif ($oferta->updateRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Oferta modificada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al modificar la oferta';
                }
                break;
            case 'deleteRow':
                if (
                    !$oferta->setId($_POST['id_oferta'])
                ) {
                    $result['error'] = $oferta->getDataError();
                } elseif ($oferta->deleteRow()) {
                    $result['status'] = 1;
                    $result['message'] = 'Oferta eliminada correctamente';
                } else {
                    $result['error'] = 'Ocurrió un problema al eliminar la oferta';
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
        print(json_encode('Acceso denegado'));
    }
} else {
    print(json_encode('Recurso no disponible'));
}
?>
