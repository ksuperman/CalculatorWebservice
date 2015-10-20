var express = require('express'),
routes = require('./routes'),
user = require('./routes/user'),
http = require('http'),
path = require('path'),
bodyParser = require('body-parser'),
multer = require('multer');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

//Routes Defined to the Webservice
app.get('/', routes.index);
app.post('/evaluate', routes.evaluate);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Calculator Webservice is running on port ' + app.get('port'));
});
