import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import UpdateCustomers from './UpdateCustomers'

function Customers() {
    const [customerDetails, setCustomerDetails] = useState({
        name: '',
        mobile_no: '',
        email: '',
    })
    const [customerList, setCustomerList] = useState()

    const authAxios = axios.create({
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    })

    const fetchCustomerList = () => {
        authAxios
            .get('/api/v1/customers/list_create/')
            .then((res) => setCustomerList(res.data))
            .catch(() => console.log('Error in customer list fetch'))
    }

    const deleteCustomerList = (id) => {
        authAxios
        .delete(`/api/v1/customers/update_delete/${id}/`)
        .then(()=>fetchCustomerList())
        .then(()=>alert('Customer Deleted'))
        .catch(()=>console.log('Customer Delete Error'))
    }

    useEffect(() => {
        fetchCustomerList()
    }, [])

    const addCustomer = (e) => {
        e.preventDefault()
        let body = JSON.stringify(customerDetails)
        authAxios
            .post('/api/v1/customers/list_create/', body)
            .then(() => fetchCustomerList())
            .then(()=>setCustomerDetails({
                name: '',
                mobile_no: '',
                email: '',
            }))
            .then(() => alert('Customer Created'))
            .catch(() => console.log('error in customer add'))
    }

    return (
        <div>
            <Navbar />
            <div className='sm:w-9/12 sm:m-auto shadow-2xl bg-white pb-5'>
                <div
                    className='bg-red-900 text-2xl text-white block py-2 my-2
        mx-auto rounded-md'
                >
                    &nbsp; Customers
                </div>
                <div className='p-8 '>
                    <form onSubmit={e => addCustomer(e)}>
                        <label
                            className='block text-gray-700 text-xl font-bold mb-3'
                        >
                            Add Customer
                        </label>
                        <hr />
                        <div className='md:flex block mt-10 w-full'>
                            <div className='md:flex-1 md:ml-10'>
                                <label
                                    className='block text-gray-700 text-md font-bold mb-3'
                                >
                                    Name:
                                </label>
                                <input
                                    className='shadow-xl appearance-none border rounded w-full md:w-10/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    name='name'
                                    type='text'
                                    placeholder='Customer Name'
                                    value={customerDetails.name}
                                    onChange={e =>
                                        setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div className='md:flex-1 md:ml-10 mt-5 md:mt-0'>
                                <label
                                    className='block text-gray-700 text-md font-bold mb-3'
                                >
                                    Email:
                                </label>
                                <input
                                    className='shadow-xl appearance-none border rounded w-full md:w-10/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    name='email'
                                    type='email'
                                    placeholder='Customer Email'
                                    value={customerDetails.email}
                                    onChange={e =>
                                        setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value })
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <div className='md:w-6/12 w-full mt-5 md:ml-10'>
                            <div className='flex-1'>
                                <label
                                    className='block text-gray-700 text-md font-bold mb-3'
                                >
                                    Contact No:
                                </label>
                                <input
                                    className='shadow-xl appearance-none border rounded w-full md:w-9/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                    name='mobile_no'
                                    type='text'
                                    placeholder='Customer Contact No'
                                    value={customerDetails.mobile_no}
                                    onChange={e =>
                                        setCustomerDetails({ ...customerDetails, [e.target.name]: e.target.value })
                                    }
                                    required
                                />
                            </div>
                        </div>
                        <button className='flex m-auto btn mt-10' type='submit'>
                            Add Customer
                        </button>
                    </form>
                </div>
                <hr />
                <label
                    className='p-8 block text-gray-700 text-xl font-bold mb-3'
                    htmlFor='username'
                >
                    Customers List
                </label>
                {
                    customerList && customerList.map(({id, name, mobile_no, email}) => {
                        return(
                            <UpdateCustomers name={name} mobile_no={mobile_no} email={email}
                            deleteCustomerList={deleteCustomerList} id={id}
                            fetchCustomerList={fetchCustomerList} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Customers
