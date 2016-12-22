# Lab 6: MongoDB and Mongoose

We start with the "books" example from lecture, and convert it to use a MongoDB database rather than a JSON file.  Your task in this lab is to add a very small number of lines of code to update a document in the database.

There are a few more steps to getting the starter code running than in previous labs because you will need to create and initialize the database.

## Setup

### Database

If you are using the CS teaching lab machines, then you can add the following to your PATH variable to use the installed MongoDB executables.

```
export PATH=/u/csc309h/fall/pub/bin:$PATH
```

If you are using your own machine, you will first need to install MongoDB Community edition.  Download information and instructions are [here](https://docs.mongodb.com/manual/installation/?jmp=footer).

Now you can create a directory to store your database in and start the database server process.

```
mkdir data
mongod --dbpath=$PWD/data
```

### Seeding the database

The next step is to populate the database with data.  We will [import the JSON file](https://www.zaiste.net/2012/08/importing_json_into_mongodb/) into the database.

```
mongoimport --db booksdb --collection books --type json --file giller.json --jsonArray
```

Note that we need to specify a database name "booksdb" and a collection "books". (Normally, the collection is the plural of the model name.)

### Running the server

Now you can run `npm install` to install the rest of the Node modules needed for this lab.

The server is started by running `nodemon server`. We use nodemon so saving `.js` files will restart the server with your changes.

### Application

You will find a [tutorial on Mongoose](https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications) helpful to find information about the Mongoose operations you will need for the lab.

### Reading the code

We have added a file called `book.js` in the `models` directory.  This file makes the connection to the running database, sets up the schema, and creates a `Book` model.

The `book-routes.js` file contains the functions that handle the incoming requests.  This file imports the model, so that we can use it to interact with the database.


#### Trace through adding a new book

The front end for this part of the application hasn't changed from our previous example code (except that we have added an ISBN field so that we have a unique identifier for each book). When the user "Submits" their entries, a POST message is sent to the server.  The route is the same as well, but the function that handles the request has changed.

The `addOne` function in `routes/books-routes.js` creates a new Book model object, fills it in with the data from the HTTP POST request, and calls `save` to save it to the database.

#### Task: Complete the `like` function in `book-routes.js`

We have added a button to each book that is listed so that users can "like" the book.  The button shows the number of likes, and when a user clicks on it, sends a PUT message (see `showBooks.js`) to the server so that the server can increment the number of likes for a particular book.

Your task is to find the document in the database with the correct ISBN number, and update the number of likes for that book.
