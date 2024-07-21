// Constante para completar la ruta de la API.
const PRODUCTO_API = 'services/admin/producto.php';
const MARCA_API = 'services/admin/marca.php';
const CLIENTE_API = 'services/public/cliente.php';
const CATEGORIA_API = 'services/admin/categoria.php';


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