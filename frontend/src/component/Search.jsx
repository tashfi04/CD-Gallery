import React,{useEffect, useState} from 'react'
import axios from 'axios'

function Search({type, searched_name, changeList, setIsSearched}) {
    const authAxios = axios.create({
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      })
      const [searchItem, setSearchItem] = useState('')

      const getItem = () => {
        authAxios
        .get(`/api/v1/${searched_name}/search/${searchItem}/`)
        .then((res)=>changeList(res.data))
        .then(()=>setIsSearched(true))
        .catch(()=>console.log('search error'))
      }

    return (
        <div className='px-5 pb-10 pt-3'>
             <label
              className='block text-gray-700 text-xl font-bold mb-3'
              htmlFor='username'
            >
            Search {type}
            </label>
            <div className='md:flex block'>
              <input
                className='shadow-xl appearance-none border rounded w-full md:w-10/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                name='name'
                type='text'
                placeholder={type}
                value={searchItem}
                onChange={e =>
                  setSearchItem(e.target.value)
                }
                required
              />
              <button className='flex mr-auto btn mt-5 md:mt-0'
               onClick={()=>getItem()}>
                Search
              </button>
            </div>
        </div>
    )
}

export default Search
