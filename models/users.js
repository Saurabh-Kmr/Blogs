const mongoose = require("mongoose")


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
          ref: "Roles"
      }
  ],
  date:{
    type:Date,
    default:Date.now
  }
})

export default mongoose.model('Users',userSchema)