const port = process.env.PORT || 5000;
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

const usersController = require("./controllers/productController");
app.use("/api", usersController);

app.listen(port, () => console.log("Server is running (http://localhost:" + port + ")"));
