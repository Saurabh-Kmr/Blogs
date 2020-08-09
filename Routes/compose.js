const express = require("express")

const router = express.Router()

const Post = require('../models/post')

router.get("/",(req,resp)=>
  resp.render("compose")
)

router.post("/", async (req,resp)=>{
  const post= new Post({
    title:req.body.postTitle,
    content:req.body.postBody})
  try{

    const savedPost= await post.save()
    console.log(post._id)
    resp.redirect('/')
  }
  catch(err)
  {
    resp.render('Errors',{error:err})
    setTimeout(()=>resp.redirect('/'),3000)
  }
  // resp.redirect('/')
  // console.log(posts)
})

module.exports=router
