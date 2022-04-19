const books = [
  {
    title: 'CHARLIE and the Chocolate Factory',
    author: 'Roald Dahl',
    id: 1,
  },

  {
    title: "The Daughter's Tale",
    author: 'Armando Lucas',
    id: 2,
  },
];

const bookList = document.querySelector('#bookList');

function renderBookList(listBook) {
  bookList.innerHTML = listBook
    .map(
      (book) => `
<p class="title">${book.title}</p>
            <p>${book.author}</p>
            <button data-id=${book.id} class="remove">Remove</button>
            <hr>`
    )
    .join('');
}
function saveBook(listBook) {
  title = document.querySelector('#bookTitle');
  author = document.querySelector('#bookAuthor');
  if (title && author) {
    localStorage.setItem('listBook', JSON.stringify(listBook));
    location.reload();
  }
}

function getBook() {
  const listFromLocalStorage = localStorage.getItem('listBook');
  if (listFromLocalStorage) {
    return JSON.parse(listFromLocalStorage);
  }
  return books;
}

renderBookList(getBook());

const addBookForm = document.querySelector('#bookEntry');
addBookForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const title = event.target.querySelector('#bookTitle').value;
  const author = event.target.querySelector('#bookAuthor').value;
  const listBook = getBook();
  const id = listBook.length + 1;
  listBook.push({
    title,
    author,
    id,
  });
  this.reset();
  renderBookList(listBook);
  saveBook(listBook);
});

bookList.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove')) {
    const { id } = event.target.dataset;
    const bookList = getBook();
    const bookListFiltered = bookList.filter((book) => book.id !== +id);
    renderBookList(bookListFiltered);
    saveBook(bookListFiltered);
  }
});
