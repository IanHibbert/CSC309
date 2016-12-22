"use strict";
var SCORE = 0;
var $nameSelected;
var $fameSelected;

$(document).ready(function(){
    randomizeOrder();   //load questions
    randomizeQ4Order(); //load q4 random order

});

/*
Updates users total score
 */
function updateScore(score) {
    SCORE += score;
    $('#score').text(SCORE);
}

/*
 Question 1
 */

/*
 Detects if user clicks on any of the options
 and shows the corresponding answer
 */
$('input:radio[name="question1"]').change(function () {
    var $question1 = $('#q1');
    var $q1_a = $("#q1-a");
    var $q1_b = $("#q1-b");
    var $q1_c = $("#q1-c");
    var $q1_d = $("#q1-d");
    var $questionAnswered = $question1.data('answered');

    $("#explain").removeClass("hidden");

    $question1.data('answered', true);

    if ($(this).val() == "a") {
        $q1_a.removeClass("hidden");   //show explanation for answer

        if ($questionAnswered == false) {    //check if question has already been answered
            $q1_a.addClass("selected");
            alertScore();
        }
    }
    else if ($(this).val() == "b") {
        $q1_b.removeClass("hidden");

        if ($questionAnswered == false) {    //check if question has already been answered
            $q1_b.addClass("selected");
            alertScore();
        }
    }
    else if ($(this).val() == "c") {
        $q1_c.removeClass("hidden");

        if ($questionAnswered == false) {    //check if question has already been answered
            $q1_c.addClass("selected");
            alertScore();
        }
    }
    else if ($(this).val() == "d") {
        $q1_d.removeClass("hidden");

        if ($questionAnswered == false) {    //check if question has already been answered
            $q1_d.addClass("selected");
            alertScore();
        }
    }

    //update score for question
    var $q1_score = $('#q1_score');

    if($(this).val() == "b" && $questionAnswered == false){
        updateScore(1);
        $q1_score.parent().removeClass("hidden");
        $q1_score.text(1);
    }else{
        $q1_score.parent().removeClass("hidden");
        $q1_score.text(0);
    }

});

/*
 Displays all explanations
 */
$('#explain').on('click', function () {
    $('#q1__options').find('p').each(function () {
        $(this).removeClass("hidden");
    })
});


/*
 Question 2
 */
$('input:checkbox[name="question2"]').change(function () {
    $(this).parent().toggleClass("highlighted");
});

$('#q2__submit').on('click', function () {

    var $checkedOptions = $('input:checkbox[name="question2"]:checked');
    var $q2 = $('#q2');
    var $q2_response = $('#q2__response');

    if ($checkedOptions.length == 2) {
        var ans1 = $checkedOptions[0].value;
        var ans2 = $checkedOptions[1].value;
        var $q2_score = $('#q2_score');

        $q2_response.removeClass("hidden");

        if (ans1 == "function" && ans2 == "variable") {
            $q2_response.text("Correct: Yes!  It is hard to believe that words we take for granted in computing were once so new.");
            if ($q2.data('answered') == false) {
                updateScore(2);
                $q2_score.parent().removeClass("hidden");
                $q2_score.text(2);
            }
        }
        else if (ans1 == "function" || ans1 == "variable") {
            $q2_response.text('One word correct:  You picked ' + ans1 + ' correctly, but ' + ans2 + ' is one of the ' +
                'words that Professors Gotlieb and Hume got credit for.');

            $q2_score.parent().removeClass("hidden");
            $q2_score.text(0);
        } else if (ans2 == "variable" || ans2 == "function") {
            $q2_response.text('One word correct: You picked ' + ans2 + ' correctly, but ' + ans1 + ' is one of ' +
                'the words that Professors Gotlieb and Hume got credit for.');

            $q2_score.parent().removeClass("hidden");
            $q2_score.text(0);
        } else {
            $q2_response.text('Neither word correct:  Both words you chose are words that Professors ' +
                'Gotlieb and Hume were quoted for in the OED.');

            $q2_score.parent().removeClass("hidden");
            $q2_score.text(0);
        }
        $q2.data('answered', true);

        //disable user input
        $('#q2__submit').prop('disabled', true);

        $('input:checkbox[name="question2"]').each(function () {
            $(this).prop('disabled', true);
        });

        alertScore();
    }
    else if ($checkedOptions.length > 2) {
        $q2_response.removeClass("hidden");
        $q2_response.text("Only two words can be selected. Please try again.");
    }
    else if ($checkedOptions.length == 1) {
        $q2_response.removeClass("hidden");
        $q2_response.text("Your answer is incomplete.  Please select another word.");
    }
});


/*
 Question 3
 */
$('input:radio[name="q3-people"]').change(function () {
    $nameSelected = $(this).val();
});

$('input:radio[name="q3-fame"]').change(function () {
    var answered = true;
    var $fameQuestions = $('input:radio[name="q3-fame"]');

    $fameSelected = $(this);

    //checks if user selected a person
    if ($nameSelected != null) {
        //associate name with fame
        $fameSelected.next().text($nameSelected);
        $fameSelected.prop('value', $nameSelected);
        $fameSelected.prop('checked', false);
    }

    //check if all questions answered
    $fameQuestions.each(function () {
        if (this.value == "") {
            answered = false;
        }
    });

    //all questions answered
    if (answered == true) {
        var names = document.getElementsByName("q3-people");
        var userAnswers = document.getElementsByName("q3-fame");
        var score = 0;
        var $q3_score = $('#q3_score');

        for (var i = 0; i < userAnswers.length; i++) {
            userAnswers[i].disabled = true;
            names[i].disabled = true;

            var answer = userAnswers[i].getAttribute("data-answer");

            if (userAnswers[i].value === answer) {
                $('#q3').data('answered', true);
                userAnswers[i].parentNode.getElementsByTagName("span")[0].className += " correct_answer";
                var answer_node = document.createElement("p");
                var text = document.createTextNode("Correct!");

                //show correct answer
                answer_node.appendChild(text);
                userAnswers[i].parentNode.appendChild(answer_node);

                updateScore(0.5);
                score += 0.5;
            } else {
                var answer_node = document.createElement("p");
                var text = document.createTextNode("The correct answer is : " + answer);

                userAnswers[i].parentNode.getElementsByTagName("span")[0].className += " wrong_answer";

                //show correct answer
                answer_node.appendChild(text);
                userAnswers[i].parentNode.appendChild(answer_node);
            }
        }
        $q3_score.parent().removeClass("hidden");
        $q3_score.text(score);

        alertScore();
    }
});

/*
 Question 4
 */
var $q4_options = $('#q4__options');
var dragEvent;

function randomizeQ4Order(){
    var questions = [1, 2, 3, 4, 5, 6, 7];

    shuffleArray(questions);

    for(var i = 0; i < questions.length; i++){
        var question = $('#q4_' + questions[i]);
        $('#q4__options').append(question);
    }
}

/*
User drags an element
Saves information of the element being dragged
 */
$q4_options.on("dragstart", 'li', function (ev) {
    dragEvent = ev;
    var event = ev. originalEvent;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.dropEffect = 'move';
    event.dataTransfer.setData("Text", ev.target.getAttribute('id'));
    event.dataTransfer.setData("Position", ev.clientY);

});

/*
disable drag enter event to allow element to be dropped
 */
$q4_options.on("dragenter", 'li', function (ev) {
    ev.preventDefault();
    return true;
});

$q4_options.on("dragover", 'li', function (ev) {
    return false;
});


/*
User drops element over another to switch spots
Updates positions of each invention (li element)
 */
$q4_options.on("drop", 'li', function (ev) {
    var src = ev.originalEvent.dataTransfer.getData("Text");
    var old_pos = ev.originalEvent.dataTransfer.getData("Position");
    var new_pos = ev.clientY;

    //check whether the user is dragging from above or below
    if(old_pos < new_pos){  //user drags from top to bottom
        $(event.target).after($("#"+src));
    }else{
        $(event.target).before($("#"+src));
    }

    ev.stopPropagation();

    return false;
});

/*
Check if answers are correct,
         displays right and wrong dates,
         updates score
 */
$('#q4__submit').on("click", function(){
    var correct = true;
    var $answers = $('#q4__options').children('li');
    var $q4_score = $('#q4_score');

    for (var i = 0 ; i < $answers.length; i++){
        //display date
        var date = $answers[i].getAttribute("data-date");
        var dateSpan = document.createElement('span');
        var dateText = document.createTextNode(date);

        dateSpan.appendChild(dateText);
        $answers[i].parentNode.insertBefore(dateSpan, $answers[i]);

        if ($answers[i].getAttribute('data-order') != i){
            correct = false;
            dateSpan.className += " wrong_answer";

        }else {
           dateSpan.className += " correct_answer";
        }

        $answers[i].draggable = false;
    }

    $q4_score.parent().removeClass('hidden');

    if(correct == true){
        updateScore(1);
        $q4_score.text(1);
    }else{
        $q4_score.text(0);
    }

    $('#q4__submit').prop('disabled', true);
    $('#q4').data('answered', true);

    alertScore();
});

/*reset q1 answers*/
function resetQ1(){

    var $q1_options = $('#q1__options');
    $q1_options.find('p').each(function () {
        $(this).addClass("hidden");
        $(this).removeClass("selected")
    });

    var $q1_score = $('#q1_score');
    $q1_score.parent().addClass("hidden");

    $('#explain').addClass("hidden");

    $('#q1').data('answered', false);

}

/*reset q2 answers*/
function resetQ2() {
    $('#q2__submit').prop('disabled', false);

    $('input:checkbox[name="question2"]').each(function () {
        $(this).prop('disabled', false);
        $(this).parent().removeClass();
    });

    $('#q2_score').parent().addClass("hidden");

    $('#q2__response').addClass("hidden");

    $('#q2').data('answered', false);
}

/*reset q3 answers*/
function resetQ3(){
    var $q3_answers = $('#q3__fame');
    var $q3_fame = $('input:radio[name="q3-fame"]');

    $q3_answers.find('p').remove();
    $q3_answers.find('span').empty();
    $q3_answers.find('span').removeClass();
    $q3_answers.find('span').addClass("q3_userAnswer");
    $('input:radio[name="q3-people"]').prop('disabled', false);
    $q3_fame.prop('disabled', false);
    $q3_fame.val("");

    $('#q3_score').parent().addClass("hidden");
    $('#q3').data('answered', false);
}

/*reset q4 answers*/
function resetQ4(){
    var $q4_options = $('#q4__options');

    $('#q4__submit').prop('disabled', false);

    $q4_options.children('li').prop('draggable', true);
    $q4_options.children('span').empty();
    $q4_options.children('span').removeClass();

    $('#q4_score').parent().addClass('hidden');

    $('#q4').data('answered', false);
    randomizeQ4Order();
}

/*
 Reset Quiz
 */
$('#reset_quiz').on("click", function(){
    $('form').trigger('reset'); //resets all form fields
    resetQ1();
    resetQ2();
    resetQ3();
    resetQ4();
    randomizeOrder();
    SCORE = 0;
    $('#score').text(SCORE);
});

/*
Checks if the user answers all questions
and alerts the user of their total score
 */
function alertScore(){
    var $q1 = $('#q1').data('answered');
    var $q2 = $('#q2').data('answered');
    var $q3 = $('#q3').data('answered');
    var $q4 = $('#q4').data('answered');

    if($q1 && $q2 && $q3 && $q4){
        alert("Your total score is: " + SCORE);
    }
}

/*
Randomize order of questions
 */
function randomizeOrder(){
    var order = [1, 2, 3 ,4];
    shuffleArray(order);

    for(var i = 0; i < order.length; i++){
        var question = $('#q' + order[i]);
        $('#container').append(question);
        question.find('h2').text('Question ' + (i + 1) + ':');
    }
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
