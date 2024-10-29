import React, { useState,useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const {authuser, setauthuser }=useContext(AuthContext)

    const signup = async ({ fullName, userName, email, password, confirmPassword, gender }) => {
        const success = validateInputs(fullName, userName, email, password, confirmPassword, gender);
        if (!success) return  true ;

        setLoading(true);
        try {
           
          const response= await  fetch('http://localhost:5000/api/auth/signup',{
                headers: {
                    "Content-Type": "application/json",
                  },
                  method:"post",
                  body:JSON.stringify({fullName, userName, email, password, confirmPassword, gender}),
                  credentials:"include"
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
            toast.success('Signup successful!');
        } catch (error) {
            toast.error('Signup failed. Please try again.');
             setLoading(false);
        }
    };

    return { loading, signup };
};

export default useSignup;

const validateInputs = (fullName, userName, email, password, confirmPassword, gender) => {
    if (!fullName) {
        toast.error('Please fill in your full name');
        return false;
    }
    if (!userName) {
        toast.error('Please fill in your username');
        return false;
    }
    if (!email) {
        toast.error('Please fill in your email');
        return false;
    }
    if (!password) {
        toast.error('Please fill in your password');
        return false;
    }
    if (!confirmPassword) {
        toast.error('Please fill in your confirm password');
        return false;
    }
    if (confirmPassword !== password) {
        toast.error("Passwords don't match");
        return false;
    }
    if (password.length < 6) {
        toast.error('Password length must be at least 6 characters');
        return false;
    }
    if (!gender) {
        toast.error('Please select your gender');
        return false;
    }
    return true;
};
