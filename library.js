const myLibrary = [];
const addEditBookDialog = document.querySelector('#addEditBookDialog');
const addBookButton = document.querySelector('.add-button');
const submitButton = document.querySelector('#ok-btn');
const inputTextFields = document.querySelectorAll("input:not([type='radio'])");
const radioButtons = document.querySelectorAll("input[type='radio']");

function Book(title, author, pages, read = false) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
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
  newBook.appendChild(createTableData(book.title));
  newBook.appendChild(createTableData(book.author));
  newBook.appendChild(createTableData(book.pages));
  newBook.appendChild(createTableData(book.read));
  newBook.appendChild(generateEditButtons());
  tableBody.appendChild(newBook);
}

function createTableData(bookInfo) {
  const newBookTableData = document.createElement('td');
  newBookTableData.textContent = bookInfo;
  return newBookTableData;
}

function addAllBooksToTable() {
  myLibrary.forEach((book) => {
    addBookToTable(book);
  });
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

addBookButton.addEventListener('click', () => addEditBookDialog.showModal());
submitButton.addEventListener('click', (ev) => onSubmit(ev));
// [...inputs].forEach((input) => {
//   input.addEventListener('change', (ev) => (input.value = ev.target.value));
// });

addBookToLibrary('Testttitle2', 'McAuthor McGuy', 600);
// displayBooks();
