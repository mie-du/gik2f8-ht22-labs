const BookList = (list) => {
  const bookList = document.createElement('ul');
  bookList.classList.add(
    'book-list',
    'rounded-md',
    'border-2',
    'border-blue-400',
    'bg-white',
    'w-full',
    'mx-auto'
  );
  list.forEach((book) =>
    bookList.insertAdjacentElement('beforeend', BookListItem(book))
  );
  return bookList;
};
