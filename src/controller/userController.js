//jshint esversion:6
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const LegalUser = require("../database/models/userModel");



const userController = {


    userRegister(req, res) {

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
        LegalUser.findOne({ email: email }, function (foundUser) {

            if (foundUser) {
                res.status(401).json({ msg: 'Email already registered' });
            } else {

                const newUser = new LegalUser({
                    firstname,
                    lastname,
                    email,
                    password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(user => {
                                res.status(200).json({ successmsg: foundUser });
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    },


    userLogin(req, res) {
        LegalUser.findOne({password: req.body.password }, function (err, foundUser) {

            if (!foundUser) {
                res.status(401).json({ message: "Auth failed" });
            }

            if (err) {
                res.status(401).json({ message: "auth failed" });
            }

            if (foundUser) {
                res.status(200).json({ message: "You are now logged in" });
            }
        });


    },






};



module.exports = userController;