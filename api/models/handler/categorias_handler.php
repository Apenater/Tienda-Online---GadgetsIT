<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla CATEGORIA.
 */
class CategoriaHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id_Categoria = null;
    protected $nombreC = null;
    protected $Descripcion = null;
    protected $foto = null;

    // Constante para establecer la ruta de las imágenes.
    const RUTA_IMAGEN = '../../images/categorias/';

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_Categoria, nombreC, foto, Descripcion
                FROM tb_categorias
                WHERE nombreC LIKE ? OR Descripcion LIKE ?
                ORDER BY nombreC';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_categorias(nombreC, foto, Descripcion)
                VALUES(?, ?, ?)';
        $params = array($this->nombreC, $this->foto, $this->Descripcion);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_Categoria, nombreC, foto, Descripcion
                FROM tb_categorias
                ORDER BY nombreC';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_Categoria, nombreC, foto, Descripcion
                FROM tb_categorias
                WHERE id_Categoria = ?';
        $params = array($this->id_Categoria);
        return Database::getRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT foto
                FROM tb_categorias
                WHERE id_Categoria = ?';
        $params = array($this->id_Categoria);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_categorias
                SET foto = ?, nombreC = ?, Descripcion = ?
                WHERE id_Categoria = ?';
        $params = array($this->foto, $this->nombreC, $this->Descripcion, $this->id_Categoria);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
            // Primero, elimina todos los productos asociados con la categoría
            $sqlProducts = 'DELETE FROM tb_productos WHERE id_Categoria = ?';
            Database::executeRow($sqlProducts, array($this->id_Categoria));
    
            // Luego, elimina la categoría
            $sqlCategory = 'DELETE FROM tb_categorias WHERE id_Categoria = ?';
            return Database::executeRow($sqlCategory, array($this->id_Categoria));

    }
}
