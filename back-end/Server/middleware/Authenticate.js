const jwt = require("jsonwebtoken")
const dotenv = require("dotenv");
const User = require("../model/userSchema");

const Authenticate = async (req, res, next) => {

    try {
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2M3YWJjY2U5ZWZjMzBlMTRlMWVhOTMiLCJpYXQiOjE2NzU2NzU4NTN9.oGoQ4dUFNDCxFIEGrSWcEi3a3CylGuFNWiteGxoNh9g";
        // const token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2M2RlMjRkNTBlYWJiYWQzM2VkYTEyN2QiLCJpYXQiOjE2NzU3MTI2OTF9.QKZEsHC1Stb_NV_JtTbnpEU_G-YvW5kMlKOZ7Umhrjk";
        const {cookies}=req;
        const token = cookies.jwtoken;
        console.log(token);
     
const verifyToken = jwt.verify(token, process.env.SECRETE_KEY);
        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });
        if (!rootUser) {
            throw new Error('User not Found')
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    } catch (err) {
        res.status(401).send("Unautherised:Token not provided");
        
        console.log(err);
    }

}
module.exports = Authenticate;