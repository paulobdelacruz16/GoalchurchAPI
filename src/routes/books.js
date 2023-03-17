const { Book, validateBook } = require("../models/books");

const routes = (app) => {
  app.route("/api/books").post(async (req, res) => {
    console.log("hey", req.body);
    const error = await validateBook(req.body);
    console.log('message123', error);
    if(error.message) res.status(400).send(error.message)
    const book = new Book({
      name: req.body.bookName,
      author: {
        name: req.body.authorName,
        age: req.body.authorAge,
      },
      genre: req.body.genre,
    });
    book
      .save()
      .then((book) => {
        res.send(book);
      })
      .catch((error) => {
        console.log("error1", error);
        res.status(500).send("Book was not stored in DB");
      });
  });
};

export default routes;
