//jshint esversion:8

const User = require('../models/users');
import {hashpassword,matchPassword} from '../Utility/password';
import {sign} from '../Utility/jwt';

export async function createUser(data){
    try
    {
        const hashedPassword = await hashpassword(data.password);
        const user = new User({
            username : data.username,
            email : data.email,
            password : hashedPassword
        });
        let createdUser = await user.save().exec();
        createdUser= createdUser.sanitizeFields();
        createdUser.token = await sign(createdUser._id,createdUser.email);
        return createdUser;
        }
    catch(err){
           throw err;
        }
}

export async function loginUser(data){
    if(!data.email && !data.username) throw new Error('Email and Username both cannot be empty');
    if(!data.password) throw new Error('Password field can not be blank');
    try{
        let user = await User.findOne({$or:[{'email': data.email,'username': data.username}]}).exec();
        if(!user) throw new Error('User not registerd');
        const passmatch = await matchPassword(user.password,data.password);
        if (passmatch===false) throw new Error('Incorrect password');
        user = user.sanitizeFields();
        user.token = await sign(user._id,user.email);
        return user;
    }
    catch(err){
        throw (err);
    }
}