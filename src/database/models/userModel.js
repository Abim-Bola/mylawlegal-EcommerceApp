//jshint esversion:6
const mongoose = require("mongoose");

const LegalUserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },

    lastname: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }

});

const LegalUser = mongoose.model('LegalUser', LegalUserSchema);
module.exports = LegalUser;