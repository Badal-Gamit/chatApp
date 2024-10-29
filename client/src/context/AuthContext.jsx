import { createContext ,useState,useContext} from "react";

export const AuthContext=createContext()



export const AuthContextProvider=({children })=>{
    const [authuser, setauthuser] = useState(JSON.parse(localStorage.getItem('chat-user'))|| "")
    return <AuthContext.Provider  value={{authuser,setauthuser}} >
        { children}
    </AuthContext.Provider>
}

