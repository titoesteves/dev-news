var home = require('./routes/index');
var logger = require('morgan');
var handlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static('public'));

app.engine('html', handlebars({extname: 'html', defaultLayout: 'main' }));
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('x-powered-by', false);

app.use(logger('dev'));

app.use('/', home);

app.set('port', process.env.PORT || 3000);
var port = app.get('port');
app.listen(port, function(){
  console.log(`listening on ${port}`);
});
