//jshint esversion:6
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const jwt = require('json-web-token');
const bcrypt = require("bcryptjs");
const LegalAdmin = require("../database/models/adminModel");
const LegalProduct = require("../database/models/productModel");



const adminController = {


    adminLogin(req, res) {

        LegalAdmin.findOne({ password: req.body.password }, function (err, foundAdmin) {

            if (!foundAdmin) {
                res.status(401).json({ message: "Auth failed" });
            }

            if (err) {
                res.status(401).json({ message: "auth failed" });
            }

            if (foundAdmin) {
                res.status(200).json({ message: "You are now logged in" });
            }
        });


    },

    adminRegister(req, res) {


        const { firstname, lastname, email, password } = req.body;
        //if empty 
        if (!firstname || !lastname || !email || !password) {
            res.status(401).json({ errormsg: 'Please fill all fields' });
        }
        //pass length
        if (password) {
            if (password.length < 6) {
                res.status(401).json({ errormsg: 'Password should be more than 6 characters' });
            }
        }

        //find the user
        LegalAdmin.findOne({ email: email }, function (foundAdmin) {

            if (foundAdmin) {
                res.status(401).json({ msg: 'Email already registered' });
            } else {

                const newAdmin = new LegalAdmin({
                    firstname,
                    lastname,
                    email,
                    password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                        if (err) throw err;
                        newAdmin.password = hash;
                        newAdmin
                            .save()
                            .then(admin => {
                                res.status(200).json({ successmsg: req.body });
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    },


    adminAddProduct(req, res) {

        const { name, categoryId, price, description } = req.body;

        LegalProduct.findOne({ name: req.body.name }, function (err, foundProduct) {


            if (foundProduct) {
                res.status(409).json({ message: "Product already exists" });
            }

            if (!foundProduct) {

                const newproduct = new LegalProduct({
                    name,
                    categoryId,
                    price,
                    description
                });

                newproduct.save(function (err) {
                    if (err) {
                        res.status(500).send("Theres an error");
                    } else {
                        res.status(200).send(req.body);
                    }
                });
            }
        });
    },



    adminRemoveProduct(req, res) {
        LegalProduct.deleteOne({ categoryId: req.params.categoryId }, function (err) {

            if (err) {
                res.status(500).send("there is an error");
            } else {

                res.status(200).send("Deleted successfully");

            }

        });
    },

    viewProduct(req, res) {
        LegalProduct.find({}, function (err, products) {

            if (err) {
                res.status(500).send("there is an error");
            } else {

                res.status(200).json({msg: products});

            }

        });
    },

    adminEditProduct(req, res) {
         
    }





};



module.exports = adminController;