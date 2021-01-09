/*jshint esversion: 6 */

const bcrypt = require('bcryptjs');
require('dotenv').config();

export function hashpassword(password){
    return new Promise((resolve,reject) => {
        bcrypt.hash(password,process.env.SALT,(err,encrypted) => {
            if(err) return reject(err);
            resolve(encrypted);
        });
    });
}

export function matchPassword(hash, password){
    return new Promise((resolve,reject) =>{
        bcrypt.compare(password,hash, (err, success) => {
            if(err) return reject(err);
            resolve(success);
        });
    });
}

