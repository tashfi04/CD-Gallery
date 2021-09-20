import React, { useState } from 'react'
import { Update, Delete, Text, Taka } from './Icons'
import axios from 'axios'

function UpdateInventoryList({  isSearched, fetchInventoryList, id, item_name, description, count, price, category, categoryid }) {
    const [updateFlag, setUpdateFlag] = useState(false)
    const authAxios = axios.create({
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    })
    const [updateInventory, setUpdateInventory] = useState({
        id,
        item_name,
        description,
        price,
        count,
        category:categoryid
    })

    const callUpdateInventoryList = (e) => {
        e.preventDefault()
        if(updateInventory.count < 0 || updateInventory.price < 0)
            alert('Invalid information')
        else{
            let data = JSON.stringify(updateInventory)
            console.log(data)
            authAxios
            .put(`/api/v1/inventory/update_delete/${id}/`, data)
            .then(()=>alert('Inventory Item Updated'))
            .then(()=>setUpdateFlag(!updateFlag))
            .then(()=>fetchInventoryList())
            .catch(()=>console.log('inventory item update error'))
        }

    }

    const deleteInventory = () => {
        authAxios
            .delete(`/api/v1/inventory/update_delete/${id}/`)
            .then(() => alert('Inventory Item Deleted'))
            .then(() => fetchInventoryList())
    }


    return (
        <div className='px-3 my-1'>
            {
                updateFlag ? (
                    <form className='p-10 md:w-6/12 w-full border-2 border-red-400' onSubmit={(e) => callUpdateInventoryList(e)}>
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
                            value={updateInventory.item_name}
                            onChange={e =>
                                setUpdateInventory({ ...updateInventory, [e.target.name]: e.target.value })
                            }
                            required
                        />
                        <label
                            className='block mt-5 text-gray-700 text-md font-bold mb-3'
                        >
                            Product Available:
                        </label>
                        <input
                            className='shadow-xl appearance-none border rounded w-full py-2
                            px-3 text-gray-700 leading-tight focus:outline-none
                            focus:shadow-outline'
                            name='count'
                            type='number'
                            placeholder='Available Product Count'
                            value={updateInventory.count}
                            onChange={e =>
                                setUpdateInventory({ ...updateInventory, [e.target.name]: e.target.value })
                            }
                            required
                        />
                        <label
                            className='block mt-5 text-gray-700 text-md font-bold mb-3'
                        >
                            Price:
                        </label>
                        <input
                            className='shadow-xl appearance-none border rounded w-full py-2
                            px-3 text-gray-700 leading-tight focus:outline-none
                            focus:shadow-outline'
                            name='price'
                            type='number'
                            placeholder='Price'
                            value={updateInventory.price}
                            onChange={e =>
                                setUpdateInventory({ ...updateInventory, [e.target.name]: e.target.value })
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
                            value={updateInventory.description}
                            onChange={e =>
                                setUpdateInventory({ ...updateInventory, [e.target.name]: e.target.value })
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
                            <div className='flex-1'> <div className='flex'> <Taka /> <b>{price}</b> </div> </div>
                            <div className='flex-1'> Available <b>{count}</b> Piece </div>
                            <div className='ml-auto'>
                                <button onClick={() => setUpdateFlag(!updateFlag)}>
                                    <Update />
                                </button>
                                <button onClick={() => deleteInventory()}>
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

export default UpdateInventoryList
