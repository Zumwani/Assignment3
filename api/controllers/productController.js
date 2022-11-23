const express = require("express");
const { resolve } = require("path");
const controller = express.Router();
let products = require("../data/simulated_database");

module.exports = controller;

// interface Product {
//   articleNumber: string,
//   name: string,
//   imageName: string,
//   rating: number,
//   category: string,
//   description?: string,
//   price: number
// }

controller.post("/", (request, response) => {

  console.log(request.body);
  const { name, imageName, rating, category, description, price } = request.body;

  if (name == "" || imageName == "" || rating == "" || category == "" || description == "" || price == "") {
    response.status(400);
    return;
  };

  let product = {
    articleNumber: (products?.length ?? -1) + 1,
    name: name,
    imageName: imageName,
    rating: rating,
    category: category,
    description: description,
    price: price,
  };
  
  products.push(product);
  response.status(201).json(product);
    
});

controller.get("/", (_, response) => {
  response.status(200).json(products ?? []);
});

// controller.get("/", (request, response) => {

//   let product = products.find(p => p.articleNumber == request.body.id);

//   return (
//     product == null 
//     ? response.status(201).json(product) 
//     : response.status(404));
    
// });

// const createProduct = (product/* : Product */) => {
//   return 200;
// }

// //GET
// const readProduct = (articleNumber/* : number */) => {
//   return 200;
// }

// //
// const updateProduct = (product/* : Product */) => {
//   return 200;
// }

// //
// const deleteProduct = (product/* : Product|number */) => {
//   return 200;
// }