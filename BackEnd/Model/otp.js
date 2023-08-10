const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const SchemaOtp = new Schema({
    otp: { type: String, required: true, unique:true },
    email: { type: String, required: true, unique: true },

}, {
    timestamps: true
})
SchemaOtp.index({createdAt:1},{expireAfterSeconds:1000000})

module.exports = mongoose.model("otp", SchemaOtp, "otp");