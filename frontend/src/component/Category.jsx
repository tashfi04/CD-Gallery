import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { Delete, Update } from './Icons'
import UpdateCategory from './UpdateCategory'

function Category() {
  const [category, setCategory] = useState({ name: '' })
  const [categoryList, setCategoryList] = useState()
  const [updateFlag, setUpdateFlag] = useState(false)

  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  })

  const fetchList = () => {
    authAxios
      .get('/api/v1/categories/list_create/')
      .then(res => setCategoryList(res.data))
      .catch(() => console.log('error in category list fetch'))
  }

  useEffect(() => {
    fetchList()
  }, [updateFlag])

  const addCategory = e => {
    e.preventDefault()
    const body = JSON.stringify(category)
    authAxios
      .post('/api/v1/categories/list_create/', body)
      .then(() => alert('Category added'))
      .then(()=>setCategory({
        name:''
      }))
      .then(() => fetchList())
      .catch(() => console.log('category add error'))
  }

  const deleteCategory = (id) => {
    authAxios
      .delete(`/api/v1/categories/update_delete/${id}/`)
      .then(() => fetchList())
      .then(() => alert('Category deleted'))
      .catch(() => console.log('deleting categories error'))
  }

  return (
    <div>
      <Navbar />
      <div className='sm:w-9/12 sm:m-auto shadow-2xl bg-white pb-5'>
        <div
          className='bg-red-900 text-2xl text-white block py-2 my-2
        mx-auto rounded-md'
        >
          &nbsp; Category
        </div>
        <div className='p-8'>
          <form onSubmit={e => addCategory(e)}>
            <label
              className='block text-gray-700 text-xl font-bold mb-3'
              htmlFor='username'
            >
              Add a Category
            </label>
            <div className='md:flex block'>
              <input
                className='shadow-xl appearance-none border rounded w-full md:w-8/12 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                name='name'
                type='text'
                placeholder='Category Name'
                value={category.name}
                onChange={e =>
                  setCategory({ ...category, [e.target.name]: e.target.value })
                }
                required
              />
              <button className='flex m-auto btn mt-5 md:mt-0' type='submit'>
                Add Category
              </button>
            </div>
          </form>
        </div>
        <hr />
        {/* list of categories */}
        <label
          className='p-8 block text-gray-700 text-xl font-bold mb-3'
          htmlFor='username'
        >
          Category List
        </label>
        {categoryList && categoryList.map(({ id, name }) => {
          return (
            <div key={id} className='px-8 my-3'>
                <UpdateCategory id={id} name={name} deleteCategory={deleteCategory} fetchList={fetchList}/>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Category
