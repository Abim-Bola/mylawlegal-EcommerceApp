//jshint esversion:6
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const LegalAdmin = require("../database/models/adminModel");
const Category = require("../database/models/categoryModel");


const categoryController = {


    addCategory(req, res) {

        const { category, categoryId } = req.body;

        Category.findOne({ category: req.body.category }, function (err, foundCategory) {


            if (foundCategory) {
                res.status(409).json({ message: "Category already exists" });
            }

            if (!foundCategory) {
                const newcategory = new Category({
                    category,
                    categoryId
                });

                newcategory.save(function (err) {
                    if (err) {
                        res.status(500).send("Theres an error");
                    } else {
                        res.status(200).send(req.body);
                    }
                });
            }
        });
    },


    viewCategory(req, res) {

        Category.find({}, function (err, foundCategory) {


            if (err) {
                res.status(500).json({ message: "Theres an error" });
            }

            if (foundCategory.length < 1) {
                res.status(200).json({ message: "Empty" });
            } else {
                res.status(200).json({ category: foundCategory });
            }
        });
    },

    deleteCategory(req, res) {
        Category.deleteOne({ categoryId: req.params.categoryId }, function (err) {
            if (err) {
                res.status(500).send("there is an error");
            } else {
                res.status(200).send("Deleted successfully");
            }

        });
    },

    updateCategory(req, res) {
        Category.updateOne(
            { categoryId: req.params.categoryId },
            { $set: req.body }, function (err, updatedCategory) {
                if (err) {
                    res.status(500).send("There is an error");
                } else {
                    res.status(200).json({ message: updatedCategory });
                }
            }
        );
    }

};



module.exports = categoryController;
