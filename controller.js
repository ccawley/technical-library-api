let model = require('./model');

let booksController = (req, res, next) => {
  let books = model.getAll();
  res.status(200).json(books);
};

let authorsController = (req, res, next) => {
  let authors = model.getAllAuthors();
  res.status(200).json(authors);
}

let booksIdController = (req, res, next) => {
  let id = req.params.id;
  let book = model.getBookById(id);

  if (!book) return next({ error: 404, message: `Could not find book with id ${id}.` });

  return res.status(200).json(book);
};

let createBookController = (req, res, next) => {
  let { name, borrowed = false, description = null, authors } = req.body;

  if (name.length > 30) return next({ error: 400, message: `Name of book must be less than 30 characters.`});

  let book = model.createBook(name, description, authors);

  if (!name || !authors) return next({ error: 400, message: `Fields name and authors are required, description is optional but encouraged.` });

  return res.status(201).json(book);
};

let updateBookController = (req, res, next) => {
  let id = req.params.id;
  let { name, borrowed = false, description = null, authors } = req.body;
  let book = model.updateBook(id, name, description, authors);

  if (!book) return next({ error: 404, message: `Could not find book with id ${id}.` });

  if (!name || !authors) return next({ error: 400, message: `Fields name and authors are required, description is optional but encouraged.` });

  return res.status(200).json(book);
};

let deleteBookController = (req, res, next) => {
  let id = req.params.id;
  let book = model.deleteBook(id);

  if (!book) return next({ error: 404, message: `Could not find book with id ${id}.` });

  return res.status(204).json(book);
};

module.exports = {
  booksController,
  booksIdController,
  createBookController,
  updateBookController,
  deleteBookController,
  authorsController,
  // authorsIdController,
  // createAuthorController,
  // updateAuthorController,
  // deleteAuthorController
};
