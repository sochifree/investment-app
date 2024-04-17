const express = require('express');
const mongoose = require('express');
const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');

const User = require('../models/regSchema')

const router = express.Router();

router.post('/', async (req, res, next)=>{
    const {username, email, password} = req.body;
    
    //checking if user exist
   try {
        const userExist = await User.findOne({email});
    
    if(userExist) {
        return res.status(400).json({message: 'Email already exist'})
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10)
        req.body.password = hashedPassword
            console.log(hashedPassword);

    //create new user
    const user = new User({
        username,
        email,
        password: hashedPassword,
    });

    const savedUser = await user.save()
        console.log('User registered successfully!')
        res.status(200).json({
            message:'User details:',
                accountRegistered:{
                username: savedUser.username,
                email: savedUser.email,
                password: savedUser.password,
            }
        });
   
    }catch(err){
        console.log(err);
        res.status(500).json({
            error:err
        })
    }
    
})

module.exports = router