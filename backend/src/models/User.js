import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    minlength:3
  },
  phonenumber:{
    type:String,
    required:true,
    match:/^[0-9]{10}$/,
  },
  password:{
    type:String,
    required: true,
    minlength:6,
  },
},{timestamps:true});

export default mongoose.model("UserData",userSchema);