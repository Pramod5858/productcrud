const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SchemaUser = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false }
}, {
    timestamps: true
})

module.exports = mongoose.model("users", SchemaUser, "users");