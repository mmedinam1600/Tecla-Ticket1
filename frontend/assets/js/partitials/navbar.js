

const headerLoginTemplate = document.createElement('nav');
headerLoginTemplate.className = 'navbar navbar-light bg-beige shadow';
headerLoginTemplate.innerHTML = `
  <nav class="navbar navbar-light bg-beige shadow">
    <div class="container-fluid">
      <a class="navbar-brand" type="default" target="_self" href="../../../index.html" rel="noopener noreferrer">Ticket 1</a>
      <div class="navbar-text">
        <span>¿No tienes una cuenta?</span>
        <a href="../../../register.html" type="default" target="_self" rel="noopener noreferrer">Registrate</a>
      </div>
    </div>
  </nav>
`;

const headerMainTemplate = document.createElement('nav');
headerMainTemplate.className = 'navbar navbar-light bg-beige shadow';
headerMainTemplate.innerHTML = `
  <div class="container-fluid">
    <a class="navbar-brand" type="default" target="_self" href="../../../index.html" rel="noopener noreferrer">Ticket 1</a>
    <div class="navbar-text">
      <span>¿No tienes una cuenta?</span>
      <a href="../../../register.html" type="default" target="_self" rel="noopener noreferrer">Registrate</a>
    </div>
  </div>
`;

export {
  headerLoginTemplate,
  headerMainTemplate
}