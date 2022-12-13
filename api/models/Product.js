const mongoose = require("mongoose");

const product = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: mongoose.Schema.Types.String, required: true },
    category: { type: mongoose.Schema.Types.String, required: true },
    tag: { type: mongoose.Schema.Types.String },
    price: { type: mongoose.Schema.Types.String, required: true },
    rating: { type: mongoose.Schema.Types.String },
    description: { type: mongoose.Schema.Types.String, required: true },
    imageName: { type: mongoose.Schema.Types.String, required: true }
});

module.exports = mongoose.model("products", product);
