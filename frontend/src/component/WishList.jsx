import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import Search from './Search'
import axios from 'axios'
import UpdateWishList from './UpdateWishList'

function WishList () {
  const [newWish, setNewWish] = useState({
    item_name: '',
    description: '',
    user_request_count: null,
    category: null
  })
  const [categories, setCategories] = useState()
  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  })

  const [allWishList, setAllWishList] = useState([])
  const [searchedWished, setSearchedWished] = useState()
  const [isSearched, setIsSearched] = useState(false)

  const createWish = e => {
    e.preventDefault()
    if (newWish.user_request_count < 0) {
      alert('Invalid User Request Count')
    } 
    else if (newWish.category == null) {
      let tempWish = newWish
      tempWish.category = categories[0].id
      let body = JSON.stringify(tempWish)

      authAxios
        .post('/api/v1/wishlist/create/', body)
        .then(() => alert('Wished item enlisted'))
        .then(()=>fetchWishList())
        .then(()=>setNewWish({
          item_name: '',
          description: '',
          user_request_count: 0,
          category: null
        }))
        .catch(() => console.log('wished create error'))
    } 
    else {
      let body = JSON.stringify(newWish)
      authAxios
        .post('/api/v1/wishlist/create/', body)
        .then(() => alert('Wished item enlisted'))
        .then(()=>fetchWishList())
        .then(()=>setNewWish({
          item_name: '',
          description: '',
          user_request_count: 0,
          category: null
        }))
        .catch(() => console.log('wished create error'))
    }
    
  }

  const fetchWishList = () => {
    authAxios
      .get('/api/v1/wishlist/list/')
      .then(res => setAllWishList(res.data))
      .then(()=>setIsSearched(false))
      .catch(() => 'wishlist fetch erorr')
  }

  useEffect(() => {
    authAxios
      .get('/api/v1/categories/list_create/')
      .then(res => setCategories(res.data))
      .catch(() => console.log('category fetch error'))

    fetchWishList()
  }, [])

  return (
    <div>
      <Navbar />
      <div className='sm:w-9/12 sm:m-auto shadow-2xl bg-white pb-5'>
        <div
          className='bg-red-900 text-2xl text-white block py-2 my-2
        mx-auto rounded-md'
        >
          &nbsp; WishList
        </div>

        <div className='p-8'>
          {/* add wishlist */}
          <form onSubmit={e => createWish(e)}>
            <label className='block text-gray-700 text-xl font-bold mb-3'>
              Add a wished product
            </label>
            <hr />
            <div className='md:flex block mt-10 w-full'>
              <div className='md:flex-1 md:ml-10'>
                <label className='block text-gray-700 text-md font-bold mb-3'>
                  Item Name:
                </label>
                <input
                  className='shadow-xl appearance-none border rounded w-full md:w-10/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  name='item_name'
                  type='text'
                  placeholder='Item Name'
                  value={newWish.item_name}
                  onChange={e =>
                    setNewWish({
                      ...newWish,
                      [e.target.name]: e.target.value
                    })
                  }
                  required
                />
              </div>
              <div className='md:flex-1 md:ml-10 mt-5 md:mt-0'>
                <label className='block text-gray-700 text-md font-bold mb-3'>
                  Description:
                </label>
                <input
                  className='shadow-xl appearance-none border rounded w-full md:w-10/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  name='description'
                  type='text'
                  placeholder='Description'
                  value={newWish.description}
                  onChange={e =>
                    setNewWish({
                      ...newWish,
                      [e.target.name]: e.target.value
                    })
                  }
                  required
                />
              </div>
            </div>
            <div className='md:flex w-full mt-5 md:ml-10'>
              <div className='md:flex-1'>
                <label className='block text-gray-700 text-md font-bold mb-3'>
                  Request Count
                </label>
                <input
                  className='shadow-xl appearance-none border rounded w-full md:w-9/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  name='user_request_count'
                  type='number'
                  placeholder='User Request Count'
                  value={newWish.user_request_count}
                  onChange={e =>
                    setNewWish({
                      ...newWish,
                      [e.target.name]: e.target.value
                    })
                  }
                  required
                />
              </div>
              <div className='block md:flex-1'>
                <label className='block text-gray-700 text-md font-bold mb-3'>
                  Category
                </label>
                <div className='relative w-full md:w-9/12'>
                  <select
                    className='block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2
              px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    name='category'
                    onChange={e =>
                      setNewWish({
                        ...newWish,
                        [e.target.name]: e.target.value
                      })
                    }
                    value={newWish.category}
                  >
                    {categories &&
                      categories.map(({ name, id }) => {
                        return (
                          <option key={id} value={id}>
                            {name}{' '}
                          </option>
                        )
                      })}
                  </select>
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                    <svg
                      className='fill-current h-4 w-4'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                    >
                      <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <button className='flex m-auto btn mt-10' type='submit'>
              Add Wished Product
            </button>
          </form>
        </div>

        <hr />

        <Search type='wishlist'
        changeList={setSearchedWished}
        searched_name='wishlist' 
        setIsSearched={setIsSearched} />


        <hr className='mb-3'/>
        {allWishList && !isSearched &&
          allWishList.map(({ id, name, wishlist_set }) => {
            return (
              <div key={id} className='px-8 '>
                <div
                className='bg-red-100 text-2xl text-black block py-2 my-2
                mx-auto rounded-md'
                >
                  &nbsp; {name}
                </div>


                {wishlist_set && 
                  wishlist_set.map(
                    ({ id, item_name, description, user_request_count }) => {
                      return (
                        <UpdateWishList key={id} item_name={item_name}
                        description={description}
                        user_request_count={user_request_count}
                        fetchWishList={fetchWishList} id={id}
                        category={name}
                        isSearched={false}
                        >
                        </UpdateWishList>
                      )
                    }
                  )}
              </div>
            )
          })}
            {
                isSearched && searchedWished && searchedWished.map(({id, item_name, description, user_request_count, category})=>{
                    return (
                        <UpdateWishList key={id} item_name={item_name}
                        description={description}
                        user_request_count={user_request_count}
                        fetchWishList={fetchWishList} id={id}
                        category={category}
                        isSearched={true}
                        >
                        </UpdateWishList>
                    )
                })
            }
      </div>
    </div>
  )
}

export default WishList
