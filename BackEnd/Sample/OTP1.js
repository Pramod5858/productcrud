const express = require("express");
const OTP = require("../Model/otp");
const nodemailer = require('nodemailer');

module.exports.OTP1 = async (otp, email) => {
    try {
        console.log(otp, email);
        const createOTP = await OTP.create({ otp: otp, email: email })

        var transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            auth: {
                user: "pramodmukane@gmail.com",
                pass: "biqryicymynhoioa",
            }
        });

        var mailOptions = {
            from: 'youremail@gmail.com',
            to: email,
            subject: 'Sending Email using Node.js',
            text: 'Your OTP is:- ' + otp,
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        return true

    } catch (error) {
        throw new Error(error)
    }

}

