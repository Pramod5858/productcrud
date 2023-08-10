const express = require("express");
const userlist = require("../Model/user.js");
const bycrpt = require("bcrypt");
//const dotenv = require("dotenv");
const Jwt = require("jsonwebtoken");
const User = require("../Model/user.js");
const asyncError = require("../ErrorHandler/errorMiddleware.js");
const JWT_Secret = "PramodisgoodBoy";
const ErrorHandler = require("../utils/error.js");
const { OTP1 } = require("../Sample/OTP1.js");
const { OTPCreate } = require("../Sample/OTPCreate.js");
const Otp12 = require("../Model/otp.js");


exports.loginDetails = asyncError(async (req, res, next) => {


    let user = await userlist.findOne({ email: req.body.email })
    //let name = await userlist.find({ name: "pramod mukane" });

    let userr = user.email

    if (!user) {

        res.status(401).send({ message: "No emailId is found" || "Internal Server Error" })
    }

    let comparepassword = await bycrpt.compare(req.body.password, user.password);

    if (!comparepassword) {
        return next(new ErrorHandler("Incorrect Password", 400));
        //.status(201).send({ message: "Password is incorrect" })
    }

    let data = {
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }

    const authtoken = Jwt.sign(data, JWT_Secret, {expiresIn:'5h'});
    console.log(authtoken);
    console.log("You have rache to +  " + data.user.id + data.user.name + data.user.email);

    res.status(200).send({ success: true, message: "This is to check1", userr, authtoken });
})

exports.signupDetails = asyncError(async (req, res) => {
    try {

        const { name, email, password } = req.body

        const finditrepeated = await userlist.findOne({ email: req.body.email })

        if (finditrepeated) {
            res.status(200).send({ message: "Already email Id is registered, please give ew email Id" })
        }

        const salt = await bycrpt.genSalt(10);
        const hashpassword = await bycrpt.hash(req.body.password, salt);

        const useradd = await userlist.create({
            name: name,
            email: email,
            password: hashpassword
        })

        const otp = OTPCreate(6);
        const sendOTP = OTP1(otp, email)

        console.log(sendOTP);

        res.status(200).send({ message: "Successfully created new user and opt sent to email Id" });

    } catch (error) {
        res.status(400).send({ message: error.message });
    }
})

exports.otpVerify = asyncError(async (req, res) => {

    console.log(req.body);

    const findemail = await Otp12.findOne({ email: req.body.email })

    if (!findemail) {
        res.send({ message: "no otp found" })
    }
    console.log(findemail);
    let dataotp1 = findemail.otp;

    if (dataotp1 != req.body.otp) {
        res.send({ message: "otp did not matched" })
    }

    // let myquery = {email:"req.body.email"}
    // let newvalues = {$set: {verified:true}}

    let result = await User.updateOne(
        { email: req.body.email },
        { $set: { verified: true } }
        );

    console.log(result);

    res.status(200).send({ message: "Successfully verified", result});
})


