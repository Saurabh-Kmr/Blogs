/*jshint esversion: 8 */

const user = require('../models/users');


export async function checkDuplicateUserEmail(req, res, next) {
    try{
        const fetchedUser = await user.findOne({username : req.body.username},'username').exec();
        if(fetchedUser){
            res.status(400).send({message:'user already exists'});
            return;
        }
        
            const fetchedEmail =await user.findOne({username : req.body.email},'email').exec();
            if(fetchedEmail){
                res.status(400).send({message:'email already registered'});
                return;
            }
            next();
        }

    catch(err){
        res.status(400).send({message: err});
        return;
    }
}

