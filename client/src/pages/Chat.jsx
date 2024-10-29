import React,{useState,useEffect, useContext} from 'react'
import Sidebar from '../component/chat/Sidebar'
import Conversation from '../component/chat/Conversation'
import useConversation from '../hooks/useConversation'
import { ConversationContext } from '../context/ConversationContext'
import SocketContextProvider from '../context/SocketContextProvider'
import NotificationContextProvider from '../context/notificationContext'
import ChatContextProvider from '../context/ChatContext'
import { ChatContext } from '../context/ChatContext'


const Chat = () => {
const [start, setstart] = useState(true)
const {conversationlist,fetchuser,loading} =useConversation()
const [update, setupdate] = useState(false)
const {ischatonging,setischatonging }=useContext(ChatContext)

useEffect(() => {
  async function call() {
     await fetchuser();
    }
 call()
}, [])

const handleupdate=(value)=>{
  console.log(value)
setupdate(value)
}

  return (
    <>
    <SocketContextProvider>
     
      <NotificationContextProvider>
    <div className='overflow-auto  h-screen bg-[url("snowbg.jpg")] bg-no-repeat bg-cover ' >

    
    {loading?<span className="loading loading-dots loading-lg"></span> :<>
      <ConversationContext.Provider value={{conversationlist,handleupdate,update}}  >
   <div className=" grid grid-cols-4  ">
       <div className={ischatonging?' hidden  md:block col-span-4  md:col-span-1 ' :' col-span-4  md:col-span-1 ' } >
       <Sidebar/>
       </div>
       <div  className= {ischatonging?'col-span-4    md:col-span-3':' hidden col-span-4   md:block  md:col-span-3'}   >
      <Conversation/>
      </div>
     </div>
     </ConversationContext.Provider >
    </>
    } 

    </div>
    </NotificationContextProvider>
   
    </SocketContextProvider>
    </>
    
  )
}

export default Chat