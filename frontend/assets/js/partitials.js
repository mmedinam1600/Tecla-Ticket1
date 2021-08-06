import { headerLoginTemplate, headerMainTemplate } from './partitials/navbar.js';
import { footerLoginTemplate, footerMainTemplate  } from "./partitials/footer.js";

function loadPartitials() {
  const headerMain = document.getElementById('headerMain');
  const headerLogin = document.getElementById('headerLogin');
  const footerLogin = document.getElementById('footerLogin');
  const footerMain = document.getElementById('footerMain');
  if (headerMain !== null) headerMain.appendChild(headerMainTemplate);
  if (headerLogin !== null) headerLogin.appendChild(headerLoginTemplate);
  if (footerMain !== null) footerMain.appendChild(footerLoginTemplate);
  if (footerLogin !== null) footerLogin.appendChild(footerMainTemplate);
}

loadPartitials();