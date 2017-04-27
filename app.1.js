var express = require('express');

var mongodb = require('mongodb');

var app = express();
var port= 5000;

var bodyParser = require('body-parser');


app.use(function(req, res, next){
  console.log("Got request "+ req.params);
  next();
});

// parses x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parses application/json
app.use(bodyParser.json());

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
  }
];

app.get('/addUsers', function(req, res){
  var url = 'mongodb://localhost:27017/usersApp';

  mongodb.connect(url, function(err, db){
    var collection = db.collection('users');
    collection.insertMany(users, function(err, results){
      res.send(results);
      db.close();
    });
  });
});

app.get('/users', function(req, res){
 res.send(users);
});

app.get('/users/:id', function(req, res){
  console.log(req.params);
  var user = users[req.params.id];
  if(user) res.send(user);
  else res.sendStatus(404);
});

app.post('/users', function(req, res){
  console.log("POST request to /users");
  console.log(req.body);
  users.push(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName
    }
  );
  res.send(users);
});

app.delete('/users/:id', function(req, res){
  var id = req.params.id;
  console.log("DELETE request to /users/" + id);
  if(users.length >= (id + 1)){
    console.log("Deleting user " + users[id].firstName);
    users.splice(id, 1);
  }
  res.send(users);
});

app.listen(port, function(err){
  console.log("Listening on port: " + port)
});
