let uuid = require('uuid/v4');
let fs = require('fs');
let filePath = './data.json'
let booksInJSON = fs.readFileSync('./data.json', 'utf-8');
let books = JSON.parse(booksInJSON);
console.log(books)

function getAll() {
  return books
}

function getAllAuthors() {
  let authors = books.filter()
}

function getBookById(id) {
  let book = books.find(book => book.id === id);
  return book;
}

function createBook(name, description, authors) {
  let book = {
    id: uuid(),
    name,
    borrowed: false,
    description,
    authors: authors.map(author => {
      return {
        id: uuid(),
        firstName: author.firstName,
        lastName: author.lastName
      }
    })
  };
  books.push(book);
  fs.writeFileSync(filePath, JSON.stringify(books))
  return book;
}

function updateBook(id, name, description, authors) {
  let book = books.find(book => book.id === id);
  book.name = name;
  book.borrowed = false;
  book.description = description;
  book.authors = authors;
  fs.writeFileSync(filePath, JSON.stringify(books))
  return book;
}

function deleteBook(id) {
  let book = books.find(book => book.id === id);
  let index = books.indexOf(book);
  books.splice(index, 1);
  fs.writeFileSync(filePath, JSON.stringify(books))
  return book;
}

module.exports = {
  getAll,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getAllAuthors,
  // getAuthorById,
  // createAuthor,
  // updateAuthor,
  // deleteAuthor
};
