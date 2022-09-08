const BOOKS_KEY = 'books';

const searchInput = document.getElementById('searchInput');

const app = document.getElementById('root');

searchInput.focus();

const localBooks = JSON.parse(localStorage.getItem(BOOKS_KEY));

searchInput.addEventListener('keyup', handleKey);
searchInput.addEventListener('keypress', handleKey);

function handleKey(e) {
  let searchBooks = [...localBooks];
  const searchString = e.target.value.toLowerCase();

  /*   if (e.keyCode === 8) {
    searchString ? (searchBooks = [...localBooks]) : (searchBooks = []);
  } */

  if (e.type === 'keyup') {
    filterBooks(
      searchBooks.filter(
        ({ title, author }) => title.toLowerCase().includes(searchString) || author.toLowerCase().includes(searchString)
      )
    );
  }
}

function filterBooks(localBooks) {
  const bookList = document.getElementById('bookList');
  bookList && app.removeChild(bookList);
  localBooks.length && app.insertAdjacentElement('beforeend', BookList(localBooks));
}
