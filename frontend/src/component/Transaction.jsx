import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Taka, Text } from './Icons'
import Navbar from './Navbar'
import Search from './Search'
import SelectTransaction from './SelectTransaction'
import axios from 'axios'

function Transaction() {
    const [searchedInventory, setSearchedInventory] = useState([])
    const [isSearched, setIsSearched] = useState(false)
    const [selectedItem, setSelectedItem] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [userId, setUserId] = useState()
    const [userList, setUserList] = useState([{name:'-----', id:null}])
    const authAxios = axios.create({
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    })

    const selected = (id, item_name, price, quantity) => {
        if (selectedItem === 0) {
            alert('Invalid quantity')
        }
        else {
            let tempItem = {
                name: item_name,
                inventory_item: id,
                count: quantity,
                price,
            }
            setSelectedItem([...selectedItem, tempItem])
            setSearchedInventory([])
            setTotalPrice(totalPrice + price * quantity)
        }
    }

    useEffect(() => {
        authAxios
            .get('/api/v1/customers/list_create/')
            .then((res) => setUserList(userList.concat(res.data)))
            .catch(() => console.log('user fetching error'))
    }, [])

    console.log(userList)

    const confirmTransaction = () => {
        let data = {
            customer: userId,
            total_price: totalPrice,
            item_set: selectedItem
        }
        if (data.customer == null) data.customer = userList[0].id
        data = JSON.stringify(data)
        console.log(data)
        authAxios
            .post('/api/v1/transactions/create/', data)
            .then(() => alert('Transaction successfull'))
            .then(() => {
                setUserId(null)
                setSelectedItem([])
                setTotalPrice(0)
            })
            .catch(() => alert('Transaction error'))
    }

    return (
        <div>
            <Navbar />
            <div className='sm:w-9/12 sm:m-auto shadow-2xl bg-white pb-5'>
                <div
                    className='bg-red-900 text-2xl text-white py-2 my-2
                                mx-auto rounded-md flex'
                >
                    <div>&nbsp; Transaction </div>
                    <Link className='flex ml-auto mr-2'
                    to='/transaction_list/'>
                        <button className="rounded-md text-base bg-red-200
                    text-black font-medium px-2 hover:-translate-y-1
                    transform transition">
                            All Transactions
                        </button>
                    </Link>
                </div>
                <Search
                    type='Inventory'
                    changeList={setSearchedInventory}
                    searched_name='inventory'
                    setIsSearched={setIsSearched}
                />
                <hr className='mb-3' />
                <div className="p-5">
                    <label
                        className='block text-gray-700 text-xl font-bold mb-3'
                        htmlFor='username'
                    >
                        Selected Items:

                    </label>
                    <table className='border-separate table-fixed w-full p-5 text-xs sm:text-base'>
                        <thead>
                            <tr>
                                <th className='p-2 bg-red-100 w-1/4'>Name</th>
                                <th className='p-2 bg-red-100 w-1/4'>Count</th>
                                <th className='p-2 bg-red-100'>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                selectedItem.length > 0 && selectedItem.map(({ inventory_item, name, price, count }) => {
                                    return (
                                        <tr key={inventory_item} className='bg-red-100 p-2'>
                                            <td className='p-2'>{name}</td>
                                            <td>{count}</td>
                                            <td>{count}*{price}={count * price}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <div className="flex">Total Price &nbsp; <Taka /> &nbsp; <b>{totalPrice}</b></div>
                    <div className="flex px-4 mt-5">
                        <div className='relative flex-1'>
                            <select
                                className='block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-2
              px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                                name='category'
                                onChange={(e) => setUserId(e.target.value)}
                                value={userId}
                            >
                                {userList &&
                                    userList.map(({ name, id }) => {
                                        return (
                                            <option key={id} value={id}>
                                                {name}
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
                        <button className="btn flex-1 ml-5 w-8/12" onClick={() => confirmTransaction()}>
                            Confirm Transaction
                        </button>
                    </div>

                </div>
                <hr className='mb-3' />
                <div className='p-2'>
                    {
                        searchedInventory.length > 0 && searchedInventory.map(({ id, category, item_name, count, price, description }) => {
                            return (
                                <div key={id} className='rows my-2'>
                                    <span className='bg-red-100 shadow-md rounded-md px-5 py-1'><b>{category.name}</b></span>
                                    <div className='flex w-full mt-3'>
                                        <div className='flex-1 mt-2'> {item_name} </div>
                                        <div className='flex-1'>
                                            <div className='flex'><Taka /> <b>{price}</b></div>
                                        </div>
                                        <div className='flex-1'> Available <b>{count}</b> Piece </div>
                                    </div>
                                    <hr className='my-1' />
                                    <div className='flex'>
                                        <Text /> {description}
                                    </div>
                                    <hr className='my-2' />
                                    <SelectTransaction selected={selected}
                                        item_name={item_name}
                                        id={id}
                                        price={price}
                                    />

                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Transaction
