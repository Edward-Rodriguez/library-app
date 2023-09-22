const myLibrary = [];
const addEditBookDialog = document.querySelector('#addEditBookDialog');
const addBookButton = document.querySelector('.add-button');

// Form Objects
const form = document.querySelector('#addEditBookForm');
const titleInput = document.querySelector("input[name='title']");
const authorInput = document.querySelector("input[name='author']");
const pagesInput = document.querySelector("input[name='pages']");
const readInput = document.querySelectorAll("input[type='radio']");
const cancelButton = document.querySelector('#cancel-btn');
const submitButton = document.querySelector('#ok-btn');

let isEditingMode = false;
let bookIdToEdit = null;
let bookId = 0;

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = ++bookId;
  }
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

// to refresh entire table
function updateTable() {
  const tableBody = document.querySelector('tbody');
  tableBody.textContent = ''; // clear all rows, remove all children
  myLibrary.forEach((book) => {
    const bookRow = document.createElement('tr');
    bookRow.setAttribute('data-book-id', book.id);
    bookRow.appendChild(createTableCellData(book.title));
    bookRow.appendChild(createTableCellData(book.author));
    bookRow.appendChild(createTableCellData(book.pages));
    bookRow.appendChild(createTableCellData(book.read));
    bookRow.appendChild(initEditDeleteButtons());
    tableBody.appendChild(bookRow);
  });
}

function createTableCellData(bookInfo) {
  const newBookTableData = document.createElement('td');
  newBookTableData.textContent = bookInfo;
  return newBookTableData;
}

function initEditDeleteButtons() {
  const buttonContainer = document.createElement('td');
  buttonContainer.classList.add('buttons');
  buttonContainer.appendChild(generateEditButton());
  buttonContainer.appendChild(generateDeleteButton());
  return buttonContainer;
}

function generateEditButton() {
  const editButton = document.createElement('img');
  editButton.setAttribute('class', 'icon-edit');
  editButton.setAttribute('src', 'icons/icon_edit-blue.svg');
  editButton.setAttribute('alt', 'edit pencil');
  editButton.addEventListener('click', (ev) => handleEditButtonClick(ev));
  return editButton;
}

function generateDeleteButton() {
  const deleteButtonIcons = {
    blue: 'icons/icon_delete-blue.svg',
    red: 'icons/icon_delete-red.svg',
  };
  const deleteButton = document.createElement('img');
  deleteButton.setAttribute('class', 'icon-delete');
  deleteButton.setAttribute('src', deleteButtonIcons.blue);
  deleteButton.setAttribute('alt', 'recycling bin');
  deleteButton.addEventListener('click', (ev) => removeBookFromTable(ev));
  deleteButton.addEventListener('mouseover', () => {
    deleteButton.setAttribute('src', deleteButtonIcons.red);
  });
  deleteButton.addEventListener('mouseleave', () => {
    deleteButton.setAttribute('src', deleteButtonIcons.blue);
  });
  return deleteButton;
}

function onSubmit(ev) {
  ev.preventDefault();
  if (validateForm()) {
    const title = titleInput.value;
    const author = authorInput.value;
    const pages = pagesInput.value;
    const read = getReadStatus();
    isEditingMode
      ? updateBook(title, author, pages, read)
      : addBookToLibrary(title, author, pages, read);
    updateTable();
    addEditBookDialog.close();
    isEditingMode = false;
    bookIdToEdit = null;
    form.reset();
  }
}

function validateForm() {
  isValid = true;
  [titleInput, authorInput, pagesInput].forEach((input) => {
    if (
      input.value.trim() === '' ||
      (input.name === 'pages' && isNaN(input.value))
    ) {
      isValid = false;
      input.classList.add('error');
    } else input.classList.remove('error');
  });
  return isValid;
}

function updateBook(title, author, pages, read) {
  myLibrary.forEach((book) => {
    if (book.id === bookIdToEdit) {
      book.title = title;
      book.author = author;
      book.pages = pages;
      book.read = read;
    }
  });
}

function getReadStatus() {
  let userchoice = [...readInput].find((btn) => btn.checked).value;
  switch (userchoice) {
    case 'Not Started':
      return null; //don't display status of non-read books
    default:
      return userchoice;
  }
}

function removeBookFromTable(ev) {
  const parentTableRow = getTableRowParent(ev.target);
  const bookIdToRemove = +parentTableRow.getAttribute('data-book-id');
  parentTableRow.parentElement.removeChild(parentTableRow);
  removeBookFromLibrary(bookIdToRemove);
}

function removeBookFromLibrary(bookId) {
  const indexOfBook = myLibrary.findIndex((book) => book.id === bookId);
  myLibrary.splice(indexOfBook, 1);
}

function handleEditButtonClick(ev) {
  const bookId = +getTableRowParent(ev.target).getAttribute('data-book-id');
  const bookToUpdate = myLibrary.find((book) => book.id === bookId);
  [titleInput, authorInput, pagesInput].forEach((input) => {
    input.value = bookToUpdate[input.name];
    input.classList.remove('error');
  });
  [...readInput].forEach((input) => {
    if (bookToUpdate.read === null && input.id === 'not-read')
      input.checked = true;
    else {
      input.value === bookToUpdate.read
        ? (input.checked = true)
        : (input.checked = false);
    }
  });
  isEditingMode = true;
  bookIdToEdit = bookId;
  addEditBookDialog.showModal();
}

function getTableRowParent(node) {
  return node.closest('tr[data-book-id]');
}

addBookButton.addEventListener('click', () => addEditBookDialog.showModal());
cancelButton.addEventListener('click', (ev) => {
  ev.preventDefault();
  addEditBookDialog.close();
});
submitButton.addEventListener('click', (ev) => onSubmit(ev));

addBookToLibrary("Man's Search for Meaning", 'Viktor E. Frankl', 200, 'Read');
addBookToLibrary(
  'Self-Compassion: The Proven Power of Being Kind to Yourself',
  'Kristin Neff',
  329,
  'In Progress'
);
addBookToLibrary('Test', 'John Doe', 319, 'Read');
addBookToLibrary('Red Planet', 'Dr.John', 999, null);
updateTable();
