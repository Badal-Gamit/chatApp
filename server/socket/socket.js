import express from 'express'
import {createServer} from 'http'
import {Server} from 'socket.io'
const app=express();
const server=createServer(app);

const io=new Server(server,{
cors:{
origin:['http://localhost:5173' ],
methods:["GET","POST"]
}
});

  const  setOnline={}
const recevied=(id)=>{
   return setOnline[id]
}

io.on('connection',(socket)=>{
  console.log('connect to socket')
   const id=socket.handshake.query.id
  if (id!=undefined) setOnline[id]=socket.id 
   io.emit('get-onlineUser',Object.keys(setOnline))
  console.log(setOnline,'get');
  
socket.on('disconnect',()=>{
  delete setOnline[id]
  console.log(setOnline,'del');
   
 io.emit('get-onlineUser',Object.keys(setOnline)) 
})

})

export {app,server,io,recevied }




