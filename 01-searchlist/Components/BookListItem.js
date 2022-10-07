const BookListItem = (book) => {
  return `
  <li class="book-list__item mb-2 last:mb-0 p-3 text-indigo-900 last:border-b-0 border-b border-indigo-900 cursor-pointer'">
    <span class="pointer-events-none">${book.author}</span> - <span>${book.title}</span>
  </li>`;
};
