import React,{useEffect,useState} from 'react'
import toast from 'react-hot-toast'

export const useSendmessage = () => {
   const [loading, setloading] = useState(false)
  const Sendmessage=async (message,id) => {
    try { 
       if (!id) return 
       
        
        setloading(true)
       const response  =await fetch(`https://chatapp-muzz.onrender.com/api/message/send-message/${id}`,{
            method:"post",
            credentials:"include",
           body:JSON.stringify({message}),
           headers: {
            "Content-Type": "application/json",
          },

          })       
      
           
     const  result=await response.json()
    
      setloading(false)
    } catch (error) {
        toast.error(error.message)
        console.log(error);
        
    }
  }
 return { loading,Sendmessage}
}

