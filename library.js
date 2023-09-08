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
  myLibrary.push(new Book(title, author, pages, read));
}

function getBookInfoFromUser() {
  let newBookTitle = prompt('Enter title of the book');
  let newBookAuthor = prompt("Enter author's name");
  let newBookPages = +prompt('Enter the number of pages in the book');
  let hasRead = prompt('Have your read this book?');
  myLibrary.push();
}
