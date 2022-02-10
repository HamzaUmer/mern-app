const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('../db/conn');
const User = require('../models/user');
const Authenticate = require('../middleware/authenticate');
const cookieParser = require('cookie-parser');
router.use(cookieParser());



// Use Promises(then and catch) method 1
// router.post('/register', (req,res)=> {
//     const { name, email, phone, work, password, cpassword} = req.body;
//     if (!name || !email || !phone || !work || !password || !cpassword) {
//         return res.status(422).json({error: "Please fill out all part of Registeration"});
//     }

//     User.findOne({email:email})
//     .then((userExist) => {
//         if(userExist) {
//             return res.status(422).json({error: "Email already exist!!"});
//         }

//         const user = new User({name, email, phone, work, password, cpassword});
//         user.save()
//         .then(() => {
//             res.status(201).json({message: "User registered successfully!!"});
//         }).catch((err) => res.status(500).json({error: "Failed to register!!"}));
//     }).catch((err) => {
//         console.log(err);
//     })

// });

//Use Async-Await Approch method 2
router.post('/register', async (req,res)=> {
    const { name, email, phone, work, password, cpassword} = req.body;
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({error: "Please fill out all part of Registeration"});
    }
    try {
        const userExist = await User.findOne({email:email});
        if(userExist) {
            return res.status(422).json({error: "User already exist!!"});
        }
        else if (password != cpassword) {
            return res.status(422).json({error: "Password are not matching!!"});
        }
        else {
            const user = new User({name, email, phone, work, password, cpassword});
            await user.save();
            res.status(201).json({message: "User registered successfully!!"});
        }
    } catch (err) {
        console.log(err);
    }
});

router.post('/login', async (req,res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({error: "Please fill all part of Login"});
        }
         const userExist = await User.findOne({email: email});
         if(userExist) {
             const passMatch = await bcrypt.compare(password, userExist.password);
             const token = await userExist.generateAuthToken();
             console.log(token);
             res.cookie("jwtoken", token, {
                 expires: new Date(Date.now() + 25892000000),
                 httpOnly : true
             })

        if(!passMatch) {
            return res.status(400).json({error: "Invalid Credentials"})
        }
        else {
            res.json({message: "User Logged in Successfully!!"})
        }
    }
        else {
            return res.status(400).json({error: "Invalid Credentials"})
         }
    } catch (err) {
        console.log(err);
    }
})

//aboutus authentication
router.get('/about',Authenticate, (req,res) => {
    res.send(req.rootUser);
});

//get user Data for Contact Us and Homepage 
router.get('/getdata', Authenticate, (req, res) => {
    res.send(req.rootUser);
});

//contact us page
router.post('/contact',Authenticate, async (req,res) => {
    try {
        const {name, email, phone , message}= req.body;

        if(!name || !email || !phone || !message) {
            console.log("Error in Contact form");
            return res.json({error: "Please fill all the fields!!"});
        }
        
        const userContact = await User.findOne({_id: req.userID});
        if(userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);

            await userContact.save();

            res.status(201).json({ message: "User Contact Successfully!!"});
        }
    } catch(err) {
        console.log(err)
    }
});

//Logout page
router.get('/logout', (req,res) => {
    res.clearCookie('jwtoken',{path:'/'});
    res.status(200).send("User Logout");
});

module.exports = router;