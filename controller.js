let model = require('./model');

let booksController = (req, res, next) => {
  let books = model.getAll();
  res.status(200).json(books);
};

let booksIdController = (req, res, next) => {
  let id = req.params.id;
  let book = model.getBookById(id);

  if (!book) return next({ error: 404, message: `Could not find book with id ${id}.` });

  return res.status(200).json(book);
};

let createBookController = (req, res, next) => {
  let { name, borrowed, description, authors } = req.body;
  let book = model.createBook(name, borrowed, description, authors);

  if (!name || !borrowed || !description || !authors) return next({ error: 400, message: `Fields name, borrowed, description and authors are required.`});

  return res.status(201).json(book);
};

let updateBookController = (req, res, next) => {
  let id = req.params.id;
  let { name, borrowed, description, authors } = req.body;
  let book = model.updateBook(id, name, borrowed, description, authors);

  if (!book) return next({ error: 404, message: `Could not find book with id ${id}.` });

  if (!name || !borrowed || !description || !authors) return next({ status: 400, message: `Fields name and description are required` });

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
  deleteBookController
};
