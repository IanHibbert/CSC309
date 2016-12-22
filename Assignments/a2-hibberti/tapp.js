/**
 * Created by ian on 2016-10-28.
 */
'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes.js');

var app = express();

app.use(express.static(__dirname + 'assets'));
app.use(express.static(__dirname + '/'));

app.engine('.html', require('ejs').__express);
app.set('views', __dirname);
app.set('view engine', 'html');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
    extended: true
}));

app.get('/', function (req, res) {
    res.sendfile('index.html');
});

app.get('/applicants', routes.getApp);
app.post('/applicants', routes.addApp);
app.delete('/applicants', routes.delApp);

app.get('/courses', routes.getCourses);

// start the server
app.listen(3000);
console.log('Listening on port 3000');
