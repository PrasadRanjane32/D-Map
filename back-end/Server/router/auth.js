
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator')
const Authenticate = require("../middleware/Authenticate");

const Subdata = require("../middleware/Subdata");

// import cookieParser from 'cookie-parser';
require('../db/conn');
const User = require("../model/userSchema");
const Subject = require("../model/subjectSchema");
const { default: mongoose, Query } = require('mongoose');

router.get('/', (req, res) => {
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
    // body("password", "Password is not strong").isStrongPassword(),
    body("name", "Name is To short").isLength({ min: 3 }),
    body("phone", "Phone is To short").isMobilePhone(),
    body("work", "work is To short").isLength({ min: 3 })

], async (req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(401).json({ error: errors.array() });
    }

    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Data is not filled properly" })

    }
    try {
        if (password != cpassword) {
            return res.status(422).json({ error: "Password does Not match" });
        } else {
            const UserExists = await User.findOne({ email: email });
            //left is data base email and right is user entered email
            if (UserExists) {
                return res.status(422).json({ error: "Email already Exist" });
            }
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
            const role = userLogin.work;
            const Role = "Admin";

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
                    }

                    else {
                        if (role == Role) {
                            // res.send(userLogin);
                            res.status(201).send(userLogin);
                        } else {
                            res.status(200).send(userLogin);
                            // .json({ message: "User Signin Successfully" })


                        }
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

router.get('/getedUdata', Authenticate, async (req, res) => {
    console.log('Get user data by id');
    console.log(req);
    const { cookies } = req;
    const Eduid = cookies.Edituserid;
    console.log(Eduid);
    const Udata = await User.findOne({ _id: Eduid });
    console.log(Udata);
    res.send(Udata);
});


router.get('/delUdata', async (req, res) => {
    console.log('delete  user data by id');
    const { cookies } = req;
    const DelUid = cookies.Deluserid;
    console.log(DelUid);
    const Udata = await User.findOne({ _id: DelUid });
    console.log(Udata);
    if (Udata) {

        const deluser = await User.deleteOne({ _id: Udata });
        res.status(201).json({ message: "User Deleted Successfully" });
    } else {
        res.status(400).json({ message: "User not found" });

    }
});

router.post('/updateSubject', Subdata, async (req, res) => {

    const { _id, subjectname,
        icon,
        about,
        link,
        type,
        vlink,
        tname,
        desc,
        question,
        ans } = req.body;


    if (!_id || !subjectname || !icon || !about || !link || !type) {

        return res.status(400).json({ error: "Data is not filled properly" });
    }
    try {
        const subjectUpdate = await Subject.updateOne({ _id: _id }, {
            subjectname,
            icon,
            about,
            link,
            type,
            vlink,
            tname,
            desc,
            question,
            ans
        });
        console.log(subjectUpdate);
        if (subjectUpdate) {
            res.status(201).json({
                message: 'Subject Details updated successfully!'
            });

        }


    } catch (error) {
        console.log(error);
    }

});




router.get('/delsubdata', async (req, res) => {
    console.log('delete  Subject data by id');
    const { cookies } = req;
    const DelSid = cookies.Delsubjid;
    console.log(DelSid);
    const Udata = await Subject.findOne({ _id: DelSid });
    console.log(Udata);
    if (Udata) {

        const delsubject = await Subject.deleteOne({ _id: Udata });
        res.status(201).json({ message: "Subject Deleted Successfully" });
    } else {
        res.status(400).json({ message: "Subject not found" });

    }
});


// Contact Page to add message
router.post('/contact', Authenticate, async (req, res, next) => {
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
    res.clearCookie('jwtoken', { path: '/' });
    res.clearCookie('Subjectid', { path: '/' });
    res.clearCookie('UserD', { path: '/' });
    res.clearCookie('Delsubjid', { path: '/' });
    res.clearCookie('Deluserid', { path: '/' });
    res.clearCookie('Edituserid', { path: '/' });
    // res.clearCookie('Delsubjid',{path:'/'});




    res.status(202).send('User Log Out');
});


// subjects register
router.post('/subregister', async (req, res) => {

    const { subjectname, icon, about, type, link, notes, questions, video } = req.body;

    if (!subjectname || !icon || !about || !type || !link || !notes || !questions || !video) {
        return res.status(400).json({ error: "Data is not filled properly" })

    }
    try {

        const subjectExists = await Subject.findOne({ subjectname: subjectname });
        //left is data base subject and right is user entered subjectname
        if (subjectExists) {
            return res.status(422).json({ error: "Subject already Exist" });
        }

        const subject = new Subject({ subjectname, icon, about, type, link, notes, questions });

        const subjectRegister = await subject.save();

        if (subjectRegister) {

            res.status(201).json({ message: "Subject registered successfully" });


        } else {

            res.status(500).json({ error: "Failed to register Subject" })

        }

    } catch (err) {
        console.log(err);
    }




});

//to get subject data
router.get('/getsubData', async (req, res) => {
    console.log('Get Sub data');
    const dubdata = await Subject.find();

    res.send(dubdata);

});

router.get('/getUserData', async (req, res) => {
    console.log('Get User data');
    const dubdata = await User.find();

    res.send(dubdata);

});



router.get('/fsub', Subdata, async (req, res) => {
    const { cookies } = req;
    const token = cookies.Subjectid;
    console.log(token);
    const subd = await Subject.findOne({ _id: token });
    console.log(subd);
    res.send(subd);



})

router.post('/fsubu', Subdata, async (req, res) => {
    const { _id } = req.body;
    console.log(_id);
    const subdid = await Subject.findOne({ _id: _id })
    console.log(subdid);
    res.send(subdid)
    if (!subdid) {
        res.status(200).json("data found");
    } else {
        // res.status(422).json("data not found");
    }
});
router.post('/upsubdata', Subdata, async (req, res) => {
    const { subpassid, tname, desc } = req.body;
    console.log(subpassid);
    console.log(subpassid, tname, desc);
    if (!subpassid || !tname || !desc) {

        return res.status(400).json({ error: "Data is not filled properly" });
    }
    try {
        const subjectUpdate = await Subject.findOne({ _id: subpassid });
        console.log(subjectUpdate);
        if (subjectUpdate) {

            const updateSubject = await subjectUpdate.addNotes(tname, desc);
            await subjectUpdate.save();
            // console.log(userMessage);

            res.status(201).json({ message: "Topic Added" });
        }


    } catch (error) {
        console.log(error);
    }

});

router.post('/upsubintque', Subdata, async (req, res) => {
    const { subQuiid, question, ans } = req.body;
    console.log(subQuiid, question, ans);
    if (!subQuiid || !question || !ans) {

        return res.status(400).json({ error: "Data is not filled properly" });
    }
    try {
        const subjectUpdate = await Subject.findOne({ _id: subQuiid });
        console.log(subjectUpdate);
        if (subjectUpdate) {

            const updateSubject = await subjectUpdate.addQuestions(question, ans);
            await subjectUpdate.save();
            // console.log(userMessage);

            res.status(201).json({ message: "Topic Added" });
        }


    } catch (error) {
        console.log(error);
    }

});





router.post('/updateProfile', Authenticate, [body("email", "Enter a valid email").isEmail(),
body("password", "Enter a valid email").exists(),
body("name", "Name is To short").isLength({ min: 3 }),
body("phone", "Phone is To short").isMobilePhone(),
body("work", "work is To short").isLength({ min: 3 })

], async (req, res) => {

    const { _id, name, email, phone, work, password, cpassword } = req.body;
    const errors = validationResult(req);

    if (!_id || !name || !email || !phone || !work || !password || !cpassword) {

        return res.status(400).json({ error: "Data is not filled properly" });
    }
    try {
        const userUpdate = await User.updateOne({ _id: _id }, { name, email, phone, work, password, cpassword });
        console.log(userUpdate);
        if (userUpdate) {

            // const updateSubject = await userUpdate.addQuestions(question, ans);
            // await userUpdate.save();
            res.status(201).json({
                message: 'User updated successfully!'
            });
            // console.log(userMessage);

            // res.status(201).json({ message: "Topic Added" });
        }


    } catch (error) {
        console.log(error);
    }

});


router.post('/enrollsub', Authenticate, async (req, res) => {

    const { cookies } = req;
    const token = cookies.Subjectid;
    console.log(token);
    const subd = await Subject.findOne({ _id: token });
    // console.log(subd);
    // res.send(subd);



    try {
        const enrollSub = await User.findOne({ _id: req.userID });
        // console.log(enrollSub);
        if (!enrollSub || !subd) {

            return res.status(400).json({ error: "Subject or User data not found" });
        }
        if (enrollSub) {
            const updateSubject = await enrollSub.addEnroll(token);
            await enrollSub.save();
            res.status(201).send(enrollSub);

        } else {
            res.status(422).json({
                message: 'Unsuccessfull to enroll'
            })
        }


    } catch (error) {
        console.log(error);
    }

});

router.post('/homesub', Subdata, async (req, res) => {

    console.log(req.body);

})

/**get quiz questions */
router.get('/getquestions', Subdata, async (req, res) => {
    try {
        const { subpassid, quiz, answers } = req.body;
        
        
        const { cookies } = req;
        const token = cookies.Subjectid;
        console.log('Get Sub data');
        const dubdata = await Subject.findOne({ _id: token});
        
        if (dubdata) {
            const quizz = dubdata.quiz;
            res.status(200).send(quizz);

    }else{
        res.status(422).json({ message: "Data Not Found" })

    }

    } catch (error) {
        res.json(error);

    }

})

/**get answer string */

router.get('/getanswer', Subdata, async (req, res) => {
    try {
        const { subpassid, quiz, answers } = req.body;
        
        
        const { cookies } = req;
        const token = cookies.Subjectid;
        console.log('Get Sub data');
        const dubdata = await Subject.findOne({ _id: token});
        
        if (dubdata) {
            const answers = dubdata.answers;
            res.status(200).send(answers);

    }else{
        res.status(422).json({ message: "Data Not Found" })

    }

    } catch (error) {
        res.json(error);

    }

})

router.post('/insertquestions', async (req, res) => {
    try {

        const { quiz, answers } = req.body;
        const { cookies } = req;
        const token = cookies.Subjectid;
        console.log(token);
        const subd = await Subject.findOne({ _id: token });

        // console.log(questions, answers);
        if (subd) {
            const inq = subd.addQuiz({ quiz, answers},)
            res.status(201).json({ message: "Data Saved Successfully" })
            console.log(inq)

        }else{
            res.status(422).json({ message: "Data Not Saved" })

        }


    } catch (error) {
        res.json(error);

    }

})

module.exports = router;


