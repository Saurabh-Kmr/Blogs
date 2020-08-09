const express = require("express")

const router = express.Router()

const Post = require('../models/post')


router.get('/',function(req,resp){
  Post.find({},(err,doc)=>{
    if(err){
      resp.render('Errors',{error:err})
      //setTimeout(()=>resp.redirect('/'),3000)
    }
    console.log(doc)
      resp.render('home',{content:'homeStartingContent',posts:doc})
      })
})


module.exports=router
