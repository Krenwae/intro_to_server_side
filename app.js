var express = require('express');

var app = express();
var port= 5000;

app.use(express.static('public'));

app.set('views', './src/views');
app.set('view engine', 'ejs');

var locals = {
  title: "Hello from Express",
  date: new Date(),
  list: ['a', 'b', 'c']
};

app.get('/', function(req, res){
  res.render("index", locals);
});

app.listen(port, function(err){
  console.log("Listening on port: " + port)
})
