<?php
require_once('../../helpers/database.php');

class ComentariosHandler {
    protected $db;
    protected $id = null;
    protected $comentario = null;
    protected $fechaPublicacion = null;
    protected $usuario = null;
    protected $producto = null;

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
                INNER JOIN tb_usuarios AS u ON c.id_usuario = u.id_usuario
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
    public function hideComment() {
        $sql = "UPDATE tb_comentarios SET status = 0 WHERE id_Comentarios = ?";
        $params = array($this->id);
        return $this->db->executeRow($sql, $params);
    }

    // Método para leer todos los comentarios por ID de producto
    public function readAllByProductId($productId) {
        $sql = 'SELECT c.id_Comentarios, u.nombre as usuarioNombre, c.comentario, c.fechaPublicacion
                FROM tb_comentarios c
                JOIN tb_usuarios u ON c.id_usuario = u.id_usuario
                WHERE c.id_Producto = ? AND c.status = 1
                ORDER BY c.fechaPublicacion DESC';
        $params = array($productId);
        return $this->db->getRows($sql, $params);
    }

    // Método para crear un comentario
    public function createRow() {
        $sql = 'INSERT INTO tb_comentarios(comentario, fechaPublicacion, id_usuario, id_Producto)
                VALUES(?, ?, ?, ?)';
        $params = array($this->comentario, $this->fechaPublicacion, $this->usuario, $this->producto);
        return $this->db->executeRow($sql, $params);
    }

    // Método para actualizar un comentario
    public function updateRow() {
        $sql = 'UPDATE tb_comentarios
                SET comentario = ?, fechaPublicacion = ?, id_usuario = ?, id_Producto = ?
                WHERE id_Comentarios = ?';
        $params = array($this->comentario, $this->fechaPublicacion, $this->usuario, $this->producto, $this->id);
        return $this->db->executeRow($sql, $params);
    }

    // Método para eliminar un comentario
    public function deleteRow() {
        $sql = 'DELETE FROM tb_comentarios
                WHERE id_Comentarios = ?';
        $params = array($this->id);
        return $this->db->executeRow($sql, $params);
    }

    // Método para leer los comentarios de un producto
    public function readComentariosProducto() {
        $sql = 'SELECT c.id_Comentarios, c.comentario, c.fechaPublicacion, u.nombre as usuarioNombre
                FROM tb_comentarios AS c
                INNER JOIN tb_usuarios AS u ON c.id_usuario = u.id_usuario
                WHERE c.id_Producto = ?
                ORDER BY c.fechaPublicacion DESC';
        $params = array($this->producto);
        return $this->db->getRows($sql, $params);
    }
}
?>
