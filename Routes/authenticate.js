const express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
require('dotenv').config()
var User = require('../models/users');
import {hashpassword} from '../Utility/password'

router.get('/register', async (req,res)=>{
    try{
    const hashedPassword = await hashpassword(req.body.password)
    const user = new User({
        name : req.body.name,
        email : req.body.email,
        password : hashedPassword
    })
    const createdUser = await user.save().exec()
    var token =jwt.sign({id: createdUser._id}, process.env.SECRET, {expiresIn: '1h', algorithm: 'RS256'})
    res.status(200).send({auth: true, token: token})
    }
    catch(err){
        res.status(500).send({message:err.message})
    }
})