<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el comportamiento de los datos de la tabla PRODUCTO.
*/
class ProductosHandler
{
    /*
    *   Declaración de atributos para el manejo de datos.
    */
    protected $id = null;
    protected $nombre = null;
    protected $descripcion = null;
    protected $modelo = null;
    protected $especificaciones = null;
    protected $precio = null;
    protected $existencias = null;
    protected $imagen = null;
    protected $categoria = null;
    protected $marca = null;
    protected $estado = null;

    // Constante para establecer la ruta de las imágenes.
    const RUTA_IMAGEN = '../../images/productos/';

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT idProducto , imagen_producto, nombreProducto, descripcionProducto, precioProducto, nombreC , estadoProducto, Modelo, nombre_marca, existencias_producto, especificaiones
                FROM tb_productos
                INNER JOIN tb_categorias USING(id_Categoria)
                INNER JOIN tb_marcas USING(id_marca)
                WHERE nombreProducto LIKE ? OR descripcionProducto LIKE ?
                ORDER BY nombreProducto';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_productos(nombreProducto, descripcionProducto, precioProducto, existencias_producto, imagen_producto, id_categoria, Modelo, id_marca, especificaiones)
                VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)';
        $params = array($this->nombre, $this->descripcion, $this->precio, $this->existencias, $this->imagen,  $this->categoria, $this->modelo, $this->marca, $this->especificaciones);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT idProducto , imagen_producto, nombreProducto, descripcionProducto, precioProducto, nombreC , estadoProducto, Modelo, nombre_marca, existencias_producto, especificaiones
                FROM tb_productos
                INNER JOIN tb_categorias USING(id_categoria)
                INNER JOIN tb_marcas USING(id_marca)
                ORDER BY nombreProducto ';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT idProducto, imagen_producto, nombreProducto, descripcionProducto, precioProducto, id_categoria, estadoProducto, Modelo, id_marca, existencias_producto, especificaiones
                FROM tb_productos
                WHERE idProducto = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function readFilename()
    {
        $sql = 'SELECT imagen_producto
                FROM tb_productos
                WHERE idProducto = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_productos
                SET imagen_producto = ?, nombreProducto = ?, descripcionProducto = ?, precioProducto = ?, id_categoria = ?, Modelo = ?, id_marca = ?, especificaiones = ?
                WHERE idProducto = ?';
        $params = array($this->imagen, $this->nombre, $this->descripcion, $this->precio, $this->categoria, $this->modelo, $this->marca, $this->especificaciones, $this->id );
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_productos
                WHERE idProducto = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function readProductosCategoria()
    {
        $sql = 'SELECT idProducto, imagen_producto, nombreProducto, descripcion_producto, precio_producto, existencias_producto
                FROM tb_productos
                INNER JOIN categoria USING(id_categoria)
                WHERE id_categoria = ? AND estado_producto = true
                ORDER BY nombre_producto';
        $params = array($this->categoria);
        return Database::getRows($sql, $params);
    }

    /*
    *   Métodos para generar gráficos.
    */
    public function cantidadProductosCategoria()
    {
        $sql = 'SELECT nombre_categoria, COUNT(idProducto) cantidad
                FROM tb_productos
                INNER JOIN categoria USING(id_categoria)
                GROUP BY nombre_categoria ORDER BY cantidad DESC LIMIT 5';
        return Database::getRows($sql);
    }

    public function porcentajeProductosCategoria()
    {
        $sql = 'SELECT nombre_categoria, ROUND((COUNT(id_producto) * 100.0 / (SELECT COUNT(id_producto) FROM producto)), 2) porcentaje
                FROM tb_productos
                INNER JOIN categoria USING(id_categoria)
                GROUP BY nombre_categoria ORDER BY porcentaje DESC';
        return Database::getRows($sql);
    }

    /*
    *   Métodos para generar reportes.
    */
    public function productosCategoria()
    {
        $sql = 'SELECT nombre_producto, precio_producto, estado_producto
                FROM tb_productos
                INNER JOIN categoria USING(id_categoria)
                WHERE id_categoria = ?
                ORDER BY nombre_producto';
        $params = array($this->categoria);
        return Database::getRows($sql, $params);
    }
}
