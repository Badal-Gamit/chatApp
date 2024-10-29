import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true},
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
 gender:{
    type:String,
    required:true,
    enum:['male','female']
 },
 profilepic:{
    type:String,
    default:""
 }
    
 })

const user=mongoose.model("User",userSchema)
export default user