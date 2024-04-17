const express = require('express');
const mongoose = require('mongoose');

const User = require('../models/regSchema')

const router = express.Router();

router.post('/', async (req, res)=>{
    const {userId, amount, interestRate} = req.body;

    //checking if user exist
    const user = await User.findById(userId)
    if(!user){
        return res.status(404).json({message:'User not found'})
    }

    //calculate interest
    const dailyInterestRate = interestRate / 100 / 365;

    const totalAmount = amount * Math.pow(1 + dailyInterestRate, 7);

    //update user balance
    user.balance += totalAmount;
    await user.save();
    console.log("Invested successfully");
    res.json({
        message: 'Invested successfully', balance: user.balance
    });
});

module.exports = router;