const Task = ({ title, description, completed }) => {
  let html = `<li class="mt-2 p-2 text-md border-b border-cyan-300">
              <span class="mr-5"><input type="checkbox" /></span><span>${title}</span>`;

  description &&
    (html += `<details class="text-sm mt-3 p-3"><summary>Detaljer</summary><p class="mt-2 ml-3">${description}</p></details>`);
  html += `</li>`;
  return html;
};
