import React,{useEffect,useState,useContext} from 'react'
import { AuthContext } from  '../context/AuthContext'
import { useLocation,useNavigate ,Outlet} from 'react-router-dom'

const PrivateRoute = () => {
    const {authuser}=useContext(AuthContext)
    const [authtenticate, setauthtenticate] = useState(false)
    const path=useLocation()
    const navigate=useNavigate()

    useEffect(() => {
        function call() {
          if (path.pathname=='/') {
            if (!authuser?.User) return navigate('/login');
              setauthtenticate(true)
           }  
        }
       call()

 }, [path])



 return authtenticate? <Outlet/>:<div></div>
}

export default PrivateRoute