import User from '../models/users';
import Roles from '../models/roles'
const jwt = require('jsonwebtoken');
require('dotenv').config()

verifyToken = (req,res,next) => {
    let token = req.headers["x-access-token"]
    if(!token){
        return res.status(203).send({message: "No token provided"})
    }

    jwt.verify(token,process.env.SECRET, (err,decoded) => {
        if(err){
         return res.status(401).send({message: `Unauthorised ${err}`})
        }
        req.userId= decoded.id
        next()
    })
}

isAdmin = async(req,res,next) => {
    try{
    let userId = await User.findById(req.userId).exec()
    let roles = await Roles.find({_id: {$in :userid.role}}).exec()
    roles.forEach(role => {
        if(role.name === 'Admin')
        next()
        return
    });
    res.status(403).send({ message: "Require Admin Role!" })
    return
    }
    catch(err){
        res.status(500).send({ message: err })
        return
    }
}

const authjwt = { verifyToken,
    isAdmin
 }

export default authjwt