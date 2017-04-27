var express = require('express');

var mongodb = require('mongodb');
var objectId = require('mongodb').ObjectID;

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

var methodOverride = require('method-override')
app.use(methodOverride('_method'));

app.set('views', './src/views');
app.set('view engine', 'ejs');

var nav = [
  {
    title: 'Movies',
    link: '/movies'
  },
  {
    title: 'About',
    link: '/about'
  }
];

app.use(function(req, res, next){
  res.locals.nav = nav;
  next();
});

app.get('/', function(req, res){
  res.render("index");
});

var url = 'mongodb://localhost:27017/movieApp'

app.get('/movies', function(req, res){
  mongodb.connect(url, function(err, db){
    var collection = db.collection('movies');
    collection.find({}).toArray(
      function(err, results){
        res.render("movieList", {movieList: results});
      }
    )
  })
});

app.post('/movies', function(req, res){
  mongodb.connect(url, function(err, db){
    var collection = db.collection('movies');
    var movie = {
      title: req.body.title,
      year: req.body.year
    };
    collection.insertOne(movie, function(err, results){
      res.redirect('/movies');
    });
  });
});

app.delete('/movies/:id', function(req, res){
  var id = new objectId(req.params.id);
  console.log('Deleting...' + id);

  mongodb.connect(url, function(err, db){
    var collection = db.collection('movies');

    collection.deleteOne({_id: id}, function(err, results){
      res.redirect('/movies');
    });
  });
});

app.listen(port, function(err){
  console.log("Listening on port: " + port);
});
