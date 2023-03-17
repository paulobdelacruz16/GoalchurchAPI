
const Book = require('../models/books');

const routes = (app) => {
app.route('/api/books').post((req,res) =>{
    console.log('hey', req.body);
   var book = new Book({
        name:req.body.bookName,
        author:{
            name:req.body.authorName,
            age:req.body.authorAge
        },
        genre:req.body.genre
    });
    book.save().then(book =>{
        res.send(book)
    }).catch(error => {
        console.log('error1', error);
        res.status(500).send("Book was not stored in DB");
    });
});
}

export default routes;
