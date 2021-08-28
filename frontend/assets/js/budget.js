


const cargarPresupuestos = async () => {
    const token = localStorage.getItem("userInSession");
    const presupuestos = await serviceApi.getData('budgets', 'get', null, {
        "Accept": "*/*",
        "Content-type": 'application/json',
        "Authorization": `Bearer ${token}`
    });
    console.log(presupuestos);
    renderPresupuestos(presupuestos);
}

const renderPresupuestos = (presupuestos) => {
    const table = document.getElementById('tbody');
    presupuestos.forEach((presupuesto) => {
        const rowLabel = document.createElement('tr');
        rowLabel.className = "table-primary";
        const row = `
          <th scope="row">${presupuesto.budget_id}</th>
          <td>${presupuesto.createdAt}</td>
          <td>${presupuesto.project}</td>
          <td>${presupuesto.version}</td>
          <td>
            <a href="#"><abbr title="Editar Presupuesto" style="cursor: pointer"><i class="fas fa-pen-square"></i></abbr></a>
            <a href="#"><abbr title="Eliminar Presupuesto" style="cursor: pointer"><i class="fas fa-times-circle" style="color: red;"></i></abbr></a>
            <a href="#"><abbr title="Enviar Presupuesto" style="cursor: pointer"><i class="fas fa-paper-plane" style="color: green;"></i></abbr></a>
          </td>
        `;
        rowLabel.innerHTML = row;
        table.appendChild(rowLabel);
    })
}

cargarPresupuestos();