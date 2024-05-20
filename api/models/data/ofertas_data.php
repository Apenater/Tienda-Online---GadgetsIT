<?php
// Se incluye la clase para validar los datos de entrada.
require_once('../../helpers/validator.php');
// Se incluye la clase padre.
require_once('../../models/handler/ofertas_handler.php');
/*
 *  Clase para manejar el encapsulamiento de los datos de la tabla OFERTAS.
 */
class OfertaData extends OfertaHandler
{
    /*
     *  Atributos adicionales.
     */
    private $data_error = null;
    private $filename = null;

    /*
     *  Métodos para validar y establecer los datos.
     */
    public function setId($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->id_oferta = $value;
            return true;
        } else {
            $this->data_error = 'El identificador de la oferta es incorrecto';
            return false;
        }
    }

    public function setTitulo($value, $min = 2, $max = 50)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'El título debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->titulo = $value;
            return true;
        } else {
            $this->data_error = 'El título debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setDescripcion($value, $min = 2, $max = 225)
    {
        if (!Validator::validateAlphanumeric($value)) {
            $this->data_error = 'La descripción debe ser un valor alfanumérico';
            return false;
        } elseif (Validator::validateLength($value, $min, $max)) {
            $this->descripcion = $value;
            return true;
        } else {
            $this->data_error = 'La descripción debe tener una longitud entre ' . $min . ' y ' . $max;
            return false;
        }
    }

    public function setProducto($value)
    {
        if (Validator::validateNaturalNumber($value)) {
            $this->producto = $value;
            return true;
        } else {
            $this->data_error = 'El identificador de el produto es incorrecto';
            return false;
        }
    }

    public function setDescuento($value)
    {
        if (Validator::validateNaturalNumberDiscount($value)) {
            $this->descuento = $value;
            return true;
        } else {
            $this->data_error = 'El descuento debe ser un número del 1 al 100';
            return false;
        }
    }

    /*
     *  Métodos para obtener los atributos adicionales.
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
