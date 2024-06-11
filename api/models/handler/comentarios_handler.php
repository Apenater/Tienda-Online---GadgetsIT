<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el comportamiento de los datos de la tabla COMENTARIOS.
*/
class ComentarioHandler
{
    /*
    *   Declaración de atributos para el manejo de datos.
    */
    protected $id = null;
    protected $comentario = null;
    protected $fechaPublicacion = null;
    protected $usuario = null;
    protected $producto = null;

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT c.id_comentario, c.comentario, c.fecha_publicacion, p.nombre_producto, u.nombre_usuario
                FROM tb_comentarios AS c
                INNER JOIN tb_productos AS p ON c.id_producto = p.id_producto
                INNER JOIN tb_clientes AS u ON c.id_usuario = u.id_usuario
                WHERE c.comentario LIKE ?
                ORDER BY c.fecha_publicacion DESC';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    
    public function createRow()
    {
        $sql = 'INSERT INTO tb_comentarios(comentario, fecha_publicacion, id_usuario, id_producto)
                VALUES(?, ?, ?, ?)';
        $params = array($this->comentario, $this->fechaPublicacion, $this->usuario, $this->producto);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT c.id_comentario, c.comentario, c.fecha_publicacion, p.nombre_producto, u.nombre_usuario
                FROM tb_comentarios AS c
                INNER JOIN tb_productos AS p ON c.id_producto = p.id_producto
                INNER JOIN tb_clientes AS u ON c.id_usuario = u.id_usuario
                ORDER BY c.fecha_publicacion DESC';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_comentario, comentario, fecha_publicacion, id_usuario, id_producto
                FROM tb_comentarios
                WHERE id_comentario = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_comentarios
                SET comentario = ?, fecha_publicacion = ?, id_usuario = ?, id_producto = ?
                WHERE id_comentario = ?';
        $params = array($this->comentario, $this->fechaPublicacion, $this->usuario, $this->producto, $this->id);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_comentarios
                WHERE id_comentario = ?';
        $params = array($this->id);
        return Database::executeRow($sql, $params);
    }

    public function readComentariosProducto()
    {
        $sql = 'SELECT c.id_comentario, c.comentario, c.fecha_publicacion, u.nombre_usuario
                FROM tb_comentarios AS c
                INNER JOIN tb_clientes AS u ON c.id_usuario = u.id_usuario
                WHERE c.id_producto = ?
                ORDER BY c.fecha_publicacion DESC';
        $params = array($this->producto);
        return Database::getRows($sql, $params);
    }
}
?>
