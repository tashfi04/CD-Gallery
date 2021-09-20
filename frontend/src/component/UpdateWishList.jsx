import React, { useState } from 'react'
import { Update, Delete, Text } from './Icons'
import axios from 'axios'

function UpdateWishList({  isSearched, fetchWishList, id, item_name, description, user_request_count, category }) {
    const [updateFlag, setUpdateFlag] = useState(false)
    const authAxios = axios.create({
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    })
    const [updatedWish, setUpdatedWish] = useState({
        item_name,
        description,
        user_request_count,
        category:null
    })

    const callUpdateWishList = (e) => {
        e.preventDefault()
        console.log(updatedWish)
        if(updatedWish.user_request_count<0)
            alert('User Request Count Invalid')
        else{
            let body = JSON.stringify(updatedWish)
            authAxios
            .put(`/api/v1/wishlist/update_delete/${id}/`,body)
            .then(()=>alert('Wished Item Updated'))
            .then(()=>setUpdateFlag(!updateFlag))
            .then(()=>fetchWishList())
            .catch(()=>console.log('wishe item update error'))
        }

    }

    const deleteWish = () => {
        authAxios
            .delete(`/api/v1/wishlist/update_delete/${id}/`)
            .then(() => alert('Wished Item Deleted'))
            .then(() => fetchWishList())
    }


    return (
        <div className='px-3 my-1'>
            {
                updateFlag ? (
                    <form className='p-10 md:w-6/12 w-full border-2 border-red-400' onSubmit={(e) => callUpdateWishList(e)}>
                        <label
                            className='block text-gray-700 text-md font-bold mb-3'
                        >
                            Item Name:
                        </label>
                        <input
                            className='shadow-xl appearance-none border rounded w-full py-2
                            px-3 text-gray-700 leading-tight focus:outline-none
                            focus:shadow-outline'
                            name='item_name'
                            type='text'
                            placeholder='Item Name'
                            value={updatedWish.item_name}
                            onChange={e =>
                                setUpdatedWish({ ...updatedWish, [e.target.name]: e.target.value })
                            }
                            required
                        />
                        <label
                            className='block mt-5 text-gray-700 text-md font-bold mb-3'
                        >
                            Request Count:
                        </label>
                        <input
                            className='shadow-xl appearance-none border rounded w-full py-2
                            px-3 text-gray-700 leading-tight focus:outline-none
                            focus:shadow-outline'
                            name='user_request_count'
                            type='number'
                            placeholder='User Request Count'
                            value={updatedWish.user_request_count}
                            onChange={e =>
                                setUpdatedWish({ ...updatedWish, [e.target.name]: e.target.value })
                            }
                            required
                        />
                        <label
                            className='mt-5 block text-gray-700 text-md font-bold mb-3'
                        >
                            Description:
                        </label>
                        <input
                            className='shadow-xl appearance-none border rounded w-full py-2
                            px-3 text-gray-700 leading-tight focus:outline-none
                            focus:shadow-outline'
                            name='description'
                            type='text'
                            placeholder='Description'
                            value={updatedWish.description}
                            onChange={e =>
                                setUpdatedWish({ ...updatedWish, [e.target.name]: e.target.value })
                            }
                            required
                        />
                        <label
                            className='mt-5 block text-gray-700 text-md font-bold mb-3'
                        >
                            Category: {category}
                        </label>
                        
                        <button className='btn mt-10 ml-5' type='submit'>
                            Update
                        </button>
                    </form>
                ) : (
                    <div className='rows'>
                        {
                            category && isSearched && <span className='bg-red-100 shadow-md rounded-md px-5 py-1'><b>{category}</b></span>
                        }
                        <div className='flex '>
                            <div className='flex-1 mt-2'> {item_name} </div>
                            <div className='flex-1'> Wished <b>{user_request_count}</b> times </div>
                            <div className='ml-auto'>
                                <button onClick={() => setUpdateFlag(!updateFlag)}>
                                    <Update />
                                </button>
                                <button onClick={() => deleteWish()}>
                                    <Delete />
                                </button>
                            </div>
                        </div>
                        <div className='flex'>
                            <Text />{description}
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default UpdateWishList
