import React,{createContext,useEffect ,useState} from 'react'



export const NotifcationContext=createContext()

const NotificationContextProvider = ({children}) => {
   const [notification, setnotification] = useState(0)
   return  <NotifcationContext.Provider  value={{notification,setnotification}} >{children } </NotifcationContext.Provider>
}


export default NotificationContextProvider