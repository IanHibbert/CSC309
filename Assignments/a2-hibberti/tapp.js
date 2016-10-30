/**
 * Created by ian on 2016-10-28.
 */
'use strict';

var express = require('express');
var expressValidator = require('express-validator');
var bodyParser = require('body-parser');
var routes = require('./routes.js')

var app = express();

app.use(express.static(__dirname + 'assests'));
app.use(express.static(__dirname + '/'));

app.engine('.html', require('ejs').__express);
app.set('views', __dirname);
app.set('view engine', 'html');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({   // to support URL-encoded bodies
    extended: true
}));

app.get('/', function(req, res){
    res.sendfile('index.html');
});

app.get('/applicants', getApp);
app.post('/applicants', addApp);
app.delete('/applicants', delApp);

app.get('/course', getCourses);