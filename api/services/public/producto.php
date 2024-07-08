<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
require_once('../../helpers/validator.php');
require_once('../../models/producto_handler.php'); // Asumiendo que esta es la ruta correcta.

// Asegúrate de iniciar la sesión si es necesario y manejar el control de acceso aquí.

header('Content-type: application/json; charset=utf-8');

class ProductoAPI {
    private $producto;

    public function __construct() {
        $this->producto = new ProductoHandler();
    }

    public function execute() {
        $result = array('status' => 0, 'message' => null, 'dataset' => null, 'error' => null);
        if (isset($_GET['action'])) {
            switch ($_GET['action']) {
                case 'readProductos':
                    $idCategoria = $_GET['idCategoria'] ?? null;
                    $idMarca = $_GET['idMarca'] ?? null;
                    $result = $this->readProductos($idCategoria, $idMarca);
                    break;
                default:
                    $result['error'] = 'Acción no disponible';
                    break;
            }
        } else {
            $result['error'] = 'Recurso no disponible';
        }
        echo json_encode($result);
    }

    private function readProductos($idCategoria, $idMarca) {
        if ($idCategoria) {
            $this->producto->setCategoria($idCategoria);
        }
        if ($idMarca) {
            $this->producto->setMarca($idMarca);
        }
        $productos = $this->producto->readProductosCategoria();
        if ($productos) {
            return ['status' => 1, 'dataset' => $productos];
        } else {
            return ['status' => 0, 'error' => 'No se encontraron productos'];
        }
    }
}

$api = new ProductoAPI();
$api->execute();
