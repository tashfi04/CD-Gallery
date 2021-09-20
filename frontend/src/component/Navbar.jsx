import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

function Navbar() {
  const [navShow, setNavShow] = useState(false)
  const history = useHistory()
  
  function buttonLogOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    history.push('/')
  }

  const element =
    (
      <div className="text-lg md:flex-grow">
        <Link to="/customers/" className="block mt-4 md:inline-block md:mt-0 text-white hover:text-green-200 mr-4">
          Customers
        </Link>
        <Link to="/category/" className="block mt-4 md:inline-block md:mt-0 text-white hover:text-green-200 mr-4">
          Category
        </Link>
        <Link to="/wishlist/" className="block mt-4 md:inline-block md:mt-0 text-white hover:text-green-200 mr-4">
          Wishlist
        </Link>
        <Link to="/inventory/" className="block mt-4 md:inline-block md:mt-0 text-white hover:text-green-200 mr-4">
          Inventory
        </Link>
        <Link to="/transaction/" className="block mt-4 md:inline-block md:mt-0 text-white hover:text-green-200 mr-4">
          Transaction
        </Link>
     
        <hr className='md:hidden mt-5' />
        <div className='block mt-4 md:ml-5 md:inline-block md:mt-0 text-white hover:text-green-200'>
          <button className="flex rounded-lg
          hover:-translate-y-1 transform transition
          hover:opacity-80"
          onClick={buttonLogOut}
          >
            {/* strokeLine="round" */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
          </button>
        </div>
      </div>
    )

  return (
    <nav className='flex items-center justify-between flex-wrap bg-gray-500 p-6 shadow-2xl md:w-9/12 md:m-auto'>
      <div className='flex items-center flex-shrink-0 text-white mr-6'>
        <span className='font-semibold text-xl tracking-tight'>CD GALLERY</span>
      </div>

      <div className='block md:hidden'>
        <button
          className='block items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white'
          onClick={() => setNavShow(!navShow)}
        >
          <svg
            className='fill-current h-3 w-3'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <title>Menu</title>
            <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow md:flex md:items-center md:w-auto">
        {
          navShow ? (
            element
          ) : (
            <div className="hidden md:block"> {element} </div>
          )
        }
      </div>
    </nav>
  )
}

export default Navbar
