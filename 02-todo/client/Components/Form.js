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
  formContainer = null;

  constructor(formContainer) {
    this.validation = new Validation(this.constraints);
    this.formContainer = formContainer;
  }
  render = (id, name, fields, formContainer) => {
    let html = `
      <form id="${id}" name="${id}">`;

    fields.forEach((field) => {
      html += InputSection(field);
    });

    html += `
        <button name="submit${name}" disabled class="${styles.rounded} bg-yellow-500 hover:bg-yellow-400 px-4 py-1"
        type="submit">Spara</button>
      </form>`;

    this.formContainer.insertAdjacentHTML('beforeend', html);
    this.addListeners();
  };

  addListeners = () => {
    todoForm.title.addEventListener('keyup', (e) =>
      this.validateField(e.target)
    );
    todoForm.title.addEventListener('blur', (e) =>
      this.validateField(e.target)
    );
    todoForm.description.addEventListener('keyup', (e) =>
      this.validateField(e.target)
    );
    todoForm.description.addEventListener('blur', (e) =>
      this.validateField(e.target)
    );
    todoForm.date.addEventListener('keyup', (e) =>
      this.validateField(e.target)
    );
    todoForm.date.addEventListener('blur', (e) => this.validateField(e.target));
    todoForm.addEventListener('submit', this.onSubmit);
  };

  validateField = (field) => {
    const messageElement = field.previousElementSibling;
    const validationErrors = this.validation.validate(field);

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

  onSubmit = (e) => {
    e.preventDefault();
    const { title, description, date } = todoForm;

    this.validateField(title);
    this.validateField(description);
    this.validateField(date);

    if (this.validation.isValid()) {
      const todo = {
        title: title.value,
        description: description.value,
        date: date.value,
        completed: false
      };

      create(todo).then((response) => {
        response.status === 'success' && TodoList.render();
      });
    }
  };
}
