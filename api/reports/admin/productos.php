<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;

// Se incluyen las clases para la transferencia y acceso a datos.
require_once('../../models/data/producto_data.php');

// Se instancian las entidades correspondientes.
$producto = new ProductoHandler;

// Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
if ($dataproductos = $producto->readAll()) {
    // Se inicia el reporte con el encabezado del documento.
    $pdf->startReport('Listado de productos');

    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(50, 50, 50);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 11);
    $pdf->setTextColor(255, 255, 255); // Color de texto blanco para los encabezados

    // Se imprimen las celdas con los encabezados.
    $pdf->cell(60, 10, 'Nombre', 1, 0, 'C', 1);
    $pdf->cell(40, 10, 'Precio (US$)', 1, 0, 'C', 1);
    $pdf->cell(40, 10, 'Existencias', 1, 0, 'C', 1);
    $pdf->cell(45, 10, 'Estado', 1, 1, 'C', 1);

    // Se establece la fuente para los datos de los productos.
    $pdf->setFont('Arial', '', 11);
    $pdf->setTextColor(0, 0, 0); // Color de texto negro

    // Se recorren los registros fila por fila.
    $fill = false; // Alternancia de color de relleno
    foreach ($dataproductos as $rowproducto) {
        $estado = ($rowproducto['estado_producto']) ? 'Activo' : 'Inactivo';
        
        // Se imprimen las celdas con los datos de los productos.
        $pdf->setFillColor($fill ? 230 : 255); // Color de relleno gris más claro y blanco alternante
        $pdf->cell(60, 10, $pdf->encodeString($rowproducto['nombre_producto']), 1, 0, '', $fill);
        // Mover la posición de las celdas siguientes a la descripción
        $pdf->cell(40, 10, $rowproducto['precio_producto'], 1, 0, 'R', $fill);
        $pdf->cell(40, 10, $rowproducto['existencias_producto'], 1, 0, 'R', $fill);
        $pdf->cell(45, 10, $estado, 1, 1, 'C', $fill);
        
        // Alternar color de relleno
        $fill = !$fill;
    }

    // Se llama implícitamente al método footer() y se envía el documento al navegador web.
    $pdf->output('I', 'productos.pdf');
} else {
    print('No hay productos para mostrar');
}
?>
