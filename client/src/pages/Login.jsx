import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useLogin from '../hooks/useLogin'
import { Navigate } from 'react-router-dom'


const Login = () => {
  const { loading, login } = useLogin()
  const [form, setform] = useState({})
  const navigate=useNavigate()

  const changeHandle = ({ target }) => {
    setform((form) => { return { ...form, [target.name]: target.value } })
    console.log(form)
  }
  const submitHandle = async (e) => {
    e.preventDefault()
    await login(form)
    setform({})
    navigate('/')
  }

  return (
    <>
      <div className='relative bg-[url("snowbg.jpg")] bg-no-repeat bg-cover  ' >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-transparent to-blue-600 opacity-50"></div>
        <div className='flex h-screen justify-center  items-center ' >
          <div className=" px-6 py-12  backdrop-blur-lg w-96 ">

            <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
              <div className='text-center text-3xl text-slate-400 my-2 ' >
                login
                <span className='text-blue-500 mx-3 ' >
                  Chatapp
                </span>
              </div>
              <form className="space-y-6" onSubmit={submitHandle}>
                <div>
                  <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-400 dark:text-white">user name</label>
                  <input type='text' value={form?.userName?form.userName : ""} onChange={changeHandle} name="userName" id="userName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="cloud gamte" />
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-300">Password</label>

                  </div>
                  <div className="mt-2">
                    <input id="password" name="password" onChange={changeHandle} type="password" placeholder='password' required className="input input-bordered w-full max-w-xs" />
                  </div>
                </div>

                <div>
               <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> {loading?<span className="loading loading-spinner loading-sm"></span>:<span>sign in</span>}</button>
                </div>
              </form>
              <p className="text-sm font-light text-blue-400 dark:text-gray-400">
                Don't have an account? <Link to={'/signup'} className="font-medium  hover:underline   text-blue-700 hover:text-blue-900 ">signup here</Link>
              </p>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login