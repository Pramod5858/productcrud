const mongoose = require("mongoose");
const user = require("./user");

const Schema = mongoose.Schema;

const SchemaModel = new Schema({
    userId:{type:Schema.Types.ObjectId, ref:user, required:true},
    id: { type: Number, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    stock: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }

})

module.exports = mongoose.model("material", SchemaModel, "material");