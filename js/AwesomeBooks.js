
class AwesomeBooks {
   constructor(title, author, id) {
    this.title = title;
    this.author = author;
    this.id = id;
    this.books = [];
  }

  forBook(title, author) {
    const id = this.books.length + 1;
    const book = new AwesomeBooks(title, author, id);
    this.books.push(book);
    this.#save();
  }

  #ForBooks(books) {
    books.forEach((book) => {
      this.forBook(book.title, book.author);
    });
  }

  getBooks() {
    return this.books;
  }

  #save() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  load() {
    const books = JSON.parse(localStorage.getItem('books'));
    if (books) {
      this.#ForBooks(books);
    }
  }

  deleteBook(id) {
    this.books = this.books.filter((book) => book.id !== id);
    this.#save();
  }
}

export default AwesomeBooks;
