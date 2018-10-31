const express = require('express');
const hbs = require('hbs');

var app = express();
app.use(express.static("views"));
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));


app.get('/', (get, res) => {
  
  res.render('index.html')
  });
 
 app.get('/login', (get, res) => {
  
  res.render('login.hbs')
  });


app.listen(3000, () => {
  console.log("Server is up and running at 3000 port");
});
