/**
 * Created by ian on 2016-10-28.
 */
'use strict';
var fs = require('fs');
var TAs;
var Courses;

fs.readFile('data/tas.json', 'utf-8', function (err, data) {
    if (err) throw err;
    var info = JSON.parse(data);
    TAs = info['tas'];
    //Sort by family name in ascending order
    TAs.sort(taSort);
});

fs.readFile('data/courses.json', 'utf-8', function (err, data) {
    if (err) throw err;
    var info = JSON.parse(data);
    Courses = info['courses'];
});

/*
 Sort by Family Name
 */
function taSort(a, b) {
    if (a.familyname == b.familyname)
        return 0;
    if (a.familyname < b.familyname)
        return -1;
    if (a.familyname > b.familyname)
        return 1;
}

/*
 Sort by Rank
 */
function rankSort(a, b) {
    if (a.rank == b.rank)
        return 0;
    if (a.rank < b.rank)
        return -1;
    if (a.rank > b.rank)
        return 1;
}

/*
 Returns list of TA objects filtered by status
 */
var filterStatus = function (req) {
    var filteredTAs;
    TAs.sort(taSort);

    filteredTAs = TAs.filter(function (TA) {
        return TA.status == req.query.status;
    });
    return filteredTAs;
};

/*
 Returns list of TA objects filtered by firstName
 */
var filterFamilyName = function (req) {
    var filteredTAs;

    TAs.sort(taSort);

    filteredTAs = TAs.filter(function (TA) {
        return TA.familyname == req.query.fname;
    });
    return filteredTAs;
};

/*
 Returns a list a of TA objects without the course attribute
 removes courses from each TA to send response in correct format
 */

function removeCourses(TA) {
    var TA_cpy = JSON.parse(JSON.stringify(TA));   //create a copy of TAs
    TA_cpy.forEach(function (TA) {
        delete TA.courses;
    });

    return TA_cpy;
}

/*
 Checks for duplicate student number
 */
function checkStudentNumber(stuNum) {
    for (let i = 0; i < TAs.length; i++) {
        if (TAs[i].stunum == stuNum) {
            return true;
        }
    }
    return false;
}

/*
 Sends list of all TA applicants
 */
exports.getApp = function (req, res) {
    var TA = {};

    //return by status
    if (req.query.status) {
        TA["tas"] = removeCourses(filterStatus(req));
        res.send(JSON.stringify(TA));
        console.log("filtered by status: " + req.query.status);
    }
    //return by family name
    else if (req.query.fname) {
        TA["tas"] = filterFamilyName(req);
        res.send(JSON.stringify(TA));
        console.log("filtered by family name: " + req.query.fname);
    }
    //return all TAs
    else {
        TA["tas"] = removeCourses(TAs);
        TA.tas.sort(taSort);
        res.send(JSON.stringify(TA));
        console.log("returned all TAs");
    }
};

/*
 Adds applicant to list of TAs
 */
exports.addApp = function (req, res) {
    console.log(req.body);
    var newApp = req.body;

    if (!checkStudentNumber(newApp.stunum)) {
        TAs.push(newApp);
        console.log("added new applicant: ");
        console.log(req.body);
        res.send("Success");
    } else {
        console.log("duplicate student number - applicant was not added");
        res.send("Error: duplicate student number");
    }

};

/*
 Delete applicant
 */
exports.delApp = function (req, res) {
    var found = false;
    if (req.query.fname) {
        for (var i = 0; i < TAs.length; i++) {
            if (TAs[i].familyname == req.query.fname) {
                found = true;
                TAs.splice(i, 1);
                console.log(TAs[i]);
                console.log("Success: " + req.query.fname + " was removed.");
            }
        }
    } else if (req.query.stunum) {
        for (var j = 0; j < TAs.length; j++) {
            if (TAs[j].stunum === req.query.stunum) {
                found = true;
                TAs.splice(j, 1);
                console.log(TAs[j]);
                console.log("Success: " + req.query.stunum + " was removed.");
            }
        }
    }

    if (found)
        res.send("Success");
    else
        res.send("Error: no such student");
};

/*
 Filters TAs by courseName and returns a list of TA objects
 */
function filterCourse(courseName) {
    var filteredTAs = [];
    for (let i = 0; i < TAs.length; i++) {
        var TA = TAs[i];
        for (let i = 0; i < TA.courses.length; i++) {
            if (TA.courses[i].code == courseName) {
                filteredTAs.push(
                    {
                        "stunum": TA.stunum,
                        "givenname": TA.givenname,
                        "familyname": TA.familyname,
                        "status": TA.status,
                        "year": TA.year,
                        "experience": TA.courses[i].experience,
                        "rank": TA.courses[i].rank
                    });
            }
        }
    }

    filteredTAs.sort(rankSort);
    return filteredTAs;
}

/*
 Get applicants for each course.
 For each course, list all the applicants who applied for that course
 ordered by ranking. The view will display a table with the following columns:
 Ranking, Experience, Status, Given Name, Family Name.
 */
exports.getCourses = function (req, res) {
    var courseCode = req.query.course;

    if (courseCode) {
        var TA = {"code": courseCode};
        TA["tas"] = filterCourse(courseCode);
        console.log("Displayed TA's who applied for " + courseCode);
        JSON.stringify(TA);
        res.send(TA);
    } else {
        var response = {"courses": []};

        for (var i = 0; i < Courses.length; i++) {
            var course = Courses[i];

            response.courses.push(
                {
                    "code": course,
                });
            response.courses[i]["tas"] = filterCourse(course);
        }
        console.log(response);
        JSON.stringify(response);
        res.send(response);
        console.log('Displayed all courses');
    }

};