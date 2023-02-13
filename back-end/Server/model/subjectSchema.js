
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose')
const subjectSchema = new mongoose.Schema({

    subjectname: {
        type: String,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }


})






const Subject = mongoose.model('SUBJECT', subjectSchema);
module.exports = Subject;