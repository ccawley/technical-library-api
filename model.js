let uuid = require('uuid/v4');
let fs = require('fs');
let filePath = './data.json'
let booksInJSON = fs.readFileSync('./data.json', 'utf-8');
let books = JSON.parse(booksInJSON);

function getAll() {
  return books
}

function getBookById(id) {
  let book = books.find(book => book.id === id);
  return book;
}

function createBook(name, borrowed, description, authors) {
  let book = { id: uuid(), name, borrowed, description, authors };
  books.push(book);
  fs.writeFileSync(filePath, books)
  return book;
}

function updateBook(id, name, borrowed, description, authors) {
  let book = books.find(book => book.id === id);
  book.name = name;
  book.borrowed = borrowed;
  book.description = description;
  book.authors = authors;
  fs.writeFileSync(filePath, books)
  return book;
}

function deleteBook(id) {
  let book = books.find(book => book.id === id);
  let index = books.indexOf(book);
  books.splice(index, 1);
  fs.writeFileSync(filePath, books)
  return book;
}

module.exports = {
  getAll,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};
