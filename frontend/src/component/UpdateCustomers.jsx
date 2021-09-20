import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Delete, Update } from './Icons'

function UpdateCustomers({ id, name, email, mobile_no, deleteCustomerList, fetchCustomerList }) {
    const [updateFlag, setUpdateFlag] = useState(false)
    const [customer, setCustomer] = useState()
    const authAxios = axios.create({
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    })

    useEffect(() => {
        setCustomer({
            name,
            email,
            mobile_no
        })
    }, [])

    const callUpdateCustomer = (e) => {
        e.preventDefault()
        let body = JSON.stringify(customer)
        authAxios
        .put(`/api/v1/customers/update_delete/${id}/`,body)
        .then(()=>alert('Customer Updated'))
        .then(()=>setUpdateFlag(!updateFlag))
        .then(()=>fetchCustomerList())
        .catch(()=>console.log('Update Customer Error'))
    }

    return (
        <div className='px-8 my-3'>
            {
                updateFlag ? (
                    <form className='p-10 md:w-6/12 w-full border-2 border-red-400' onSubmit={(e) => callUpdateCustomer(e)}>
                        <label
                            className='block text-gray-700 text-md font-bold mb-3'
                        >
                            Name:
                        </label>
                        <input
                            className='shadow-xl appearance-none border rounded w-full py-2
                            px-3 text-gray-700 leading-tight focus:outline-none
                            focus:shadow-outline'
                            name='name'
                            type='text'
                            placeholder='Customer Name'
                            value={customer.name}
                            onChange={e =>
                                setCustomer({ ...customer, [e.target.name]: e.target.value })
                            }
                            required
                        />
                        <label
                            className='block mt-5 text-gray-700 text-md font-bold mb-3'
                        >
                            Email:
                        </label>
                        <input
                            className='shadow-xl appearance-none border rounded w-full py-2
                            px-3 text-gray-700 leading-tight focus:outline-none
                            focus:shadow-outline'
                            name='email'
                            type='email'
                            placeholder='Email Address'
                            value={customer.email}
                            onChange={e =>
                                setCustomer({ ...customer, [e.target.name]: e.target.value })
                            }
                            required
                        />
                        <label
                            className='mt-5 block text-gray-700 text-md font-bold mb-3'
                        >
                            Contact No:
                        </label>
                        <input
                            className='shadow-xl appearance-none border rounded w-full py-2
                            px-3 text-gray-700 leading-tight focus:outline-none
                            focus:shadow-outline'
                            name='mobile_no'
                            type='text'
                            placeholder='Mobile No'
                            value={customer.mobile_no}
                            onChange={e =>
                                setCustomer({ ...customer, [e.target.name]: e.target.value })
                            }
                            required
                        />
                        <button className='btn mt-10 ml-5' type='submit'>
                            Update
                        </button>
                    </form>
                ) : (
                    <div className='rows flex'>
                        {name}
                        <div className='ml-auto'>
                            <button onClick={() => setUpdateFlag(!updateFlag)}>
                                <Update />
                            </button>
                            <button onClick={() => deleteCustomerList(id)}>
                                <Delete />
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default UpdateCustomers
