import mongoose from "mongoose";

const  dbconnection=async()=>{
    try {
        await mongoose.connect(process.env.mongodb)
        console.log('connection to db sucess');
        
   } catch (error) {
       console.log('failed connection db ',error);
   }

}

export default dbconnection


