const mongoose = require("mongoose");

const product = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String, required: true },
    category: { type: String, required: true },
    tag: { type: String },
    price: { type: Number, required: true },
    rating: { type: Number },
    description: { type: String, required: true },
    imageName: { type: String, required: true },
});

module.exports = mongoose.model("products", product);
