
import mongoose from 'mongoose'
const messageSchema=new mongoose.Schema({
    senderid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receivedid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    message:{
        type:String,

    }
},{timestamps:true});
const messageModel=mongoose.model('Message',messageSchema)

export default messageModel