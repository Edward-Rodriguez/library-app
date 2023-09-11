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

function displayBooks() {
  const tableBody = document.querySelector('tbody');
  myLibrary.forEach((book) => {
    const newBook = document.createElement('tr');
    newBook.appendChild(createTableData(book.title));
    newBook.appendChild(createTableData(book.author));
    newBook.appendChild(createTableData(book.pages));
    newBook.appendChild(createTableData(book.read));
    newBook.appendChild(generateEditButtons());
    tableBody.appendChild(newBook);
  });
}

function createTableData(bookInfo) {
  const newBookTableData = document.createElement('td');
  newBookTableData.textContent = bookInfo;
  return newBookTableData;
}

function generateEditButtons() {
  const buttonContainer = document.createElement('td');
  buttonContainer.classList.add('buttons');
  const editButton = document.createElement('img');
  editButton.setAttribute('class', 'icon-edit');
  editButton.setAttribute('src', 'icons/icon_edit-blue.svg');
  editButton.setAttribute('alt', 'edit pencil');
  const deleteButton = document.createElement('img');
  deleteButton.setAttribute('class', 'icon-delete');
  deleteButton.setAttribute('src', 'icons/icon_delete-blue.svg');
  deleteButton.setAttribute('alt', 'recycling bin');
  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(deleteButton);
  return buttonContainer;
}

addBookToLibrary('Testttitle', 'McAuthor', 6000, true);
displayBooks();
