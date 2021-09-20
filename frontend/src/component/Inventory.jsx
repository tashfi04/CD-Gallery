import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import Search from './Search'
import UpdateInventoryList from './UpdateInventoryList'

function Inventory() {
    const [newInventory, setNewInventory] = useState({
        item_name: "",
        description: "",
        price: 0,
        count: 0,
        category: null
    })

    const [categories, setCategories] = useState()
    const authAxios = axios.create({
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    })
    const [allInventoryList, setAllInventoryList] = useState()
    const [isSearched, setIsSearched] = useState(false)
    const [searchedInventory , setSearchedInventory] = useState()

    const fetchInventoryList = () => {
        authAxios
        .get('/api/v1/inventory/list/')
        .then((res)=>setAllInventoryList(res.data))
        .catch(()=>console.log('Inventory list fetch error'))
    }

    useEffect(() => {
        authAxios
            .get('/api/v1/categories/list_create/')
            .then(res => setCategories(res.data))
            .catch(() => console.log('category fetch error'))

          fetchInventoryList()
    }, [])

    const createInventory = (e) => {
        e.preventDefault()
        if(newInventory.price < 0 || newInventory.count < 0){
            alert('Invalid Input')
        }
        else if(newInventory.category === null){
            let tempInventory = newInventory
            tempInventory.category = categories[0].id
            let body = JSON.stringify(tempInventory)
            authAxios
            .post('/api/v1/inventory/create/', body)
            .then(()=>fetchInventoryList())
            .then(()=>alert('Item added to inventory'))
            .then(()=>setNewInventory({
                item_name: "",
                description: "",
                price: 0,
                count: 0,
                category: null
            }))
            .catch(()=>console.log('inventory create error'))
        }
        else{
            let body = JSON.stringify(newInventory)
            authAxios
            .post('/api/v1/inventory/create/', body)
            .then(()=>fetchInventoryList())
            .then(()=>alert('Inventory Created'))
            .then(()=>setNewInventory({...newInventory,
                item_name: "",
                description: "",
                price: 0,
                count: 0,
            }))
            .catch(()=>console.log('inventory create error'))
        }
    }

    return (
        <div>
            <Navbar />
            <div className='sm:w-9/12 sm:m-auto shadow-2xl bg-white pb-5'>
                <div
                    className='bg-red-900 text-2xl text-white block py-2 my-2
        mx-auto rounded-md'
                >
                    &nbsp; Inventory
                </div>
                {/* Add Inventory */}
                <div className='p-8'>
                    {/* add wishlist */}
                    <form onSubmit={e => createInventory(e)}>
                        <label className='block text-gray-700 text-xl font-bold mb-3'>
                            Add a product in Inventory
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
                                    value={newInventory.item_name}
                                    onChange={e =>
                                        setNewInventory({
                                            ...newInventory,
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
                                    placeholder='Description '
                                    value={newInventory.description}
                                    onChange={e =>
                                        setNewInventory({
                                            ...newInventory,
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
                                    Availability Count
                                </label>
                                <input
                                    className='shadow-xl appearance-none border rounded w-full md:w-9/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    name='count'
                                    type='number'
                                    placeholder='Item Count'
                                    value={newInventory.count}
                                    onChange={e =>
                                        setNewInventory({
                                            ...newInventory,
                                            [e.target.name]: e.target.value
                                        })
                                    }
                                    required
                                />
                            </div>
                            <div className='md:flex-1 md:ml-10'>
                                <label className='block text-gray-700 text-md font-bold mb-3'>
                                    Item Price:
                                </label>
                                <input
                                    className='shadow-xl appearance-none border rounded w-full md:w-10/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    name='price'
                                    type='number'
                                    placeholder='Price'
                                    value={newInventory.price}
                                    onChange={e =>
                                        setNewInventory({
                                            ...newInventory,
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
                                            setNewInventory({
                                                ...newInventory,
                                                [e.target.name]: e.target.value
                                            })
                                        }
                                        value={newInventory.category}
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
                            Add Product
                        </button>
                    </form>
                </div>
            <hr />

            <Search 
                type='inventory'
                changeList={setSearchedInventory}
                searched_name='inventory' 
                setIsSearched={setIsSearched}
            />

            <hr className='mb-3'/>
            {allInventoryList && !isSearched &&
          allInventoryList.map(({ id:idx, name, inventory_set }) => {
            return (
              <div key={idx} className='px-8 '>
                <div
                className='bg-red-100 text-2xl text-black block py-2 my-2
                mx-auto rounded-md'
                >
                  &nbsp; {name}
                </div>


                {inventory_set && 
                  inventory_set.map(
                    ({ id, item_name, description, count, price }) => {
                      return (
                        <UpdateInventoryList key={id} item_name={item_name}
                            description={description}
                            count={count}
                            fetchInventoryList={fetchInventoryList}
                            price={price}
                            id={id}
                            category={name}
                            categoryid={idx}
                            isSearched={false}
                        >
                        </UpdateInventoryList>
                      )
                    }
                  )}
              </div>
            )
          })}
            {
                isSearched && searchedInventory && searchedInventory.map(({id, item_name, description, count, price, category})=>{
                    return (
                        <UpdateInventoryList key={id} item_name={item_name}
                            description={description}
                            count={count}
                            fetchInventoryList={fetchInventoryList} id={id}
                            price={price}
                            category={category.name}
                            categoryid = {category.id}
                            isSearched={true}
                        >
                        </UpdateInventoryList>
                    )
                })
            }
            </div>

        </div>
    )
}

export default Inventory
