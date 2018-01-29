let uuid = require('uuid/v4');
let fs = require('fs');
let filePath = './data.json';
let booksInJSON = fs.readFileSync('./data.json', 'utf-8');
let books = JSON.parse(booksInJSON);
// console.log(books);

function getAll() {
  return books;
}

function getAllAuthors(bookId) {
  let book = books.find(book => book.id === bookId);
  let authors = book.authors;
  return authors;
}

function getBookById(bookId) {
  let book = books.find(book => book.id === bookId);
  return book;
}

function getAuthorById(bookId, authorId) {
  let book = books.find(book => book.id === bookId);
  let author = book.authors.find(author => author.id === authorId);
  return author;
}

function createBook(name, description, authors) {
  // The below pattern is super useful in flattening data but not gonna use here:
  // let authorsInData = books.reduce((prev, book) => {
  //   return prev.concat(book.authors)
  // }, [])

  // for author in authors (body)
    // find author in authorsInDate
    // if find returns undefined, error
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
      };
    })
  };
  books.push(book);
  fs.writeFileSync(filePath, JSON.stringify(books));
  return book;
}

function createAuthor(bookId, firstName, lastName) {
  let book = books.find(book => book.id === bookId);
  let newAuthor = {
    id: uuid(),
    firstName,
    lastName
  }
  book.author.push(newAuthor);
  fs.writeFileSync(filePath, JSON.stringify(books));
  return newAuthor;
}

function updateBook(bookId, name, description, authors) {
  let book = books.find(book => book.id === bookId);
  book.name = name;
  book.borrowed = false;
  book.description = description;
  book.authors = authors.map(author => {
    return {
      id: uuid(),
      firstName: author.firstName,
      lastName: author.lastName
    };
  });
  book.authors[0].id = uuid()
  fs.writeFileSync(filePath, JSON.stringify(books))
  return book;
}

function updateAuthor(bookId, authorId, firstName, lastName) {
  let book = books.find(book => book.id === bookId);
  let author = book.authors.find(author => author.id === authorId);
  author.firstName = firstName
  author.lastName = lastName
  fs.writeFileSync(filePath, JSON.stringify(books))
  return author;
}

function deleteBook(bookId) {
  let book = books.find(book => book.id === bookId);
  let index = books.indexOf(book);
  books.splice(index, 1);
  fs.writeFileSync(filePath, JSON.stringify(books));
  return book;
}

function deleteAuthor(bookId, authorId) {
  let book = books.find(book => book.id === bookId);
  let authors = book.authors;
  let authorIndex = authors.findIndex(author => author.id === authorId);
  book.authors.splice(authorIndex, 1);
  fs.writeFileSync(filePath, JSON.stringify(books));
  return book;
}

module.exports = {
  getAll,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  getAllAuthors,
  getAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor
};
