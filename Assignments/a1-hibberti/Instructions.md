# Assignment 1:  Building a CS quiz


The purpose of this assignment is to get some practice building an HTML web page with CSS for layout and style, and JavaScript to make it dynamic.  You will do this by implementing several different types of interactive quiz questions. To save you from having to come up with actual questions, I've included a file with some CS history and trivia questions (mostly about U of T Computer Science).


## Overview

The remainder of this document describe the details of each type of question that you will implement.  You will notice that there is quite a bit of flexibility in exactly how you meet the specifications of the assignment.  Students who are new to JavaScript are encouraged to use the simpler approaches and student with more JavaScript experience are encouraged to challenge themselves to take the assignment a step farther.

You may implement the whole quiz on a single page that scrolls.  When the page is reloaded, the quiz resets to the beginning.  In other words, you don't need to persist data between page reloads.  Those with more experience may choose to dynamically load each question.

You will use plain CSS and HTML5.  Please validate your files before submitting them.  You may use JQuery and/or plain JavaScript.

The text for each of the questions described below can be found in `quiz_questions.txt`.  The questions include answers and expected responses.  In some questions the correct answers are indicted with an asterisk.

Note that we are not specifying exactly which HTML element should be used to implement each component.  You are welcome to choose the most appropriate one for your design.


## Question 1:  Multiple choice with expanding answers

When the user selects one of the answer options, the corresponding explanation will appear immediately below their selected option.  After they have selected an answer, they will also see a button that will allow them to display all explanations.

The user's first answer will be recorded in the total score, but they can click on other answers and see individual explanations after their first selection. This question is worth one point.

## Question 2: Multiple choice with more than one selection

The answer to this question requires that two words be selected.  The user should be given a "submit answer" button.

The possible responses given below the question in the text file `quiz_questions.txt` include two responses where the user will be allowed to revise their selection and resubmit their answer.

Again only the first complete response (two answers selected)  will contribute to the total score. (2 points)

## Question 3: Matching

This question has two lists displayed side by side.  The user selects one from one column and one from the next column to pair them up.  The pairing can be indicated in a variety of ways.  The simplest is probably to label the first column with letters and then when the user clicks on the second column, you can label that selection with the letter from column 1.

For example after the user click on `b. Raquel Urtasun` in the left column and 
the first entry in the right column the letter b appears in that entry.

```
a. David Levin        _b_ Canada Research Chair in Machine Learning and
                          Computer Vision, researching self-driving cars
b. Raquel Urtasun     ___ Associate Research Scientist at Disney Research
                          before joining the faculty
```

This question will be scored out of 4, one half mark for each correct pairing.

The user can change answers until they have selected the final pairing.  At that point there should be an indication of which ones are correct.  They should still be able to see their selections as well as the correct answers.

You are welcome to choose alternative options for indicating the pairing and the correct answers. 

## Question 4: Re-arranging elements

In this question the user is asked to re-order the elements in the list. When this questions is displayed, the dates will not be shown to the user.  It should be obvious to the user (with instructions) how to rearrange the inventions from oldest to newest. 

This question will also need a submit button.  After they have submitted their answer, display the dates.  If all the dates are in the correct order they get one point. 

## Scoring

After each question is complete, a score for that question should be displayed.

A running score for the four questions should be updated each time the user completes a question.  When they have completed all four questions, an alert should be displayed with their final score.  There should also be an option to reset and start the whole quiz over again.

The running score should be displayed in the top right corner of the page (possibly as part of a title bar), and should always be kept visible as the page scrolls.

## Details

Your first goal should be a basic implementation of the four questions and scoring component.  Readable, modular code is required.  A solution that fully satisfies the above specifications in a simple way with minimal design work will receive approximately 70%.

Your next goal is to work on the styling.  Work on the layout and display of each question so that the user can easily understand what their task is and what the results means. A well-designed page that meets specifications will receive up to 85%.

At this point you can exercise your design skills and creativity.  For example, you might randomize the order of the options in each of the questions. Each time the page is reloaded the options are presented in a different order.  You might choose a more visually interesting way to show the matching in question 3. You might choose a different way to move around the elements for question 4, or come up with an algorithm to show which ones are out of place.


## What to submit

You will make a pull request to your assignment 1 repository that includes at least four files:

 - `quiz.html`
 - `quiz.js`
 - An appropriately named CSS file or files
 - `README.md`
 
You may choose to break up the quiz into multiple pages.  In this case the first page the user will view is `quiz.html`.  You may also choose to use more than one JavaScript or CSS file.

The README.md file will contain any information you would like to pass onto the grader regarding design decisions and additional features.  It is also the place to indicate if you were able to partially complete one or more of the questions.  This should not be a long document and will not be graded.

The grader should be able to load your page into Chrome or Firefox (recent versions) and be able to click through the questions.  The grader should be able to read through your code and easily understand the overall structure.

##  Rough Marking Scheme

 - Functional correctness - 60%
 - Code style: modular, readable, documented - 15%
 - Web page style - 10%
 - Polish and extra feature(s) - 15%
 
Note: Clean, polished code will receive a higher mark that mostly working fancy features.  

Reminder: It is an academic offence to submit work that is not your own without attribution.  If you find a function or snippets of code that help you implement your assignment, you must cite where you got the code from.