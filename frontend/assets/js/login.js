
class Login {
    constructor(email, password) {
        this.email = email;
        this.password = password;
        this.token = "";
    }

    static async guardarUsuario(usuario) {
        localStorage.setItem("userInSession", usuario);
    }

    static async recuperarUsuario() {
        return localStorage.getItem("userInSession");
    }
}

async function login(email, password) {

    const usuario = { email, password };
    const apiCall = await serviceApi.getData('login', 'POST', usuario, {
        "Accept": "*/*",
        "Content-type": 'application/json',
    });
    if(apiCall.status) {
        await Login.guardarUsuario(apiCall.token);
        location.href = "index.html";
    } else {
        alert(apiCall.msg);
    }
}


async function validateForm(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    console.log(email, password);
    await login(email, password);
}


/**
 * Envia el JWT y devuelve si es válido
 * @returns {Promise<any|undefined>}
 * @constructor
 */
const ConfirmLogin = async () => {
    try {
        const token = await Login.recuperarUsuario();
        if(token) {
            return serviceApi.getData(`checkSession`, 'get', null, {
                "Accept": "*/*",
                "Content-type": 'application/json',
                "Authorization": `Bearer ${token}`
            });
        }
        return { status: false }
    } catch (e) {
        console.log("No ha iniciado sesión");
    }
}

/**
 * Si esta logeado lo redireccionamos a index.html
 * @returns {Promise<void>}
 */
async function load() {
    //Durante el tiempo que el JWT este activo login redireccionará a index.
    console.log('Entrando durante ONLOAD');
    let status_session = await ConfirmLogin();
    console.log(status_session);
    if (status_session.status) {
        location.href = "index.html";
    }
}

window.onload = load;

