//jshint esversion:6
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const LegalUser = require("../database/models/userModel");



const userController = {


    userRegister(req, res) {

        const { firstname, lastname, email, password } = req.body;

        const newuser = new LegalUser({
            firstname,
            lastname,
            email,
            password
        });

        newuser.save(function (err) {
            if (err) {
                res.status(500).send("Theres an error");
            } else {
                res.status(200).send(req.body);
            }
        });
    },


    userLogin(req, res) {
        LegalUser.findOne({ password: req.body.password }, function (err, foundUser) {

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