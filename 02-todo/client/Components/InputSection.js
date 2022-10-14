const InputSection = ({ id, name, type }) => {
  let html = `
    <section class="mb-2">
      <label class="relative block pr-5 mb-2" for="${id}">${name}</label>
      <p class="text-sm message text-red-700 mb-2">Error message</p>`;
  switch (type) {
    case 'textarea':
      html += `
        <textarea maxlength="500" rows="5" style="resize: none" class="${styles.form.field.width} ${styles.rounded} ${styles.form.border.color} px-4 border-2 focus:border-${styles.form.border.focus} focus-within:outline-none"
        name="${id}" id="${id}"></textarea>`;
      break;
    case 'text':
    case 'date':
      html += `
        <input class="${styles.form.field.width} ${styles.rounded} ${styles.form.border.color} px-4 py-2 border-2 focus:border-${styles.form.border.focus} focus-within:outline-none" type="${type}" name="${id}" id="${id}" />`;
      break;
  }
  html += `
    </section>`;
  return html;
};
