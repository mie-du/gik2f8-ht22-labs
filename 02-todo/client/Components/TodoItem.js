const TodoItem = ({ title, description, completed }) => {
  let html = `<li class="w-5/6 xl:w-2/3 mt-6 mx-auto bg-white bg-opacity-50 p-5 rounded-lg text-lg">
              <span class="mr-5"><input type="checkbox" /></span><span>${title}</span>`;

  description &&
    (html += `<details class="mt-3 border-t-2 border-yellow-50 p-3"><summary>Detaljer</summary><p class="mt-2 ml-3">${description}</p></details>`);
  html += `</li>`;
  return html;
};
