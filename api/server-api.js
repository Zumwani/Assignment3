require("dotenv").config();

const port = process.env.PORT;
const express = require("express");
const cors = require("cors");
const initMongoDB = require("./server-mongodb");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.use("/api/products", require("./controllers/productController"));

initMongoDB();
app.listen(port, () => console.log("Server is running (http://localhost:" + port + ")"));
