var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var routes = require('./routes');
var jade = require('jade');
var engines = require('consolidate');
var baby = require('./routes/baby');
var teacher = require('./routes/teacher');
var user =  require('./routes/user');
var apartment = require('./routes/apartment');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var session = require('express-session')
var everyauth = require('everyauth');
var mongoskin = require('mongoskin');
var dbUrl = 'mongodb://@localhost:27017/preschool';
var  db = mongoskin.db(dbUrl, {safe: true});
var  collections = {
    babyInfo: db.collection('babyInfo'),
    teachers: db.collection('teacherInfo'),
    users: db.collection('users'),
    apartments: db.collection('apartments')
  };


app.use(function(request, response, next) {
  if (!collections.babyInfo) return next(new Error("No collections."))
  request.collections = collections;
  return next();
});

app.set('port', process.env.PORT || 4501);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'html')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(validator([]));
app.use(session({secret: '2C44774A-D649-4D44-9535-46E296EF984F'}));
app.use(everyauth.middleware());

// app.param('userId', function(request, response, next, userId){
// 	users.findUserByUserId(userId, function(error, user){
// 		if (error) return next(error);
// 		request.user = user;
// 		return next();
// 	});
// });

everyauth.everymodule.handleLogout(user.logout);
everyauth.everymodule.findUserById( function (user, callback) {
  callback(user)
});

var authorize = function(req, res, next) {
  if (req.session && req.session.admin)
    return next();
  else
    return res.redirect('/login');
};

app.param('babyId', function(request, response, next, babyId){
	baby.populateData(babyId, request, function(error, classes, branches, baby){
		if (error) return next(error);
		request.classes = classes;
		request.branches = branches;
		request.baby = baby;
		return next();
	});
});

// Static content
app.get('/', function(request, response){
  response.sendFile(__dirname + '/html/index1.html');

});

// Login
app.get('/login', function(request, response, next){
	return response.render('login');
});
app.post('/login', user.authenticate);

// Admin
app.get('/admin', routes.admin);
app.get('/admin/:userId', function(request, response, next){
	return response.render('user', request.user);
});

// Baby
app.get('/babyList', authorize, baby.getBabies);
app.get('/baby', authorize, baby.getRefData);
app.get('/babyList/:babyId', authorize, function(request, response, next){	
	return response.render('babyInfo', request.classes, request.branches);	
});
app.post('/babyList/:babyId', authorize, baby.addBaby); 

// Teacher
app.get('/teacherList', authorize, teacher.getTeachers);
app.get('/teacher/:teacherId', authorize, function(request, response, next){
	return response.render('teacherInfo', request.classes, request.branches);
});
app.get('/teacherInfo', authorize, teacher.getRefData);

//
app.get('/babyAttendance', baby.getTimeTables);

// Apartment
app.get('/apartments/:year/:month/:id', apartment.populateData);
app.post('/apartments/:year/:month/:id', apartment.addOrUpdateApartment);
app.get('/apartmentStatistic', apartment.getStatistic);

// Create server
http.createServer(app).listen(app.get('port'),function(){
	console.log('Express server listening port ' + app.get('port'));
});