const Task = ({ title, description, date, completed }) => {
  let html = `
    <li class="mt-2 p-2 text-${styles.task.color}  border-b border-cyan-300 ">
      <div class="flex items-center">
        <span class="mr-4 w-4 ">
          <input onchange="taskStatusChange" type="checkbox" />
        </span>`;

  !description && (html += `<span class="flex-1 text-${styles.task.title.size}">${title}</span>`);

  description &&
    (html += `
        <details class="flex-1">
          <summary class="text-${styles.task.title.size}">${title}</summary>
          <p class="${styles.task.description.style} ml-4 mt-2">${description}</p>
        </details>`);
  html += `
        <span>${date}<span>
      </div>
    </li>`;
  return html;
};
