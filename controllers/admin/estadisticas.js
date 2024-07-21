// Constante para completar la ruta de la API.
const PRODUCTO_API = 'services/admin/producto.php';

// Método del evento para cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', () => {
    // Constante para obtener el número de horas.
    const HOUR = new Date().getHours();
    // Se define una variable para guardar un saludo.
    let greeting = '';
    // Dependiendo del número de horas transcurridas en el día, se asigna un saludo para el usuario.
    if (HOUR < 12) {
        greeting = 'Buenos días';
    } else if (HOUR < 19) {
        greeting = 'Buenas tardes';
    } else if (HOUR <= 23) {
        greeting = 'Buenas noches';
    }
    // Llamada a la función para mostrar el encabezado y pie del documento.
    loadTemplate();
    // Se establece el título del contenido principal.
    document.getElementById('mainTitle').textContent = `${greeting}, bienvenido`;
    // Llamada a las funciones que generan los gráficos en la página web.
    graficoBarrasCategorias();
    graficoPastelCategorias();
    graficoVentasDiarias();
    graficoProductosMasVendidos();
    graficoMarcasMasVendidas();
});

// Función asíncrona para mostrar un gráfico de barras con la cantidad de productos por categoría.
const graficoBarrasCategorias = async () => {
    try {
        // Petición para obtener los datos del gráfico.
        const DATA = await fetchData(PRODUCTO_API, 'cantidadProductosCategoria');
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
        if (DATA.status) {
            // Se declaran los arreglos para guardar los datos a graficar.
            let categorias = [];
            let cantidades = [];
            // Se recorre el conjunto de registros fila por fila a través del objeto row.
            DATA.dataset.forEach(row => {
                // Se agregan los datos a los arreglos.
                categorias.push(row.nombre_categoria);
                cantidades.push(row.cantidad);
            });
            // Llamada a la función para generar y mostrar un gráfico de barras. Se encuentra en el archivo components.js
            barGraph('chart1', categorias, cantidades, 'Cantidad de productos', 'Cantidad de productos por categoría');
        } else {
            document.getElementById('chart1').remove();
            console.log(DATA.error);
        }
    } catch (error) {
        console.error('Error fetching bar chart data:', error);
    }
}

// Función asíncrona para mostrar un gráfico de pastel con el porcentaje de productos por categoría.
const graficoPastelCategorias = async () => {
    try {
        // Petición para obtener los datos del gráfico.
        const DATA = await fetchData(PRODUCTO_API, 'porcentajeProductosCategoria');
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
        if (DATA.status) {
            // Se declaran los arreglos para guardar los datos a graficar.
            let categorias = [];
            let porcentajes = [];
            // Se recorre el conjunto de registros fila por fila a través del objeto row.
            DATA.dataset.forEach(row => {
                // Se agregan los datos a los arreglos.
                categorias.push(row.nombre_categoria);
                porcentajes.push(row.porcentaje);
            });
            // Llamada a la función para generar y mostrar un gráfico de pastel. Se encuentra en el archivo components.js
            pieGraph('chart2', categorias, porcentajes, 'Porcentaje de productos por categoría');
        } else {
            document.getElementById('chart2').remove();
            console.log(DATA.error);
        }
    } catch (error) {
        console.error('Error fetching pie chart data:', error);
    }
}

// Función para generar el gráfico de ventas diarias (ejemplo, debes adaptar según tus datos reales)
const graficoVentasDiarias = () => {
    const ctx = document.getElementById('ventasDiarias').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
            datasets: [{
                label: 'Ventas diarias',
                data: [12, 19, 3, 5, 2, 3, 10],
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Función para generar el gráfico de productos más vendidos (ejemplo, debes adaptar según tus datos reales)
const graficoProductosMasVendidos = () => {
    const ctx = document.getElementById('productosMasVendidos').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Producto A', 'Producto B', 'Producto C', 'Producto D', 'Producto E'],
            datasets: [{
                label: 'Unidades vendidas',
                data: [12, 19, 3, 5, 2],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Función para generar el gráfico de marcas más vendidas (ejemplo, debes adaptar según tus datos reales)
const graficoMarcasMasVendidas = () => {
    const ctx = document.getElementById('marcasMasVendidas').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Marca A', 'Marca B', 'Marca C', 'Marca D', 'Marca E'],
            datasets: [{
                label: 'Ventas por marca',
                data: [300, 50, 100, 40, 120],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(153, 102, 255)'
                ]
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
}