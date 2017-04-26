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

var users=[
  {
    firstName: "Spencer",
    lastName: "Sholander"
  },
  {
    firstName: "Nick",
    lastName: "Cappasso"
  },
  {
    firstName: "Ian",
    lastName: "Sorensen"
  },
  {
    firstName: "Greatest",
    lastName: "Ever"
  }
];

app.get('/users', function(req, res){
 res.send(users);
});

app.get('/users/:id', function(req, res){
  console.log(req.params);
  var user = users[req.params.id];
  res.send(user);
});

app.listen(port, function(err){
  console.log("Listening on port: " + port)
});
