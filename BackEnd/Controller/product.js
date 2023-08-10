const express = require("express");
const Productlist = require("../Model/product.js");
const Users = require("../Model/user.js");

exports.getProductDetails = async (req, res) => {

    try {
        Productlist.find()
            .then((response) => {
                res.status(200).send({ message: "fetch details successfully", detail: response })
            })
            .catch(error => console.log(error))

    } catch (error) {
        res.status(400).send(error)
    }
}

exports.addproductDetails = async (req, res) => {
    try {
        const { id, name, description, stock } = req.body;
        const email = req.emailid;
        const fineEmail = await Users.findOne({email:email})
       
        let adddetails = await new Productlist({
            userId:fineEmail._id,
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            stock: req.body.stock
        })

        adddetails.save();

        console.log(adddetails);
        res.status(200).send({ adddetails })

    } catch (error) {
        console.log(error)
        res.status(400).send(error)

    }
}

exports.getproduct = async (req, res) => {
    try {

        const getIdDetails = await Productlist.findById({ _id: req.params.id })

        console.log(getIdDetails);
        res.status(200).send({ getIdDetails })

    } catch (error) {
        console.log(error)
        res.status(401).send(error)
    }
}


exports.putupdateproduct = async (req, res) => {
    try {

        console.log(req.body);

        //        let getIdDetails = await Productlist.findById({_id:req.params.id})

        let updateDetails = await Productlist.updateOne({
            _id: req.params.id
        }, { $set: req.body })

        console.log(updateDetails);
        res.status(200).send({ updateDetails })

    } catch (error) {
        console.log(error)
        res.status(401).send(error)
    }
}

exports.deleteproduct = async (req, res) => {
    try {
        let getdetails = await Productlist.deleteOne({ _id: req.params.id })

        console.log(getdetails);
        res.send({ getdetails })

    } catch (error) {
        console.log(error)
        res.status(401).send(error)
    }
}


