import express from 'express'
import cookieParser from 'cookie-parser'
import dbconnection from './config/monodbconnection.js'
import dotenv from 'dotenv'
import authrouter from './routes/authroutes.js'
import messagerouter from './routes/messageroute.js'
import userrouter from './routes/userroute.js'
import cors from 'cors'
import { server,app } from './socket/socket.js'

dotenv.config();
dbconnection();

const port =process.env.PORT || 5000
  
app.use(cors({
    origin:"https://chatapp-xyz.onrender.com",
    credentials:true
})) 
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser())
app.use('/api/auth',authrouter)
app.use('/api/message',messagerouter)
app.use('/api/user',userrouter)


server.listen(port,()=>{
    console.log(`port is listining to ${port}`);
    
})