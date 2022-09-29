const Task = ({ id, title, description, date, completed }) => {
  let html = `
    <li class="select-none mt-2 p-2 border-b border-cyan-300 ">
      <div class="flex items-center">        
          <input id="task${id}" class="appearance-none ring-offset-4 ring-2 ring-yellow-500 rounded-sm 
          checked:border-green-500 checked:ring-green-500 checked:bg-green-300 h-4 w-4 mr-4" type="checkbox" />
        `;

  !description && (html += `<label for="task${id}" class="flex-1 text-${styles.task.title.size}">${title}</label>`);

  description &&
    (html += `
        <details class="flex-1">
          <summary class="text-${styles.task.title.size}"><label for="task${id}">${title}</label></summary>
          <p class="${styles.task.description.style} ml-4 mt-2">${description}</p>
        </details>`);
  html += `
        <span>${date}<span>
      </div>
    </li>`;
  return html;
};
