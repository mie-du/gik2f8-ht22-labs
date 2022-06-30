/* Labb: skapa ruta fönster, hämta en bok från api:et (get by id) */

function createDomElement() {
  /* function scoped */
  const bookDetailContainer = document.createElement('div');
  bookDetailContainer.setAttribute('id', 'bookDetailContainer');
  bookDetailContainer.classList.add(
    'absolute',
    'bg-gradient-to-b',
    'from-cyan-200',
    'to-violet-200',
    'border-2',
    'border-blue-400',
    'p-4',
    'rounded-md',
    'pointer-events-none',
    'w-80'
  );
  return bookDetailContainer;
}

async function OpenBookDetail(bookId) {
  bookDetailContainer = document.getElementById('bookDetailContainer');
  if (bookDetailContainer) {
    bookDetailContainer.style.display = 'block';
  } else {
    bookDetailContainer = createDomElement();
    app.insertAdjacentElement('beforeend', bookDetailContainer);
    /* Börja lyssna efter mouseevents när bookDetailContainern har skapats */
    window.addEventListener('mousemove', (e) => updatePos(e, bookDetailContainer));
  }

  /* function scoped book */
  const book = await getById(bookId);
  bookDetailContainer.innerHTML = renderDetail(book);
}

function updatePos(e, bookDetailContainer) {
  /* Reservkoll */
  if (bookDetailContainer) {
    bookDetailContainer.style.left = `${e.clientX}px`;
    bookDetailContainer.style.top = `${e.clientY}px`;
  }
}

function CloseBookDetail(e) {
  const bookDetailContainer = document.getElementById('bookDetailContainer');
  bookDetailContainer && (bookDetailContainer.style.display = 'none');
}

function renderDetail({ title, author, releaseDate, pages, coverImage }) {
  return `<h3 class="text-green-900 mb-2 font-semibold">${title}</h3>
            <div class="flex gap-4">
              <div class="basis-2/3">
                <p>Författare: ${author}</p>
                <p>Utgivningsår: ${releaseDate}</p>
                <p>Sidor: ${pages}</p>
              </div>
              <div class="basis-1/3">
              
              ${
                coverImage &&
                `<img  style="max-width: 100px; height: auto; " src="${coverImage}" alt="Omslagsbild på ${title}" />`
              }
              </div>
            </div>`;
}
