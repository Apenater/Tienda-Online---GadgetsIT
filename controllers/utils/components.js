// Constante para establecer la ruta base del servidor.
const SERVER_URL = 'http://localhost/Tienda-Online---GadgetsIT/api/';

/*
*   Función para mostrar un mensaje de confirmación.
*   Requiere la librería sweetalert para funcionar.
*   Parámetros: message (mensaje de confirmación).
*   Retorno: resultado de la promesa.
*/
const confirmAction = (message) => {
    return swal({
        title: 'Advertencia',
        text: message,
        icon: 'warning',
        closeOnClickOutside: false,
        closeOnEsc: false,
        buttons: {
            cancel: {
                text: 'No',
                value: false,
                visible: true
            },
            confirm: {
                text: 'Sí',
                value: true,
                visible: true
            }
        }
    });
}

/*
*   Función asíncrona para manejar los mensajes de notificación al usuario.
*   Requiere la librería sweetalert para funcionar.
*   Parámetros: type (tipo de mensaje), text (texto a mostrar), timer (uso de temporizador) y url (valor opcional con la ubicación de destino).
*   Retorno: ninguno.
*/
const sweetAlert = async (type, text, timer, url = null) => {
    // Se compara el tipo de mensaje a mostrar.
    switch (type) {
        case 1:
            title = 'Éxito';
            icon = 'success';
            break;
        case 2:
            title = 'Error';
            icon = 'error';
            break;
        case 3:
            title = 'Advertencia';
            icon = 'warning';
            break;
        case 4:
            title = 'Aviso';
            icon = 'info';
            break;
    }
    // Se declara una constante tipo objeto con las opciones disponibles.
    const OPTIONS = {
        title: title,
        text: text,
        icon: icon,
        closeOnClickOutside: false,
        closeOnEsc: false
    };
    // Se evalúa el uso del temporizador.
    if (timer) {
        OPTIONS.timer = 3000;
        OPTIONS.button = false;
        // Se muestra el mensaje de confirmación.
        await swal(OPTIONS);
    } else {
        OPTIONS.button = 'Aceptar';
        // Se muestra el mensaje de confirmación y se espera la acción del usuario.
        await swal(OPTIONS);
    }
    // Se verifica la url para realizar la redirección.
    if (url) {
        location.href = url
    }
}

/*
*   Función para generar un gráfico de barras.
*   Requiere la librería Chart para funcionar.
*   Parámetros: canvas (identificador del lienzo), xAxis (valores para el eje x), yAxis (valores para el eje y), legend (leyenda de los datos) y title (título del gráfico).
*   Retorno: ninguno.
*/
const barGraph = (canvas, xAxis, yAxis, legend, title) => {
    const context = document.getElementById(canvas).getContext('2d');
    const chart = new Chart(context, {
        type: 'bar',
        data: {
            labels: xAxis,
            datasets: [{
                label: legend,
                data: yAxis,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                },
                title: {
                    display: true,
                    text: title
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

/*
*   Función para generar un gráfico de pastel.
*   Requiere la librería Chart para funcionar.
*   Parámetros: canvas (identificador del lienzo), labels (etiquetas de los datos), values (valores de los datos) y title (título del gráfico).
*   Retorno: ninguno.
*/
const pieGraph = (canvas, labels, values, title) => {
    const context = document.getElementById(canvas).getContext('2d');
    const chart = new Chart(context, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                },
                title: {
                    display: true,
                    text: title
                }
            }
        }
    });
}

/*
*   Función asíncrona para realizar peticiones a la API.
*   Parámetros: api (ruta de la API) y action (acción solicitada).
*   Retorno: objeto con los datos de la respuesta.
*/
const fetchData = async (api, action) => {
    const response = await fetch(`${SERVER_URL}${api}`, {
        method: 'POST',
        body: new URLSearchParams({ action: action })
    });
    return await response.json();
}
