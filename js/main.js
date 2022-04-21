import AwesomeBooks from './AwesomeBooks.js';

const awesomeBooks = new AwesomeBooks();
awesomeBooks.load();
if (awesomeBooks.getBooks().length < 1) {
  awesomeBooks.forBook('The Hobbit', 'J.R.R. Tolkien');
  awesomeBooks.forBook('The Lord of the Rings', 'J.R.R. Tolkien');
  awesomeBooks.forBook('The Catcher in the Rye', 'J.D. Salinger');
  awesomeBooks.forBook('The Grapes of Wrath', 'John Steinbeck');
}

const bookList = document.querySelector('#bookList');

function renderBookList() {
  bookList.innerHTML = awesomeBooks.getBooks().map((book, index) => `
        <article class="book ${index % 2 === 0 ? 'dark' : ''}">
            <div>
                <p class="title">"${book.title}" by ${book.author}</p>
            </div>
            <button data-id=${book.id} class="remove">Remove</button>
        </article>`).join('');
}

renderBookList();

const addBookForm = document.querySelector('#bookEntry');
addBookForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const title = event.target.querySelector('#bookTitle').value;
  const author = event.target.querySelector('#bookAuthor').value;
  awesomeBooks.forBook(title, author);
  this.reset();
  renderBookList();
});

bookList.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove')) {
    const { id } = event.target.dataset;
    awesomeBooks.deleteBook(+id);
    renderBookList();
  }
});
