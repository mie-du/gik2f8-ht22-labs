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
