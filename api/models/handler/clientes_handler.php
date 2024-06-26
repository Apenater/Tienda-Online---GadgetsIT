<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla cliente.
 */
class ClienteHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id_usuario = null;
    protected $nombre = null;
    protected $apellido = null;
    protected $correo = null;
    protected $telefono = null;
    protected $contrasenia_usuario = null;

    /*
     *  Métodos para gestionar la cuenta del cliente.
     */
    public function checkUser($username, $password)
    {
        $sql = 'SELECT id_usuario, correo, contrasenia_usuario
                FROM tb_clientes
                WHERE  correo = ?';
        $params = array($username);
        if (!($data = Database::getRow($sql, $params))) {
            return false;
        } elseif (password_verify($password, $data['contrasenia_usuario'])) {
            $_SESSION['id_usuario'] = $data['id_usuario'];
            $_SESSION['correo'] = $data['correo'];
            return true;
        } else {
            return false;
        }
    }

    public function checkPassword($password)
    {
        $sql = 'SELECT contrasenia_usuario
                FROM tb_clientes
                WHERE id_usuario = ?';
        $params = array($_SESSION['id_usuario']);
        $data = Database::getRow($sql, $params);
        // Se verifica si la contraseña coincide con el hash almacenado en la base de datos.
        if (password_verify($password, $data['contrasenia_usuario'])) {
            return true;
        } else {
            return false;
        }
    }

    public function changePassword()
    {
        $sql = 'UPDATE tb_clientes
                SET contrasenia_usuario = ?
                WHERE id_usuario = ?';
        $params = array($this->contrasenia_usuario, $_SESSION['id_usuario']);
        return Database::executeRow($sql, $params);
    }

    public function readProfile()
    {
        $sql = 'SELECT id_usuario, nombre, apellido, correo, telefono
                FROM tb_clientes
                WHERE id_usuario = ?';
        $params = array($_SESSION['id_usuario']);
        return Database::getRow($sql, $params);
    }

    public function editProfile()
    {
        $sql = 'UPDATE tb_clientes
                SET nombre = ?, apellido = ?, correo = ?, telefono = ?
                WHERE id_usuario = ?';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->telefono, $_SESSION['id_usuario']);
        return Database::executeRow($sql, $params);
    }

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_usuario, nombre, apellido, correo, telefono,
                FROM tb_clientes
                WHERE apellido LIKE ? OR nombre LIKE ? OR correo lIKE ? OR telefono LIKE ?
                ORDER BY apellido';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }
    
    public function readAll()
    {
        $sql = 'SELECT id_usuario, nombre, apellido, correo, telefono
                FROM tb_clientes
                ORDER BY apellido';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_usuario, nombre, apellido, correo, telefono
                FROM tb_clientes
                WHERE id_usuario = ?';
        $params = array($this->id_usuario);
        return Database::getRow($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_clientes(nombre, apellido, correo, telefono, contrasenia_usuario)
                VALUES(?, ?, ?, ?, ?)';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->telefono, $this->contrasenia_usuario);
        return Database::executeRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_clientes
                SET nombre = ?, apellido = ?,  correo = ?, telefono = ?
                WHERE id_usuario = ?';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->telefono, $this->id_usuario);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_clientes
                WHERE id_usuario = ?';
        $params = array($this->id_usuario);
        return Database::executeRow($sql, $params);
    }
}
