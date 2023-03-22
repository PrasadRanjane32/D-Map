const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
const subjectSchema = require("../model/subjectSchema");

const Subdata = async (req, res, next) => {

    try {
       
        const rootSubject = await subjectSchema.find();
        if (!rootSubject) {
            throw new Error('Subject not Found')
        }
        
        req.rootSubject = rootSubject;
        // req.subjectID = rootSubject._id;

        next();

    } catch (err) {
        res.status(401).send("Unautherised:Subject not provided");
        
        console.log(err);
    }

}
module.exports = Subdata;