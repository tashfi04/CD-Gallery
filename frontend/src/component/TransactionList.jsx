import React,{useState, useEffect} from 'react'
import Navbar from './Navbar'
import axios from 'axios'

function TransactionList() {
    const [transactionList, setTransactionList] = useState()
    const authAxios = axios.create({
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    })

    useEffect(()=>{
        authAxios
        .get('/api/v1/transactions/list/')
        .then((res)=>setTransactionList(res.data))
        .catch(()=>console.log('Transaction fetch error'))
    },[])

    console.log(transactionList)

    return (
        <div>
            <Navbar />
            <div className='sm:w-9/12 sm:m-auto shadow-2xl bg-white pb-5'>
                <div
                    className='bg-red-900 text-2xl text-white block py-2 my-2
        mx-auto rounded-md'
                >
                    &nbsp; Transaction List
                </div>
                <table className='border-separate table-fixed w-full p-5 text-xs sm:text-base'>
                    <thead>
                        <tr>
                           <th className='p-2 bg-red-100'>Customer Name</th>
                           <th className='p-2 bg-red-100'>Total Price</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactionList && transactionList.map(({id,customer,total_price})=>{
                                return(
                                    <tr>
                                        <th className='p-2 bg-red-100'>{customer}</th>
                                        <th className='p-2 bg-red-100'>{total_price}</th>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                </div>
        </div>
    )
}

export default TransactionList
