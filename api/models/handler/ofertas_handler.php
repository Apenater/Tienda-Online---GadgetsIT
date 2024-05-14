<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el comportamiento de los datos de la tabla OFERTAS.
*/
class OfertaHandler
{
    /*
    *   Declaración de atributos para el manejo de datos.
    */
    protected $id_oferta = null;
    protected $titulo = null;
    protected $descripcion = null;
    protected $descuento = null;
 
    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT p.nombre_producto, o.titulo, o.descripcion, o.descuento
                FROM tb_ofertas o
                INNER JOIN tb_productos p ON o.id_oferta = p.id_oferta
                WHERE p.nombre_producto LIKE ? OR p.descripcion_producto LIKE ?
                ORDER BY p.nombre_producto';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }
    
    public function createRow()
    {
        $sql = 'INSERT INTO tb_ofertas(titulo, descripcion, descuento)
                VALUES(?, ?, ?)';
        $params = array($this->titulo, $this->descripcion, $this->descuento);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_oferta, titulo, descripcion, descuento
                FROM tb_ofertas
                ORDER BY titulo';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_oferta, titulo, descripcion, descuento
                FROM tb_ofertas
                WHERE id_oferta = ?';
        $params = array($this->id_oferta);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_ofertas
                SET titulo = ?, descripcion = ?, descuento = ?
                WHERE id_oferta = ?';
        $params = array($this->titulo, $this->descripcion, $this->descuento, $this->id_oferta);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_ofertas
                WHERE id_oferta = ?';
        $params = array($this->id_oferta);
        return Database::executeRow($sql, $params);
    }
}

?>
