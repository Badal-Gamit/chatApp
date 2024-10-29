import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import toast, { Toaster } from 'react-hot-toast';
import  {BrowserRouter} from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.jsx';
import ChatContextProvider from './context/ChatContext.jsx';

createRoot(document.getElementById('root')).render(
 
    <BrowserRouter>
     <ChatContextProvider>
   <AuthContextProvider>
    <App />
    </AuthContextProvider>
    </ChatContextProvider>
    <Toaster />
    </BrowserRouter>

)
