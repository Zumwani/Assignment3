const { randomUUID } = require("crypto");
const express = require("express");

const controller = express.Router();
let products = require("../data/simulated_database");

module.exports = controller;

controller.param("id", (request, response, next, articleNumber) => {
  request.product = products.find(p => p.articleNumber == articleNumber);
  if (request.product === undefined)
    response.status(404);
  else
    next();
});

//http://localhost/api/products
controller.route("/").
get((_, response) => {
  response.status(200).json(products ?? []);
}).
post((request, response) => {

  const { name, imageName, rating, category, description, price } = request.body;

  if (name == "" || imageName == "" || category == "" || description == "" || price == 0) {
    response.status(400);
    return;
  };
  
  let product = {
    articleNumber: randomUUID(),
    name: name,
    imageName: imageName,
    rating: rating,
    category: category,
    description: description,
    price: price,
  };
  
  products.push(product);
  response.status(201).json(product);
  console.log(201);
    
});

//http://localhost/api/products/:id
controller.route("/:id").

get((request, response) => {
    response.status(200).json(request.product);
}).

put((request, response) => {

  const { name, imageName, rating, category, description, price } = request.body;

  products.forEach(p => {
    if (p.articleNumber === request.product.articleNumber) {
      p.name = name ? name : p.name;
      p.imageName = imageName ? imageName : p.imageName;
      p.rating = rating ? rating : p.rating;
      p.category = category ? category : p.category;
      p.description = description ? description : p.description;
      p.price = price ? price : p.price;
    }
  });

  response.status(200).json(request.user);

}).

delete((request, response) => {
  products = products.filter(p => p.articleNumber !== request.product.articleNumber);
  response.status(204);
});
