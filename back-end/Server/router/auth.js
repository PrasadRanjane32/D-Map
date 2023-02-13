
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator')
const Authenticate = require("../middleware/Authenticate");


require('../db/conn');
const User = require("../model/userSchema");
const Subject = require("../model/subjectSchema");

router.get('/',(req, res) => {
    res.send('Backend is Running')
  
});
// Using promises

// router.post('/register',(req,res)=>{

//     const {name, email, phone, work, password, cpassword}=req.body;

//     if(!name || !email || !phone || !work || !password || !cpassword){
//         return res.status(422).json({error:"Data is not filled properly"})

//     }

// User.findOne({email:email })
// //left is data base email and right is user entered email
// .then((UserExist)=>{
//     if(UserExist){
//         return res.status(422).json({error:"Email already Exist"});
//     }

//     const user = new User({name, email, phone, work, password, cpassword});

//     user.save().then(()=>{
//         res.status(201).json({message:"User registered successfuly"}); 
//      }).catch((err)=> res.status(500).json({error:"Failed to register"}));
// }).catch(err => { console.log(err);});


// });
// Async await
router.post('/register', [

    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid email").exists(),
    body("password", "Password is Good").isLength({ max: 6 }),
    body("password", "Password is Short").isLength({ min: 6 }),
    body("cpassword", "Password is Good").isLength({ max: 6 }),
    body("cpassword", "Password is Short").isLength({ min: 6 }),
    body("password", "Password is not strong").isStrongPassword(),
    body("name", "Name is To short").isLength({ min: 3 }),
    body("phone", "Phone is To short").isLength({ min: 10 }),
    body("phone", "Phone is To good").isLength({ max: 10 }),
    body("work", "work is To short").isLength({ min: 3 })

], async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Data is not filled properly" })

    }
    try {

        const UserExists = await User.findOne({ email: email });
        //left is data base email and right is user entered email
        if (UserExists) {
            return res.status(422).json({ error: "Email already Exist" });
        }


        const user = new User({ name, email, phone, work, password, cpassword });
        const userRegister = await user.save();

        if (userRegister) {

            res.status(201).json({ message: "User registered successfuly" });

        } else {

            res.status(500).json({ error: "Failed to register" })

        }

    } catch (err) {
        console.log(err);
    }




});



//Login Route

router.post('/signin', [

    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid email").exists()
],
    async (req, res) => {
        try {

            // let token;
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ error: errors.array() });
            }
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: "Plz Fill The Data" })
            }
            const userLogin = await User.findOne({ email: email });

            if (userLogin) {
                const isMatch = await bcrypt.compare(password, userLogin.password);


                const token = await userLogin.generateAuthToken();

                console.log(token);

                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                });
                try {
                    if (!isMatch) {
                        res.status(400).json({ error: "Invalid Credientials" });
                        console.log("invalid match");
                    } else {
                        res.status(200).json({ message: "User Signin Successfully" })
                    }
                }

                catch (err) {
                    console.log(err);
                }
            }
            else {
                res.status(400).json({ error: "Invalid Credientials" });

            }
        } catch (err) {
            console.log(err);
        }
    })


//about router

router.get('/about', Authenticate, (req, res, next) => {
    console.log(`Hello my About`);
    //   res.json({jwtoken:req.jwtoken})
    // console.log('Cookie:',req.cookies);
    res.send(req.rootUser);
});

//getting the data for home and contact page
router.get('/getdata', Authenticate, async (req, res) => {
    console.log('Get data');
    res.send(req.rootUser);
});

// Contact Page to add message
router.post('/contact', Authenticate, async (req, res,next) => {
    try {

        const { name, email, phone, message } = req.body;
        console.log('Contact To Send Message');
console.log(req.body);

        if (!name || !email || !phone || !message) {
            console.log("error in contact form ");
            return res.json({ error: "plz fill the contact form" });
        }

        const userContact = await User.findOne({ _id: req.userID });
        console.log(userContact);
        if (userContact) {

            const userMessage = await userContact.addMessage(name, email, phone, message);
            await userContact.save();
            // console.log(userMessage);

            res.status(201).json({ message: "User Message Send Successfully" });
        }

next();
    } catch (error) {
        console.log(error);
    }

});



//Logout Page

router.get('/logout', (req, res,) => {
    console.log(`Hello my About`);
    res.clearCookie('jwtoken',{path:'/'});
    res.status(202).send('User Log Out');
});


// subjects register
router.post('/subregister', async (req, res) => {

    const { subjectname, icon, link } = req.body;

    if (!subjectname || !icon || !link ) {
        return res.status(422).json({ error: "Data is not filled properly" })

    }
    try {

        const subjectExists = await Subject.findOne({ subjectname: subjectname });
        //left is data base subject and right is user entered subjectname
        if (subjectExists) {
            return res.status(422).json({ error: "Subject already Exist" });
        }


        const subject = new Subject({ subjectname, icon, link });
        const subjectRegister = await subject.save();

        if (subjectRegister) {

            res.status(201).json({ message: "Subject registered successfuly" });

        } else {

            res.status(500).json({ error: "Failed to register Subject" })

        }

    } catch (err) {
        console.log(err);
    }




});

//to get subject data
router.get('/getsubdata', async (req, res) => {
    console.log('Get data');
    const { _id } = req.body;
    res.send(req.rootSubject);
});


module.exports = router;


