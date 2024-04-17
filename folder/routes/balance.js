const express = require('express');
const mongoose = require('mongoose');

const User = require('../models/regSchema');
const router = express.Router();

router.get('/:_id',async(req, res)=>{
    const {_id} = req.params;
    
    try{
        const user = await User.findById(_id)
        .select('username email balance');
            
            if(!user) {
               return res.status(404).json({message: 'User not found'})
            }
            return res.status(200).json(user)
        } catch (err){
            res.status(500).json({message: 'internal error'})
        }
});

module.exports = router;