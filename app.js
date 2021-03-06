//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ =require("lodash");
const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/Blogs',{ useNewUrlParser: true ,useUnifiedTopology: true})
        .then(() => {
         console.log('Database connection successful')
       })
       .catch(err => {
         console.error('Database connection error')
       })

const postSchema= {
  title: String,
  content:String
}

const Post=mongoose.model('Posts',postSchema)



const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get('/',function(req,resp){
  Post.find({},(err,doc)=>{
    if(err){
      resp.render('Errors',{error:err})
      //setTimeout(()=>resp.redirect('/'),3000)
    }
    console.log(doc)
      resp.render('home',{content:homeStartingContent,posts:doc})
      })
})
app.get('/about',function(req,resp){
  resp.render('about',{content:aboutContent})
})
app.get('/contact',function(req,resp){
  resp.render('contact',{content:contactContent})
})
app.get('/compose',function(req,resp){
  resp.render('compose')
})
app.post('/compose',function(req,resp){

  const post= new Post({
    title:req.body.postTitle,
    content:req.body.postBody})
  try{
    post.save()
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

app.get('/posts/:postId',function(req,resp){
  const post=req.params.postId
  console.log(post)
  Post.findOne({_id:post},(err,doc)=>{
    if(err){
      resp.render('Errors',{error:err})
      //setTimeout(()=>resp.redirect('/'),3000)
    }

    else if( doc==null){
       resp.render('Errors',{error:'404 not found'})
    }
    else{
      console.log(doc)
      resp.render('post',{Title:doc.title,content:doc.content})
    }
      })
    // else{
    //   resp.render('post',{Title:'Blog not found',content:'We could not find you are looking for'})
    // }
  })
// })










app.listen(3000, function() {
  console.log("Server started on port 3000");
});
