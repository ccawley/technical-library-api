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
app.get("/books/:id", controller.booksIdController);
app.post("/books", controller.createBookController);
app.put("/books/:id", controller.updateBookController);
app.delete("/books/:id", controller.deleteBookController);

app.get("/books/authors", controller.authorsController);
app.get("/books/:id/authors/:id", controller.authorsIdController);
app.post("/books/authors", controller.createAuthorController);
app.put("/books/:id/authors/:id", controller.updateAuthorController);
app.delete("/books/:id/authors/:id", controller.deleteAuthorController);

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
