import react, { createContext,useState } from "react"

export const ChatContext=createContext()



const ChatContextProvider = ({children}) => {
const [ischatonging, setischatonging] = useState(false)
  return <ChatContext.Provider  value={{ischatonging,setischatonging }} >
    {children }
  </ChatContext.Provider>
}

export default ChatContextProvider