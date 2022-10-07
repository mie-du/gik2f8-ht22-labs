const searchInput = document.getElementById('searchInput');
searchInput.focus();
const root = document.getElementById('root');
// 7. Ta bort befintliga böcker och låt bookList vara let.
let bookList = [];
// 8.  Skapa lyssnare för window så att böckerna kan hämtas när sidan laddats.
// 8.1 Resonemang: Ska vi hämta BookList när sidan laddas eller när vi söker?
window.addEventListener('load', () => {
  //9. Resonemang: Vill vi visa något medan listan laddas/är tom. Typ som "Inga sökträffar" eller "Laddar".
  getAllJSON().then((books) => (bookList = books));
});

// 1. Refactor: Ta bort handleKeypress och skicka e.target.value direkt till searchBooks.
searchInput.addEventListener('keyup', (e) => searchBooks(e.target.value));
// 5. Refactor - reflektion: Ta bort searchBooks - Hur långt ska man gå för att det ska bli läsbart? Läsbarhet vs kompakt kod.
/* searchInput.addEventListener('keyup', (e) =>
  renderBookList(
    bookList.filter(({ title, author }) => {
      const searchTerm = e.target.value.toLowerCase();
      return (
        title.toLowerCase().indexOf(searchTerm) >= 0 || author.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
      );
    })
  )
); */

function searchBooks(searchTerm) {
  // 8.2 Resonemang: Ska vi hämta BookList här? I sådana fall ska searchBooks definitivt finnas, istället för en anonym arrow-function. Om här, behöver searchBooks vara async.
  /* const bookList = await getAllJSON(); */

  // 2. Refactor: använd filter.
  // 3. Refactor: Destructuring av book i loop
  // 4. Refactor: Sök på både titel och författare
  // 8.3 Resonemang: Felhantering om böcker inte kunde hämtas?
  const filteredBooks = bookList.filter(({ title, author }) => {
    return (
      title.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0 ||
      author.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
    );
  });

  renderBookList(filteredBooks);
}

function renderBookList(list) {
  //6 Refactor: Kortslut koll av existerande lista och listans längd.
  const existingList = document.querySelector('.book-list');
  existingList && root.removeChild(existingList);

  //6.1 Resonemang: Vill vi att listan ska synas även när ingen sökterm är angiven? Man kan lägga till en koll så att searchInput har ett värde. Behöver inte kolla > 0, för 0 är falsy.
  list.length > 0 &&
    searchInput.value &&
    root.insertAdjacentElement('beforeend', BookList(list));
}
