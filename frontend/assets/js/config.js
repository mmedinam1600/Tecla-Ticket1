const host = `localhost`;
const port = `3000`;
const protocol = `http`;
const baseUrl = `${protocol}://${host}:${port}/`;


class ServiceApi {
  async getData(uri, method = 'get', body, headers = {}) {
    try{
      const data = await fetch(`${baseUrl}${uri}`, {method, body, headers});
      return data.json();
    } catch (e) {
      throw new Error(e.message);
    }
  }
}

const serviceApi = new ServiceApi();