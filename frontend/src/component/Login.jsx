import React,{useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

function Login () {
    const [credentials, setCredentials] = useState({})
    const history = useHistory()
    function submit(e) {
        e.preventDefault();
        let endpoint = "/api/v1/accounts/login/"
        let body = JSON.stringify(credentials)
        let config = {
            headers: {
                "Content-Type": "application/json",
            },
        }
        axios
        .post(endpoint, body, config)
        .then((res)=>{
          console.log(res.data)
          localStorage.setItem('token',res.data.access_token)
          localStorage.setItem('username', res.data.user.username)
          history.push('/inventory/')
        })
        // window.location.href = "/employees/"
    }

    function handleChange(e) {
      setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    useEffect(()=>{
      if(localStorage.getItem('token')){
        history.push('/inventory/')
      }
    },[])

  return (
    <div className="bg-red-100">
    <div className='w-max m-auto flex h-screen'>
      
      <form className='bg-gray-500 max-w-xl rounded px-20 pt-6 pb-6 m-auto shadow-2xl' onSubmit={submit}>
        <div className='mb-4'>
        <label
            className='text-center rounded-md py-1 ring ring-indigo-300 shadow-2xl block text-white text-sm font-bold mb-2'
          >
            Welcome to CD GALLERY
          </label>
          <br />
          <label
            className='block text-white text-sm font-bold mb-2'
            htmlFor='username'
          >
            Username
          </label>
          <input
            className='shadow-xl appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            type='text'
            placeholder='Username'
            name='username'
            onChange={e=>handleChange(e)}
          />
        </div>
        <div className='mb-6'>
          <label
            className='block text-white text-sm font-bold mb-2'
            htmlFor='password'
          >
            Password
          </label>
          <input
            className='shadow-xl appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            type='password'
            placeholder='******************'
            name='password'
            onChange={e=>handleChange(e)}
          />{' '}
          <p className='text-red-500 text-xs italic'>Please choose a password.</p>
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='m-auto bg-green-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none hover:-translate-y-1 hover:opacity-80
            transition transform focus:ring focus:ring-offset-2 focus:ring-indigo-400 focus:ring-opacity-50'
            type='submit'
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
    </div>
  )
}

export default Login
