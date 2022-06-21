const BOOKS_KEY = 'books';

/* Hämta inputfält och utgå från document. 
Använd children, firstElement och nextElementSibling
*/
const searchInput =
  document.children[0].children[1].children[0].children[0].children[1].firstElementChild.nextElementSibling;
/* Hur döper vi variabler? I förhållande till CSS-namnkonventioner */
const app = document.getElementById('root');
/* Trigga ett event */
searchInput.focus();
/* Hämta från local storeage */
const localBooks = JSON.parse(localStorage.getItem(BOOKS_KEY));
/* Lyssnare för sökfält enter, keypress för direktfiltrering */
/* Keypress funkar inte för backspace 
när vill vi att eventet ska kastas?
*/
searchInput.addEventListener('keyup', handleKey);
searchInput.addEventListener('keypress', handleKey);

/* Sökfältets lyssnare uppdaterar listan */
/* Flera varv, först med fokus på att visa och dölja listan. Lektion 2, spread etc. */
function handleKey(e) {
  let searchBooks = [...localBooks];
  const searchString = e.target.value.toLowerCase();

  if (e.keyCode === 8) {
    /* Om man suddar sök från alla böcker igen, förutsatt att det finns något i sökfältet. */
    /* Vill man det? */
    searchString ? (searchBooks = [...localBooks]) : (searchBooks = []);
  }

  if (e.type === 'keyup') {
    filterBooks(
      searchBooks.filter(
        ({ title, author }) => title.toLowerCase().includes(searchString) || author.toLowerCase().includes(searchString)
      )
    );
  }
}

/* Om bookList finns, ta bort listan. Lägg sedan dit en uppdaterad.  */
function filterBooks(localBooks) {
  const bookList = document.getElementById('bookList');
  bookList && app.removeChild(bookList);
  localBooks.length && app.insertAdjacentElement('beforeend', BookList(localBooks));
}
