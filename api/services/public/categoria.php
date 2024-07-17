<?php
require_once('../../models/data/categoria_data.php');

if (isset($_GET['action'])) {
    $categoria = new CategoriaData;
    $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null, 'exception' => null);
    switch ($_GET['action']) {
        case 'readAll':
            if ($result['dataset'] = $categoria->readAll()) {
                $result['status'] = 1;
            } else {
                $result['error'] = 'No existen categorías para mostrar';
            }
            break;
        default:
            $result['error'] = 'Acción no disponible';
    }
    $result['exception'] = Database::getException();
    header('Content-type: application/json; charset=utf-8');
    print(json_encode($result));
} else {
    print(json_encode('Recurso no disponible'));
}
