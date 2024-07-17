const USER_API = 'services/admin/administrador.php';
const SIGNUP_FORM = document.getElementById('signup-Form');


SIGNUP_FORM.addEventListener('submit', async (event) => {
    event.preventDefault();
    const FORM = new FormData(SIGNUP_FORM);
    const DATA = await fetchData(USER_API, 'signUp', FORM);
    if (DATA.status) {
        sweetAlert(1, DATA.message, true, 'index.html');
    } else {
        sweetAlert(2, DATA.error, false);
    }
});