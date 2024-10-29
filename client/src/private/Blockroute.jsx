import React,{useEffect,useState,useContext} from 'react'
import { AuthContext } from  '../context/AuthContext'
import { useLocation,useNavigate ,Outlet} from 'react-router-dom'

const BlockRoute = () => {
    const {authuser}=useContext(AuthContext)
    const [requiredlogin, setrequiredlogin] = useState(false)
    const path=useLocation()
    const navigate=useNavigate()

    useEffect(() => {
        function call() {
          if (path.pathname=='/login' || path.pathname=='/signup') {
            if (authuser?.User) return navigate('/');
              setrequiredlogin(true)
           }  
        }
       call()

 }, [path])



 return setrequiredlogin? <Outlet/>:<div></div>
}

export default BlockRoute