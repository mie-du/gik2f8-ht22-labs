const TodoList = {
  setTodoList(todoList) {
    this.todoList = todoList;
  },

  render() {
    getAll().then((response) => {
      console.log('rendering', response);

      this.todoList.innerHTML = '';

      response.status === 'success' &&
        response.data
          .reduce(
            (result, element) => {
              /* Completed element in the second array by using true = 1, false = 0 */
              result[Number(element.completed)].push(element);
              return result;
            },
            [[], []]
          )
          /* For each array */
          .forEach((arr) => {
            /* Sort it and then add it */
            arr
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .forEach((task) => {
                this.todoList.insertAdjacentHTML('beforeend', this.renderTask(task));
                this.addTaskListener(task);
              });
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

    let button = `
      <button onclick="handleClick()">Button</button>`;

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
         <span class="flex items-center text-sm">${date}<span>
         <button id="task${id}DeleteBtn" class="inline-block bg-amber-500 text-xs text-amber-900 border border-white px-2 lg:px-3 py-1 rounded-md ml-2">Ta bort</button>
       </div>
     </li>`;
    return html;
  },

  onChecked(id, checked) {
    console.log('Setting completed', id);
    console.log('Check id: ', id, checked);
    setCompleted(id, checked).then((response) => response.status == 'success' && this.render());
  },

  onDelete(id) {
    console.log('Delete id: ', id);
    remove(id).then((response) => response.status == 'success' && this.render());
  }
};
