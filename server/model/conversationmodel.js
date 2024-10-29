import mongoose from 'mongoose'
const conversationSchema=new mongoose.Schema({
    particapant:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }],
    message:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Message",
        default:[]
        
    }]
},{timestamps:true});
const conversationModel=mongoose.model('Conversation',conversationSchema)

export default   conversationModel