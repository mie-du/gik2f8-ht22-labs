/* Lektion 2 */

const books = [
  {
    id: 1,
    author: 'Charles Dickens',
    title: 'Oliver Twist'
  },
  {
    id: 2,
    author: 'Stephen King',
    title: 'The Gunslinger'
  },
  {
    id: 3,
    author: 'William Shakespear',
    title: 'Hamlet'
  },
  {
    id: 4,
    author: 'Robert Jordan',
    title: 'The Eye of the World'
  },

  {
    id: 5,
    author: 'Haruki Murakami',
    title: '1Q84'
  },

  {
    id: 6,
    author: 'Frank Herbert',
    title: 'Dune'
  },
  {
    id: 7,
    author: 'Neal Stephenson',
    title: 'Seveneves'
  },
  {
    id: 8,
    author: 'Aldous Huxley',
    title: 'Brave New World'
  },
  {
    id: 9,
    author: 'Ted Chiang',
    title: 'Stories of Your Life and Others'
  },
  {
    id: 10,
    author: 'Andy Weir',
    title: 'The Martian'
  }
];

localStorage.setItem('books', JSON.stringify(books));
