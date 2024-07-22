<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
*	Clase para manejar el comportamiento de los datos de las tablas PEDIDO y DETALLE_PEDIDO.
*/
class PedidoHandler
{
    /*
    *   Declaración de atributos para el manejo de datos.
    */
    protected $id_pedido = null;
    protected $id_detalle = null;
    protected $cliente = null;
    protected $producto = null;
    protected $cantidad = null;
    protected $estado = null;

    /*
    *   ESTADOS DEL PEDIDO
    *   Pendiente (valor por defecto en la base de datos). Pedido en proceso y se puede modificar el detalle.
    *   Finalizado. Pedido terminado por el cliente y ya no es posible modificar el detalle.
    *   Entregado. Pedido enviado al cliente.
    *   Anulado. Pedido cancelado por el cliente después de ser finalizado.
    */

    /*
    *   Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
    */
    // Método para verificar si existe un pedido en proceso con el fin de iniciar o continuar una compra.
    public function getOrder()
    {
        $this->estado = 'Pendiente';
        $sql = 'SELECT id_pedido
                FROM pedido
                WHERE estado_pedido = ? AND id_cliente = ?';
        $params = array($this->estado, $_SESSION['idCliente']);
        if ($data = Database::getRow($sql, $params)) {
            $_SESSION['idPedido'] = $data['id_pedido'];
            return true;
        } else {
            return false;
        }
    }

    // Método para iniciar un pedido en proceso.
    public function startOrder()
    {
        if ($this->getOrder()) {
            return true;
        } else {
            $sql = 'INSERT INTO pedido(direccion_pedido, id_cliente)
                    VALUES((SELECT direccion_cliente FROM cliente WHERE id_cliente = ?), ?)';
            $params = array($_SESSION['idCliente'], $_SESSION['idCliente']);
            // Se obtiene el ultimo valor insertado de la llave primaria en la tabla pedido.
            if ($_SESSION['idPedido'] = Database::getLastRow($sql, $params)) {
                return true;
            } else {
                return false;
            }
        }
    }

    // Método para agregar un producto al carrito de compras.
    public function createDetail()
    {
        // Se realiza una subconsulta para obtener el precio del producto.
        $sql = 'INSERT INTO detalle_pedido(id_producto, precio_producto, cantidad_producto, id_pedido)
                VALUES(?, (SELECT precio_producto FROM producto WHERE id_producto = ?), ?, ?)';
        $params = array($this->producto, $this->producto, $this->cantidad, $_SESSION['idPedido']);
        return Database::executeRow($sql, $params);
    }

    // Método para obtener los productos que se encuentran en el carrito de compras.
    public function readDetail2()
    {
        $sql = 'SELECT id_detalle, nombre_producto, imagen_producto, detalle_pedido.precio_producto, detalle_pedido.cantidad_producto
                FROM detalle_pedido
                INNER JOIN pedido USING(id_pedido)
                INNER JOIN producto USING(id_producto)
                WHERE id_pedido = ?';
        $params = $this->id_pedido;
        return Database::getRows($sql, $params);
    }

    public function readDetail()
    {
        print_r($params = $this->id_pedido);
        $sql = 'SELECT id_detalle, nombre_producto, imagen_producto, detalle_pedido.precio_producto, detalle_pedido.cantidad_producto
                FROM detalle_pedido
                INNER JOIN pedido USING(id_pedido)
                INNER JOIN producto USING(id_producto)
                WHERE id_pedido = ?';
        $params = $this->id_pedido;
        return Database::getRows($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT 
    dp.id_detalle,
    p.nombre_producto,
    p.imagen_producto,
    dp.precio_producto,
    dp.cantidad_producto,
    c.nombre_cliente,
    c.apellido_cliente
FROM 
    detalle_pedido dp
INNER JOIN 
    pedido pe ON dp.id_pedido = pe.id_pedido
INNER JOIN 
    producto p ON dp.id_producto = p.id_producto
INNER JOIN 
    cliente c ON pe.id_cliente = c.id_cliente
';
        return Database::getRows($sql);
    }

    // Método para finalizar un pedido por parte del cliente.
    public function finishOrder()
    {
        $this->estado = 'Finalizado';
        $sql = 'UPDATE pedido
                SET estado_pedido = ?
                WHERE id_pedido = ?';
        $params = array($this->estado, $_SESSION['idPedido']);
        return Database::executeRow($sql, $params);
    }

    // Método para actualizar la cantidad de un producto agregado al carrito de compras.
    public function updateDetail()
    {
        $sql = 'UPDATE detalle_pedido
                SET cantidad_producto = ?
                WHERE id_detalle = ? AND id_pedido = ?';
        $params = array($this->cantidad, $this->id_detalle, $_SESSION['idPedido']);
        return Database::executeRow($sql, $params);
    }

    // Método para eliminar un producto que se encuentra en el carrito de compras.
    public function deleteDetail()
    {
        $sql = 'DELETE FROM detalle_pedido
                WHERE id_detalle = ? AND id_pedido = ?';
        $params = array($this->id_detalle, $_SESSION['idPedido']);
        return Database::executeRow($sql, $params);
    }

    // Método para obtener los pedidos que ya han sido finalizados.
    public function getFinishedOrders()
{
    $this->estado = 'Finalizado';
    $sql = 'SELECT 
                DATE(fecha_pedido) AS fecha,
                COUNT(*) AS total_pedidos
            FROM 
                pedido
            WHERE 
                estado_pedido = ?
            GROUP BY 
                DATE(fecha_pedido)
            ORDER BY 
                fecha';
    $params = array($this->estado);
    $result = Database::getRows($sql, $params);
    
    if (empty($result)) {
        $checkSql = 'SELECT COUNT(*) as count FROM pedido WHERE estado_pedido = ?';
        $checkResult = Database::getRow($checkSql, $params);
        
        if ($checkResult['count'] == 0) {
            return false;
        } else {
            // Si hay pedidos finalizados pero no se pueden agrupar, devolvemos un array con un solo elemento
            return array(array(
                'fecha' => date('Y-m-d'),
                'total_pedidos' => $checkResult['count']
            ));
        }
    }
    
    return $result;
}
}
