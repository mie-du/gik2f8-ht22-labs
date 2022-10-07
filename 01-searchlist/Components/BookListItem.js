function BookListItem(book) {
  const { id, author, title } = book;
  const bookListItem = document.createElement('li');
  bookListItem.addEventListener('mouseenter', (e) => OpenBookDetail(id, e));
  bookListItem.addEventListener('mouseleave', (e) => CloseBookDetail(e));

  bookListItem.classList.add(
    'book-list__item',
    'mb-2',
    'last:mb-0',
    'p-3',
    'text-indigo-900',
    'last:border-b-0',
    'border-b',
    'border-indigo-900',
    'cursor-pointer'
  );
  bookListItem.innerHTML = `<span class="pointer-events-none">${author}</span> - <span>${title}</span>`;
  return bookListItem;
}
