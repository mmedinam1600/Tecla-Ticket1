const host = `localhost`;
const port = `3000`;
const protocol = `http`;
const baseUrl = `${protocol}://${host}:${port}/`;


class ServiceApi {
  async getData(uri, method = 'get', body  = null, headers = {}) {
    try {
      const data = await fetch(`${baseUrl}${uri}`, {method, body: body ? JSON.stringify(body): null, headers});
      return data.json();
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

const serviceApi = new ServiceApi();



function CerrarSesion() {
  if (localStorage.getItem('userInSession')) {
    console.log('Cerrando sesion')
    localStorage.removeItem('userInSession')
    location.href = "login.html";
  } else {
    alert('No ha iniciado sesión');
  }
}