var Book = require('../models/book');

/**
 * Finds all the books.
 *
 * @param {object} req request object
 * @param {object} res response object
 */
exports.findAll = function(req, res) {
    console.log('findAll');
    Book.find({}, function(err, allBooks) {
        if (err) throw err;
        //console.log(allBooks)
        res.send(allBooks);
    });
};


/**
 * Adds a new Book document to the database.
 * 1. Create a new Book object, using the body of the request (which is already
 *    in the correct JSON format).
 * 2. Save the new book to the database.
 *
 * @param {object} req request object
 * @param {object} res response object
 */
exports.addOne = function(req, res) {
	console.log("addOne");
    console.log(req.body);
    var newBook = new Book(req.body);

    newBook.save(function(err, newBook) {
        if (err) throw err;

        res.send('Success');
    })
};


/**
 * Adds one like for a book given its ISBN number.
 *
 * @param {object} req request object
 * @param {object} res response object
 */
exports.like = function(req, res) {
    console.log('like: ' + req.params.isbn);

    /**
     * Use the mongoose findOne method to get the Book with the correct ISBN
     * The callback should add 1 to the "likes" value, and save the updated
     * document to the database.
     * In the callback for the save method, send a response of the format:
     *      '{"likes" : NUMBER}'
     * where NUMBER is the number of likes converted to a string.
     */

	 // TODO
   Book.find({isbn: req.params.isbn}, function(err, books){
     if (err) throw err;
     var book = books[0];
     //update likes
     book.likes++;
     //save book
     book.save(function(err){

       if (err) throw err;
       console.log('Likes updated');
       res.send('{"likes" : ' + book.likes.toString() + '}');
     });

   });
};
