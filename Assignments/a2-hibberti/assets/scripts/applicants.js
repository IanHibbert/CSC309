/**
 * Created by ian on 2016-10-31.
 */

/*
 Populates table with information of all Applicants
 */
function buildTable(taObj) {
    let table = $('#applicants-table');
    let parent = table.children();
    for (let j = 0; j < taObj.length; j++) {
        var td = $('td');
        var data = [taObj[j].givenname, taObj[j].familyname, taObj[j].status, taObj[j].year];

        parent.append($('<tr>'));
        for (let i = 0; i < data.length; i++) {
            var html = $('<td>').text(data[i]);
            parent.append(html);
        }
    }
    table.show();
}

/*
 Populates table of an applicant with a specific Family Name
 */
function buildTableApp(taObj) {
    for (let j = 0; j < taObj.length; j++) {
        let data = [taObj[j].givenname, taObj[j].familyname, taObj[j].stunum, taObj[j].year, taObj[j].status,
            taObj[j].courses];

        $('#gName').after($('<td>').text(data[0]));
        $('#fName').after($('<td>').text(data[1]));
        $('#stuNum').after($('<td>').text(data[2]));
        $('#year').after($('<td>').text(data[3]));
        $('#status').after($('<td>').text(data[4]));

        var courses = $('#courses');
        courses.after($('<td>'));

        for (let i = 0; i < data[5].length; i++) {
            var course = data[5][i].code;
            var rank = data[5][i].rank;
            var experience = data[5][i].experience;

            courses.next().append(
                $('<ul>').append(
                    $('<li>').text(course)
                        .append($('<li>').text("experience: " + experience))
                        .append($('<li>').text("rank: " + rank))));
        }
    }
    $('#applicant-table').show();
}

/*
 Removes applicant table from view
 */
function removeTable() {
    let table = $("#applicants-table");
    table.find("tr:not(:first)").remove();
    table.find("td").remove();
    table.hide();
}

/*
 Removes table of courses from view
 */
function removeCoursesTable() {
    let table = $('#courses-table');
    table.children().remove();
}

/*
 Adds another section for courses to the add applicant form
 */
function addCourseForm(courses) {
    //populate courses in formData
    var numCourses = $('.courses-group').length;
    var courseCodes = $('.courses-group input[name="code"]');
    var courseRanks = $('.courses-group input[name="rank"]');
    var courseExp = $('.courses-group input[name="experience"]');
    for (let i = 0; i < numCourses; i++) {
        courses.push(
            {
                "code": courseCodes[i].value,
                "rank": courseRanks[i].value,
                "experience": courseExp[i].value
            });
    }
}

/*
 Creates table headers for course Table
 */
function createCourseHeaders() {
    var ranking = $('<td>', {class: "ranking", text: "Ranking"});
    var experience = $('<td>', {class: "experience", text: "Experience"});
    var status = $('<td>', {class: "status", text: "Status"});
    var gName = $('<td>', {class: "given-name", text: "Given Name"});
    var fName = $('<td>', {class: "family-name", text: "Family Name"});

    return $('<tr>', {class: "table-headers"}).append(ranking, [experience, status, gName, fName]);
}

/*
 Creates data required for course table from TA
 */
function createCourseData(TA) {
    let ranking = $('<td>', {class: "ranking", text: TA.rank});
    let experience = $('<td>', {class: "experience", text: TA.experience});
    let status = $('<td>', {class: "status", text: TA.status});
    let gName = $('<td>', {class: "given-name", text: TA.givenname});
    let fName = $('<td>', {class: "family-name", text: TA.familyname});

    return $('<tr>').append(ranking, [experience, status, gName, fName]);
}

/*
 Builds course Table
 */
function createCourseTable(courseCode) {
    var table = $('<table>', {class: "course-table"});
    var courseName = $('<tr>').append($('<th>', {class: "course-name title", text: courseCode, colspan: "5"}));
    var tableHeaders = createCourseHeaders();
    return table.append(courseName, [tableHeaders]);
}

/*
 Adds text to modal
 */
function addModalText(text) {
    $('.modal-content').append($('<p>').text(text));
}

/*
 Closes and removes data from modal
 */
function closeModal() {
    var content = $('.modal-content');
    var modal = $('#applicant-modal');
    var form = $('#add-app-form');
    modal.hide();
    form.hide();
    content.find('p').remove();
    content.find('td').remove();
    $('#applicant-table').hide();
}


$(document).ready(function () {
    /*Shows all applicants*/
    $('#all-applicants').on('click', function () {
        removeTable();
        removeCoursesTable();
        $.get('applicants', function (data) {
            let taObj = JSON.parse(data);
            buildTable(taObj.tas);
        });
    });

    /*Shows applicants with specific status*/
    $('.status').click(function () {
        removeTable();
        removeCoursesTable();
        $.ajax({
            url: "applicants",
            data: {status: $(this).text()},
            success: function (data) {
                let taObj = JSON.parse(data);
                buildTable(taObj.tas);
            }
        })
    });

    /*Shows applicants with specific Family Name
     * Possible feature: add predictive search*/
    $('#search-fname').submit(function (e) {
        e.preventDefault();
        var modal = $('#applicant-modal');
        var familyName = $('#familyName-text').val();

        $.ajax({
            url: "applicants",
            data: {fname: familyName},
            success: function (data) {
                let taObj = JSON.parse(data);
                if (taObj.tas.length != 0)
                    buildTableApp(taObj.tas);   //do something other than build list
                else
                    addModalText("Sorry I couldn't find someone named " + familyName);
            }
        });

        modal.show();
    });

    /* Displays add applicant form */
    $('#add-applicant').click(function () {
        var modal = $('#applicant-modal');
        var form = $('#add-app-form');
        form.show();
        modal.show();
    });

    /*Adds another course group to be added for the applicant*/
    $('#add-course-btn').click(function () {
        var coursesGroup = $('.courses-group');
        var course = $('<div>', {class: 'courses-group form-group'});

        var code = $('<label>', {text: 'Code',})
            .append($('<input>', {type: 'text', name: 'code'}).prop('required', true));

        var rank = $('<label>', {text: 'Rank',})
            .append($('<input>', {
                type: 'text',
                name: 'rank',
                pattern: "[0-9]",
                title: "Enter a Number"
            }).prop('required', true));

        var exp = $('<label>', {text: 'Experience',})
            .append($('<input>', {
                type: 'text',
                name: 'experience',
                pattern: "[0-9]",
                title: "Enter a Number"
            }).prop('required', true));

        course.append(code, [rank, exp]);

        course.insertAfter(coursesGroup.last());
    });

    /* submitting new applicant */
    $('#add-app-form').submit(function (e) {
        e.preventDefault();
        var form = $('#add-app-form');
        var formData = {
            'stunum': $('#add-stuNum').val(),
            'givenname': $('#add-gName').val(),
            'familyname': $('#add-fName').val(),
            'status': $('#add-status').val(),
            'year': $('#add-year').val(),
            'courses': []
        };

        addCourseForm(formData.courses);
        //Ajax call
        $.ajax({
            url: "applicants",
            type: "POST",
            data: formData,
            dataType: 'text',
            success: function (res) {
                var content = $('.modal-content');
                /*hide form and show modal response from server*/
                form.trigger('reset');
                form.hide();
                if (res == "Success") {
                    addModalText(res);
                    addModalText("added new applicant " + formData.givenname);
                } else {
                    addModalText(res);
                }
            },
            error: function (xhr, textStatus, error) {
                console.log(xhr.statusText);
                console.log(textStatus);
                console.log(error);
            }
        });
    });

    /*Delete TA by family name*/
    $('#del-fname').submit(function (e) {
        e.preventDefault();
        var familyName = $('#del-fname-text').val();
        $.ajax({
            url: "applicants/?fname=" + familyName,
            type: "DELETE",
            success: function (res) {
                if (res == "Success")
                    addModalText("TA (" + "family name: " + familyName + ") was removed.");
                else
                    addModalText(res);

                $('#applicant-modal').show();
            }
        });
    });

    /*Delete TA by student number*/
    $('#del-stunum').submit(function (e) {
        e.preventDefault();
        var stuNum = $('#del-stunum-text').val();
        $.ajax({
            url: "applicants/?stunum=" + stuNum,
            type: "DELETE",
            success: function (res) {
                if (res == "Success")
                    addModalText("TA (" + "student number: " + stuNum + ") was removed.");
                else
                    addModalText(res);

                $('#applicant-modal').show();
            }
        });
    });

    /*Display all courses*/
    $('#display-courses').click(function () {
        removeTable();
        removeCoursesTable();

        $.get('courses', function (data) {
            for (let i = 0; i < data.courses.length; i++) {
                var course = data.courses[i];
                var courseCode = course.code;
                var table = createCourseTable(courseCode);

                for (let j = 0; j < course.tas.length; j++) {
                    var TA = course.tas[j];
                    var courseData = createCourseData(TA);

                    table.append(courseData);
                }
                $('#courses-table').append(table);
            }
        });
    });


    /*Display TAs who applied for a specific course*/
    $('#search-course').submit(function (e) {
        e.preventDefault();
        removeTable();
        removeCoursesTable();

        var courseWanted = $('#search-course-text').val();
        $.get('courses', {course: courseWanted}, function (data) {
            var TAs = data.tas;

            if (TAs.length) {    //At least one TA found for given course
                var courseCode = data.code;
                var table = createCourseTable(courseCode);

                for (let j = 0; j < TAs.length; j++) {
                    var TA = TAs[j];
                    var courseData = createCourseData(TA);

                    table.append(courseData);
                }
                $('#courses-table').append(table);
            } else {
                addModalText("Course: " + courseWanted + " not found.");
                $('#applicant-modal').show();
            }

        });
    });

});



