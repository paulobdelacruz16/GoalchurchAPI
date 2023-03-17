const { Book, validateBook } = require("../models/books");

const routes = (app) => {
  app
    .route("/api/books")
    .post(async (req, res) => {
      const error = await validateBook(req.body);
      if (error.message) res.status(400).send(error.message);
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
          res.status(500).send("Book was not stored in DB");
        });
    })
    .get((req, res) => {
      Book.find()
        .then((books) => res.send(books))
        .catch((error) => {
          res.status(500).send("Something went wrong");
        });
    });

  app
    .route("/api/books/:bookId")
    .get((req, res) => {
      console.log("req.params.bookId", req.params.bookId);
      Book.findById(req.params.bookId)
        .then((book) => {
          console.log("BOOK FOUND", book);
          if (book) {
            res.send(book);
          }
        })
        .catch((error) => {
          console.log("BOOK NOT FOUND", error);
          res.status(404).send("Book not found");
        });
    })
    .put(async (req, res) => {
      const error = await validateBook(req.body);
      if (error.message) {
        res.status(400).send(error.message);
      } else {
        Book.findByIdAndUpdate(
          req.params.bookId,
          {
            name: req.body.bookName,
            author: {
              name: req.body.authorName,
              age: req.body.authorAge,
            },
            genre: req.body.genre,
          },
          {
            new: true,
          }
        )
          .then((book) => {
            console.log("BOOK FOUND", book);
            if (book) res.send(book);
          })
          .catch((error) => {
            console.log("BOOK NOT FOUND", error);
            res.status(404).send("Book not found");
          });
      }
    })
    .delete((req, res) => {
      Book.findByIdAndRemove(req.params.bookId)
        .then((book) => {
          console.log("BOOK FOUND", book);
          if (book) res.send(book);
        })
        .catch((error) => {
          console.log("BOOK NOT FOUND", error);
          res.status(404).send("Book not found");
        });
    });
};

export default routes;
