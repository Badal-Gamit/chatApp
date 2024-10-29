import React,{useState} from 'react'

export const useGetmessage = () => {
  const [chatloading, setchatloading] = useState(false)
  const [conversation, setconversation] = useState([])
    const  fetchMessages=async (id) => {
        try {
            setchatloading(true)
             const response=await fetch(`http://localhost:5000/api/message/get-message/${id}`,{
                method:"get",
                credentials:"include"
              })
            
              
            if (response.status==200) {
                const result=await response.json()
              setconversation(result)
               setchatloading(false) 
                return;
            }
            setchatloading(false)
           
          console.log(response.status);
        } catch (error) {
          setconversation([])
            setchatloading(false)
            console.log(error);
            
            }
     }

 return { chatloading,fetchMessages,conversation,setconversation}
}

