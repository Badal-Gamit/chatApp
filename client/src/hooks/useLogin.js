import React, { useState,useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';


const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const {authuser, setauthuser }=useContext(AuthContext)

    const login= async ({ userName, password }) => {
        const success = validateInputs(password,userName);
        if (!success) return;

        setLoading(true);
        try {
           
          const response= await  fetch('http://localhost:5000/api/auth/login',{
                headers: {
                    "Content-Type": "application/json",
                  },
                  method:"post",
                  body:JSON.stringify({password, userName}),
                credentials:'include'
            })
            
           const result=await response.json();
           if (response.status!=201){
            toast.error(result.message)
            setLoading(false)
            return
        } 
           localStorage.setItem('chat-user',JSON.stringify(result))
           setauthuser(result)
            setLoading(false)
            toast.success(' successful login!');
        } catch (error) {
            toast.error('login failed. Please try again.');
            setLoading(false);
        } 
    };

    return { loading,login};
};

export default useLogin;

const validateInputs = ( password,userName) => {
    
    if (!userName) {
        toast.error('Please fill in your username');
        return false;
    }
    if (!password) {
        toast.error('Please fill in your password');
        return false;
    }
    
    return true;
};
