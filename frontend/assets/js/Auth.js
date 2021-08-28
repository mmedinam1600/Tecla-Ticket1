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


async function load() {
    console.log('Entrando durante ONLOAD');
    let status_session = await ConfirmLogin();
    console.log(status_session);
    if (!status_session.status) {
        location.href = "login.html";
    } else {
        const texto = document.getElementById('texto');
        console.log(texto);
        texto.innerHTML = `Bienvenido ${status_session.nickname}. Correo: ${status_session.email}`;
    }
}

window.onload = load;