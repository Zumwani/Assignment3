const LocalStorage = require("node-localstorage").LocalStorage;
const localStorage = new LocalStorage("./data");

const read = () =>
    JSON.parse(localStorage.getItem("products.json")) ?? [];

const saveProducts = (products) =>
    localStorage.setItem("products.json", JSON.stringify(products, null, 2));    
    
let products = read();
module.exports = { products, saveProducts };