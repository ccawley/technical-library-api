let uuid = require('uuid/v4');
let fs = require('fs');
let booksInJSON = fs.readFileSync('./data', 'utf-8');
let books = JSON.parse(contentsInJSON);

function getBookById(id) {
  let book = books.find(book => book.id === id);
  return book;
}

function createBook(name, borrowed, description, authors) {
  let book = { id: uuid(), name, borrowed, description, authors };
  books.push(book);
  return book;
}

function updateBook(id, name, borrowed, description, authors) {
  let book = books.find(book => book.id === id);
  book.name = name;
  book.borrowed = borrowed;
  book.description = description;
  book.authors = authors;
  return book;
}

function deleteBook(id) {
  let book = books.find(book => book.id === id);
  let index = books.indexOf(book);
  books.splice(index, 1);
  return book;
}

module.exports = {
  getAll,
  getBookById,
  createBook,
  updateBook,
  deleteBook
};
