const { randomUUID } = require("crypto");
const express = require("express");

const controller = express.Router();
let { products, saveProducts } = require("../data/simulated_database");

module.exports = controller;

//http://localhost/api/products
controller.route("/").
get((_, response) => {
  response.status(200).json(products ?? []);
}).
post((request, response) => {

  const { name, imageName, rating, category, description, price } = request.body;

  if (name == "" || imageName == "" || category == "" || description == ""  || price == "" || rating == "") {
    response.status(400).send(null);
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
  saveProducts(products);
  response.status(201).json(product);
  console.log(201);
  
});

controller.param("id", (request, response, next, articleNumber) => {
  request.product = products.find(p => p.articleNumber == articleNumber);
  if (!request.product)
    response.status(404).send(null);
  else
    next();
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
  saveProducts(products);

  response.status(200).json(request.user);

}).

delete((request, response) => {
  products = products.filter(p => p.articleNumber !== request.product.articleNumber);
  saveProducts(products);
  console.log(products.length);
  response.status(204).send(null);
});
