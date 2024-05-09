<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla MARCA.
 */
class MarcaHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id_marca = null;
    protected $nombre_marca = null;
    protected $imagen_marca = null;

    // Constante para establecer la ruta de las imágenes.
    const RUTA_IMAGEN = '../../images/marcas/';

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_marca, nombre_marca, imagen_marca
                FROM tb_marcas
                WHERE nombre_marca LIKE ? 
                ORDER BY nombre_marca';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_marcas(nombre_marca, imagen_marca)
                VALUES(?, ?)';
        $params = array($this->nombre_marca, $this->imagen_marca);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_marca, nombre_marca, imagen_marca
                FROM tb_marcas
                ORDER BY nombre_marca';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_marca, nombre_marca, imagen_marca
                FROM tb_marcas
                WHERE id_marca = ?';
        $params = array($this->id_marca);
        return Database::getRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT imagen_marca
                FROM tb_marcas
                WHERE id_marca = ?';
        $params = array($this->id_marca);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_marcas
                SET imagen_marca = ?, nombre_marca = ?
                WHERE id_marca = ?';
        $params = array($this->imagen_marca, $this->nombre_marca, $this->id_marca);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_marcas
                WHERE id_marca = ?';
        $params = array($this->id_marca);
        return Database::executeRow($sql, $params);
    }
}
