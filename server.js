var handlebars = require('express-handlebars');
var express = require('express');
var app = express();

app.use(express.static('public'));

app.engine('html', handlebars({extname: 'html', defaultLayout: 'main' }));
app.set('view engine', 'html');

app.get('/', function(req, res){
  res.render('index', { text: 'handlebars' });
});

app.listen(3000, function(){
  console.log('listening on 3000');
});
