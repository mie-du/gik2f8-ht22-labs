const InputSection = ({ id, name, type }) => {
  let html = `<section class="mb-2">
                <label class="relative block pr-5 mb-2" for="${id}">${name}</label>
                <p class="message text-red-700 mb-4">Error message</p>`;
  switch (type) {
    case 'textarea':
      html += `<textarea maxlength="500" rows="5" style="resize: none"
                        class="w-full rounded-xl border-blue-400 px-4 border-2 border-green-500 focus:border-4 focus-within:outline-none"
                        name="${id}" id="${id}"></textarea>`;
      break;

    case 'text':
      html += `<input class="w-full rounded-full border-blue-400 px-4 border-2 border-green-500 focus:border-4      focus-within:outline-none" type="${type}" name="title" id="title" />`;
      break;
  }
  html += `</section>`;
  return html;
};
