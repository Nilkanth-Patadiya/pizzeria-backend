var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

let mongoose = require('mongoose');
let mySchema = mongoose.Schema;
let pizSchema = new mySchema({
  id: String,
  type: String,
  price: String,
  name: String,
  image: String,
  description: String,
  ingredients: [{
    id: String,
    iname: String
  }],
  topping: [{
    id: String,
    tname: String,
    price: String
  }]
});
let topSchema = new mySchema({
  id: Number,
  image: String,
  price: Number,
  tname: String
});

mongoose.connect('mongodb://localhost:27017/pizzeria', (err) => {
  if (err) throw err;
  else {
    console.log('Connected to mongodb via mongoose');
  }
});

let pizza = mongoose.model('pizza', pizSchema, 'pizza');
let toppingsandingredients = mongoose.model('toppingsandingredients', topSchema);



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/pizzas', function (req, res, next) {

  pizza.find({}, (err, docs) => {
    if (err) throw err;
    //console.log(docs);
    res.send(docs);
  });

});


router.get('/toppings', function (req, res, next) {

  toppingsandingredients.find({}, (err, docs) => {
    if (err) throw err;
    //console.log(docs);
    res.send(docs);
  });

});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

module.exports = router;
