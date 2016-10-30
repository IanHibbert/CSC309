# Lab 4: HTML Forms

Gain experience creating HTML forms whose data is validated using HTML5 validation on the client-side and, upon submit, sent via HTTP POST to a Node.js server where it is validated on the server-side.

### Instructions:

 0. Clone or download this starter repo onto your local system, as you have done for the past labs.

 1. Download and install Node.js (which already includes NPM) if it's not already on your system (the Teaching Labs already have it). Link: <https://nodejs.org/en/>

 2.  Install Express and the other Node.js modules listed at the top of `server.js`.

  - In a terminal, change directory to the lab repo, and use the following command to install the dependencies locally (recommended) in the repo directory:
    ```shell
    npm install express express-validator ejs body-parser
    ```

  - [Aside / More info: If there was a `package.json` file (which there is not here) you would append `--save` to the command line arguments, which would save the dependencies to the json file so that `npm install` would get the job done later.]

 3. To start the server, run:
    ```shell
     node server.js
    ```

    Then, if it's successful you can navigate in your browser to: <http://127.0.0.1:3000/> aka <http://localhost:3000/>.

 4. Your first task is to create an HTML form according to the HTML comments included in the `tapp.html` file. You’ll be making an application form for UofT students to apply to TA positions.  There are 4 input fields to create.

 5. Your second task is to use HTML5 validation techniques on the following fields:

   a. Student Number

   b. Phone Number

   c. Birthday

 6. Your third task is to use server-side validation on submit. See the `server.js` file. The server is using the [Express framework](http://expressjs.com/), the [body-parser middleware](https://github.com/expressjs/body-parser), and the [customValidator module](https://github.com/ctavan/express-validator).

 You should read through the server code to understand how the customValidator module works and add the regular expressions for the customValdator methods. There is very little code to write for this lab, so your time should be spent reading and trying to understand the starter code.


### Advanced:

Add an AJAX call after a student number has been entered that will populate the remaining fields of the form if the student number already exists in the `TAs` array.  Changes to the record will replace the record in the TAs object in memory.


### Submission instuctions

Add, commit and push all changed files to your forked repository.  Remember to do a pull request before midnight on Wednesday.
