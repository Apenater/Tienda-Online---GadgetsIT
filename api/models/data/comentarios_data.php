<?php
<<<<<<< HEAD
require_once('../../helpers/validator.php');
require_once('../../models/handler/comentarios_handler.php');

/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla COMENTARIOS.
 */
class ComentariosData extends ComentariosHandler
{
    private $data_error = null;

=======
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
>>>>>>> 5f8f0a0696775257495f00f62fc006819e7c95d4
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

<<<<<<< HEAD
    public function setUsuarioId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->usuarioId = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del usuario es incorrecto';
            return false;
        }
    }

    public function setProductoId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->productoId = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del producto es incorrecto';
            return false;
        }
    }

    public function setComentario($value)
    {
        if (Validator::validateString($value, 1, 500)) {
            $this->comentario = $value;
            return true;
        } else {
            $this->data_error = 'El comentario debe tener una longitud adecuada y no contener caracteres prohibidos';
=======
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
>>>>>>> 5f8f0a0696775257495f00f62fc006819e7c95d4
            return false;
        }
    }

    public function setFechaPublicacion($value)
    {
        if (Validator::validateDate($value)) {
            $this->fechaPublicacion = $value;
            return true;
        } else {
<<<<<<< HEAD
            $this->data_error = 'La fecha de publicación no es válida';
=======
            $this->data_error = 'La fecha de publicación es incorrecta';
>>>>>>> 5f8f0a0696775257495f00f62fc006819e7c95d4
            return false;
        }
    }

<<<<<<< HEAD
    public function setVisible($value)
    {
        if (Validator::validateBoolean($value)) {
            $this->visible = $value;
            return true;
        } else {
            $this->data_error = 'El estado visible debe ser verdadero o falso';
=======
    public function setUsuario($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->usuario = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del usuario es incorrecto';
>>>>>>> 5f8f0a0696775257495f00f62fc006819e7c95d4
            return false;
        }
    }

<<<<<<< HEAD
    public function readAllByProductId($productId) {
        if($this->setProductoId($productId)) {
            return parent::readAllByProductId($this->productoId);
        } else {
=======
    public function setProducto($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->producto = $value;
            return true;
        } else {
            $this->data_error = 'El identificador del producto es incorrecto';
>>>>>>> 5f8f0a0696775257495f00f62fc006819e7c95d4
            return false;
        }
    }

<<<<<<< HEAD
    public function hideComment() {
        return parent::hideComment();  // Esta función simplemente llama a la función del padre.
    }

    /*
     *  Método para obtener el valor de los atributos adicionales.
=======
    /*
     *  Métodos para obtener el valor de los atributos adicionales.
>>>>>>> 5f8f0a0696775257495f00f62fc006819e7c95d4
     */
    public function getDataError()
    {
        return $this->data_error;
    }
<<<<<<< HEAD
}
=======

    public function getFilename()
    {
        return $this->filename;
    }
}
?>
>>>>>>> 5f8f0a0696775257495f00f62fc006819e7c95d4
