const Form = (id, name, fields) => {
  let html = `<form id="${id}" name="${id}">`;
  fields.forEach((field) => {
    html += InputSection(field);
  });
  html += `<button name="submit${name}" disabled
  class="disabled:opacity-25 disabled:hover:bg-yellow-500 rounded-md bg-yellow-500 hover:bg-yellow-400 px-4 py-1"
  type="submit">Spara</button>
  </form>`;

  return html;
};
