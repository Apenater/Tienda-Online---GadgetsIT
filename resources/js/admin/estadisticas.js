document.addEventListener('DOMContentLoaded', function () {
    var ctxProd = document.getElementById('productosMasVendidos').getContext('2d');
    var chartProductos = new Chart(ctxProd, {
        type: 'bar', // Este es un gráfico de barras, puedes cambiar el tipo de gráfico según necesites
        data: {
            labels: ['Iphone 11', 'Apple Wacht 9', 'Airpods Pro'], // Cambia esto por los nombres de tus productos
            datasets: [{
                label: 'Ventas',
                backgroundColor: ['#0077B6', '#00B4D8', '#B1B2FF'],
                data: [50, 70, 60] // Aquí irían las ventas de cada producto
            }]
        }
    });

    var ctxMarcas = document.getElementById('marcasMasVendidas').getContext('2d');
    var chartMarcas = new Chart(ctxMarcas, {
        type: 'pie', // Este es un gráfico circular
        data: {
            labels: ['Apple', 'JBL', 'HUAWEI'],
            datasets: [{
                backgroundColor: ['#0077B6', '#00B4D8', '#B1B2FF'],
                data: [120, 150, 180] // Ventas por marca
            }]
        }
    });

    var ctxVentas = document.getElementById('ventasDiarias').getContext('2d');
    var chartVentas = new Chart(ctxVentas, {
        type: 'line', // Este es un gráfico de líneas
        data: {
            labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'], // Días de la semana
            datasets: [{
                label: 'Ventas',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                data: [50, 25, 75, 50, 100] // Ventas por día
            }]
        }
    });
});

