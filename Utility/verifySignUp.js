const user = require('../models/users')

checkDuplicateUserEmail = async (req, res, next) => {
    try{
        const fetchedUser = await user.findOne({username : req.body.username},'username').exec()
        if(fetchedUser){
            res.status(400).send({message:'user already exists'})
            return
        }
        try{
            const fetchedEmail =await user.findOne({username : req.body.email},'email').exec()
            if(fetchedEmail){
                res.status(400).send({message:'email already registered'})
                return
            }
            next()
        }
        
        catch(err){
            res.status(400).send({message: err})
        }
    }

    catch(err){
        res.status(400).send({message: err})
        return
    }
}

const verifysignup = {checkDuplicateUserEmail}

module.exports = verifysignup