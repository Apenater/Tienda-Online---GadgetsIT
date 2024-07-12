<?php
require_once('../../helpers/database.php');

class MarcaHandler
{
    protected $id = null;
    protected $nombre = null;
    protected $descripcion = null;
    protected $imagen = null;

    const RUTA_IMAGEN = '../../images/marcas/';

    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_marca, nombre_marca, imagen_marca, descripcion_marca
                FROM marca
                WHERE nombre_marca LIKE ? OR descripcion_marca LIKE ?
                ORDER BY nombre_marca';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO marca(nombre_marca, imagen_marca, descripcion_marca)
                VALUES(?, ?, ?)';
        $params = array($this->nombre, $this->imagen, $this->descripcion);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_marca, nombre_marca, imagen_marca, descripcion_marca
                FROM marca
                ORDER BY nombre_marca';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_marca, nombre_marca, imagen_marca, descripcion_marca
                FROM marca
                WHERE id_marca = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT imagen_marca
                FROM marca
                WHERE id_marca = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE marca
                SET imagen_marca = ?, nombre_marca = ?, descripcion_marca = ?
                WHERE id_marca = ?';
        $params = array($this->imagen, $this->nombre, $this->descripcion, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM marca
                WHERE id_marca = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }
}
?>
