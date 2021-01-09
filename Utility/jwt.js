//jshint esversion: 8
import jwt from 'jsonwebtoken';

export async function sign (userid,email) {
    return new Promise((resolve,reject)=>{
        jwt.sign({id: userid,email: email },process.env.SECRET, {expiresIn: '1h', algorithm: 'HS256'},(err,encoded)=>{
            if(err) return reject(err);
            else{
                resolve (encoded.toString());
            }
        });
    });
}

export async function decode(token){
    return new Promise((resolve,reject)=>{
        jwt.verify(token,process.env.SECRET, (err,decoded) => {
            if(err){
             return reject(err);
            }
            else return resolve(decoded);
            
        });
    });
}
