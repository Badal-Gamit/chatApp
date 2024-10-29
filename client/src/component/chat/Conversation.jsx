  import React, { useEffect, useState, useContext, useRef } from 'react';
  import { ConversationContext } from '../../context/ConversationContext';
  import { useSendmessage } from '../../hooks/useSendmessage';
  import { useGetmessage } from '../../hooks/useGetmessage';
  import { SocketContext } from '../../context/SocketContextProvider';
  import { useNavigate } from 'react-router-dom';
  import { NotifcationContext } from '../../context/notificationContext';
  import EmojiPicker from 'emoji-picker-react';
  import { ChatContext } from '../../context/ChatContext'; 
  import { FiPaperclip } from "react-icons/fi";
  import { MdEmojiEmotions } from "react-icons/md";
 

  const Conversation = () => {
    const { loading, Sendmessage } = useSendmessage();
    const [ChatWith, setChatWith] = useState('');
    const [showpicker, setshowpicker] = useState(false)
    const { update } = useContext(ConversationContext);
    const [user, setUser] = useState('');
    const [message, setMessage] = useState('');
    const { chatloading, fetchMessages, conversation, setconversation } = useGetmessage();
    const {online,Socket } =useContext(SocketContext)
    const {notification,setnotification}= useContext(NotifcationContext)
    const {ischatonging,setischatonging }=useContext(ChatContext)
  
  const lastMessage = useRef();


   useEffect(() => {
      const user=localStorage.getItem('with-user')
      if (user===null) return 
      const id=JSON.parse(user)._id
      if (online.includes(id)) setnotification(0)
      setChatWith(JSON.parse(user));
    }, [update]);

    useEffect(() => {
      const user=localStorage.getItem('chat-user')
      if (user==null) return
      const { User } = JSON.parse(user);
      if (User) {
        setUser(User);
      }
     return ()=>{
      setChatWith({})
      setUser({})
     }

    }, []);


    useEffect(() => {
      if (ChatWith) {
        fetchMessages(ChatWith._id);
      }
    }, [ChatWith]);


    useEffect(() => {
      if (lastMessage.current) {
        lastMessage.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, [conversation]);

    const sendMessageHandle = async (e) => {
      e.preventDefault();
      if (!message.trim()) return;
      await Sendmessage(message, ChatWith._id);
      setconversation((messages) =>{ return  [
        ...messages,
        { senderid: user._id, receivedid: ChatWith._id, message: message },
      ]});
      setMessage('');
      if (showpicker) setshowpicker(false) 
    };

const addemoji=(emoji)=>{
  console.log(emoji)
  setMessage((message)=> message + emoji.emoji)
}


  useEffect(() => {

  if (!Socket) return
        Socket?.on('recevied-message',(Createmessage)=>{
         
          if (Createmessage.senderid!=ChatWith?._id){
             setnotification((notification)=>notification +1)
           
          }
      
          if (Createmessage.senderid==ChatWith._id) setconversation((conversation)=>[...conversation ,Createmessage] )
          
        }) 

        return ()=> Socket?.off("recevied-message")

      }, [Socket,conversation,setconversation])
      
      

    return (
      <> 
    
        {ChatWith?.userName ? (
          <div className="flex flex-col h-screen">
            <header className="fixed top-0  flex  items-center  justify-between   md:pr-[410px]  mr-1 w-full bg-gradient-to-r from-blue-400 via-transparent to-blue-400 opacity-95 p-4 text-gray-700 z-10">
             
              <h1 className="text-2xl font-semibold">{ChatWith?.userName}</h1>
              <button   onClick={()=>{setChatWith({}); localStorage.removeItem('with-user');setischatonging(false)}}   className='bg-blue-800 p-1 rounded-sm' ><svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="#00008b" viewBox="0 0 14 14">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
</svg> </button>
            </header>
            <div className="flex-1   relavtive  overflow-y-auto pt-20 pb-20">
              {chatloading ? (
                <div className="flex w-full mt-5 flex-col gap-10">
                  <div className="skeleton h-32 w-full"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                </div>
              ) : (
                <div className="p-4"   onClick={()=>{if (showpicker) setshowpicker(false)} }    >
                  {conversation.length > 0 ? (
                    conversation.map((msg,i) => (
                      <div key={msg._id?msg._id:i} ref={msg.senderid === user._id ? lastMessage : null}>
                        {user._id === msg.senderid ? (
                          <div className="flex justify-end mb-4 cursor-pointer">
                            <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                              <p>{msg.message}</p>
                            </div>
                            <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                              <img src={user?.profilepic} alt={user?.userName} className="w-8 h-8 rounded-full" />
                            </div>
                          </div>
                        ) : (<div className="flex mb-4 cursor-pointer">
                            <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                              <img src={ChatWith?.profilepic} alt={ChatWith?.userName} className="w-8 h-8 rounded-full" />
                            </div>
                            <div className="flex max-w-96 bg-slate-200 rounded-lg p-3 gap-3">
                              <p className="text-gray-700">{msg.message}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className='text-5xl text-slate-300 text-center'>
                      Start a conversation with {ChatWith?.userName} ✋
                    </div>
                  )}
                </div>
              )}
            </div>
            <div  className={showpicker?'absolute right-10   bottom-20' :'absolute right-10  hidden bottom-20'  } >
            <EmojiPicker autoFocusSearch  onEmojiClick={addemoji}  theme='dark'  /> 
            </div>
            <form onSubmit={sendMessageHandle}>
              <footer className="border-t backdrop-blur-lg opacity-95 border-gray-300 p-4">
                <div className="flex items-center  relative ">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={message || ''}
                    onChange={({ target }) => setMessage(target.value)}
                    className="w-full p-2 rounded-md border text-slate-100 bg-transparent border-gray-400 focus:outline-none focus:border-blue-500"
                   onClick={()=>{if (showpicker) setshowpicker(false)} }
                 />
                  <div  className='absolute right-24 cursor-pointer' onClick={()=>setshowpicker(!showpicker)}  > <MdEmojiEmotions  size={22}  color='green' />   </div>
                  
                  <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">
                    {loading ? <span className="loading loading-spinner loading-sm"></span> : <span>Send</span>}
                  </button>
                </div>
              
              </footer>
            </form>
          </div>
        ) : (
          <div className='flex justify-center items-center w-full h-screen flex-col gap-5 backdrop-blur-lg opacity-85'>
            <div className='text-slate-100 text-5xl font-bold'>Welcome {user.userName} 🤓</div>
            <div className='text-slate-100 text-5xl font-bold'>Select a chat to start a conversation 📞</div>
          </div>
        )}
   
      </>
    );
  };

  export default Conversation;



