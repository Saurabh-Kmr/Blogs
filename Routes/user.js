/*jshint esversion: 8 */

const express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
require('dotenv').config();
var User = require('../models/users');
import {createUser,loginUser} from '../controllers/users';
import {verifyToken} from '../middlewares/authjwt';
import {checkDuplicateUserEmail} from '../middlewares/verifySignUp';



router.get('/',verifyToken, async (req,res)=>{
    try{
        const user = await User.findOne({email: req.body.email}).exec();
        if(!user) throw new Error('User does not exist');
        return res.status(200).json({user});
    }
    catch(err){
        return res.status(404).json({error: err.message});
    }
});

router.post('/',checkDuplicateUserEmail, async (req,res)=>{
   try{
    const user = await createUser({username:req.body.username,email:req.body.email,password:req.body.password});
    return res.status(201).json({user});
   }
   catch(err){
    return res.status(422).json({error:err});
   }
});

router.post('/login', async (req,res)=>{
    try{
     const user = await loginUser({username:req.body.username,email:req.body.email,password:req.body.password});
     return res.status(201).json({user});
    }
    catch(err){
     return res.status(422).json({error:err});
    }
 });