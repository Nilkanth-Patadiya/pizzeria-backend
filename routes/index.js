var express = require("express")
var router = express.Router()

let mongoose = require("mongoose")
let mySchema = mongoose.Schema
let pizSchema = new mySchema({
  id: String,
  type: String,
  price: String,
  name: String,
  image: String,
  description: String,
  ingredients: [
    {
      id: String,
      iname: String,
    },
  ],
  topping: [
    {
      id: String,
      tname: String,
      price: String,
    },
  ],
})
let topSchema = new mySchema({
  id: Number,
  image: String,
  price: Number,
  tname: String,
})

let pizza = mongoose.model("pizza", pizSchema, "pizza")
let toppingsandingredients = mongoose.model("toppingsandingredients", topSchema)

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" })
})

router.get("/pizzas", function (req, res, next) {
  pizza.find({}).then(
    (docs) => {
      console.log(docs)
      res.send(docs)
    },
    (err) => {
      throw err
    }
  )
})

router.get("/toppings", function (req, res, next) {
  toppingsandingredients.find({}).then(
    (docs) => {
      console.log(docs)
      res.send(docs)
    },
    (err) => {
      throw err
    }
  )
})

module.exports = router
