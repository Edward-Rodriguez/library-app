const myLibrary = [];
const addEditBookDialog = document.querySelector('#addEditBookDialog');
const addBookButton = document.querySelector('.add-button');
const submitButton = document.querySelector('#ok-btn');
const inputTextFields = document.querySelectorAll("input:not([type='radio'])");
const radioButtons = document.querySelectorAll("input[type='radio']");
const deleteButtons = document.querySelectorAll('.icon-delete');
const cancelButton = document.querySelector('#cancel-btn');
const form = document.querySelector('#addEditBookForm');
let bookId = 0;

function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = ++bookId;
}

Book.prototype.info = function () {
  return `${this.title} by ${author}, ${this.pages} pages, ${
    this.read ? 'Read' : ''
  }`;
};

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
  addBookToTable(newBook);
}

function addBookToTable(book) {
  const tableBody = document.querySelector('tbody');
  const newBook = document.createElement('tr');
  newBook.setAttribute('data-book-id', book.id);
  newBook.appendChild(createTableData(book.title));
  newBook.appendChild(createTableData(book.author));
  newBook.appendChild(createTableData(book.pages));
  newBook.appendChild(createTableData(book.read));
  newBook.appendChild(initButtons());
  tableBody.appendChild(newBook);
}

function createTableData(bookInfo) {
  const newBookTableData = document.createElement('td');
  newBookTableData.textContent = bookInfo;
  return newBookTableData;
}

function initButtons() {
  const buttonContainer = document.createElement('td');
  buttonContainer.classList.add('buttons');
  const editButton = generateEditButton();
  const deleteButton = generateDeleteButton();
  buttonContainer.appendChild(editButton);
  buttonContainer.appendChild(deleteButton);
  return buttonContainer;
}

function generateEditButton() {
  const editButton = document.createElement('img');
  editButton.setAttribute('class', 'icon-edit');
  editButton.setAttribute('src', 'icons/icon_edit-blue.svg');
  editButton.setAttribute('alt', 'edit pencil');
  return editButton;
}

function generateDeleteButton() {
  const deleteButton = document.createElement('img');
  deleteButton.setAttribute('class', 'icon-delete');
  deleteButton.setAttribute('src', 'icons/icon_delete-blue.svg');
  deleteButton.setAttribute('alt', 'recycling bin');
  deleteButton.addEventListener('click', (ev) => removeBookFromTable(ev));
  return deleteButton;
}

function onSubmit(ev) {
  ev.preventDefault();
  let tempBook = new Book();
  let isValidInput = true;
  [...inputTextFields].forEach((input) => {
    if (input.value.trim() === '') {
      isValidInput = false;
      input.classList.add('error');
    } else {
      tempBook[input.name] = input.value;
      input.classList.remove('error');
    }
  });
  tempBook.read = setReadStatus();
  if (isValidInput) {
    addBookToLibrary(tempBook);
    addEditBookDialog.close();
    form.reset();
  }
}

function setReadStatus() {
  let userchoice = [...radioButtons].find((btn) => btn.checked).value;
  switch (userchoice) {
    case 'not-read':
    case false:
      return null;
    case 'in-progress':
      return 'In Progress';
    case 'read':
      return 'Read';
  }
}

function removeBookFromLibrary(bookToRemove) {
  const indexOfBook = myLibrary.findIndex(
    (book) => book.id === bookToRemove.id
  );
  myLibrary.splice(indexOfBook, 1);
}

function removeBookFromTable(ev) {
  const parentTableRow = ev.target.parentElement.parentElement;
  const bookIdToRemove = +parentTableRow.getAttribute('data-book-id');
  parentTableRow.parentElement.removeChild(parentTableRow);
  removeBookFromLibrary(myLibrary.find((book) => book.id == bookIdToRemove));
}

addBookButton.addEventListener('click', () => {
  form.reset();
  addEditBookDialog.showModal();
});
cancelButton.addEventListener('click', (ev) => {
  ev.preventDefault();
  addEditBookDialog.close();
});
submitButton.addEventListener('click', (ev) => onSubmit(ev));

addBookToLibrary(
  new Book("Man's Search for Meaning", 'Viktor E. Frankl', 200, 'Read')
);
addBookToLibrary(
  new Book(
    'Self-Compassion: The Proven Power of Being Kind to Yourself',
    'Kristin Neff',
    329,
    'In Progress'
  )
);
