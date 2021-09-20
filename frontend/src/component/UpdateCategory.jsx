import React, { useState, useEffect } from 'react'
import { Delete, Update } from './Icons'
import axios from 'axios'

function UpdateCategory({ id, name, deleteCategory, fetchList }) {
    const [updateFlag, setUpdateFlag] = useState(false)
    const [category, setCategory] = useState()
    const authAxios = axios.create({
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    })

    useEffect(() => {
        setCategory({
            id,
            name
        })
    }, [updateFlag])

    const updateCategory = (e, id) => {
        e.preventDefault();
        setUpdateFlag(!updateFlag)
        let body = JSON.stringify(category)
            authAxios
                .put(`/api/v1/categories/update_delete/${id}/`, body)
                .then(()=>alert('Category Updated'))
                .then(()=>fetchList())
                .then(()=>setUpdateFlag(!updateFlag))
                .catch(()=>'category update')

    }

    return (
        <div>
            {
                updateFlag ? (
                    <form className='flex' onSubmit={(e) => updateCategory(e, id)}>
                        <input
                            className='shadow-xl appearance-none border rounded w-full py-2
                        px-3 text-gray-700 leading-tight focus:outline-none
                        focus:shadow-outline'
                            name='name'
                            type='text'
                            placeholder='Category Name'
                            value={category.name}
                            onChange={e =>
                                setCategory({ ...category, [e.target.name]: e.target.value })
                            }
                            required
                        />
                        <button className='btn ml-5' type='submit'>
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
                            <button onClick={() => deleteCategory(id)}>
                                <Delete />
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default UpdateCategory
