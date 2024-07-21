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
    protected $id = null;
    protected $nombre = null;
    protected $descripcion = null;
    protected $imagen = null;

    // Constante para establecer la ruta de las imágenes.
    const RUTA_IMAGEN = '../../images/categorias/';

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_categoria, nombre_categoria, imagen_categoria, descripcion_categoria
                FROM categoria
                WHERE nombre_categoria LIKE ? OR descripcion_categoria LIKE ?
                ORDER BY nombre_categoria';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO categoria(nombre_categoria, imagen_categoria, descripcion_categoria)
                VALUES(?, ?, ?)';
        $params = array($this->nombre, $this->imagen, $this->descripcion);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_categoria, nombre_categoria, imagen_categoria, descripcion_categoria
                FROM categoria
                ORDER BY nombre_categoria';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_categoria, nombre_categoria, imagen_categoria, descripcion_categoria
                FROM categoria
                WHERE id_categoria = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT imagen_categoria
                FROM categoria
                WHERE id_categoria = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE categoria
                SET imagen_categoria = ?, nombre_categoria = ?, descripcion_categoria = ?
                WHERE id_categoria = ?';
        $params = array($this->imagen, $this->nombre, $this->descripcion, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM categoria
                WHERE id_categoria = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }


    public function getCategoriaAdvancedStats()
{
    $sql = 'SELECT 
            c.id_categoria, 
            c.nombre_categoria, 
            COUNT(p.id_producto) AS total_productos,
            MIN(p.precio_producto) AS precio_minimo,
            MAX(p.precio_producto) AS precio_maximo,
            (MAX(p.precio_producto) - MIN(p.precio_producto)) AS rango_precios
        FROM 
            categoria c
        LEFT JOIN 
            producto p ON c.id_categoria = p.id_categoria
        GROUP BY 
            c.id_categoria, c.nombre_categoria';

    try {
        $result = Database::getRows($sql);
        if ($result === false) {
            // Si getRows devuelve false, lanza una excepción
            throw new Exception("Error executing query");
        }
        return $result;
    } catch (Exception $e) {
        // Log the error and return false to indicate failure
        error_log('Error in getCategoriaAdvancedStats: ' . $e->getMessage());
        return false;
    }
}

    /*
     *  Método para contar las categorías y obtener información adicional.
     */
    public function contarCategoriasConInfo()
    {
        $sql = 'SELECT 
                SUM(CASE WHEN descripcion_categoria IS NOT NULL AND descripcion_categoria != "" THEN 1 ELSE 0 END) as con_info,
                SUM(CASE WHEN descripcion_categoria IS NULL OR descripcion_categoria = "" THEN 1 ELSE 0 END) as sin_info,
                COUNT(id_categoria) as total_categorias
            FROM categoria';
        return Database::getRow($sql);
    }
}
