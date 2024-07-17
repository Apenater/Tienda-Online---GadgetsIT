const USER_API = 'services/admin/administrador.php';
const LOGIN_FORM = document.getElementById('login-form');

document.addEventListener('DOMContentLoaded', async () => {
     const DATA = await fetchData(USER_API, 'readUsers');
     if (DATA.session) {
         location.href = 'Estadisticas.html';
     } else if (DATA.status) {
         LOGIN_FORM.classList.remove('d-none');
         sweetAlert(4, DATA.message, true);
     } else {;
         location.href = 'primer_uso.html';
         sweetAlert(4, DATA.error, true);
     }
 });


LOGIN_FORM.addEventListener('submit', async (event) => {
     event.preventDefault();
     const FORM = new FormData(LOGIN_FORM);
     const DATA = await fetchData(USER_API, 'logIn', FORM);
     if (DATA.status) {
         sweetAlert(1, DATA.message, true, 'Estadisticas.html');
     } else {
         sweetAlert(2, DATA.error, false);
     }
 });