const myLibrary = [];

function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function () {
  return `${this.title} by ${author}, ${this.pages} pages, ${
    this.read ? 'read' : 'not read yet'
  }`;
};

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book());
}
