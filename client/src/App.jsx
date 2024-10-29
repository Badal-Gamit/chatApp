import { useState ,useContext,useEffect} from 'react'
import { Routes,Route,Navigate, useNavigate ,useLocation, RouterProvider} from 'react-router-dom' 
import Login from './pages/Login'
import Signup from './pages/Signup'
import Chat from './pages/Chat'
import toast from 'react-hot-toast'
import PrivateRoute from './private/PrivateRoute'
import BlockRoute from './private/Blockroute'



function App() {
  

 
  

  return (
    <>
    <Routes>
      <Route path='' element={<PrivateRoute/> } >
      <Route path='/' element={<Chat/> } />
      </Route>
      <Route path='' element={<BlockRoute/>} >
      <Route path='/signup' element={<Signup/> } />
      <Route path='/login' element={<Login/> } />
      </Route>
</Routes>

    </>
  )
}

export default App
