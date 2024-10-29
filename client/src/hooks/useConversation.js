import React,{useContext ,useState,useEffect} from 'react'
import toast from 'react-hot-toast'
import { useNavigate }  from 'react-router-dom'


const useConversation = () => {
 const [conversationlist, setconversationlist] = useState([])
 const [loading, setloading] = useState(false)
  const navigate=useNavigate()
 
 const fetchuser=async () => {
    try {    
        setloading(true)
        const response=await  fetch('http://localhost:5000/api/user',{
            credentials:"include"
        })
       const result=await response.json()
    
    setconversationlist(result)
      setloading(false)
    } catch (error) {
    toast.error(error.message)
    setloading(false)
}
}
 return {fetchuser,conversationlist,loading}
}

export  default useConversation

