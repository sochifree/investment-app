const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/regSchema');
const router = express.Router();

 
router.post('/', async(req, res)=>{
    const {email, password} = req.body;
   
try{
    const user = await User.findOne({email}) 
    if(!user) {
         res.status(404).json({message: 'No user found'})
    }
   const passwordMatch = await bcrypt.compare( password, user.password)
   console.log('Password match:', passwordMatch);
   if(!passwordMatch) {
            return res.status(401).json({message:'Invalid credentials'})
        }
            return res.status(200).json({message: 'User logged in'});
    
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'internal error'
        })
    }
})
module.exports = router;
