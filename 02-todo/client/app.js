window.addEventListener('load', () => {
  const form = new Form(document.getElementById('formContainer'));
  TodoList.setTodoList(document.getElementById('todoList'));
  initRender(form, todoList);
});

function initRender(form, todoList) {
  const fields = [
    { id: 'title', name: 'Titel: ', type: 'text' },
    { id: 'description', name: 'Beskrivning: ', type: 'textarea' },
    { id: 'date', name: 'Slutfört senast: ', type: 'date' }
  ];

  TodoList.render();
  form.render('todoForm', 'Todo', fields);
}
