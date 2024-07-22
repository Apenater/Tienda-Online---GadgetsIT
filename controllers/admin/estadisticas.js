// Constante para completar la ruta de la API.
const PRODUCTO_API = 'services/admin/producto.php';
const MARCA_API = 'services/admin/marca.php';
const CLIENTE_API = 'services/public/cliente.php';
const CATEGORIA_API = 'services/admin/categoria.php';
const PEDIDO_API = 'services/public/pedido.php';


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
    graficoDeMarca();
    graficoBarrasClientes();
    getCategoriaAdvancedStats();
    graficoCategoriasConInfo();
    graficoLineaPedidosFinalizados();
    graficoTopProductosVendidos();
    graficoTop5ProductosMasExistencias();
    graficoTop5ClientesConMasPedidos();
    graficoPredictVentas(); // Nueva función para el gráfico de predicción de ventas


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

// Función asíncrona para mostrar un gráfico de barras con las marcas más populares.
// Función asíncrona para mostrar un gráfico de pastel con las marcas más populares.
const graficoDeMarca = async () => {
    try {
        // Petición para obtener los datos del gráfico.
        const DATA = await fetchData(MARCA_API, 'getPopularBrands');
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje de error.
        if (DATA.status) {
            // Se declaran los arreglos para guardar los datos a graficar.
            let marcas = [];
            let cantidades = [];
            // Se recorre el conjunto de registros fila por fila a través del objeto row.
            DATA.dataset.forEach(row => {
                // Se agregan los datos a los arreglos.
                marcas.push(row.nombre_marca);
                cantidades.push(row.cantidad_productos);
            });
            // Llamada a la función para generar y mostrar un gráfico de pastel. Se encuentra en el archivo components.js
            pieGraph('chart3', marcas, cantidades, 'Marcas más populares');
        } else {
            console.error('Error al obtener datos de marcas:', DATA.error);
            if (DATA.exception) {
                console.error('Excepción:', DATA.exception);
            }
            // Mostrar un mensaje de error en lugar del gráfico
            document.getElementById('chart3').innerHTML = '<p>Error al cargar el gráfico de marcas</p>';
        }
    } catch (error) {
        console.error('Error en la función graficoDeMarca:', error);
    }
}

// Función asíncrona para mostrar un gráfico de barras con el número de clientes.
const graficoBarrasClientes = async () => {
    try {
        // Petición para obtener los datos del gráfico.
        const DATA = await fetchData(CLIENTE_API, 'countClients');
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
        if (DATA.status) {
            // Se declaran los arreglos para guardar los datos a graficar.
            let labels = ['Número total de clientes'];
            let cantidades = [DATA.dataset];
            // Llamada a la función para generar y mostrar un gráfico de barras. Se encuentra en el archivo components.js
            clientCountBarGraph('chart4', labels, cantidades, 'Cantidad de clientes', 'Número total de clientes registrados');
        } else {
            document.getElementById('chart4').remove();
            console.log(DATA.error);
        }
    } catch (error) {
        console.error('Error fetching client count data:', error);
    }
}


const getCategoriaAdvancedStats = async () => {
    try {
        // Petición para obtener los datos del gráfico.
        const DATA = await fetchData(CATEGORIA_API, 'getCategoriaAdvancedStats');
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
        if (DATA.status) {
            // Se declaran los arreglos para guardar los datos a graficar.
            let categorias = [];
            let totalProductos = [];
            let precioMinimo = [];
            let precioMaximo = [];
            let rangoPrecios = [];
            let precioMediana = [];
            // Se recorre el conjunto de registros fila por fila a través del objeto row.
            DATA.dataset.forEach(row => {
                // Se agregan los datos a los arreglos.
                categorias.push(row.nombre_categoria);
                totalProductos.push(row.total_productos);
                precioMinimo.push(row.precio_minimo);
                precioMaximo.push(row.precio_maximo);
                rangoPrecios.push(row.rango_precios);
                precioMediana.push(row.precio_mediana);
            });
            // Llamada a la función para generar y mostrar un gráfico de barras.
            getCategoriaAdvancedStatsss('chart5', categorias, totalProductos, precioMinimo, precioMaximo, rangoPrecios, precioMediana, 'Estadísticas Avanzadas de Categorías');
        } else {
            document.getElementById('chart5').remove();
            console.log(DATA.error);
        }
    } catch (error) {
        console.error('Error fetching advanced category stats:', error);
    }
}



const graficoCategoriasConInfo = async () => {
    try {
        // Petición para obtener los datos del gráfico.
        const DATA = await fetchData(CATEGORIA_API, 'contarCategoriasConInfo');
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
        if (DATA.status) {
            // Se declaran los arreglos para guardar los datos a graficar.
            let labels = ['Con descripción', 'Sin descripción'];
            let cantidades = [DATA.dataset.con_info, DATA.dataset.sin_info];
            // Llamada a la función para generar y mostrar un gráfico de pastel.
            pieGraph('chart6', labels, cantidades, 'Categorías con y sin descripción');
        } else {
            document.getElementById('chart6').remove();
            console.log(DATA.error);
        }
    } catch (error) {
        console.error('Error fetching categories info data:', error);
    }
}



// Función asíncrona para mostrar un gráfico de línea con los pedidos finalizados por día.
const graficoLineaPedidosFinalizados = async () => {
    try {
        // Petición para obtener los datos del gráfico.
        const DATA = await fetchData(PEDIDO_API, 'getFinishedOrders');
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje.
        if (DATA.status) {
            // Se declaran los arreglos para guardar los datos a graficar.
            let fechas = [];
            let totalPedidos = [];
            // Se recorre el conjunto de registros fila por fila a través del objeto row.
            DATA.dataset.forEach(row => {
                // Se agregan los datos a los arreglos.
                fechas.push(row.fecha);
                totalPedidos.push(row.total_pedidos);
            });
            // Llamada a la función para generar y mostrar un gráfico de líneas.
            if (fechas.length > 0 && totalPedidos.length > 0) {
                lineGraph('chart7', fechas, totalPedidos, 'Pedidos Finalizados', 'Pedidos finalizados por día');
            } else {
                // Mostrar un mensaje en el canvas si no hay datos
                const ctx = document.getElementById('chart7').getContext('2d');
                ctx.font = '20px Arial';
                ctx.fillText('No hay pedidos finalizados para mostrar', 10, 50);
            }
        } else {
            // Mostrar un mensaje en el canvas si hay un error
            const ctx = document.getElementById('chart7').getContext('2d');
            ctx.font = '20px Arial';
            ctx.fillText('Error al cargar los datos de pedidos finalizados', 10, 50);
        }
    } catch (error) {
        console.error('Error fetching finished orders data:', error);
        // Mostrar un mensaje de error en el canvas
        const ctx = document.getElementById('chart7').getContext('2d');
        ctx.font = '20px Arial';
        ctx.fillText('Error al cargar los datos', 10, 50);
    }
}

const graficoTopProductosVendidos = async () => {
    try {
        // Petición para obtener los datos del gráfico.
        const DATA = await fetchData(PEDIDO_API, 'getTopSellingProducts');
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje.
        if (DATA.status) {
            // Se declaran los arreglos para guardar los datos a graficar.
            let productos = [];
            let cantidades = [];
            // Se recorre el conjunto de registros fila por fila a través del objeto row.
            DATA.dataset.forEach(row => {
                // Se agregan los datos a los arreglos.
                productos.push(row.nombre_producto);
                cantidades.push(row.total_vendido);
            });
            // Llamada a la función para generar y mostrar un gráfico de barras.
            if (productos.length > 0 && cantidades.length > 0) {
                barGraphh('chart8', productos, cantidades, 'Cantidad vendida', 'Top 5 de productos más vendidos');
            } else {
                // Mostrar un mensaje en el canvas si no hay datos
                const ctx = document.getElementById('chart8').getContext('2d');
                ctx.font = '20px Arial';
                ctx.fillText('No hay datos de ventas para mostrar', 10, 50);
            }
        } else {
            // Mostrar un mensaje en el canvas si hay un error
            const ctx = document.getElementById('chart8').getContext('2d');
            ctx.font = '20px Arial';
            ctx.fillText('Error al cargar los datos de productos más vendidos', 10, 50);
        }
    } catch (error) {
        console.error('Error fetching top selling products data:', error);
        // Mostrar un mensaje de error en el canvas
        const ctx = document.getElementById('chart8').getContext('2d');
        ctx.font = '20px Arial';
        ctx.fillText('Error al cargar los datos', 10, 50);
    }

}

// Función asíncrona para mostrar un gráfico de barras con los 5 productos con más existencias.
const graficoTop5ProductosMasExistencias = async () => {
    try {
        // Petición para obtener los datos del gráfico.
        const DATA = await fetchData(PRODUCTO_API, 'top5ProductosMasExistencias');
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
        if (DATA.status) {
            // Se declaran los arreglos para guardar los datos a graficar.
            let productos = [];
            let existencias = [];
            // Se recorre el conjunto de registros fila por fila a través del objeto row.
            DATA.dataset.forEach(row => {
                // Se agregan los datos a los arreglos.
                productos.push(row.nombre_producto);
                existencias.push(row.existencias_producto);
            });
            // Llamada a la función para generar y mostrar un gráfico de barras.
            top5ProcutMasExi('chart9', productos, existencias, 'Cantidad de existencias', 'Top 5 productos con más existencias');
        } else {
            document.getElementById('chart9').remove();
            console.log(DATA.error);
        }
    } catch (error) {
        console.error('Error fetching top 5 products with most stock:', error);
    }
}


const graficoTop5ClientesConMasPedidos = async () => {
    try {
        // Petición para obtener los datos del gráfico.
        const DATA = await fetchData(PEDIDO_API, 'top5ClientesConMasPedidos');
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se remueve la etiqueta canvas.
        if (DATA.status) {
            // Se declaran los arreglos para guardar los datos a graficar.
            let clientes = [];
            let totalPedidos = [];
            // Se recorre el conjunto de registros fila por fila a través del objeto row.
            DATA.dataset.forEach(row => {
                // Se agregan los datos a los arreglos.
                clientes.push(row.nombre_cliente);
                totalPedidos.push(row.total_pedidos);
            });
            // Llamada a la función para generar y mostrar un gráfico de barras.
            top5ClientesMasPedi('chart10', clientes, totalPedidos, 'Cantidad de pedidos', 'Top 5 clientes con más pedidos');
        } else {
            document.getElementById('chart10').remove();
            console.log(DATA.error);
        }
    } catch (error) {
        console.error('Error fetching top 5 clients with most orders:', error);
    }
}


// Función para generar un gráfico de líneas con las predicciones de ventas futuras
const graficoPredictVentas = async () => {
    try {
        // Petición para obtener los datos del gráfico.
        const DATA = await fetchData(PEDIDO_API, 'predictFutureSales');
        // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje.
        if (DATA.status) {
            // Se declaran los arreglos para guardar los datos a graficar.
            let fechas = [];
            let ventasPrevistas = [];
            // Se recorre el conjunto de registros fila por fila a través del objeto row.
            DATA.dataset.forEach(row => {
                // Se agregan los datos a los arreglos.
                fechas.push(row.fecha);
                ventasPrevistas.push(row.ventas_previstas);
            });
            // Llamada a la función para generar y mostrar un gráfico de líneas.
            if (fechas.length > 0 && ventasPrevistas.length > 0) {
                multiLineGraph('chart11', fechas, ventasPrevistas, 'Ventas Previstas ($)', 'Predicción de ventas futuras');
            } else {
                // Mostrar un mensaje en el canvas si no hay datos
                const ctx = document.getElementById('chart11').getContext('2d');
                ctx.font = '20px Arial';
                ctx.fillText('No hay datos de predicción para mostrar', 10, 50);
            }
        } else {
            // Mostrar un mensaje en el canvas si hay un error
            const ctx = document.getElementById('chart11').getContext('2d');
            ctx.font = '20px Arial';
            ctx.fillText('Error al cargar los datos de predicción de ventas', 10, 50);
        }
    } catch (error) {
        console.error('Error fetching sales prediction data:', error);
        // Mostrar un mensaje de error en el canvas
        const ctx = document.getElementById('chart11').getContext('2d');
        ctx.font = '20px Arial';
        ctx.fillText('Error al cargar los datos de predicción', 10, 50);
    }
}