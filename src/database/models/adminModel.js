 //jshint esversion:6
 const mongoose = require("mongoose");

 const LegalAdminSchema = new mongoose.Schema({

    
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
 },
 
 }); 
 
 const LegalAdmin = mongoose.model('LegalAdmin', LegalAdminSchema);
 module.exports = LegalAdmin;