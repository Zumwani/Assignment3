const mongoose = require("mongoose");

const Vendor = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    name: { type: mongoose.Schema.Types.String, required: true }
});

module.exports = mongoose.model("Vendor", Vendor);