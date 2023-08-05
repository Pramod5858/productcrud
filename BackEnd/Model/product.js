const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SchemaModel = new Schema({

    id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }

})

module.exports = mongoose.model("car", SchemaModel, "car");