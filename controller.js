let model = require('./model');

let booksController = (req, res, next) => {
  let books = model.getAll();
  return res.status(200).json(books);
};

let authorsController = (req, res, next) => {
  let bookId = req.params.bookId;
  let authors = model.getAllAuthors(bookId);
  let book = model.getBookById(bookId);

  if (!book) return next({ error: 404, message: `Could not find book with id ${id}.` });

  return res.status(200).json(authors);
}

let bookIdController = (req, res, next) => {
  let id = req.params.bookId;
  let book = model.getBookById(id);

  if (!book) return next({ error: 404, message: `Could not find book with id ${id}.` });

  return res.status(200).json(book);
};

let authorIdController = (req, res, next) => {
  let bookId = req.params.bookId;
  let book = model.getBookById(bookId);
  let authorId = req.params.authorId;
  let author = model.getAuthorById(bookId, authorId);

  if (!book) return next({ error: 404, message: `Could not find book with id ${bookId}.` });

  if (!author) return next({ error: 404, message: `Could not find author with id ${authorId}.` });

  return res.status(200).json(author)
}

let createBookController = (req, res, next) => {
  let { name, borrowed = false, description = null, authors } = req.body;

  if (name.length > 30) return next({ error: 400, message: `Name of book must be less than 30 characters.`});

  let book = model.createBook(name, description, authors);

  if (!name || !authors) return next({ error: 400, message: `Fields name and authors are required, description is optional but encouraged.` });

  return res.status(201).json(book);
};

let createAuthorController = (req, res, next) => {
  let bookId = req.params.bookId;
  let { firstName, lastName } = req.body;
  let book = model.getBookById(bookId);
  let author = model.createAuthor(bookId, firstName, lastName);
  console.log(author)

  if (!book) return next({ error: 404, message: `Could not find book with id ${bookId}.` });

  if (!firstName || !lastName) return next({ error: 400, message: `Fields firstName and lastName are required.` });

  return res.status(201).json(author);
}

let updateBookController = (req, res, next) => {
  let id = req.params.bookId;
  let { name, borrowed = false, description = null, authors } = req.body;
  let book = model.updateBook(id, name, description, authors);

  if (!book) return next({ error: 404, message: `Could not find book with id ${id}.` });

  if (!name || !authors) return next({ error: 400, message: `Fields name and authors are required, description is optional but encouraged.` });

  return res.status(200).json(book);
};

let updateAuthorController = (req, res, next) => {
  let bookId = req.params.bookId;
  let { firstName, lastName } = req.body;
  let authorId = req.params.authorId;
  let book = model.getBookById(bookId);
  let author = model.updateAuthor(bookId, authorId, firstName, lastName);
  if (!book) return next({ error: 404, message: `Could not find book with id ${id}.` });

  if (!author) return next({ error: 404, message: `Could not find author with id ${authorId}.` });

  if (!firstName || !lastName) return next({ error: 400, message: `Fields firstName and lastName are required.` });

  return res.status(200).json(author)
}

let deleteBookController = (req, res, next) => {
  let id = req.params.bookId;
  let book = model.deleteBook(id);

  if (!book) return next({ error: 404, message: `Could not find book with id ${id}.` });

  return res.status(204).json(book);
};

let deleteAuthorController = (req, res, next) => {
  let bookId = req.params.bookId;
  let authorId = req.params.authorId;
  let book = model.getBookById(bookId);
  let author = model.deleteAuthor(bookId, authorId);

  if (!book) return next({ error: 404, message: `Could not find book with id ${bookId}.` });

  if (!author) return next({ error: 404, message: `Could not find author with id ${authorId}.`});

  return res.status(204).json(author);
}

module.exports = {
  booksController,
  bookIdController,
  createBookController,
  updateBookController,
  deleteBookController,
  authorsController,
  authorIdController,
  createAuthorController,
  updateAuthorController,
  deleteAuthorController
};
