//jshint esversion:6
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const LegalAdmin = require("../database/adminmodel");
const LegalProduct = require("../database/productModel");



const adminController = {


    adminLogin(req, res){
        
        LegalAdmin.findOne({password: req.body.password}, function(err, foundAdmin) {
        
            if(!foundAdmin) {
              res.status(401).json({message: "Auth failed"});
            } 

            if(err){
                res.status(401).json({message: "auth failed"});
            }

            if(foundAdmin) {
               res.status(200).json({message: "You are now logged in"});
            }
        });


    },

    adminRegister(req, res){
      
        const { firstname, lastname, email, password } = req.body;

        const newadmin = new LegalAdmin({
            firstname, 
            lastname, 
            email, 
            password
        });

        newadmin.save(function (err) {
            if (err) {
                console.log(err);
                res.status(500).send("Theres an error");
            } else {
                res.status(200).send(req.body);
            }
        });

    },

    adminAddProduct(req, res) {

        const { name, categoryId, price, description} = req.body;

        LegalProduct.findOne({name: req.body.name}, function(err, foundProduct) {


            if(foundProduct){
                res.status(409).json({message: "Product already exists"});
            }

            if(!foundProduct) {

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
    


    adminRemoveProduct(req, res){
      LegalProduct.deleteOne({categoryId: req.params.categoryId}, function(err){

        if(err){
            res.status(500).send("there is an error");
        }else{

         res.status(200).send("Deleted successfully");

        }
        
       });
    },

    adminViewProduct(req, res){
      
    },

    adminEditProduct(req, res){
      
    }





};



module.exports = adminController;