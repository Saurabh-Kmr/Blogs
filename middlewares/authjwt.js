/*jshint esversion: 8 */

import {decode} from '../Utility/jwt';
import User from '../models/users';
import Roles from '../models/roles';
const jwt = require('jsonwebtoken');
require('dotenv').config();

export async function verifyToken(req,res,next) {
    let token = req.headers["x-access-token"];
    if(!token){
        return res.status(401).send({message: "No token provided"});
    }
    try{
    const decoded = await decode(token);
    if(!decoded) throw new Error('No user found in token');
    req.userId= decoded.id.id;
    next();
    }
    catch(err)
    {
        return res.status(401).send({message:err});
    }
}

export async function isAdmin(req,res,next)  {
    try{
    let userId = await User.findById(req.userId).exec();
    let roles = await Roles.find({_id: {$in :userid.role}}).exec();
    roles.forEach(role => {
        if(role.name === 'Admin')
        next();
        return;
    });
    res.status(403).send({ message: "Require Admin Role!" });
    return;
    }
    catch(err){
        res.status(500).send({ message: err });
        return;
    }
}
