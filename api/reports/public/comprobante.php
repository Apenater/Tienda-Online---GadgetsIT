<?php
// Se incluye la clase con las plantillas para generar reportes.
require_once('../../helpers/report.php');

// Se instancia la clase para crear el reporte.
$pdf = new Report;

// Se incluyen las clases para la transferencia y acceso a datos.
require_once('../../models/data/producto_data.php');
require_once('../../models/data/pedido_data.php');
require_once('../../models/data/cliente_data.php');

// Se instancian las entidades correspondientes.
$producto = new PedidoHandler();
$cliente = new ClienteHandler(); // Asegúrate de que esta clase existe y tiene el método readOneCorreo

// Obtener detalles del pedido
$detalle_pedido = $producto->readDetail2();

// Obtener información del cliente
$usuario_info = $cliente->readOneCorreo($_SESSION['correo_cliente']);

// Verificar si hay detalles del pedido
if ($detalle_pedido) {
    // Se inicia el reporte con el encabezado del documento.
    $pdf->startReport('Comprobante de Compra');

    // Información del cliente
    $pdf->setFont('Arial', 'B', 14);
    $pdf->cell(0, 10, 'Comprobante de Compra', 0, 1, 'C');
    $pdf->ln(10); // Espacio de línea
    
    $pdf->setFont('Arial', 'B', 12);
    $pdf->cell(0, 10, 'Información del Cliente', 0, 1, 'L');
    $pdf->setFont('Arial', '', 12);
    $pdf->cell(0, 10, 'Correo: ' . $usuario_info['correo_cliente'], 0, 1, 'L');
    $pdf->cell(0, 10, 'Nombre: ' . $usuario_info['nombre_cliente'], 0, 1, 'L');
    $pdf->ln(10); // Espacio de línea

    // Encabezado de la tabla de detalles de pedido
    $pdf->setFont('Arial', 'B', 12);
    $pdf->cell(10, 10, 'No.', 1, 0, 'C');
    $pdf->cell(50, 10, 'Producto', 1, 0, 'C');
    $pdf->cell(30, 10, 'Imagen', 1, 0, 'C');
    $pdf->cell(30, 10, 'Precio', 1, 0, 'C');
    $pdf->cell(30, 10, 'Cantidad', 1, 1, 'C');

    // Datos del detalle del pedido
    $pdf->setFont('Arial', '', 12);
    $no = 1;
    foreach ($detalle_pedido as $item) {
        $pdf->cell(10, 10, $no++, 1, 0, 'C');
        $pdf->cell(50, 10, $pdf->encodeString($item['nombre_producto']), 1, 0, 'L');
        
        // Mostrar imagen del producto
        $image_path = '../../images/productos/' . $item['imagen_producto'];
        $pdf->image($image_path, $pdf->GetX(), $pdf->GetY(), 20, 20); // Ajusta la posición y tamaño de la imagen
        $pdf->cell(30, 10, '', 1, 0, 'C'); // Espacio para la imagen
        
        $pdf->cell(30, 10, number_format($item['precio_producto'], 2), 1, 0, 'R');
        $pdf->cell(30, 10, $item['cantidad_producto'], 1, 1, 'R');
    }

    // Total de la compra (calcular el total en base a los detalles del pedido)
    $total = array_reduce($detalle_pedido, function($carry, $item) {
        return $carry + ($item['precio_producto'] * $item['cantidad_producto']);
    }, 0);

    $pdf->setFont('Arial', 'B', 12);
    $pdf->cell(120, 10, 'Total', 1, 0, 'C');
    $pdf->cell(30, 10, number_format($total, 2), 1, 1, 'R');

    // Se llama implícitamente al método footer() y se envía el documento al navegador web.
    $pdf->output('I', 'comprobante_compra.pdf');
} else {
    print('No hay detalles para mostrar');
}
?>
