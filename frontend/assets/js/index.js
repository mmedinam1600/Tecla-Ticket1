class Table {

  constructor() {
    this.months = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre'
    ];
    this.monthsAdded = [];
  }

  createColumn(tableName, month) {
    const columns = document.querySelectorAll(`.table_${tableName} tr`);
    const index = document.getElementsByClassName(`table_number_${tableName}`)[0].childElementCount;
    const values = this.getValues(tableName, month);
    for (let i = 0; i < columns.length; i++) {
      const x = columns[i].insertCell(index - 1);
      x.innerHTML = values[i];
    }
  }

  removeColumn(tableName) {
    const columns = document.querySelectorAll(`.table_${tableName} tr`);
    const index = document.getElementsByClassName(`table_number_${tableName}`)[0].childElementCount;
    if ((index >= 3 && tableName !== 'R') || (index >= 4 && tableName === 'R')) {
      const month = columns[0].children[index - 2].textContent; //Obtenemos el nombre de la que vamos a borrar
      const monthIndex = this.monthsAdded.findIndex(element => element === month);
      this.monthsAdded.splice(monthIndex, 1);
      for (let i = 0; i < columns.length; i++) {
        columns[i].deleteCell(index - 2);
      }
    }
  }

  createRow(tableName, concept) {
    console.log(tableName, concept);
    const tr = document.createElement('tr');
    const elementToInsertBefore = document.getElementsByClassName(`table_number_${tableName}`)[0];
    const numberColumns = elementToInsertBefore.childElementCount;
    console.log(elementToInsertBefore);

    tr.innerHTML = `<td><button type="button" class="btn"><i class="fas fa-times-circle" style="color: red;"></i></button>${concept}</td>`
    for (let i = 0; i < numberColumns - 2; i++) {
      tr.innerHTML += `<td><input type="text" class="form-control"/></td>`
      console.log("Hay " + numberColumns + " columnas");
    }
    tr.innerHTML += `<td>$<span>0.00</span></td>`
    elementToInsertBefore.after(tr);

    console.log("Row created");
  }

  removeRow() {
    console.log("Se borro la ultima columna");
  }

  async deleteColumnConfirmation() {
    const message = await Swal.fire({
      title: 'Estas seguro?',
      text: "No podras revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borra la columna!'
    });
    return message.isConfirmed;
  }

  validateMonth(month) {
    if (!this.months.some(element => element === month)) return false;//Verificamos que sea un mes válido (hablando tipadamente)
    if (this.monthsAdded.some(element => element === month)) return false;
    this.monthsAdded.push(month);
    return true;
  }

  getValues(tableName, month) {
    let values = [];
    switch (tableName) {
      case 'FE':
        values = [
          `${month}`, //Titulo
          `<input type="text" name="flujo-efectivo-ingresos" class="form-control numonly"/>`, //Ingresos
          `$<span>0.00</span>`, //Egresos
          `$<span>0.00</span>`, //Total (Valores negativos en rojo)
          `$<span>0.00</span>`, //Acumulado
        ];
        break;
      case 'ER':
        values = [
          `${month}`, //Titulo
          `$<span>0.00</span>`, //Ventas
          `$<span>0.00</span>`, //Costos
          `$<span>0.00</span>`, //Margen
          `$<span>0.00</span>`, //Saldo Final
        ];
        break;
      case 'I':
      case 'CD':
      case 'CA':
      case 'C':
      case 'RCR':
      case 'R':
        const numberRows = document.getElementsByClassName(`table_${tableName}`)[0].childElementCount;
        console.log(numberRows);
        values.push(`${month}`);
        for (let i = 0; i < numberRows - 2; i++) {
          values.push(`<input type="text" class="form-control"/>`);
        }
        values.push(`$<span>0.00</span>`);
        break;
    }
    return values;
  }


  updateTotal() {

  }

  updateEgresos() {

  }

  updateAcumulado() {

  }

  updateTotalMonth() {

  }

  sendError(text) {
    Swal.fire({
      title: 'Ops!',
      text,
      icon: 'error',
      confirmButtonText: 'Ok',
      showClass: {
        popup: 'animate__animated animate__wobble'
      },
      hideClass: {
        popup: 'animate__animated animate__backOutDown'
      }
    });
  }

}

const table = new Table();

const buttonCreateColumn = document.querySelector('.modal-footer .crearColumna');
const buttonDeleteColumn = document.querySelector('button.borrarColumna');
const buttonCreateRow = document.querySelector('button.crearFila');


// EVENTS

buttonCreateColumn.addEventListener('click', () => {
  const month = document.getElementById('selectMonth').value;
  if (!table.validateMonth(month)) return table.sendError('El mes ingresado ya fue agregado o no existe');
  table.createColumn('FE', month);
  table.createColumn('ER', month);
  table.createColumn('I', month);
  table.createColumn('CD', month);
  table.createColumn('CA', month);
  table.createColumn('R', month);
  table.createColumn('C', month);
  table.createColumn('RCR', month);
  buttonDeleteColumn.classList.remove('disabled');
});

buttonDeleteColumn.addEventListener('click', async () => {
  if (await table.deleteColumnConfirmation()) {
    table.removeColumn('FE');
    table.removeColumn('ER');
    table.removeColumn('I');
    table.removeColumn('CD');
    table.removeColumn('CA');
    table.removeColumn('R');
    table.removeColumn('C');
    table.removeColumn('RCR');
    Swal.fire(
      'Borrada!',
      'La columna ha sido borrada.',
    );
    const index = document.getElementsByClassName(`table_number_FE`)[0].childElementCount;
    if (index <= 2) {
      buttonDeleteColumn.classList.add('disabled');
    }
  }
});

buttonCreateRow.addEventListener('click', () => {
  const concept = document.getElementById('concept').value;
  table.createRow('I', concept);
  document.getElementById('concept').value = "";
  /*
  for (let i = 0; i < 10; i++) {
    let tr = document.createElement('tr');
    const row = `
    <td>Hola ${i}</td>
    <td>Hola ${i}</td>`
    tr.innerHTML = row;
    document.getElementById('tableExample').prepend(tr);
  }*/
});

$('#modalAgregarFila').on('hidden.bs.modal', function (event) {
  /*const inputs = event.target.getElementsByClassName('reset');
  for (const input of inputs) {
    input.value = "";
  }*/
});

$('#modalAgregarFila').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var recipient = button.data('whatever') // Extract info from data-* attributes
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this)
  modal.find('.modal-title').text('New message to ' + recipient)
  modal.find('.modal-body input').val(recipient)
})

// GLOBAL EVENT
window.addEventListener('load', (event) => {

});