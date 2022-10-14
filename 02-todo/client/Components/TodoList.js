const TodoList = {
  setTodoList(todoList) {
    this.todoList = todoList;
  },

  render() {
    getAll().then((response) => {
      console.log('rendering', response);

      this.todoList.innerHTML = '';
      response.status === 'success' &&
        response.data.forEach((task) => {
          const html = this.renderTask(task);
          task.completed
            ? this.todoList.insertAdjacentHTML('beforeend', html)
            : this.todoList.insertAdjacentHTML('afterbegin', html);

          this.addTaskListener(task);
        });
    });
  },
  addTaskListener({ id }) {
    document
      .getElementById(`task${id}Checkbox`)
      .addEventListener('change', (e) => this.onChecked(id, e.target.checked));

    document.getElementById(`task${id}DeleteBtn`).addEventListener('click', () => this.onDelete(id));
  },

  renderTask(task) {
    this.task = task;
    const { id, title, description, completed, date } = task;
    console.log(completed ? styles.task.completedColor : styles.task.color);

    let html = `
     <li class="select-none mt-2 p-2 border-b border-amber-300 ">
       <div class="flex items-center">        
           <input id="task${id}Checkbox" class="appearance-none ring-offset-4 ring-2 ring-yellow-500 rounded-full 
           checked:border-green-500 checked:ring-green-500 checked:bg-green-300 h-4 w-4 mr-4" ${
             completed ? 'checked' : ''
           } type="checkbox" />
         `;

    !description &&
      (html += `<label for="task${id}Checkbox" class="flex-1 ${styles.task.title.size} ${
        completed ? styles.task.completedColor : styles.task.color
      }">${title}</label>`);

    description &&
      (html += `
         <details class="flex-1">
           <summary class="${styles.task.title.size}">
              <label for="taskId${id}Checkbox" class="${
        completed ? styles.task.completedColor : styles.task.color
      }">${title}
              </label>
            </summary>
           <p class="${styles.task.description.style} ml-4 mt-2">${description}</p>
         </details>`);
    html += `
         <span>${date}<span>
         <span id="task${id}DeleteBtn" class="inline-block bg-amber-500 text-xs text-amber-900 border border-white px-3 py-1 rounded-md ml-2">Ta bort<span>
       </div>
     </li>`;
    return html;
  },

  onChecked(id, checked) {
    console.log('Check id: ', id, checked);
    setCompleted(id, checked).then((response) => response.status == 'success' && this.render());
  },

  onDelete(id) {
    console.log('Delete id: ', id);
    remove(id).then((response) => response.status == 'success' && this.render());
  }
};
