import conversationModel from "../model/conversationmodel.js";
import messageModel from "../model/messagemodel.js";
import { recevied,io } from "../socket/socket.js";


export const sendmessage=async (req,res) => {
    
try {    const {message}=req.body
       const receivedid=req.params.id;
       const senderid=req.user._id; 
     
       
       if (!receivedid) return  res.status(401).json({message:"sender id does'nt exist" }) 
      let conversation= await conversationModel.findOne({
            particapant:{$all:[receivedid,senderid]}
         })
     if (!conversation) {
        
        conversation= await conversationModel.create({
        particapant: [receivedid, senderid]  }) }
   const Createmessage=await messageModel.create({
    senderid,
    receivedid,
    message:message   
  })
  if (Createmessage) conversation.message.push(Createmessage._id)
     
    const recevierid=recevied(receivedid)
    if (recevierid) {
      
       io.to(recevierid).emit('recevied-message',Createmessage)
    }
     await  conversation.save()
    

  res.status(200).json(Createmessage)

}  
    catch (error) {
        console.log(`error in message controller`);
        
        return   res.status(500).json({
            message:error.message
        }) 
    }
}

export const getmessage=async (req,res) => {
    try {
           const senderid=req.user._id;
           const receivedid=req.params.id
   const conversation=await conversationModel.findOne({particapant:{$all:[senderid,receivedid]}}).populate('message')
  res.status(200).json(conversation?.message) 
    } catch (error) {
       
         console.log(`error in get message message controller`);
        return   res.status(500).json({
            message:error.message
        }) 
    }
}