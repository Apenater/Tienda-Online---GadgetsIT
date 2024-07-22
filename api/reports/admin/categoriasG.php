<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;

// Se incluyen las clases para la transferencia y acceso a datos.
require_once('../../models/data/categoria_data.php');

// Se instancian las entidades correspondientes.
$categoria = new CategoriaHandler;

// Se verifica si existen registros para mostrar, de lo contrario se imprime un mensaje.
if ($datacategoriaes = $categoria->readAll()) {
    // Se inicia el reporte con el encabezado del documento.
    $pdf->startReport('Listado de categoriaes');

    // Se establece un color de relleno para los encabezados.
    $pdf->setFillColor(50, 50, 50);
    // Se establece la fuente para los encabezados.
    $pdf->setFont('Arial', 'B', 11);
    $pdf->setTextColor(255, 255, 255); // Color de texto blanco para los encabezados

    // Se imprimen las celdas con los encabezados.
    $pdf->cell(40, 10, 'Nombre', 1, 0, 'C', 1);
    $pdf->cell(40, 10, 'Apellido', 1, 0, 'C', 1);
    $pdf->cell(60, 10, 'Correo', 1, 0, 'C', 1);
    $pdf->cell(40, 10, 'Alias', 1, 1, 'C', 1);

    // Se establece la fuente para los datos de los categoriaes.
    $pdf->setFont('Arial', '', 11);
    $pdf->setTextColor(0, 0, 0); // Color de texto negro

    // Se recorren los registros fila por fila.
    $fill = false; // Alternancia de color de relleno
    foreach ($datacategoriaes as $rowcategoria) {
        // Se imprimen las celdas con los datos de los categoriaes.
        $pdf->setFillColor($fill ? 230 : 255); // Color de relleno gris más claro y blanco alternante
        $pdf->cell(40, 10, $pdf->encodeString($rowcategoria['nombre_categoria']), 1, 0, '', $fill);
        $pdf->cell(40, 10, $pdf->encodeString($rowcategoria['apellido_categoria']), 1, 0, '', $fill);
        $pdf->cell(60, 10, $pdf->encodeString($rowcategoria['correo_categoria']), 1, 0, '', $fill);
        $pdf->cell(40, 10, $pdf->encodeString($rowcategoria['alias_categoria']), 1, 1, '', $fill);
        // Alternar color de relleno
        $fill = !$fill;
    }

    // Se llama implícitamente al método footer() y se envía el documento al navegador web.
    $pdf->output('I', 'categoriaes.pdf');
} else {
    print('No hay categoriaes para mostrar');
}
?>
