const constraints = {
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
const validation = new Validation(constraints);
const todoListElement = document.getElementById('todoList');
const formContainer = document.getElementById('formContainer');

window.addEventListener('load', () => {
  fetchData();
  initRender();
  addListeners();
});

function initRender() {
  const fields = [
    { id: 'title', name: 'Titel: ', type: 'text' },
    { id: 'description', name: 'Beskrivning: ', type: 'textarea' },
    { id: 'date', name: 'Slutfört senast: ', type: 'date' }
  ];
  formContainer.insertAdjacentHTML('beforeend', Form('todoForm', 'Todo', fields));
}

function addListeners() {
  todoForm.title.addEventListener('keyup', (e) => validateField(e.target));
  todoForm.title.addEventListener('blur', (e) => validateField(e.target));
  todoForm.description.addEventListener('keyup', (e) => validateField(e.target));
  todoForm.description.addEventListener('blur', (e) => validateField(e.target));
  todoForm.date.addEventListener('keyup', (e) => validateField(e.target));
  todoForm.date.addEventListener('blur', (e) => validateField(e.target));
  todoForm.addEventListener('submit', onSubmit);
}

function fetchData() {
  getAll().then((todoList) => {
    todoList.forEach((todo) => todoListElement.insertAdjacentHTML('beforeend', Task(todo)));
  });
}

function validateField(field) {
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
}

function onSubmit(e) {
  e.preventDefault();
  const { title, description, date } = todoForm;
  console.log(title, description);
  validateField(title);
  validateField(description);
  validateField(date);

  if (validation.isValid()) {
    const todo = { title: title.value, description: description.value, completed: false };
    console.log(todo);
    create(todo).then((savedTodo) => {
      console.log(savedTodo);
      todoListElement.insertAdjacentHTML('beforeend', Task(savedTodo.data));
    });
  }
}
