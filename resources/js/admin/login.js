document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if (email === 'admin@gmail.com' && password === '1234') {
        window.location.href = '../../views/admin/Estadisticas.html';
    } else {
        alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
    }
});

document.getElementById('store-btn').addEventListener('click', function() {
    window.location.href = '../../views/public/categorias.html';
});

document.getElementById('firts-use-form').addEventListener('submit', function(event) {
    event.preventDefault();
    window.location.href = '../../views/admin/Estadisticas.html';
});