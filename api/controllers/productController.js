const { randomUUID } = require("crypto");
const express = require("express");

const controller = express.Router();
module.exports = controller;

const ProductModel = require("../models/Product");

//Unsecure

const reassignIDToArticleNumber = (product) => ({
  articleNumber: product._id,
  name: product.name,
  category: product.category,
  tag: product.tag,
  price: product.price,
  rating: product.rating,
  description: product.description,
  imageName: product.imageName,
});

controller.route("/").get(async (_, response) => {
  
  try {
    response.status(200).json((await ProductModel.find()).map(reassignIDToArticleNumber));
  } catch (e) {
    response.status(400).send(null);
  }

});

controller.route("/:id").get(async (request, response) => {

  try {
    response.status(200).json(reassignIDToArticleNumber(await ProductModel.findById(request.params.id)));
  } catch (e) {
    response.status(404).send(null);
  }

});

controller.route("/tags/:tag").get(async (request, response) => {
  const products = await ProductModel.find({ tag: request.params.tag });
  response.status(200).json(products.map(reassignIDToArticleNumber));
});

controller.route("/tags/:tag/:take").get(async (request, response) => {
  const products = await ProductModel.find({ tag: request.params.tag }).limit(request.params.take);
  response.status(200).json(products.map(reassignIDToArticleNumber));
});

//Secure












//http://localhost/api/products
// controller.route("/products").
// get((_, response) => {
//   response.status(200).json(products ?? []);
// }).
// post((request, response) => {

//   const { name, imageName, rating, category, description, price, tags } = request.body;

//   if (name == "" || imageName == "" || category == "" || description == ""  || price == "" || rating == "") {
//     response.status(400).send(null);
//     return;
//   };
  
//   const product = {
//     articleNumber: randomUUID(),
//     name: name,
//     imageName: imageName,
//     rating: rating,
//     category: category,
//     description: description,
//     price: price,
//     tags: tags
//   };
  
//   products.push(product);
//   saveProducts(products);
//   response.status(201).json(product);
//   console.log(201);
  
// });

// controller.param("id", (request, response, next, articleNumber) => {
//   request.product = products.find(p => p.articleNumber == articleNumber);
//   if (!request.product)
//     response.status(404).send(null);
//   else
//     next();
// });

// //http://localhost/api/products/:id
// controller.route("/products/:id").

// get((request, response) => {
//     response.status(200).json(request.product);
// }).

// put((request, response) => {

//   const { name, imageName, rating, category, description, price, tags } = request.body;

//   products.forEach(p => {
//     if (p.articleNumber === request.product.articleNumber) {
//       p.name = name ? name : p.name;
//       p.imageName = imageName ? imageName : p.imageName;
//       p.rating = rating ? rating : p.rating;
//       p.category = category ? category : p.category;
//       p.description = description ? description : p.description;
//       p.price = price ? price : p.price;
//       p.tags = tags ? tags : p.tags;
//     }
//   });
//   saveProducts(products);

//   response.status(200).json(request.user);

// }).

// delete((request, response) => {
//   products = products.filter(p => p.articleNumber !== request.product.articleNumber);
//   saveProducts(products);
//   console.log(products.length);
//   response.status(204).send(null);
// });

// controller.route("/tags/:tag").
// get((request, response) => {

//   const tag = request.params.tag;

//   const items = products.filter(p => p.tags.split(";").includes(tag));
//   response.status(200).json(items);

// });

// controller.route("/reset").post((request, response) => {
// const description = `Way extensive and dejection get delivered deficient sincerity gentleman age. Too end instrument possession contrasted motionless. Calling offence six joy feeling. Coming merits and was talent enough far. Sir joy northward sportsmen education. Discovery incommode earnestly no he commanded if. Put still any about manor heard.
// * Village did removed enjoyed explain nor ham saw calling talking.
// * Securing as informed declared or margaret.
// * Joy horrible moreover man feelings own shy.
// On even feet time have an no at. Relation so in confined smallest children unpacked delicate. Why sir end believe uncivil respect. Always get adieus nature day course for common. My little garret repair to desire he esteem.`;
//   const products = [{
//     "articleNumber": "d3984cd9-f121-4981-8d03-83198d441379",
//     "name": "Black coat",
//     "description": description,
//     "category": "Coats",
//     "price": 95,
//     "rating": 4,
//     "imageName": "https://win22imgstorage.blob.core.windows.net/images/black-coat.png",
//     "tags": "flash-sale;latest;best-selling;top-reacted"
//   }, {
//     "articleNumber": "20222c00-4548-4149-9efd-49883e9f57b5",
//     "name": "Black dress",
//     "description": description,
//     "category": "Dresses",
//     "price": 88,
//     "rating": 5,
//     "imageName": "https://win22imgstorage.blob.core.windows.net/images/black-dress.png",
//     "tags": "featured"
//   }, {
//     "articleNumber": "19173bb6-20e1-4f81-ae63-c969a23e794e",
//     "name": "Black top & pants set",
//     "description": description,
//     "category": "Sets",
//     "price": 107,
//     "rating": 3,
//     "imageName": "https://win22imgstorage.blob.core.windows.net/images/black-set.png",
//     "tags": "flash-sale"
//   }, {
//     "articleNumber": "4bf6d7af-aa33-455c-9403-8301ea13071c",
//     "name": "White top & black pants set",
//     "description": description,
//     "category": "Sets",
//     "price": 115,
//     "rating": 2,
//     "imageName": "https://win22imgstorage.blob.core.windows.net/images/black-white-set.png",
//     "tags": "flash-sale;latest"
//   }, {
//     "articleNumber": "77e280d3-7c56-41d0-8b48-1e5c8a4f1605",
//     "name": "Blue jacket",
//     "description": description,
//     "category": "Jackets",
//     "price": 299,
//     "rating": 5,
//     "imageName": "https://win22imgstorage.blob.core.windows.net/images/blue-jacket.png",
//     "tags": "featured"
//   }, {
//     "articleNumber": "a268e0d8-010a-44c4-b4f0-738a01117573",
//     "name": "Blue hoody & pants",
//     "description": description,
//     "category": "Sets",
//     "price": 150,
//     "rating": 5,
//     "imageName": "https://win22imgstorage.blob.core.windows.net/images/blue-set.png",
//     "tags": "featured;latest"
//   }, {
//     "articleNumber": "267e6b12-d558-49de-92c2-6b2a59433ce9",
//     "name": "Blue t-shirt",
//     "description": description,
//     "category": "T-Shirts",
//     "price": 25,
//     "rating": 5,
//     "imageName": "https://win22imgstorage.blob.core.windows.net/images/blue-tshirt.png",
//     "tags": "flash-sale"
//   }, {
//     "articleNumber": "cda0aa8d-c0e1-41a7-ae26-343ffc84e141",
//     "name": "Brown sweater",
//     "description": description,
//     "category": "Sweaters",
//     "price": 35,
//     "rating": 4,
//     "imageName": "https://win22imgstorage.blob.core.windows.net/images/brown-sweater.png",
//     "tags": "featured"
//   }, {
//     "articleNumber": "bf1fffeb-c30b-4380-8384-223d3c80b792",
//     "name": "Brown watch",
//     "description": description,
//     "category": "Watches",
//     "price": 150,
//     "rating": 3,
//     "imageName": "https://win22imgstorage.blob.core.windows.net/images/brown-watch.png",
//     "tags": "flash-sale;best-selling"
//   }, {
//     "articleNumber": "6c871493-805c-45e9-b66a-d62dd511c930",
//     "name": "Stiletto shoes",
//     "description": description,
//     "category": "Shoes",
//     "price": 89,
//     "rating": 3,
//     "imageName": "https://win22imgstorage.blob.core.windows.net/images/chrome-shoe.png",
//     "tags": "flash-sale"
//   }, {
//     "articleNumber": "086841a8-fb2e-4ee6-80b1-4dce62e168ae",
//     "name": "Gray t-shirt",
//     "description": description,
//     "category": "T-Shirts",
//     "price": 15,
//     "rating": 3,
//     "imageName": "https://win22imgstorage.blob.core.windows.net/images/gray-tshirt.png",
//     "tags": "flash-sale"
//   }, {
//     "articleNumber": "c9a6a993-cd15-4022-8858-77a5bcb6cc12",
//     "name": "Jeans dress",
//     "description": description,
//     "category": "Jeans",
//     "price": 55,
//     "rating": 4,
//     "imageName": "https://win22imgstorage.blob.core.windows.net/images/jeans-dress.png",
//     "tags": "featured"
//   }, {
//     "articleNumber": "431255c5-eea7-40bd-9260-06ad7e83fbcd",
//     "name": "Jeans jacket & pants",
//     "description": description,
//     "category": "Sets",
//     "price": 110,
//     "rating": 4,
//     "imageName": "https://win22imgstorage.blob.core.windows.net/images/jeans-set.png",
//     "tags": "flash-sale"
//   }, {
//     "articleNumber": "133740ce-f0fe-4ebf-936d-3319237743e2",
//     "name": "Olive sweater",
//     "description": description,
//     "category": "Sweaters",
//     "price": 19,
//     "rating": 2,
//     "imageName": "https://win22imgstorage.blob.core.windows.net/images/olive-sweater.png",
//     "tags": "best-selling"
//   }, {
//     "articleNumber": "dafda4ec-f15e-4e23-b223-b9f037a894a7",
//     "name": "Multicolor t-shirt",
//     "description": description,
//     "category": "T-shirts",
//     "price": 25,
//     "rating": 2,
//     "imageName": "https://win22imgstorage.blob.core.windows.net/images/multicolor-tshirt.png",
//     "tags": ""
//   }, {
//     "articleNumber": "b3044087-7272-4885-9da7-69b1b769fa3b",
//     "name": "Purple handbag",
//     "description": description,
//     "category": "Bags",
//     "price": 99,
//     "rating": 5,
//     "imageName": "https://win22imgstorage.blob.core.windows.net/images/purple-bag.png",
//     "tags": ""
//   }, {
//     "articleNumber": "1721de3f-4104-4a8f-b090-fb385c446146",
//     "name": "Red handbag",
//     "description": description,
//     "category": "Bags",
//     "price": 105,
//     "rating": 5,
//     "imageName": "https://win22imgstorage.blob.core.windows.net/images/red-bag.png",
//     "tags": "featured"
//   }, {
//     "articleNumber": "fab80814-1d85-4c31-a6df-4c0385a1607b",
//     "name": "Red dress",
//     "description": description,
//     "category": "Dresses",
//     "price": 67,
//     "rating": 3,
//     "imageName": "https://win22imgstorage.blob.core.windows.net/images/red-dress.png",
//     "tags": ""
//   }, {
//     "articleNumber": "6e42e94a-7aac-4b65-8dc1-2ba735383f9e",
//     "name": "Striped top",
//     "description": description,
//     "category": "Tops",
//     "price": 45,
//     "rating": 4,
//     "imageName": "https://win22imgstorage.blob.core.windows.net/images/striped-top.png",
//     "tags": ""
//   }, {
//     "articleNumber": "1920e1c5-c1c9-41b9-a485-1384972474eb",
//     "name": "Striped pink pants",
//     "description": description,
//     "category": "Pants",
//     "price": 36,
//     "rating": 2,
//     "imageName": "https://win22imgstorage.blob.core.windows.net/images/striped-pants.png",
//     "tags": "featured"
//   }, {
//     "articleNumber": "dbb4a5f2-be55-4931-b19e-54db48bc752a",
//     "name": "White seater",
//     "description": description,
//     "category": "Sweaters",
//     "price": 25,
//     "rating": 2,
//     "imageName": "https://win22imgstorage.blob.core.windows.net/images/white-sweater.png",
//     "tags": "featured;top-reacted"
//   }, {
//     "articleNumber": "684a9d63-c7e2-446b-99df-eafdd31426b1",
//     "name": "Winter boots",
//     "description": description,
//     "category": "Shoes",
//     "price": 85,
//     "rating": 2,
//     "imageName": "https://win22imgstorage.blob.core.windows.net/images/winter-boots.png",
//     "tags": "top-reacted"
//   }];
  
//   saveProducts(products);

//   response.status(200).send(null);

// });