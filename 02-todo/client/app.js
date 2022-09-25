const todoListElement = document.getElementById('todoList');
const formContainer = document.getElementById('formContainer');
const form = new Form();

window.addEventListener('load', () => {
  fetchData();
  initRender();
});

function initRender() {
  const fields = [
    { id: 'title', name: 'Titel: ', type: 'text' },
    { id: 'description', name: 'Beskrivning: ', type: 'textarea' },
    { id: 'date', name: 'Slutfört senast: ', type: 'date' }
  ];

  formContainer.insertAdjacentHTML('beforeend', form.render('todoForm', 'Todo', fields));
  form.addListeners();
}

function fetchData() {
  getAll().then((response) => {
    console.log(response);
    response.status === 'success' &&
      response.data.forEach((todo) => todoListElement.insertAdjacentHTML('beforeend', Task(todo)));
  });
}

function onSubmit(e) {
  e.preventDefault();
  const { title, description, date } = todoForm;
  console.log(title, description);
  form.validateField(title);
  form.validateField(description);
  form.validateField(date);

  if (validation.isValid()) {
    const todo = { title: title.value, description: description.value, date: date.value, completed: false };

    create(todo).then((response) => {
      console.log(response);
      response.status === 'success' && todoListElement.insertAdjacentHTML('beforeend', Task(response.data));
    });
  }
}
