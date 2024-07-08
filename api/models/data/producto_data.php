<?php
require_once('../../helpers/database.php');
require_once('../../helpers/validator.php');

class ProductoData {
    protected $id = null;
    protected $nombre = null;
    protected $descripcion = null;
    protected $precio = null;
    protected $existencias = null;
    protected $imagen = null;
    protected $categoria = null;
    protected $marca = null;
    protected $estado = null;
    private $data_error = null;

    public function setId($value) {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del producto es incorrecto';
            return false;
        }
    }

    public function setCategoria($value) {
        if (Validator::validateNaturalNumber($value)) {
            $this->categoria = $value;
            return true;
        } else {
            $this->data_error = 'El identificador de la categoría es incorrecto';
            return false;
        }
    }

    public function setMarca($value) {
        if (Validator::validateNaturalNumber($value)) {
            $this->marca = $value;
            return true;
        } else {
            $this->data_error = 'El identificador de la marca es incorrecto';
            return false;
        }
    }

    public function readProductosCategoria($idCategoria = null, $idMarca = null) {
        $sql = 'SELECT id_producto, imagen_producto, nombre_producto, descripcion_producto, precio_producto, existencias_producto
                FROM producto
                WHERE estado_producto = true';
        $params = array();

        if ($idCategoria) {
            $sql .= ' AND id_categoria = ?';
            $params[] = $idCategoria;
        }

        if ($idMarca) {
            $sql .= ' AND id_marca = ?';
            $params[] = $idMarca;
        }

        $sql .= ' ORDER BY nombre_producto';
        return Database::getRows($sql, $params);
    }

    public function getDataError() {
        return $this->data_error;
    }
}
