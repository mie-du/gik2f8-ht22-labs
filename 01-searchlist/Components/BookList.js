const BookList = (list) => {
  /*   const bookList = document.createElement('ul');
  bookList.classList.add('book-list', 'rounded-md', 'border-2', 'border-blue-400', 'bg-white', 'w-full', 'mx-auto');
  for (let i = 0; i < list.length; i++) {
    bookList.insertAdjacentElement('beforeend', BookListItem(list[0]));
  }
  return bookList; */

  let html = `<ul class="book-list rounded-md border-2 border-blue-400 bg-white w-full mx-auto">`;
  for (let i = 0; i < list.length; i++) {
    html += BookListItem(list[i]);
  }
  html += `</ul>`;

  return html;
};
