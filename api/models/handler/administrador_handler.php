<?php
// Se incluye la clase para trabajar con la base de datos.
require_once('../../helpers/database.php');
/*
 *  Clase para manejar el comportamiento de los datos de la tabla administrador.
 */
class AdministradorHandler
{
    /*
     *  Declaración de atributos para el manejo de datos.
     */
    protected $id_admin = null;
    protected $nombre = null;
    protected $apellido = null;
    protected $correo = null;
    protected $telefono = null;
    protected $contrasenia_admin = null;
    protected $fecha_registro = null;

    /*
     *  Métodos para gestionar la cuenta del administrador.
     */
    public function checkUser($username, $password)
    {
        $sql = 'SELECT id_admin, correo, contrasenia_admin
                FROM tb_administrador
                WHERE  correo = ?';
        $params = array($username);
        if (!($data = Database::getRow($sql, $params))) {
            return false;
        } elseif (password_verify($password, $data['contrasenia_admin'])) {
            $_SESSION['id_admin'] = $data['id_admin'];
            $_SESSION['correo'] = $data['correo'];
            return true;
        } else {
            return false;
        }
    }

    public function checkPassword($password)
    {
        $sql = 'SELECT contrasenia_admin
                FROM tb_administrador
                WHERE id_admin = ?';
        $params = array($_SESSION['id_admin']);
        $data = Database::getRow($sql, $params);
        // Se verifica si la contraseña coincide con el hash almacenado en la base de datos.
        if (password_verify($password, $data['contrasenia_admin'])) {
            return true;
        } else {
            return false;
        }
    }

    public function changePassword()
    {
        $sql = 'UPDATE tb_administrador
                SET contrasenia_admin = ?
                WHERE id_admin = ?';
        $params = array($this->contrasenia_admin, $_SESSION['id_admin']);
        return Database::executeRow($sql, $params);
    }

    public function readProfile()
    {
        $sql = 'SELECT id_admin, nombre, apellido, correo
                FROM tb_administrador
                WHERE id_admin = ?';
        $params = array($_SESSION['id_admin']);
        return Database::getRow($sql, $params);
    }

    public function editProfile()
    {
        $sql = 'UPDATE tb_administrador
                SET nombre = ?, apellido = ?, correo = ?
                WHERE id_admin = ?';
        $params = array($this->nombre, $this->apellido, $this->correo, $_SESSION['id_admin']);
        return Database::executeRow($sql, $params);
    }

    /*
     *  Métodos para realizar las operaciones SCRUD (search, create, read, update, and delete).
     */
    public function searchRows()
    {
        $value = '%' . Validator::getSearchValue() . '%';
        $sql = 'SELECT id_admin, nombre, apellido, correo
                FROM tb_administrador
                WHERE apellido LIKE ? OR nombre LIKE ?
                ORDER BY apellido';
        $params = array($value, $value);
        return Database::getRows($sql, $params);
    }

    public function createRow()
    {
        $sql = 'INSERT INTO tb_administrador(nombre, apellido, correo, contrasenia_admin)
                VALUES(?, ?, ?, ?, ?)';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->contrasenia_admin);
        return Database::executeRow($sql, $params);
    }

    public function readAll()
    {
        $sql = 'SELECT id_admin, nombre, apellido, correo
                FROM tb_administrador
                ORDER BY apellido';
        return Database::getRows($sql);
    }

    public function readOne()
    {
        $sql = 'SELECT id_admin, nombre, apellido, correo
                FROM tb_administrador
                WHERE id_admin = ?';
        $params = array($this->id_admin);
        return Database::getRow($sql, $params);
    }

    public function updateRow()
    {
        $sql = 'UPDATE tb_administrador
                SET nombre = ?, apellido = ?
                WHERE id_admin = ?';
        $params = array($this->nombre, $this->apellido, $this->correo, $this->id_admin);
        return Database::executeRow($sql, $params);
    }

    public function deleteRow()
    {
        $sql = 'DELETE FROM tb_administrador
                WHERE id_admin = ?';
        $params = array($this->id_admin);
        return Database::executeRow($sql, $params);
    }
}
