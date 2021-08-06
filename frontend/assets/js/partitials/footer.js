
const footerLoginTemplate = document.createElement('div');
footerLoginTemplate.className = 'text-center text-lg-start bg-beige text-muted';
footerLoginTemplate.innerHTML = `
  <div class="text-center p-4">
    © 2021 Realizado por Miguel Medina:
    <a class="text-reset fw-bold" href="https://github.com/ELCapiPrice" target="_blank">Github</a>
  </div>
`;

const footerMainTemplate = document.createElement('div');
footerMainTemplate.className = 'text-center text-lg-start bg-beige text-muted';
footerMainTemplate.innerHTML = `
  <div class="text-center p-4">
    © 2021 Realizado por Miguel Medina:
    <a class="text-reset fw-bold" href="https://github.com/ELCapiPrice" target="_blank">Github</a>
  </div>
`;

export {
  footerLoginTemplate,
  footerMainTemplate
}