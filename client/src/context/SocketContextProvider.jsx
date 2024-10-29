import React,{createContext,useEffect ,useState} from 'react'
import io from 'socket.io-client'


export const SocketContext=createContext()

const SocketContextProvider = ({children }) => {
  const [loginuser, setloginuser] = useState('')
  const [online, setonline] = useState([])
  const [Socket, setSocket] = useState('')
useEffect(() => {
   const user=localStorage.getItem('chat-user')
   if (user==null) return  
 const {User }=JSON.parse(user)
 if (User)setloginuser(User)
}, [])
useEffect(() => {
  if (loginuser) {
     const socket=io('http://localhost:5000',{
      query:{id:loginuser._id}
     })
     setSocket(socket)
    socket.on('get-onlineUser',(user)=>{
     console.log(user,'online')
      setonline(user)
    })

    return () => {
      socket.disconnect();
      console.log('Socket disconnected');
    };
  }
   
   
}, [loginuser])



    return <SocketContext.Provider  value={{online,Socket}} >{children} </SocketContext.Provider>
}

export default SocketContextProvider