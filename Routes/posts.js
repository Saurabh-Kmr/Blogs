const express = require("express")

const router = express.Router()

const Post = require('../models/post')


router.get('/',async (req,resp)=>{
  try{
    const post= await Post.find()
    if (post==null){
      resp.status(400).json({message:"No posts found",data:null})
    }
    else{
     //console.log(post)
   // resp.status(200).json({message:"successful",data:post})
    resp.render('home',{content:"Placeholder",posts:post})
    }
  }
  catch(err){
    resp.status(500).json({message:"Error",error:err.message})
  }
})

router.get('/:postId',async (req,resp) =>{
  const posts=req.params.postId
  console.log(posts)
  try{
    const post= await Post.findOne({_id:posts})
    if (post==null){
      resp.status(400).json({message:"No posts found",data:null})
    }
    else{
     console.log(post)
    resp.status(200).json({message:"successful",data:post})
    }
  }
  catch(err){
    resp.status(500).json({message:"Error",error:err})
  }
})

router.get("/compose",(req,resp)=>
  resp.render("compose")
)

router.post("/", async (req,resp)=>{
  const post= new Post({
    title:req.body.postTitle,
    content:req.body.postBody})
  try{

    const savedPost= await post.save()
    console.log(post._id)
    resp.status(201).json({message:"Successfully inserted data",data:post})
  }
  catch(err)
  {
    resp.status(500).json({message:"Error",error:err.message})
    setTimeout(()=>resp.redirect('/'),3000)
  }
  // resp.redirect('/')
  // console.log(posts)
})

module.exports= router
