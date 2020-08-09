const express = require("express")

const router = express.Router()

const Post = require('../models/post')

router.get('/:postId',async (req,resp) =>{
  const posts=req.params.postId
  console.log(posts)
  try{
    const post= await Post.findOne({_id:posts})
    if (post==null){
      resp.render('Errors',{error:'404 not found'})
    }
    else{
     console.log(post)
     resp.render('post',{Title:post.title,content:post.content})
    }
  }
  catch(err){
    resp.render('Errors',{error:err})
  }
})

module.exports= router
