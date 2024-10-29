import React, { useContext, useState, useEffect } from 'react'
import { ConversationContext } from '../../context/ConversationContext'
import { SocketContext } from '../../context/SocketContextProvider';
import {useNavigate,useLocation }  from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';
import { NotifcationContext } from '../../context/notificationContext';
import { ChatContext } from '../../context/ChatContext'; 


const Sidebar = () => {
  const { conversationlist, update, handleupdate } = useContext(ConversationContext)
  const [isselected, setisselected] = useState('')
  const {authuser,setauthuser}=useContext(AuthContext)
  const {ischatonging,setischatonging }=useContext(ChatContext)

  const [user, setuser] = useState('')
  const navigate=useNavigate()
  const { online, Socket } = useContext(SocketContext)
  const {notification,setnotification}= useContext(NotifcationContext)

  const select = (id) => {
    setischatonging(true)
    setisselected(id)
    handleupdate(!update)
  }
  useEffect(() => {
    const userid=localStorage.getItem('with-user') 
    if (userid) {
      const  userdata= JSON.parse(userid)
      setisselected(userdata)
    }
      const ChatWith=localStorage.getItem('chat-user')
      if (ChatWith) {
        const { User } = JSON.parse(ChatWith )
        setuser(User)
      }

  }, [])



  useEffect(() => {
    if (isselected) {
      localStorage.setItem('with-user', JSON.stringify(isselected))
    }
  }, [isselected])

const logoutHandle=async ()=>{
 try {
   const response= await  fetch('https://chatapp-muzz.onrender.com/api/auth/logout',{
    credentials:"include"
  })
  const result=await response.json()
 
 if (result.message!="logout") return ;
  setauthuser({})
 localStorage.clear()
navigate('/login');
console.log('Navigating to login');
} catch (error) {
console.error("Logout error", error);
}

}

  return (
    <>
     
      <div className={"md:w-1/4 w-full  border-r  z-10  fixed top-0 backdrop-blur-lg   opacity-75 border-gray-300" }>
        <header className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
          <h1 className="text-2xl font-semibold">Chat Web</h1>
          <div className="relative">
          <div className="dropdown  dropdown-end ">
            <div tabIndex={0}   role="button"  className="w-12 h-12 bg-gray-300   rounded-full mr-3">
              <img src={user?.profilepic} alt={user?.userName} className="w-12 h-12   hover:cursor-pointer " />
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-black rounded-box z-[1] mt-3 w-32 ">
            <div className=' text-sm text-center  hover:cursor-pointer ' onClick={logoutHandle}  >logout</div>
            </ul>
            </div> 
          </div>
        </header>
        <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">

          {conversationlist.length>0   &&  conversationlist.map((list, i) => {

            return <div key={list._id}  > <div onClick={() => select(list)} className={isselected?.userName == list.userName ? "flex items-center mb-4 cursor-pointer bg-gray-100 p-2 rounded-md" : "flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md"}>
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3  ">
                <img src={list.profilepic} alt={list.userName} className="w-12 h-12 rounded-full" />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{list.userName}</h2>
                <h3>{online.includes(list._id) ? "online" : "offline"}  </h3>
              </div>
            {online.includes(list._id)?notification>0?<p  className=' bg-green-600 text-white   px-1 rounded-2xl' >{notification } </p>:"":""}  
            </div>
              <div className={conversationlist.length == (i + 1) ? "" : 'border-b border-red-600 '}></div>
            </div>
          })}
         
        </div>
    </div></>
  )
}

export default Sidebar
