import React,{useState,useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useSignup from '../hooks/useSignup'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const Signup = () => {
  const [form, setform] = useState({})
  const [select, setselect] = useState('')
  const {loading,signup }=useSignup()
  const navigate=useNavigate()
  const  {authuser }=useContext(AuthContext)



      
const changeHandle=({target})=>{
  setform((form)=>{ return {...form,[target.name]:target.value}})  
}

const sumbmitHandle=async(e)=>{
  e.preventDefault()
  const result=  await signup(form)
  setform({})
  navigate('/signup')
}

  return (
    <>
    <div  className='relative bg-[url("snowbg.jpg")] bg-no-repeat bg-cover  ' >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-transparent to-blue-600 opacity-50"></div>
      <div  className='flex h-screen justify-center  items-center ' >
      <div className=" px-6 py-3  backdrop-blur-lg w-96 ">
  
<div className=" sm:mx-auto sm:w-full sm:max-w-sm">
  <div className='text-center text-3xl text-slate-400 my-2 ' >
    Signup
 <span  className='text-blue-400 mx-3 ' >
      Chatapp
    </span>
  </div>
  <form className="space-y-4 md:space-y-6"  onSubmit={sumbmitHandle}  >
  <div>
    <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-400 dark:text-white">Your fullName</label>
                      <input type='text'  value={form?.fullName?form.fullName:""}  onChange={changeHandle}  name="fullName" id="fullName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="cloud gamte" />
                  </div>
                  <div>
                      <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-400 dark:text-white">User Name</label>
                      <input type="text"   value={form?.userName?form.userName:""}   onChange={changeHandle}    name="userName" id="userName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="ddd" />
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-400 dark:text-white">Your email</label>
                      <input type="email"    value={form?.email?form.email:""}   onChange={changeHandle}       name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-400 dark:text-white">Password</label>
                      <input type="password" name="password"   value={form?.password?form.password:""}   onChange={changeHandle}   id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  <div>
                  <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-400 dark:text-white">Password</label>
                  <input type="password" name="confirmPassword"   value={form?.confirmPassword?form.confirmPassword:""}   onChange={changeHandle}   id="confirmpassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" /> 
                  </div>
                  <div className="flex gap-2">
                  <label htmlFor="gender" className="block  text-sm font-medium text-gray-400 dark:text-white">Gender : </label>
                  <div className="flex items-center mb-4">
      <input id="checkbox-1" type="checkbox"   name='gender' checked={select==="male"}  onClick={({target})=>setselect(target.value)}    onChange={changeHandle}    value="male"     className="w-4 h-4 text-gray-400 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
      <label  htmlFor="checkbox-1"    className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-300">male</label>
  </div>
  <div className="flex items-center mb-4">
      <input id="checkbox-2" type="checkbox"  name='gender'   checked={select==="female"}    value="female" onClick={({target})=>setselect(target.value)}     onChange={changeHandle}    className="w-4 h-4 text-gray-400 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
      <label htmlFor="checkbox-2"    className="ms-2 text-sm font-medium text-gray-400 dark:text-gray-300">female</label>
  </div>   {console.log(authuser) }
                    </div>
                <button type="submit" className="w-full text-white  bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center "> {loading?<span className="loading loading-spinner loading-sm"></span> : <span>Create an account</span>}</button>
                  <p className="text-sm font-light text-blue-400 dark:text-gray-400">
                      Already have an account? <Link  to={'/login'}  className="font-medium  hover:underline  hover:text-blue-500 ">Login here</Link>
                  </p>
              </form>
              </div>
</div>
</div>
</div>
    </>
  )
}

export default Signup