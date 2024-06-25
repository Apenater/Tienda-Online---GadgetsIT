<?php
<<<<<<< HEAD
require_once('../../helpers/database.php');

class ComentariosHandler {
    protected $db;

    public function __construct() {
        $this->db = new Database();
    }

    // Método para buscar comentarios con detalles de producto y usuario
    public function searchRows($search) {
        $sql = "SELECT c.id_Comentarios, c.comentario, c.fechaPublicacion, c.status, 
                       p.nombreProducto, u.nombre as usuarioNombre, u.apellido as usuarioApellido
                FROM tb_comentarios AS c
                INNER JOIN tb_productos AS p ON c.id_Producto = p.idProducto
                INNER JOIN tb_usuarios AS u ON c.id_usuario = u.id_usuario
                WHERE c.comentario LIKE ? OR p.nombreProducto LIKE ? OR u.nombre LIKE ? OR u.apellido LIKE ?
                ORDER BY c.fechaPublicacion DESC";
        $params = array("%$search%", "%$search%", "%$search%", "%$search%");
        return $this->db->getRows($sql, $params);
    }

    // Método para leer todos los comentarios con detalles de producto y usuario
    public function readAll() {
        $sql = "SELECT c.id_Comentarios, c.comentario, c.fechaPublicacion, c.status,
                       p.nombreProducto, u.nombre as usuarioNombre, u.apellido as usuarioApellido
                FROM tb_comentarios AS c
                INNER JOIN tb_productos AS p ON c.id_Producto = p.idProducto
                INNER JOIN tb_clientes AS u ON c.id_usuario = u.id_usuario
                ORDER BY c.fechaPublicacion DESC";
        return $this->db->getRows($sql);
    }

    // Método para leer un solo comentario por ID
    public function readOne($id) {
        $sql = "SELECT c.id_Comentarios, c.comentario, c.fechaPublicacion, c.status,
                       p.nombreProducto, u.nombre as usuarioNombre, u.apellido as usuarioApellido
                FROM tb_comentarios AS c
                INNER JOIN tb_productos AS p ON c.id_Producto = p.idProducto
                INNER JOIN tb_usuarios AS u ON c.id_usuario = u.id_usuario
                WHERE c.id_Comentarios = ?";
        $params = array($id);
        return $this->db->getRow($sql, $params);
    }

    // Método para ocultar un comentario
    public function hideComment($id) {
        $sql = "UPDATE tb_comentarios SET status = 0 WHERE id_Comentarios = ?";
        $params = array($id);
        return $this->db->executeRow($sql, $params);
    }

    public function readAllByProductId($productId) {
        $sql = 'SELECT c.id, u.nombre AS usuario, c.comentario, c.fecha_publicacion
                FROM comentarios c
                JOIN usuarios u ON c.usuario_id = u.id
                WHERE c.producto_id = ? AND c.visible = 1
                ORDER BY c.fecha_publicacion DESC';
        $params = array($productId);
        return $this->db->getRows($sql, $params);
    }

    public function hideComment() {
        $sql = 'UPDATE comentarios SET visible = 0 WHERE id = ?';
        $params = array($this->id);
        return $this->db->executeRow($sql, $params);
    }
}
=======
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
                INNER JOIN tb_productos AS p ON c.id_Producto = p.id_Producto
                INNER JOIN tb_clientes AS u ON c.id_usuario = u.id_usuario
                WHERE c.comentario LIKE ?
                ORDER BY c.fecha_publicacion DESC';
        $params = array($value);
        return Database::getRows($sql, $params);
    }

    
    public function createRow()
    {
        $sql = 'INSERT INTO tb_comentarios(comentario, fecha_publicacion, id_usuario, id_Producto)
                VALUES(?, ?, ?, ?)';
        $params = array($this->comentario, $this->fechaPublicacion, $this->usuario, $this->producto);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT c.id_comentario, c.comentario, c.fecha_publicacion, p.nombre_producto, u.nombre_usuario
                FROM tb_comentarios AS c
                INNER JOIN tb_productos AS p ON c.id_Producto = p.id_Producto
                INNER JOIN tb_clientes AS u ON c.id_usuario = u.id_usuario
                ORDER BY c.fecha_publicacion DESC';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_comentario, comentario, fecha_publicacion, id_usuario, id_Producto
                FROM tb_comentarios
                WHERE id_comentario = ?';
        $params = array($this->id);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_comentarios
                SET comentario = ?, fecha_publicacion = ?, id_usuario = ?, id_Producto = ?
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
                WHERE c.id_Producto = ?
                ORDER BY c.fecha_publicacion DESC';
        $params = array($this->producto);
        return Database::getRows($sql, $params);
    }
}
?>
>>>>>>> 5f8f0a0696775257495f00f62fc006819e7c95d4
