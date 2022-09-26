const Task = ({ id, title, description, date, completed }) => {
  let html = `
    <li class="select-none mt-2 p-2 border-b border-cyan-300 ">
      <div class="flex items-center">        
          <input class="appearance-none ring-offset-4 ring-2 ring-yellow-500 rounded-sm 
          checked:border-green-500 checked:ring-green-500 checked:bg-green-300 h-4 w-4 mr-4" ${
            completed ? 'checked' : ''
          } onchange="taskStatusChange(event, ${id})" type="checkbox" />
        `;

  !description && (html += `<label for="taskId${id}" class="flex-1 text-${styles.task.title.size}">${title}</label>`);

  description &&
    (html += `
        <details class="flex-1">
          <summary class="text-${styles.task.title.size}"><label for="taskId${id}">${title}</label></summary>
          <p class="${styles.task.description.style} ml-4 mt-2">${description}</p>
        </details>`);
  html += `
        <span>${date}<span>
      </div>
    </li>`;
  return html;
};

const taskStatusChange = (e, id) => {
  setCompleted(id, e.target.checked);
};
