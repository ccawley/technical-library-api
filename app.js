let express = require("express");
let app = express();
let PORT = process.env.PORT || 3000;
let bodyParser = require("body-parser");
let morgan = require("morgan");
let controller = require("./controller");

app.disable("x-powered-by");
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/books", controller.booksController);
app.get("/books/:bookId", controller.bookIdController);
app.post("/books", controller.createBookController);
app.put("/books/:bookId", controller.updateBookController);
app.delete("/books/:bookId", controller.deleteBookController);

app.get("/books/:bookId/authors", controller.authorsController);
app.get("/books/:bookId/authors/:authorId", controller.authorIdController);
app.post("/books/:bookId/authors", controller.createAuthorController);
app.put("/books/:bookId/authors/:authorId", controller.updateAuthorController);
app.delete("/books/:bookId/authors/:authorId", controller.deleteAuthorController);

app.use((req, res, next) => {
  res.status(404).json({ error: { message: 'Not found' }});
});

app.use((err, req, res, next) => {
  let status = err.status || 500;
  console.log(err)
  res.status(status).json({ error: err });
});

let listener = () => `Listening on port ${PORT}!`;
app.listen(PORT, listener);

module.exports = app;
