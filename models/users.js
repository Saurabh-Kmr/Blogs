/*jshint esversion: 8 */

const mongoose = require("mongoose");


const userSchema= mongoose.Schema({
  username:{
   type:String,
   required:true
  },
  password:{
    type:String,
    required:true,
  },
  email:{
    type:string,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    validate: {
        validator: v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v),
        message: "Please enter a valid email"
     }
  },
  role:[
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Roles",
          default: '1'
      }
  ],
  date:{
    type:Date,
    default:Date.now
  }
});

userSchema.methods.sanitizeFields= ()=>{
 var returnObject = {
   _id: this._id,
   username: this.username,
   email: this.email,
   role: this.role
 };
 return returnObject;
};

export default mongoose.model('Users',userSchema);