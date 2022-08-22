function BookList(books) {
  const listElement = document.createElement('ul');
  listElement.setAttribute('id', 'bookList');
  listElement.classList.add(
    'book-list',
    'rounded-md',
    'border-2',
    'border-blue-400',
    'bg-white',
    'w-1/2',
    'mx-auto'
  );

  books.forEach((book) => {
    listElement.insertAdjacentElement('beforeend', BookListItem(book));
  });

  return listElement;
}
