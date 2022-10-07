function createDomElement() {
  const bookDetailContainer = document.createElement('div');
  bookDetailContainer.setAttribute('id', 'bookDetailContainer');
  bookDetailContainer.classList.add(
    'absolute',
    'bg-gradient-to-b',
    'drop-shadow-lg',
    'from-lime-200',
    'to-lime-300',
    'border-2',
    'border-green-400',
    'p-4',
    'rounded-md',
    'pointer-events-none',
    'w-96'
  );
  return bookDetailContainer;
}

async function OpenBookDetail(bookId) {
  bookDetailContainer = document.getElementById('bookDetailContainer');
  if (bookDetailContainer) {
    bookDetailContainer.style.display = 'block';
  } else {
    bookDetailContainer = createDomElement();
    root.insertAdjacentElement('beforeend', bookDetailContainer);

    window.addEventListener('mousemove', (e) =>
      updatePos(e, bookDetailContainer)
    );
  }

  const book = await getById(bookId);
  bookDetailContainer.innerHTML = renderDetail(book);
}

function updatePos(e, bookDetailContainer) {
  if (bookDetailContainer) {
    bookDetailContainer.style.left = `${e.clientX}px`;
    bookDetailContainer.style.top = `${e.clientY}px`;
  }
}

function CloseBookDetail(e) {
  const bookDetailContainer = document.getElementById('bookDetailContainer');
  bookDetailContainer && (bookDetailContainer.style.display = 'none');
}

function renderDetail({ title, author, coverImage, pages, releaseDate }) {
  return `<h3 class="text-green-900 mb-2 font-semibold">${title}</h3>
            <div class="flex gap-4 h-56">
              <div class="flex-1">
                <p>Författare: ${author}</p>
                <p>Utgivningsår: ${releaseDate}</p>
                <p>Sidor: ${pages}</p>
              </div>
              <div class="basis-36">
              
              ${
                coverImage
                  ? `<img  class="h-full w-full" src="${coverImage}" alt="Omslagsbild på ${title}" />`
                  : `<div>Ingen bild</div>`
              }
              </div>
            </div>`;
}
