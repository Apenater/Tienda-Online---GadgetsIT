// Event listener para el formulario de inicio de sesión
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que se envíe el formulario

    // Obtiene los valores de correo electrónico y contraseña
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Comprueba si el correo electrónico y la contraseña son correctos
    if (email === 'admin@gmail.com' && password === '1234') {
        // Redirige a la página de estadísticas del administrador
        window.location.href = '../../views/admin/Estadisticas.html';
    } else {
        // Muestra una alerta si las credenciales son incorrectas
        alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
});

// Event listener para el botón de la tienda
document.getElementById('store-btn').addEventListener('click', function() {
    // Redirige a la página de categorías de la tienda
    window.location.href = '../../views/public/categorias.html';
});

// Event listener para el formulario de primer uso
document.getElementById('firts-use-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que se envíe el formulario
    // Redirige a la página de estadísticas del administrador
    window.location.href = '../../views/admin/Estadisticas.html';
});
