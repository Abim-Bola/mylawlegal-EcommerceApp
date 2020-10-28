//jshint esversion:6
const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({

    category: {
        type: String,
        required: true
    },

    categoryId: {
        type: Number,
        required: true
    }

});

const Category = mongoose.model('Category', CategorySchema);
module.exports = Category;