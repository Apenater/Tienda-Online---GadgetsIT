<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/comentarios_handler.php');

/*
 *	Clase para manejar el encapsulamiento de los datos de la tabla COMENTARIOS.
 */
class ComentariosData extends ComentarioHandler
{
    /*
     *  Atributos adicionales.
     */
    private $data_error = null;
    private $filename = null;

    /*
     *   Métodos para validar y establecer los datos.
     */
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del comentario es incorrecto';
            return false;
        }
    }

    public function setComentario($value, $min = 2, $max = 255)
    {
        if (!Validator::validateAlphanumeric($value, true)) {
            $this->data_error = 'El comentario debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->comentario = $value;
            return true;
        } else {
            $this->data_error = 'El comentario debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setFechaPublicacion($value)
    {
        if (Validator::validateDate($value)) {
            $this->fechaPublicacion = $value;
            return true;
        } else {
            $this->data_error = 'La fecha de publicación es incorrecta';
            return false;
        }
    }

    public function setUsuario($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->usuario = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del usuario es incorrecto';
            return false;
        }
    }

    public function setProducto($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->producto = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del producto es incorrecto';
            return false;
        }
    }

    /*
     *  Métodos para obtener el valor de los atributos adicionales.
     */
    public function getDataError()
    {
        return $this->data_error;
    }

    public function getFilename()
    {
        return $this->filename;
    }
}
?>
