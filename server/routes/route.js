const express = require ("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


const User = require("../models/User");
const Event = require("../models/Events");

const authRoute = require("../middlewares/auth")


router.post("/login",async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email:email});
        if(!user){
            res.json({"msg":"User not registered in database..."});
        }
        else{
            const hashed_password = user.password;
            const compare_password=await bcrypt.compare(password,hashed_password);
            if(compare_password){
                console.log(`${user.name.split(" ")[0]} ,Login Successfull.`);
                // res.json({"msg":"Success",user:user})   
                // const payload = {
                //     user : {
                //         id:user.id
                //     }
                // }
                    // Create a JWT token
                const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
                        expiresIn: '7m', // Token expires in 1 hour (adjust as needed)
                    });
                res.cookie('token', token, { httpOnly: true });
                return res.status(200).json({ "msg":"Login Successfull" }); 
                // res.status(200).json({ token });
                // const authToken = jwt.sign(payload,jwt_secret_token);
                // res.json({authToken});
                // res.json({"msg":"Login Successfull",authToken});
            }
            else{
                console.log("wrong behaviour found while logging...");
                res.json({"msg":"suspected behaviour, password not matched.."}); 
            }
        }
    } catch (error) {
        console.log("Error while logging User...");
        res.send(error); 
    }
})

router.post("/register",async(req,res)=>{
    // console.log(req.body,req.body.fullname,req.body.email);
    try {
        const name = req.body.fullname;
        const {email,password,phone} = req.body;
        const oldUser =await User.findOne({email:email})
        if(oldUser)
        res.json({"msg" : "user already registered"}) 
        else{
            const salt = await bcrypt.genSalt(10);
            const secure_password = await bcrypt.hash(password,salt);
                const newUser = new User({
                    name,   // name:name  ,shorthand here
                    email,
                    phone,
                    password:secure_password
                })
            await newUser.save();
            console.log(`${newUser.name.split(" ")[0]} added successfully ....`);
            res.json({"msg":"Success",newUser});
            }
    } catch (error) {
        console.log("Error while Registering User...");
        res.send(error); 
    }
    })  


    router.get('/authUser',authRoute, (req, res) => {
        try {
            console.log("id : ",req.id); 
            res.json({"msg":"Success"});
        } catch (error) {
            res.send("error while authenticating user info...",errror);
        }
        
      });

    router.post("/newEvent",authRoute,async(req,res)=>{
        try {
            const {eventName,eventTime,eventVenue,eventDescription} = req.body;
            // console.log(eventName,eventVenue,eventDescription)
            const newEvent = new Event({
                eventName,
                eventTime,
                eventVenue,
                eventDescription
            })
            console.log(newEvent)
            await newEvent.save();
            console.log(`${newEvent.eventName} added successfully ....`);
            res.json({"msg":"Success",newEvent});

        } catch (error) {
            console.log("Error while adding new event...");
            res.send(error); 
        }
    })

    router.get("/allevents",authRoute,async(req,res)=>{
        try {
            const result = await Event.find({});
            console.log("See All events...");
            res.json({"msg":"Success",result});

        } catch (error) {
            console.log("Error while displaying all events...");
            res.send(error); 
        }
    })

    router.get('/profile',authRoute, async(req, res) => {
        try {
            console.log("id : ",req.id); 
            const user = await User.findOne({_id:req.id});
            res.json({"msg":"Success",user});
        } catch (error) {
            res.send("error while fetching profile info...",errror);
        }
        // Access the user information from req.user
        // res.json({ message: 'Welcome to your profile', user: req.user });
        
      });

      router.post("/addevent",authRoute,async(req,res)=>{
        try {
            const user = await User.findOne({_id:req.id});
            console.log(req.body);
            var isAdded=false;
            user.personalEvents.map((event)=>{
                if(event._id===req.body._id){
                    isAdded=true;
                }
            })
            if(isAdded===true) res.json({ "msg": 'This is already added in your bookings.'})
            else{
                await user.personalEvents.push(req.body);
                await user.save();
                res.status(200).json({ "msg": 'Event Booked in profile.' });
            }
        } catch (error) {
            console.error('Error while adding event in user profile info..', error);
            res.status(500).json({ "msg": 'Internal server error' });
        }
      })

    router.get("/event/:id",authRoute,async(req,res)=>{
        try {
            const user = await User.findOne({_id:req.params.id});
            res.json({"msg":"Success",result});
        } catch (error) {
            res.send("error while fetching event info...",errror);
        }
    })  
      
    router.get("/logout",authRoute,(req,res)=>{
        try {
            res.clearCookie('token');
            res.status(200).json({ "msg": 'Logout successful' });
        } catch (error) {
            res.send("error while logging out...",errror);
        }
    })
      
module.exports = router;