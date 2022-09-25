class Form {
  constraints = {
    title: {
      length: {
        min: 2,
        max: 100,
        message: 'Titeln måste vara mellan %min och %max tecken.'
      } /* ,
      number: {
        min: 1,
        max: 100,
        message: 'Nummer måste vara mellan %min och %max.'
      } */
    },
    description: {
      length: { max: 500, message: 'Beskrivningen får maximalt vara %max' }
    },
    date: {
      required: 'Datum får inte vara tomt.'
    }
  };
  validation = null;

  constructor() {
    this.validation = new Validation(this.constraints);
  }
  render = (id, name, fields) => {
    let html = `
      <form id="${id}" name="${id}">`;

    fields.forEach((field) => {
      html += InputSection(field);
    });

    html += `
        <button name="submit${name}" disabled class="rounded-md bg-yellow-500 hover:bg-yellow-400 px-4 py-1"
        type="submit">Spara</button>
      </form>`;

    return html;
  };

  addListeners = () => {
    todoForm.title.addEventListener('keyup', (e) => validateField(e.target));
    todoForm.title.addEventListener('blur', (e) => validateField(e.target));
    todoForm.description.addEventListener('keyup', (e) => validateField(e.target));
    todoForm.description.addEventListener('blur', (e) => validateField(e.target));
    todoForm.date.addEventListener('keyup', (e) => validateField(e.target));
    todoForm.date.addEventListener('blur', (e) => validateField(e.target));
    todoForm.addEventListener('submit', onSubmit);
  };

  validateField = (field) => {
    const messageElement = field.previousElementSibling;
    const validationErrors = validation.validate(field);

    if (!validationErrors) {
      messageElement.classList.remove('message--visible');
      messageElement.innerHTML = '';
      todoForm.submitTodo.disabled = false;
    } else {
      messageElement.classList.add('message--visible');
      messageElement.innerHTML = 'Valideringsfel: ' + validationErrors;
      todoForm.submitTodo.disabled = true;
    }
  };
}
