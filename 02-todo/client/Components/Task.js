const Task = ({ title, description, date, completed }) => {
  let html = `
    <li class="mt-2 p-2 text-${tasks.color}  border-b border-cyan-300 ">
      <div class="flex items-center">
        <span class="mr-4 w-4 ">
          <input type="checkbox" />
        </span>`;

  !description && (html += `<span class="flex-1 text-${tasks.title.size}">${title}</span>`);

  description &&
    (html += `
        <details class="flex-1">
          <summary class="text-${tasks.title.size}">${title}</summary>
          <p class="${tasks.description.style} ml-4 mt-2">${description}</p>
        </details>`);
  html += `
        <span>${date}<span>
      </div>
    </li>`;
  return html;
};
