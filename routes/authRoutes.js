const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post ('/register', async (req,res)=>{
    try{
        const {username , email , password } = req.body;
        const extinguisher = await User.findOne({email});
        if (extinguisher) return res.status(400).json({message : 'user already exists'});

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User ({username , email , password: hashedPassword});
        await user.save();

        const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h'});
        res.status(201).json({ token, user: {id: user._id, username, email}});
    }catch (err){
        res.status(500).json({ message : 'server error'});
    }
});

router.post('/login', async(req,res)=>{
    try{
        const {email , password }= req.body;
        const user = await user.findOne({email});
        if(!user) return res.status(400).json({message: 'invalid credentials'});
        const isMatch = await bcrypt.comapare(password, user.password);
        if(!isMatch) return res.status(400).json({message: 'invalid credentials'});
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
        res.json({token, user: {id: user._id, username: user.username, email:user.email}});
    }catch (err){
        res.status(500).json({message: 'server error'});
    }
});

module.exports = router;