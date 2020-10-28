//jshint esversion:6
const mongoose = require("mongoose");

const LegalProductSchema = new mongoose.Schema({
    
description: {
    type: String,
    required: true
},

name: {
    type: Date,
    default: new Date()
},

price: {
    type: Number,
    required: true
},

categoryId: {
    type: [Number],
    required: true
}

}); 

const LegalProduct = mongoose.model('LegalProuct', LegalProductSchema);
module.exports = LegalProduct;